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
import { ConfigService } from "@/services/config.service";
import { FeatureSupportItem } from "@/models/web-mapping/feature-support-item.model";
import { GroupedSourceCodeModel, SourceCodeGroup, SourceCodeItem, SourceCodeType } from "@/models/web-mapping/grouped-source-code.model";

/**
 * The sandbox web mapping page.
 */
@Component({
    selector: 'sandbox-page',
    standalone: true,
    imports: [CommonModule, FormsModule, NavLogoComponent, NoPhoneComponent, CodeEditorComponent, FontAwesomeModule],
    providers: [ConfigService],
    templateUrl: './sandbox.page.html',
    host: {
        class: 'flex flex-col h-full'
    }
})
export class SandboxPage implements OnInit, OnDestroy {
    constructor(private sanitizer: DomSanitizer,
        private httpClient: HttpClient,
        private configService: ConfigService
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
            this.loadExamples();
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

    /**
     * Feature support items containing importable examples for every library.
     */
    private featureSupportItems: FeatureSupportItem[] = [];

    /**
     * The available codes for the currently loaded web mapping libraries including examples and locally saved codes.
     */
    protected availableCodes: Record<WebMappingLibrary, GroupedSourceCodeModel | undefined> = {
        [WebMappingLibrary.LEAFLET]: undefined,
        [WebMappingLibrary.OPENLAYERS]: undefined,
        [WebMappingLibrary.MAPLIBRE]: undefined,
        [WebMappingLibrary.CESIUM]: undefined
    };

    async ngOnInit(): Promise<void> {
        this.loadTypeDefinitions();

        this.saveIntervalKey = window.setInterval(function (this: SandboxPage) {
            // TODO: Save code
        }.bind(this), 5000);

        this.featureSupportItems = await this.configService.getConfigAsync('feature-support.json');
        this.loadExamples();
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
            scriptElem.textContent = `const playExampleFn = () => {\n\tdocument.play(async function(${this.libraryNamespace}, map) {\n${this.currentCode}\n});\n}\n if (document.playLoaded) { playExampleFn(); } else { document.addEventListener('playLoaded', playExampleFn); }`;
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

    /**
     * Loads examples available for the currently selected web mapping library.
     */
    private loadExamples() {
        if (!this.availableCodes[this.library]) {
            const model: GroupedSourceCodeModel = {
                children: []
            };
            // Use a map for quick access
            const groupMap: Map<string, SourceCodeGroup> = new Map();
            let maxDepth: number = 0;

            // Build tree
            for (let feature of this.featureSupportItems) {
                if (!feature.support) {
                    // Group
                    const group: SourceCodeGroup = {
                        children: [],
                        name: feature.name,
                        parent: feature.parent,
                        depth: feature.parent ? groupMap.get(feature.parent)!.depth + 1 : 1
                    }
                    if (group.depth > maxDepth) maxDepth = group.depth;

                    groupMap.set(group.name, group);
                    if (group.parent) {
                        groupMap.get(group.parent)!.children.push(group);
                    } else {
                        model.children.push(group);
                    }
                } else if (feature.support[this.library].line) {
                    // Feature with example
                    const featItem: SourceCodeItem = {
                        name: feature.name,
                        type: SourceCodeType.GITHUB,
                        key: feature.support[this.library].line!.toString()
                    }
                    groupMap.get(feature.parent!)!.children.push(featItem);
                }
            }

            // Shake empty branches
            for (let depth = maxDepth; depth > 0; --depth) {
                for (let group of [...groupMap.values()].filter(group => group.depth === depth)) {
                    if (group.children.length === 0) {
                        const parent = group.parent ? groupMap.get(group.parent) : model;
                        parent!.children = parent!.children.filter(child => child !== group);
                    }
                }
            }

            this.availableCodes[this.library] = model;
        }
    }
}
