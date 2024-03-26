import { Component } from '@angular/core';
import { FaqBlockComponent } from '../../components/faq/faq-block/faq-block.component';
import { FaqSectionComponent } from '../../components/faq/faq-section/faq-section.component';
import { FaqGroupModel } from '../../models/faq.model';
import { CommonModule } from '@angular/common';

/**
 * Main content of the about page.
 */
@Component({
    selector: 'about-page',
    standalone: true,
    templateUrl: './about.page.html',
    imports: [CommonModule, FaqBlockComponent]
})
export class AboutPage {
    protected sectionGroups: FaqGroupModel[] = [
        {
            prefix: 'Why',
            sections: [
                {
                    question: ' are you doing this?',
                    answer: 'Simply put, I\'m not compatible with big companies. Not a fan of bureaucracy, neither of their money making game. I\'m more about creating value in efficient and sustainable ways. I could force myself into a 9 to 5 desk job, but why should I?'
                },
                {
                    question: ' did you create this website?',
                    answer: 'To put myself up on the map, to have a presence. It\'s a long-term consideration. One day when I\'m available for a new partnership, you might will be there because of this site. Or we can grow this small business into something bigger because you have the required skills and you like my approach.'
                }
            ]
        }
    ];
}
