import { Component, input, signal, viewChildren } from '@angular/core';
import { FaqSectionComponent } from '@/components/faq/faq-section/faq-section.component';
import { FaqSectionModel } from '@/models/faq.model';
import { CommonModule } from '@angular/common';

/**
 * Grouping component for connected FAQ sections.
 */
@Component({
    selector: 'div.faq',
    imports: [CommonModule, FaqSectionComponent],
    templateUrl: './faq-block.component.html',
    styleUrl: './faq-block.component.css'
})
export class FaqBlockComponent {
    /**
     * The question prefix of the current FAQ group.
     */
    public prefix = input('');

    /**
     * The section models for this FAQ group.
     */
    public sections = input<FaqSectionModel[]>([]);

    /**
     * Gets or sets if any FAQ section is expanded.
     */
    protected expanded = signal(false);

    /**
     * Gets the component reference of all FAQ sections.
     */
    private sectionComponents = viewChildren(FaqSectionComponent);

    /**
     * Toggles the expanded state of the block component based on the sections.
     */
    protected toggle(evtSection: FaqSectionComponent) {
        if (this.sectionComponents().length) {
            for (const section of this.sectionComponents()) {
                if (section !== evtSection) {
                    section.close();
                }
            }

            this.expanded.set(this.sectionComponents().some(section => section.expanded));
        }
    }
}
