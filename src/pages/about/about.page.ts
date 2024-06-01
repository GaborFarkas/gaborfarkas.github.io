import { Component } from '@angular/core';
import { FaqBlockComponent } from '../../components/faq/faq-block/faq-block.component';
import { FaqGroupModel } from '../../models/faq.model';

/**
 * Main content of the about page.
 */
@Component({
    selector: 'about-page',
    standalone: true,
    templateUrl: './about.page.html',
    imports: [FaqBlockComponent]
})
export class AboutPage {
    protected sectionGroups: FaqGroupModel[] = [
        {
            prefix: 'Why',
            sections: [
                {
                    question: ' are you doing this?',
                    answer: 'Simply put, I\'m not compatible with big companies. Not a fan of modern bureaucracy (there is a rule for everything, yet nothing really works), neither of their money making game. I\'m more about creating value in efficient and sustainable ways. I could force myself into a 9 to 5 desk job, but why should I?'
                },
                {
                    question: ' did you create this website?',
                    answer: 'To put myself up on the map, to estabilish a presence. It\'s a long-term consideration. One day when I\'m available for a new partnership, you might will be there because of this site. Or we can grow this small business into something bigger because you have the required skills and you like my approach.'
                },
                {
                    question: ' the company name?',
                    answer: 'It\'s Gábor Farkas s.p. in English, shorthand for Gábor Farkas sole proprietorship. A conventional naming in Hungary, which you will see on every invoice as well. Since honesty and transparency are cornerstones in my business policy, I\'m not comfortable with complicating things with a better-sounding fake name.'
                }
            ]
        },
        {
            prefix: 'When',
            sections: [
                {
                    question: ' will you be available?',
                    answer: 'It depends. Long-term partnerships are taken extremely seriously. Estimation on the next avaiable vacancy can change on the fly based on the non-foreseeable future needs of my current partners. Counseling and small side projects can be scheduled more promptly, especially during the summer, when I don\'t have any teaching duties at the university.'
                },
                {
                    question: ' will you expand?',
                    answer: 'When I find one or more potential partners to increase my capacities with. The skill requirements are unusually high, and the yield is not competitive with large enterprise positions on the same skill level. If you are still interested, contact me, and we will see if we can work something out. Please note that for me, quality always comes first, and therefore, I\'m not actively pursuing expansion.'
                }
            ]
        },
        {
            prefix: 'Where',
            sections: [
                {
                    question: ' are you based at?',
                    answer: 'In Pécs, Hungary. Usually physical contact is not required for counseling and side projects, only for the team building aspect of long-term partnerships. However, if the demand is high enough to pay my expenses, I\'m willing to travel now and then.'
                },
                {
                    question: ' are your references?',
                    answer: 'Some of the ones I\'m allowed to show, are carefully hidden throughout the website under some hexagons, if you are browsing this site using a large enough screen. If you would like to hear about the others, please contact me.'
                }
            ]
        },
        {
            prefix: 'How',
            sections: [
                {
                    question: ' do you prioritize your time?',
                    answer: 'University is the first. I reduced my duties to 10 hours per week teaching only, but classes have fixed time and students are entitled to uncompromised knowledge. With respect to this, long-term partners always get a fixed weekly budget of my time. Counsels and short-term side projects are managed from the rest.'
                },
                {
                    question: ' are you selecting your partners?',
                    answer: 'I\'m quite widely available for small projects and counsels, but long-term partnerships are always considered very carefully. To start a cooperation spanning over several years, I must strongly agree with the values and the intentions of the project (i.e. the potential good it can bring to the industry, or even better, to humanity).'
                }
            ]
        }
    ];
}
