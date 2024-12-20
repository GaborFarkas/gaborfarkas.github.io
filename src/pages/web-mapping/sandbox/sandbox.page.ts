import { CodeEditorComponent } from "@/components/code-editor/code-editor.component";
import { NavLogoComponent } from "@/components/navigation/nav-logo/nav-logo.component";
import { NoPhoneComponent } from "@/components/no-phone/no-phone.component";
import { PageUrlMapping } from "@/models/page-url-mapping.model";
import { WebMappingLibrary } from "@/models/web-mapping/web-mapping-library";
import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { VERSION as OpenLayersVersion } from "ol";
import { version as LeafletVersion } from "leaflet";
import { getVersion as getMaplibreVersion } from "maplibre-gl";
import { VERSION as CesiumVersion } from "@/utils/cesium";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFloppyDisk, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FileService } from "@/services/file.service";
import { FeatureSupportItem } from "@/models/web-mapping/feature-support-item.model";
import { GroupedSourceCodeModel, SourceCodeGroup, SourceCodeItem, SourceCodeType } from "@/models/web-mapping/grouped-source-code.model";
import { TypedTemplateDirective } from "@/directives/typed-template.directive";
import { SelectAutoResetDirective } from "@/directives/select-auto-reset.directive";
import { DataValueDirective } from "@/directives/data-value.directive";
import { ElementWithData } from "@/models/element-with-data.model";
import { PersistencyService } from "@/services/persistency.service";
import { NotificationService } from "@/services/notification.service";
import { ModalComponent } from "@/components/modal/modal.component";

/**
 * The sandbox web mapping page.
 */
@Component({
    selector: 'sandbox-page',
    imports: [CommonModule, FormsModule, NavLogoComponent, NoPhoneComponent, CodeEditorComponent, FontAwesomeModule, TypedTemplateDirective, SelectAutoResetDirective, DataValueDirective, ModalComponent],
    providers: [FileService, PersistencyService],
    templateUrl: './sandbox.page.html',
    host: {
        class: 'flex flex-col h-full'
    }
})
export class SandboxPage implements OnInit, OnDestroy {
    constructor(private sanitizer: DomSanitizer,
        private fileService: FileService,
        private persistencyService: PersistencyService,
        private notificationService: NotificationService
    ) { }
    /**
     * Play icon for the template.
     */
    protected faPlay: IconDefinition = faPlay;

    /**
     * Save icon for the template.
     */
    protected faFloppyDisk: IconDefinition = faFloppyDisk;

    /**
     * Delete icon for the template.
     */
    protected faTrash: IconDefinition = faTrash;

    /**
     * Web mapping libraries enum for the template.
     */
    protected WebMappingLibrary = WebMappingLibrary;

