import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaqSectionModel } from '@/models/faq.model';
import { CommonModule } from '@angular/common';

/**
 * Component for a single FAQ section.
 */
@Component({
    selector: 'div.faq-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './faq-section.component.html',
    styleUrl: './faq-section.component.css'
})
export class FaqSectionComponent {
    /**
     * The question prefix of the current FAQ group.
     */
    @Input() groupPrefix = '';

    /**
     * The descriptor of the current FAQ section.
     */
    @Input() sectionModel!: FaqSectionModel;

    /**
     * Fired when the FAQ section is toggled with the current instance.
     */
    @Output() toggled = new EventEmitter<FaqSectionComponent>();

    /**
     * Gets or sets if the FAQ section is expanded. Backing field.
     */
    private expanded_ = false;

    /**
     * Gets or sets if the FAQ section is expanded.
     */
    private set expanded(val: boolean) {
        if (val !== this.expanded_) {
            this.expanded_ = val;
        }
    }

    /**
     * Gets or sets if the FAQ section is expanded.
     */
    public get expanded(): boolean {
        return this.expanded_;
    }

    /**
     * Toggles the FAQ section.
     */
    protected toggleSection() {
        this.expanded = !this.expanded;
        this.toggled.emit(this);
    }

    /**
     * Closes the FAQ section.
     */
    public close() {
        this.expanded = false;
    }
}
