import { Component, input, output } from '@angular/core';
import { FaqItemModel } from '@/company/about/faq.model';
import { CommonModule } from '@angular/common';

/**
 * Component for a single FAQ item.
 */
@Component({
    selector: 'div.faq-section',
    imports: [CommonModule],
    templateUrl: './faq-item.component.html',
    styleUrl: './faq-item.component.css'
})
export class FaqItemComponent {
    /**
     * The question prefix of the current FAQ group.
     */
    public groupPrefix = input('');

    /**
     * The descriptor of the current FAQ item.
     */
    public itemModel = input<FaqItemModel>();

    /**
     * Fired when the FAQ item is toggled with the current instance.
     */
    public toggled = output<FaqItemComponent>();

    /**
     * Gets or sets if the FAQ item is expanded. Backing field.
     */
    private expanded_ = false;

    /**
     * Gets or sets if the FAQ item is expanded.
     */
    private set expanded(val: boolean) {
        if (val !== this.expanded_) {
            this.expanded_ = val;
        }
    }

    /**
     * Gets or sets if the FAQ item is expanded.
     */
    public get expanded(): boolean {
        return this.expanded_;
    }

    /**
     * Toggles the FAQ item.
     */
    protected toggleItem() {
        this.expanded = !this.expanded;
        this.toggled.emit(this);
    }

    /**
     * Closes the FAQ item.
     */
    public close() {
        this.expanded = false;
    }
}
