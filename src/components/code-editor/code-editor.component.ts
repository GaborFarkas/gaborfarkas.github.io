import { MonacoLoaderService } from "@/services/monaco-loader.service";
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import * as monacoType from "monaco-editor/esm/vs/editor/editor.api";

declare var monaco: typeof monacoType;

/**
 * A monaco-based code editor component.
 */
@Component({
    selector: 'div.code-editor',
    standalone: true,
    providers: [MonacoLoaderService],
    templateUrl: './code-editor.component.html',
    styleUrls: ['../../../node_modules/monaco-editor/min/vs/editor/editor.main.css']
})
export class CodeEditorComponent implements AfterViewInit, OnDestroy {
    /**
     * The monaco editor instance.
     */
    private editor?: monacoType.editor.IStandaloneCodeEditor;

    /**
     * The handler of the currently loaded extra library.
     */
    private extraLib?: monacoType.IDisposable;

    /**
     * Helper variable to tell if the lib has been loaded.
     */
    private monacoLoaded: boolean = false;

    /**
     * Extra definitions are stored here until monaco has been loaded.
     */
    private initialExtraDefinitions?: string;

    /**
     * The code editor's current value (backing field).
     */
    private value_: string = '';
    /**
     * The code editor's current value.
     */
    @Input({ required: true }) public set value(newValue: string) {
        if (newValue !== this.value_) {
            this.value_ = newValue;
            this.editor?.setValue(this.value_);
        }
    }
    public get value(): string {
        return this.value_;
    }
    /**
     * Fires when the code editor current value has been changed.
     */
    @Output() valueChange = new EventEmitter<string>();

    /**
     * The extra definitions to load. For JS this can be extra types, for JSON a schema to validate.
     */
    @Input() public set definitions(value: string | undefined) {
        this.extraLib?.dispose();
        // Currently only JS is supported.
        if (value) {
            if (!this.monacoLoaded) {
                this.initialExtraDefinitions = value;
            } else {
                this.extraLib = monaco.languages.typescript.javascriptDefaults.addExtraLib(value);
            }
        }
    }

    /**
     * The editor container's DOM reference.
     */
    @ViewChild('editorContainer') private editorContainer!: ElementRef<HTMLDivElement>;

    constructor(private loaderService: MonacoLoaderService) { }

    ngAfterViewInit(): void {
        this.loaderService.loaded.subscribe(isLoaded => {
            if (isLoaded) {
                // Redefine JS defaults as otherwise some errors might not appear.
                monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                    noSemanticValidation: false,
                    noSyntaxValidation: false,
                    noSuggestionDiagnostics: false
                });
                monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                    target: monaco.languages.typescript.ScriptTarget.ES2020,
                    allowJs: true,
                    checkJs: true,
                    allowNonTsExtensions: true
                });

                // Instantiate editor
                this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
                    language: 'javascript',
                    theme: 'vs',
                    automaticLayout: true,
                    value: this.value
                });

                // Add change listener to emit current code
                this.editor.onDidChangeModelContent(function (this: CodeEditorComponent) {
                    if (this.editor) {
                        this.valueChange.emit(this.editor.getValue());
                        // Set the backing field as well with the emitted value to avoid constant editor updates due to the
                        // two way binding. That causes the cursor to jump to the start of the document.
                        this.value_ = this.editor.getValue();
                    }
                }.bind(this));

                // Add the extra definitions specified on init
                if (this.initialExtraDefinitions) {
                    this.extraLib = monaco.languages.typescript.javascriptDefaults.addExtraLib(this.initialExtraDefinitions);
                    this.initialExtraDefinitions = undefined
                }

                this.monacoLoaded = true;
            }
        });

        this.loaderService.loadAsync();
    }

    ngOnDestroy(): void {
        this.extraLib?.dispose();
        this.editor?.dispose();
    }
}
