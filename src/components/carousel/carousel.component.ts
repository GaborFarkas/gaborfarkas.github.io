import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangePipe } from '../../pipes/range.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { CarouselChangeEvent } from '../../models/carousel-change-event.model';

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
export class CarouselComponent implements OnDestroy, AfterViewInit {
    /**
     * Left nav button icon.
     */
    protected angleLeft: IconDefinition = faAngleLeft;

    /**
     * Right nav button icon.
     */
    protected angleRight: IconDefinition = faAngleRight;

    /**
     * Gets or sets the number of slides in this carousel.
     */
    protected numSlides: number = 0;

    /**
     * Gets or sets the current slide of this carousel. Backing field.
     */
    private _currSlide: number = 0;

    /**
     * Gets or sets the current slide of this carousel.
     */
    protected get currSlide(): number {
        return this._currSlide;
    }

    /**
     * Gets or sets the current slide of this carousel.
     */
    protected set currSlide(index: number) {
        if (index !== this._currSlide) {
            // Make the navigated slide appear visually before scrolling to it.
            const slideElem = this.carouselElem?.nativeElement.children[index];
            if (slideElem?.firstChild instanceof HTMLElement) {
                slideElem.firstChild.style.display = '';
            }

            this.slideChange.emit({
                index: index,
                slide: slideElem
            });

            this._currSlide = index;
        }
    }

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

    /**
     * Timeout index for hiding invisible slides after a transition so animations can reset.
     */
    private hideSlideTimeout?: number;

    /**
     * Triggered before a slide change occurs. Passes the slide's index and DOM element.
     */
    @Output() slideChange: EventEmitter<CarouselChangeEvent> = new EventEmitter();

    ngOnDestroy(): void {
        if (this.autoSlideIntervalKey) {
            clearInterval(this.autoSlideIntervalKey);
        }
    }

    ngAfterViewInit() {
        const carouselDomElem = this.carouselElem?.nativeElement;
        if (carouselDomElem) {
            setTimeout(function (this: CarouselComponent) {
                this.numSlides = carouselDomElem.children.length;
            }.bind(this), 0);

            const slides: Element[] = [...carouselDomElem.children];

            for (let i = 0; i < slides.length; ++i) {
                const containerElem = document.createElement('div');
                containerElem.className = 'carousel-slide';
                containerElem.appendChild(slides[i]);
                carouselDomElem.appendChild(containerElem);
            }
        }
    }

    /**
     * Goes to the next slide.
     */
    nextSlide() {
        if (this.currSlide < this.numSlides - 1) {
            this.currSlide++;
            this.hideSlides(this.currSlide);
        }
    }

    /**
     * Goes to the previous slide.
     */
    previousSlide() {
        if (this.currSlide > 0) {
            this.currSlide--;
            this.hideSlides(this.currSlide);
        }
    }

    /**
     * Navigates to an exact slide by its index.
     * @param index The slide's index.
     */
    navigateSlide(index: number) {
        if (index >= 0 && index < this.numSlides - 1) {
            this.currSlide = index;
            this.hideSlides(index);
        }
    }

    /**
     * Hides every slide exluding the currently visible after the slide transition animation.
     * @param index The current slide's index.
     */
    private hideSlides(index: number) {
        if (this.hideSlideTimeout) {
            clearTimeout(this.hideSlideTimeout);
            this.hideSlideTimeout = undefined;
        }

        // Hide every other slide to reset their animations when they appear next time.
        this.hideSlideTimeout = setTimeout(function (this: CarouselComponent) {
            if (this.carouselElem?.nativeElement) {
                for (let i = 0; i < this.carouselElem.nativeElement.children.length; ++i) {
                    const slideElem = this.carouselElem.nativeElement.children[i];
                    if (i !== index && slideElem.firstChild && slideElem.firstChild instanceof HTMLElement) {
                        slideElem.firstChild.style.display = 'none';
                    }
                }
            }
            this.hideSlideTimeout = undefined;
        }.bind(this), 500) as unknown as number;
    }
}
