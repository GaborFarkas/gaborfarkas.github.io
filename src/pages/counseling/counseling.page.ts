import { Component, OnInit, signal } from '@angular/core';
import { CardComponent } from '@/components/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faCompassDrafting, faDisplay, faFileContract, faGlobe, faGroupArrowsRotate, faIceCream, faLayerGroup, faListCheck, faMoneyBill1Wave, faMoon, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { randomizer } from '@/utils/array';
import { DecoratedColumnComponent } from '@/components/decorated-column/decorated-column.component';
import { ReferenceDescriptor } from '@/models/reference.model';
import { faAngular, faLinux } from '@fortawesome/free-brands-svg-icons';

/**
 * Main content of the counseling page.
 */
@Component({
    selector: 'counseling-page',
    imports: [CardComponent, FontAwesomeModule, DecoratedColumnComponent],
    templateUrl: './counseling.page.html'
})
export class CounselingPage implements OnInit {
    protected readonly faCompassDrafting = signal(faCompassDrafting).asReadonly();

    protected readonly faGlobe = signal(faGlobe).asReadonly();

    protected readonly faDisplay = signal(faDisplay).asReadonly();

    protected readonly faSitemap = signal(faSitemap).asReadonly();

    protected readonly faListCheck = signal(faListCheck).asReadonly();

    protected readonly faFileContract = signal(faFileContract).asReadonly();

    protected readonly faMoneyBillWave = signal(faMoneyBill1Wave).asReadonly();

    protected readonly Section = signal(Section).asReadonly();

    /**
     * Color codes for the 5 card items.
     */
    protected cardColors = signal<string[]>([]);

    protected readonly references = signal<Record<string, ReferenceDescriptor[]>>({
        [Section.WEB]: [
            {
                url: 'https://github.com/openlayers/openlayers/commits?author=GaborFarkas',
                icon: faLayerGroup,
                text: 'I started my career as an OpenLayers contributor'
            },
            {
                url: 'https://github.com/GaborFarkas/gaborfarkas.github.io',
                icon: faAngular,
                text: 'The website you are currently browsing is also a reference'
            },
            {
                url: 'https://cadify.no/',
                icon: faCartShopping,
                text: 'A nopCommerce site with a CAD-based general product configurator (WIP)'
            }
        ],
        [Section.UIUX]: [
            {
                url: 'http://fagyivarazs.hu/',
                icon: faIceCream,
                text: 'A mobile-first UI design for an ice cream and pastry shop'
            },
            {
                url: 'https://datelite.hu/',
                icon: faMoon,
                text: 'A minimalistic dark design for a remote sensing company'
            }
        ],
        [Section.INFRASTRUCTURE]: [
            {
                url: '',
                icon: faLinux,
                text: 'Linux as a programming language: a case study (coming soon)'
            }
        ],
        [Section.PM]: [
            {
                url: 'https://agilemanifesto.org/',
                icon: faGroupArrowsRotate,
                text: 'I teach this kind of Agile, not Scrum'
            }
        ]
    }).asReadonly();

    ngOnInit() {
        // Generate random card colors from a set.
        const random = randomizer(['rgb(101 163 13)', 'rgb(79 70 229)', 'rgb(8 145 178)', 'rgb(13 148 136)', 'rgb(202 138 4)']);
        const cardColors = [];
        for (let i = 0; i < 5; ++i) {
            cardColors.push(random.next().value!);
        }
        this.cardColors.set(cardColors);
    }
}

/**
 * Expertise sections in the counseling page.
 */
enum Section {
    ARCHITECTURE,
    WEB,
    UIUX,
    INFRASTRUCTURE,
    PM
}
