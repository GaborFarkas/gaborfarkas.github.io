import { Component, signal, viewChildren, WritableSignal } from '@angular/core';
import { CarouselComponent } from '@/layout/widgets/carousel/carousel.component';
import { HeroSceneComponent } from '@/company/landing/hero-scene/hero-scene.component';
import { Hero, HeroScene, HeroSection } from '@/company/landing/hero.model';
import { CarouselChangeEvent } from '@/layout/widgets/carousel/carousel-change-event.model';
import { HeroSectionComponent } from '@/company/landing/hero-section/hero-section.component';
import { faCircleNodes, faDiagramProject, faFileLines, faLaptopCode, faLayerGroup, faMap, faTree, faSection } from '@fortawesome/free-solid-svg-icons';
import { ReferenceDescriptor } from '@/company/hexagon/reference.model';
import { faGitAlt } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';
import { PageUrlMapping, StoryUrlMapping } from '@/app/page-url-mapping.model';

/**
 * Main content of the home (landing) page.
 */
@Component({
    selector: 'landing-page',
    templateUrl: './landing.page.html',
    imports: [CommonModule, CarouselComponent, HeroSceneComponent, HeroSectionComponent],
    styleUrl: './landing.page.css'
})
export class LandingPage {
    /**
     * Available hero scenes.
     */
    protected readonly HeroScene = signal(HeroScene).asReadonly();

    /**
     * The file name of the hero's image.
     */
    protected heroImg: WritableSignal<string>;

    /**
     * Available hero sections.
     */
    protected readonly HeroSection = signal(HeroSection).asReadonly();

    /**
     * Page URLs.
     */
    protected readonly PageUrlMapping = signal(PageUrlMapping).asReadonly();

    /**
     * References for the hero sections.
     */
    protected readonly references = signal<Record<string, [ReferenceDescriptor | null, ReferenceDescriptor | null, ReferenceDescriptor | null]>>({
        [HeroSection.PLANNING]: [
            {
                url: 'https://c4model.com/',
                text: 'Quality work needs quality tools',
                icon: faDiagramProject
            },
            {
                url: `/${PageUrlMapping.INSIGHTS}/${StoryUrlMapping.GDPR}`,
                text: 'Complying with laws and regulations',
                icon: faSection
            },
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
    }).asReadonly();

    /**
     * The hero scenes inside the home page.
     */
    private heroScenes = viewChildren(HeroSceneComponent);

    constructor() {
        this.heroImg = signal(localStorage.getItem('hero') || Hero.MALE);
    }

    /**
     * Toggles the hero image used in the hero animations.
     */
    protected toggleHero() {
        this.heroImg.update(value => value === Hero.MALE ? Hero.FEMALE : Hero.MALE);
        localStorage.setItem('hero', this.heroImg());
    }

    /**
     * Resets the hero animations belonging to a single slide.
     * @param evt The carousel event object.
     */
    protected resetSlideAnimations(evt: CarouselChangeEvent) {
        if (this.heroScenes().length) {
            for (const heroScene of this.heroScenes()) {
                if (heroScene.sceneContainer() && evt.slide?.contains(heroScene.sceneContainer().nativeElement)) {
                    heroScene.restart();
                }
            }
        }
    }
}
