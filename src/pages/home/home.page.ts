import { Component, QueryList, ViewChildren } from '@angular/core';
import { CarouselComponent } from '@/components/carousel/carousel.component';
import { HeroSceneComponent } from '@/components/hero-scene/hero-scene.component';
import { Hero, HeroScene } from '@/models/hero.model';
import { CarouselChangeEvent } from '@/models/carousel-change-event.model';
import { HeroSectionComponent } from '@/components/hero-section/hero-section.component';
import { faCircleNodes, faDiagramProject, faFileLines, faLaptopCode, faLayerGroup, faMap, faTree } from '@fortawesome/free-solid-svg-icons';
import { ReferenceDescriptor } from '@/models/reference.model';
import { HeroSection } from '@/models/home.model';
import { faGitAlt } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';
import { PageUrlMapping, StoryUrlMapping } from '@/models/page-url-mapping.model';

/**
 * Main content of the home (landing) page.
 */
@Component({
    selector: 'home-page',
    templateUrl: './home.page.html',
    imports: [CommonModule, CarouselComponent, HeroSceneComponent, HeroSectionComponent],
    styleUrl: './home.page.css'
})
export class HomePage {
    /**
     * Available hero scenes.
     */
    protected HeroScene = HeroScene;

    /**
     * The file name of the hero's image.
     */
    protected heroImg: string;

    /**
     * Available hero sections.
     */
    protected HeroSection = HeroSection;

    /**
     * Page URLs.
     */
    protected PageUrlMapping = PageUrlMapping;

    /**
     * References for the hero sections.
     */
    protected references: Record<string, [ReferenceDescriptor|null, ReferenceDescriptor|null, ReferenceDescriptor|null]> = {
        [HeroSection.PLANNING]: [
            {
                url: 'https://c4model.com/',
                text: 'Quality work needs quality tools',
                icon: faDiagramProject
            },
            null,
            {
                url: '',
                text: 'A case study on project documentation (coming soon)',
                icon: faFileLines
            }
        ],
        [HeroSection.SPATIAL]: [
            {
                url: '#footer',
                text: 'Take a closer look at the footer map',
                icon: faMap
            },
            {
                url: 'https://www.ddnp.hu/igazgatosag/terkep/terkep',
                text: 'A small multilingual map for a national park',
                icon: faTree
            },
            {
                url: '',
                text: 'A case study on spatial technologies (coming soon)',
                icon: faLayerGroup
            }
        ],
        [HeroSection.SCIENCE]: [
            null,
            {
                url: '',
                text: 'Want to see my main research topic? (coming soon)',
                icon: faCircleNodes
            },
            null
        ],
        [HeroSection.TEACHING]: [
            {
                url: `/${PageUrlMapping.INSIGHTS}/${StoryUrlMapping.WEBPROG2}`,
                text: 'Take a look into a Web Programming II. class',
                icon: faLaptopCode
            },
            null,
            {
                url: `/${PageUrlMapping.INSIGHTS}/${StoryUrlMapping.SWDEVTECH}`,
                text: 'Take a look into a Software Development Technologies class',
                icon: faGitAlt
            }
        ]
    }

    /**
     * The hero scenes inside the home page.
     */
    @ViewChildren(HeroSceneComponent) private heroScenes?: QueryList<HeroSceneComponent>;

    constructor() {
        this.heroImg = localStorage.getItem('hero') || Hero.MALE;
    }

    /**
     * Toggles the hero image used in the hero animations.
     */
    protected toggleHero() {
        this.heroImg = this.heroImg === Hero.MALE ? Hero.FEMALE : Hero.MALE;
        localStorage.setItem('hero', this.heroImg);
    }

    /**
     * Resets the hero animations belonging to a single slide.
     * @param evt The carousel event object.
     */
    protected resetSlideAnimations(evt: CarouselChangeEvent) {
        if (this.heroScenes) {
            for (const heroScene of this.heroScenes) {
                if (heroScene.sceneContainer && evt.slide?.contains(heroScene.sceneContainer.nativeElement)) {
                    heroScene.restart();
                }
            }
        }
    }
}
