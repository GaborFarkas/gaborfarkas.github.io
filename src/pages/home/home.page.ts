import { Component, QueryList, ViewChildren } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { HeroSceneComponent } from '../../components/hero-scene/hero-scene.component';
import { Hero, HeroScene } from '../../models/hero.model';
import { CarouselChangeEvent } from '../../models/carousel-change-event.model';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { faDiagramProject, faFileLines, faMap } from '@fortawesome/free-solid-svg-icons';
import { ReferenceDescriptor } from '../../models/reference.model';
import { HeroSection } from '../../models/home.model';

/**
 * Main content of the home (landing) page.
 */
@Component({
    selector: 'home-page',
    standalone: true,
    templateUrl: './home.page.html',
    imports: [CarouselComponent, HeroSceneComponent, HeroSectionComponent],
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
                text: 'A case study on project documentation',
                icon: faFileLines
            }
        ],
        [HeroSection.SPATIAL]: [
            {
                url: '#footer',
                text: 'Take a closer look at the footer map',
                icon: faMap
            },
            null,
            null
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
            for (let heroScene of this.heroScenes) {
                if (heroScene.sceneContainer && evt.slide?.contains(heroScene.sceneContainer.nativeElement)) {
                    heroScene.restart();
                }
            }
        }
    }
}
