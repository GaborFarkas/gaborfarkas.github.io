import { Component, Input, QueryList, ViewChildren } from '@angular/core';
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
    @Input() prefix = '';

    /**
     * The section models for this FAQ group.
     */
    @Input() sections: FaqSectionModel[] = [];

    /**
     * Gets or sets if any FAQ section is expanded.
     */
    protected expanded = false;

    /**
     * Gets the component reference of all FAQ sections.
     */
    @ViewChildren(FaqSectionComponent) private sectionComponents?: QueryList<FaqSectionComponent>;

    /**
     * Toggles the expanded state of the block component based on the sections.
     */
    protected toggle(evtSection: FaqSectionComponent) {
        if (this.sectionComponents) {
            for (const section of this.sectionComponents) {
                if (section !== evtSection) {
                    section.close();
                }
            }

            this.expanded = this.sectionComponents.some(section => section.expanded);
        }
    }
}
