import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangePipe } from '../../pipes/range.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

/**
 * Generic carousel component.
 */
@Component({
    selector: 'div.carousel',
    standalone: true,
    imports: [CommonModule, RangePipe, FontAwesomeModule],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css'
})
export class CarouselComponent {
    protected angleLeft: IconDefinition = faAngleLeft;

    protected angleRight: IconDefinition = faAngleRight;

    /**
     * Gets or sets the number of slides in this carousel.
     */
    protected numSlides: number = 0;

    /**
     * Gets or sets the current slide of this carousel.
     */
    protected currSlide: number = 0;

    /**
     * The key for the automatic slide switch interval.
     */
    private autoSlideIntervalKey?: number;

    /**
     * Show page switcher buttons on the left and right sides of the carousel.
     */
    @Input() pageSwitcher: boolean = true;

    /**
     * Automatically start the carousel
     */
    @Input() autoStart: boolean = true;

    /**
     * The time between switching slides in milliseconds. Backing field.
     */
    private _autoSlideInterval: number = 0;

    /**
     * The time between switching slides in milliseconds.
     */
    get autoSlideInterval(): number {
        return this._autoSlideInterval;
    }

    /**
     * The time between switching slides in milliseconds.
     */
    @Input() set autoSlideInterval(val: number) {
        if (val !== this._autoSlideInterval) {
            if (this.autoSlideIntervalKey) {
                clearInterval(this.autoSlideIntervalKey);
                this.autoSlideIntervalKey = undefined;
            }

            if (val > 0) {
                this.autoSlideIntervalKey = setInterval(function (this: CarouselComponent) {
                    if (this.currSlide < this.numSlides - 1) {
                        this.nextSlide();
                    } else {
                        this.navigateSlide(0);
                    }
                }.bind(this), val) as unknown as number;
            }

            this._autoSlideInterval = val;
        }
    }

    /**
     * Gets the element reference of the carousel's container div.
     */
    @ViewChild('carousel') private carouselElem?: ElementRef<HTMLDivElement>;

    ngAfterViewInit() {
        const carouselDomElem = this.carouselElem?.nativeElement;
        if (carouselDomElem) {
            setTimeout(function (this: CarouselComponent) {
                this.numSlides = carouselDomElem.children.length
            }.bind(this), 0);

            for (let i = 0; i < carouselDomElem.children.length; ++i) {
                carouselDomElem.children[i].classList.add('carousel-slide');
            }
        }
    }

    /**
     * Goes to the next slide.
     */
    nextSlide() {
        if (this.currSlide < this.numSlides - 1) {
            this.currSlide++;
        }
    }

    /**
     * Goes to the previous slide.
     */
    previousSlide() {
        if (this.currSlide > 0) {
            this.currSlide--;
        }
    }

    /**
     * Navigates to an exact slide by its index.
     * @param index The slide's index.
     */
    navigateSlide(index: number) {
        if (index >= 0 && index < this.numSlides - 1) {
            this.currSlide = index;
        }
    }
}