    /**
     * Types for the open code option dropdown generator ng-template.
     */
    protected openCodeTemplateTypes!: { items: (SourceCodeGroup & SourceCodeItem)[] };

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
            this.loadTypeDefinitionsAsync();
            this.loadSnippets();
        }
    }

    /**
     * Extra types for the chosen web mapping library.
     */
    protected extraTypes?: string;

    /**
     * The current content of the code editor.
     */
    protected currentCode = '';

    /**
     * Registration key of the automatic code save interval.
     */
    private saveIntervalKey?: number = undefined;

    /**
     * The web map iframe
     */
    @ViewChild('webMap') private webMap!: ElementRef<HTMLIFrameElement>;

    /**
     * The modal dialog of this page.
     */
    @ViewChild(ModalComponent) private dialog!: ModalComponent;

    /**
     * Returns the namespace of the currently selected library for user script wrapping.
     */
    private get libraryNamespace(): string {
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
     * Returns the well-known name of the currently selected library, used in file names and keys.
     */
    private get libraryName(): string {
        return this.library.replace(/ /g, '').toLowerCase();
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

    /**
     * The currently active snippet (backing field).
     */
    private activeSnippet_?: SourceCodeItem;
    /**
     * The currently active snippet.
     */
    private get activeSnippet() {
        return this.activeSnippet_;
    };
    /**
     * The currently active snippet.
     */
    private set activeSnippet(value: SourceCodeItem | undefined) {
        if (this.activeSnippet_ !== value) {
            this.activeSnippet_ = value;
            if (value) {
                switch (value.type) {
                    case SourceCodeType.GITHUB:
                        this.loadExampleAsync(value).then(() =>
                            this.notificationService.showSuccess(
                                `Successfully loaded example ${value.name}.`, 2000))
                            .catch((err: Error) => {
                                this.notificationService.showError(err.message, 5000);
                                this.activeSnippet = undefined;
                            });
                        break;
                    case SourceCodeType.LOCAL:
                        try {
                            this.loadLocalSnippet(value);
                            this.notificationService.showSuccess(
                                `Successfully loaded local snippet ${value.name}.`, 2000);
                        } catch (err) {
                            this.notificationService.showError((err as Error).message, 5000);
                            this.activeSnippet = undefined;
                        }
                        break;
                    default:
                        this.notificationService.showError(`Could not load code snippet. Unknown type ${value.type}`,
                            5000);
                }
            }
        }
    };

    /**
     * The currently active snippet can be deleted.
     */
    protected get canDelete(): boolean {
        return this.activeSnippet?.type === SourceCodeType.LOCAL;
    }

    /**
     * The name of the newly saved snippet.
     */
    protected saveSnippetName = '';

    async ngOnInit(): Promise<void> {
        this.loadTypeDefinitionsAsync();

        this.saveIntervalKey = window.setInterval(function (this: SandboxPage) {
            if (this.activeSnippet?.type === SourceCodeType.LOCAL) {
                this.persistencyService.storeWithPrefix(this.libraryName, this.activeSnippet.key, this.currentCode);
            }
        }.bind(this), 5000);

        this.featureSupportItems = await this.fileService.getConfigAsync('feature-support.json');
        this.loadSnippets();
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
        // eslint-disable-next-line no-self-assign
        this.webMap.nativeElement.src = this.webMap.nativeElement.src;
    }

    /**
     * Opens an existing code snippet into the code editor.
     * @param item The code descriptor.
     */
    protected async loadCodeSnippetAsync(select: EventTarget | null) {
        // Get the corresponding option from the event's target by value
        const selectElem = select as HTMLSelectElement;
        const optionElem = selectElem.querySelector(`option[value="${selectElem.value}"]`) as ElementWithData<SourceCodeItem>;

        if (optionElem?.dataValue) {
            this.activeSnippet = optionElem.dataValue;
        } else {
            this.notificationService.showError('Could not find the selected code snippet.', 5000);
        }
    }

    /**
     * Loads a pre-written example function from GitHub.
     * @param item The source code descriptor.
     */
    private async loadExampleAsync(item: SourceCodeItem) {
        const sourceCode = await this.fileService.getTextDocumentAsync(
            `/assets/web-mapping/examples/${this.libraryName}.ts`);
        const sourceArr = sourceCode.split('\n');
        const keyLine = parseInt(item.key);
        let startLine = keyLine;

        // Line number stores the first call's position. Search for the enclosing function.
        for (startLine; startLine > 0; --startLine) {
            if (sourceArr[startLine].startsWith('function') || sourceArr[startLine].startsWith('async function')) {
                break;
            }
        }
        if (startLine === 0) {
            throw new Error('Could not extract snippet from the source code.');
        }

        // Look for the end. Conventionally it is the next line with only a closing brace, no indents.
        let endLine = keyLine;
        for (endLine; endLine < sourceArr.length; ++endLine) {
            if (sourceArr[endLine] === '}') {
                break;
            }
        }
        if (sourceArr[endLine] !== '}') {
            throw new Error('Could not extract snippet from the source code.');
        }

        // Get the function's body only.
        this.currentCode = sourceArr.slice(startLine + 1, endLine).map(line => line.slice(4)).join('\n');
    }

    /**
     * Loads a locally saved snippet from the configured storage.
     * @param item The source code descriptor.
     */
    private loadLocalSnippet(item: SourceCodeItem) {
        const sourceCode: string | null = this.persistencyService.get(item.key, this.libraryName);
        if (!sourceCode) {
            throw new Error('Could not find snippet in storage.');
        }

        this.currentCode = sourceCode;
    }

    /**
     * Loads the type definitions for the currently selected library.
     */
    private async loadTypeDefinitionsAsync() {
        this.extraTypes = await this.fileService.getTextDocumentAsync(
            `/assets/web-mapping/types/${this.libraryName}.d.ts`);
    }

    /**
     * Loads snippets available for the currently selected web mapping library.
     * @param forceRebuild Forcefully rebuild the tree to synchronize with changes.
     */
    private loadSnippets(forceRebuild = false) {
        if (forceRebuild || !this.availableCodes[this.library]) {
            const model: GroupedSourceCodeModel = {
                children: []
            };

            const localSnippets = this.persistencyService.getKeysByPrefix(this.libraryName);
            if (localSnippets.length) {
                const localModel: SourceCodeGroup = {
                    children: localSnippets.map<SourceCodeItem>(key => {
                        return {
                            name: key,
                            type: SourceCodeType.LOCAL,
                            key: key
                        };
                    }),
                    name: 'Saved snippets',
                    depth: 1
                };

                model.children.push(localModel);
            }

            if (this.featureSupportItems.length) {
                const examplesModel: SourceCodeGroup = {
                    children: [],
                    name: 'Examples',
                    depth: 1
                };
                // Use a map for quick access
                const groupMap = new Map<string, SourceCodeGroup>();
                let maxDepth = 0;

                // Build tree
                for (const feature of this.featureSupportItems) {
                    if (!feature.support) {
                        // Group
                        const group: SourceCodeGroup = {
                            children: [],
                            name: feature.name,
                            parent: feature.parent,
                            depth: feature.parent ? groupMap.get(feature.parent)!.depth + 1 : 2
                        }
                        if (group.depth > maxDepth) maxDepth = group.depth;

                        groupMap.set(group.name, group);
                        if (group.parent) {
                            groupMap.get(group.parent)!.children.push(group);
                        } else {
                            examplesModel.children.push(group);
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
                    for (const group of [...groupMap.values()].filter(group => group.depth === depth)) {
                        if (group.children.length === 0) {
                            const parent = group.parent ? groupMap.get(group.parent) : examplesModel;
                            parent!.children = parent!.children.filter(child => child !== group);
                        }
                    }
                }

                model.children.push(examplesModel);
            }


            this.availableCodes[this.library] = model;
        }
    }

    /**
     * Opens the save dialog in a modal window.
     */
    protected openSaveDialog() {
        this.saveSnippetName = '';
        this.dialog.open();
    }

    /**
     * Saves the current code as a new  local snippet.
     */
    protected saveSnippet() {
        if (!this.saveSnippetName) {
            return;
        }

        this.persistencyService.storeWithPrefix(this.libraryName, this.saveSnippetName, this.currentCode);
        this.loadSnippets(true);

        this.notificationService.showSuccess(`Successfully saved current code as ${this.saveSnippetName}`, 2000);

        // Find snippet and make it active
        const localSnippet = (this.availableCodes[this.library]?.children.find(
            child => child.name === 'Saved snippets') as SourceCodeGroup)?.children.find(child =>
                child.name === this.saveSnippetName) as SourceCodeItem | undefined;
        if (localSnippet) {
            this.activeSnippet = localSnippet;
        } else {
            this.notificationService.showError('Could not load newly saved snippet. Please refresh the window.', 5000);
        }

        this.dialog.close();
        return;
    }

    /**
     * Cancels the current saving process and closes the save modal window.
     */
    protected cancelSave() {
        this.saveSnippetName = '';
        this.dialog.close();
    }

    /**
     * Deletes the currently opened local snippet.
     */
    protected deleteSnippet() {
        if (this.activeSnippet?.type === SourceCodeType.LOCAL) {
            const snippet = this.activeSnippet;

            // Unload snippet before removing to avoid the save interval to accidentally save it again in a race condition.
            this.activeSnippet = undefined;
            this.persistencyService.remove(snippet.key, this.libraryName);

            this.loadSnippets(true);
            this.notificationService.showSuccess(`Successfully removed snippet ${snippet.name}`, 2000);

        } else {
            this.notificationService.showError('There is no loaded snippet which could be removed.', 5000);
        }
    }
}
