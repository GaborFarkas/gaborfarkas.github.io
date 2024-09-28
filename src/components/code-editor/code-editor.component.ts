import { MonacoLoaderService } from "@/services/monaco-loader.service";
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
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
     * The editor container's DOM reference.
     */
    @ViewChild('editorContainer') editorContainer!: ElementRef<HTMLDivElement>;

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

                this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
                    language: 'javascript',
                    theme: 'vs',
                    automaticLayout: true
                });
            }
        });

        this.loaderService.loadAsync();
    }

    ngOnDestroy(): void {
        this.editor?.dispose();
    }
}
