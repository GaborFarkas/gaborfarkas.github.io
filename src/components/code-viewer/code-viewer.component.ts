import { Component, computed, effect, ElementRef, input, OnInit, signal, viewChild, ViewEncapsulation } from "@angular/core";
import { highlightAllUnder } from 'prismjs';

/**
 * A prismjs-based mobile-friendly code viewer with only syntax hightlighting.
 */
@Component({
    selector: 'div.code-viewer',
    templateUrl: './code-viewer.component.html',
    styleUrls: [
        '../../../node_modules/prismjs/themes/prism.min.css',
        './code-viewer.component.css'
    ],
    encapsulation: ViewEncapsulation.None
})
export class CodeViewerComponent implements OnInit {
    /**
     * The viewer's language.
     */
    public language = input('javascript');

    /**
     * Prism class name used for automatic syntax highlighting.
     */
    protected codeClassName = computed(() => `language-${this.language()}`);

    /**
     * The viewer's content.
     */
    public value = input.required<string>();

    /**
     * The selected language's Prism syntax module has been loaded.
     */
    private ready = signal(false);

    /**
     * The pre element to highlight code in.
     */
    private codeViewerElem = viewChild.required<ElementRef<HTMLPreElement>>('code');

    constructor() {
        effect(() => {
            if (this.ready()) {
                highlightAllUnder(this.codeViewerElem().nativeElement);
            }
        });
    }

    ngOnInit(): void {
        switch (this.language()) {
            case 'javascript':
                import('prismjs/components/prism-javascript').then(() => this.ready.set(true));
                break;
            case 'bash':
                import('prismjs/components/prism-bash').then(() => this.ready.set(true));
                break;
            default:
                throw new Error(`Unsupported language ${this.language()}`);
        }
    }
}
