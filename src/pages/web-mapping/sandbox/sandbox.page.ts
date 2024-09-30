import { CodeEditorComponent } from "@/components/code-editor/code-editor.component";
import { NavLogoComponent } from "@/components/navigation/nav-logo/nav-logo.component";
import { NoPhoneComponent } from "@/components/no-phone/no-phone.component";
import { PageUrlMapping } from "@/models/page-url-mapping.model";
import { WebMappingLibrary } from "@/models/web-mapping/web-mapping-library";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { VERSION as OpenLayersVersion } from "ol";
import { version as LeafletVersion } from "leaflet";
import { getVersion as getMaplibreVersion } from "maplibre-gl";
import { VERSION as CesiumVersion } from "@/utils/cesium";

/**
 * The sandbox web mapping page.
 */
@Component({
    selector: 'sandbox-page',
    standalone: true,
    imports: [CommonModule, FormsModule, NavLogoComponent, NoPhoneComponent, CodeEditorComponent],
    templateUrl: './sandbox.page.html',
    host: {
        class: 'flex flex-col h-full'
    }
})
export class SandboxPage implements OnInit {
    constructor(private sanitizer: DomSanitizer,
        private httpClient: HttpClient
    ) { }

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
            this.loadExtraTypes();
        }
    }

    /**
     * Extra types for the chosen web mapping library.
     */
    protected extraTypes?: string;

    ngOnInit(): void {
        this.loadExtraTypes();
    }

    private loadExtraTypes() {
        this.httpClient.get(`/assets/web-mapping/types/${this.library.replace(/ /g, '').toLowerCase()}.d.ts`, {
            responseType: 'text'
        }).subscribe(resp => {
            this.extraTypes = resp;
        });
    }
}
