import { Component, input, signal, viewChildren } from '@angular/core';
import { FaqItemComponent } from '@/company/about/faq-item/faq-item.component';
import { FaqItemModel } from '@/company/about/faq.model';
import { CommonModule } from '@angular/common';

/**
 * Grouping component for connected FAQ sections.
 */
@Component({
    selector: 'div.faq',
    imports: [CommonModule, FaqItemComponent],
    templateUrl: './faq-group.component.html',
    styleUrl: './faq-group.component.css'
})
export class FaqGroupComponent {
    /**
     * The question prefix of the current FAQ group.
     */
    public prefix = input('');

    /**
     * The item models for this FAQ group.
     */
    public items = input<FaqItemModel[]>([]);

    /**
     * Gets or sets if any FAQ item is expanded.
     */
    protected expanded = signal(false);

    /**
     * Gets the component reference of all FAQ items.
     */
    private itemComponents = viewChildren(FaqItemComponent);

    /**
     * Toggles the expanded state of the group component based on the items.
     */
    protected toggle(evtSection: FaqItemComponent) {
        if (this.itemComponents().length) {
            for (const item of this.itemComponents()) {
                if (item !== evtSection) {
                    item.close();
                }
            }

            this.expanded.set(this.itemComponents().some(item => item.expanded));
        }
    }
}
