import { CommonModule } from '@angular/common';
import { Component, input, output, signal, ViewContainerRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

/**
 * Modal window component.
 */
@Component({
    selector: 'dialog.modal',
    templateUrl: './modal.component.html',
    host: {
        class: 'w-full lg:w-4/5 h-full lg:h-4/5 outline-none'
    },
    imports: [CommonModule, FontAwesomeModule]
})
export class ModalComponent {
    /**
     * Close icon
     */
    protected readonly faXmark = signal(faXmark).asReadonly();

    /**
     * GitHub icon
     */
    protected readonly faGithub = signal(faGithub).asReadonly();

    /**
     * The dialog element (host container) of the modal window.
     */
    private dialogElem: HTMLDialogElement;

    /**
     * Gets or sets the title of the modal window.
     */
    public windowTitle = input.required<string>();

    /**
     * Gets or sets the GitHub URL for the modal window's content, if any.
     */
    public gitHubUrl = input<string>();

    /**
     * Fired after closing the dialog.
     */
    public closed = output();

    constructor(private readonly viewRef: ViewContainerRef) {
        this.dialogElem = this.viewRef.element.nativeElement;
    }

    /**
     * Opens the modal window.
     */
    public open()
    {
        if (!this.dialogElem.open) {
            this.dialogElem.showModal();
        }
    }

    /**
     * Closes the modal window.
     */
    public close() {
        if (this.dialogElem.open) {
            this.dialogElem.close();
            this.closed.emit();
        }
    }
}
