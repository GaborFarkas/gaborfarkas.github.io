import { Component, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

/**
 * Modal window component.
 */
@Component({
    selector: 'dialog.modal',
    standalone: true,
    templateUrl: './modal.component.html',
    host: {
        class: 'w-full lg:w-4/5 h-full lg:h-4/5 outline-none'
    },
    imports: [FontAwesomeModule]
})
export class ModalComponent {
    /**
     * Close icon
     */
    protected faXmark: IconDefinition = faXmark;

    /**
     * The dialog element (host container) of the modal window.
     */
    private dialogElem: HTMLDialogElement;

    /**
     * Gets or sets the title of the modal window.
     */
    @Input({ required: true }) public windowTitle!: string;

    /**
     * Fired after closing the dialog.
     */
    @Output() closed = new EventEmitter();

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
