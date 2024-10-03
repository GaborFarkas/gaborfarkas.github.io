import { CodeEditorComponent } from "@/components/code-editor/code-editor.component";
import { NavLogoComponent } from "@/components/navigation/nav-logo/nav-logo.component";
import { NoPhoneComponent } from "@/components/no-phone/no-phone.component";
import { PageUrlMapping } from "@/models/page-url-mapping.model";
import { WebMappingLibrary } from "@/models/web-mapping/web-mapping-library";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { VERSION as OpenLayersVersion } from "ol";
import { version as LeafletVersion } from "leaflet";
import { getVersion as getMaplibreVersion } from "maplibre-gl";
import { VERSION as CesiumVersion } from "@/utils/cesium";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

/**
 * The sandbox web mapping page.
 */
@Component({
    selector: 'sandbox-page',
    standalone: true,
    imports: [CommonModule, FormsModule, NavLogoComponent, NoPhoneComponent, CodeEditorComponent, FontAwesomeModule],
    templateUrl: './sandbox.page.html',
    host: {
        class: 'flex flex-col h-full'
    }
})
export class SandboxPage implements OnInit, OnDestroy {
    constructor(private sanitizer: DomSanitizer,
        private httpClient: HttpClient
    ) { }
    /**
     * Play icon for the template.
     */
    protected faPlay: IconDefinition = faPlay;

    /**
     * Web mapping libraries enum for the template.
     */
    protected WebMappingLibrary = WebMappingLibrary;

    /**
     * The URL of the iframe-d web map.
     */
    protected webMapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${PageUrlMapping.MAP}?lib=openlayers`);

    /**
     * Web mapping library versions to display in the library dropdown.
     */
    protected libraryVersions: Record<WebMappingLibrary, string> = {
        [WebMappingLibrary.OPENLAYERS]: OpenLayersVersion,
        [WebMappingLibrary.LEAFLET]: LeafletVersion,
        [WebMappingLibrary.MAPLIBRE]: getMaplibreVersion(),
        [WebMappingLibrary.CESIUM]: CesiumVersion
    };

    /**
     * The chosen library (backing field).
     */
    private library_: WebMappingLibrary = WebMappingLibrary.OPENLAYERS;
    /**
     * The chosen library.
     */
    protected get library(): WebMappingLibrary {
        return this.library_;
    }
    /**
     * The chosen library.
     */
    protected set library(value: WebMappingLibrary) {
        if (value !== this.library_) {
            this.library_ = value;
            this.webMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${PageUrlMapping.MAP}?lib=${encodeURIComponent(this.library_).toLowerCase()}`);
            this.loadTypeDefinitions();
        }
    }

    /**
     * Extra types for the chosen web mapping library.
     */
    protected extraTypes?: string;

    /**
     * The current content of the code editor.
     */
    protected currentCode: string = '';

    /**
     * Registration key of the automatic code save interval.
     */
    private saveIntervalKey?: number = undefined;

    /**
     * The web map iframe
     */
    @ViewChild('webMap') webMap!: ElementRef<HTMLIFrameElement>;

    /**
     * Returns the namespace of the currently selected library for user script wrapping.
     */
    private get libraryNamespace() {
        switch (this.library) {
            case WebMappingLibrary.CESIUM:
                return 'Cesium';
            case WebMappingLibrary.LEAFLET:
                return 'L';
            case WebMappingLibrary.MAPLIBRE:
                return 'maplibregl';
            case WebMappingLibrary.OPENLAYERS:
                return 'ol';
        }
    }

    ngOnInit(): void {
        this.loadTypeDefinitions();
        this.saveIntervalKey = window.setInterval(function (this: SandboxPage) {
            // TODO: Save code
        }.bind(this), 5000);
    }

    ngOnDestroy(): void {
        if (this.saveIntervalKey) {
            window.clearInterval(this.saveIntervalKey);
        }
    }

    /**
     * Runs the current content of the code editor in the iframe web map.
     */
    protected runCode() {
        const injector = function (this: SandboxPage) {
            this.webMap.nativeElement.removeEventListener('load', injector);
            const iframeDoc = this.webMap.nativeElement.contentWindow!.document;
            const scriptElem = iframeDoc.createElement('script');
            scriptElem.type = 'text/javascript';
            //TODO: Think of something more maintainable than this debug hell of a wrapper line!
            scriptElem.textContent = `const playExampleFn = () => {\n\tdocument.play(function(${this.libraryNamespace}, map) {\n${this.currentCode}\n});\n}\n if (document.playLoaded) { playExampleFn(); } else { document.addEventListener('playLoaded', playExampleFn); }`;
            iframeDoc.head.appendChild(scriptElem);
        }.bind(this);
        this.webMap.nativeElement.addEventListener('load', injector);
        this.webMap.nativeElement.src = this.webMap.nativeElement.src;
    }

    /**
     * Loads the type definitions for the currently selected library.
     */
    private loadTypeDefinitions() {
        this.httpClient.get(`/assets/web-mapping/types/${this.library.replace(/ /g, '').toLowerCase()}.d.ts`, {
            responseType: 'text'
        }).subscribe(resp => {
            this.extraTypes = resp;
        });
    }
}
