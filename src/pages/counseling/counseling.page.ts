import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faDiagramProject, faDisplay, faGlobe, faIceCream, faLayerGroup, faListCheck, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { randomizer } from '../../utils/array';
import { DecoratedColumnComponent } from '../../components/decorated-column/decorated-column.component';
import { ReferenceDescriptor } from '../../models/reference.model';
import { faAngular, faLinux } from '@fortawesome/free-brands-svg-icons';

/**
 * Main content of the counseling page.
 */
@Component({
    selector: 'counseling-page',
    standalone: true,
    imports: [CardComponent, FontAwesomeModule, DecoratedColumnComponent],
    templateUrl: './counseling.page.html'
})
export class CounselingPage implements OnInit {
    protected faDiagramProject = faDiagramProject;

    protected faGlobe = faGlobe;

    protected faDisplay = faDisplay;

    protected faSitemap = faSitemap;

    protected faListCheck = faListCheck;

    protected Section = Section;

    /**
     * Color codes for the 5 card items.
     */
    protected cardColors: string[] = [];

    protected references: Record<string, ReferenceDescriptor[]> = {
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
                text: 'A nopCommerce site with a CAD-based general product configurator'
            }
        ],
        [Section.UIUX]: [
            {
                url: 'http://fagyivarazs.hu/',
                icon: faIceCream,
                text: 'A mobile-first UI design for an ice cream and pastry shop'
            }
        ],
        [Section.INFRASTRUCTURE]: [
            {
                url: '',
                icon: faLinux,
                text: 'Linux as a programming language: a case study (coming soon)'
            }
        ]
    }

    ngOnInit() {
        // Generate random card colors from a set.
        const random = randomizer(['rgb(101 163 13)', 'rgb(79 70 229)', 'rgb(8 145 178)', 'rgb(13 148 136)', 'rgb(202 138 4)']);
        for (let i = 0; i < 5; ++i) {
            this.cardColors.push(random.next().value!);
        }
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
