import { AfterViewInit, Component, ElementRef, input, Input, OnDestroy, output, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { CarouselChangeEvent } from '@/models/carousel-change-event.model';

/**
 * Generic carousel component.
 */
@Component({
    selector: 'div.carousel',
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnDestroy, AfterViewInit {
    /**
     * Left nav button icon.
     */
    protected readonly angleLeft = signal(faAngleLeft).asReadonly();

    /**
     * Right nav button icon.
     */
    protected readonly angleRight = signal(faAngleRight).asReadonly();

    /**
     * Gets or sets the number of slides in this carousel.
     */
    protected numSlides = signal(0);

    /**
     * Gets or sets the current slide of this carousel. Backing field.
     */
    protected currSlide = signal(0);

    /**
     * The key for the automatic slide switch interval.
     */
    private autoSlideIntervalKey?: number;

    /**
     * Show page switcher buttons on the left and right sides of the carousel.
     */
    public pageSwitcher = input(true);

    /**
     * The time between switching slides in milliseconds. Backing field.
     */
    private _autoSlideInterval = 0;

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
                    if (this.currSlide() < this.numSlides() - 1) {
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
    private carouselElem = viewChild.required<ElementRef<HTMLDivElement>>('carousel');

    /**
     * Timeout index for hiding invisible slides after a transition so animations can reset.
     */
    private hideSlideTimeout?: number;

    /**
     * Triggered before a slide change occurs. Passes the slide's index and DOM element.
     */
    public slideChange = output<CarouselChangeEvent>();

    ngOnDestroy(): void {
        if (this.autoSlideIntervalKey) {
            clearInterval(this.autoSlideIntervalKey);
        }
    }

    ngAfterViewInit() {
        const carouselDomElem = this.carouselElem().nativeElement;
        if (carouselDomElem) {
            setTimeout(function (this: CarouselComponent) {
                this.numSlides.set(carouselDomElem.children.length);
            }.bind(this), 0);

            const slides: Element[] = [...carouselDomElem.children];

            for (const slide of slides) {
                const containerElem = document.createElement('div');
                containerElem.className = 'carousel-slide';
                containerElem.appendChild(slide);
                carouselDomElem.appendChild(containerElem);
            }
        }
    }

    /**
     * Goes to the next slide.
     */
    nextSlide() {
        if (this.currSlide() < this.numSlides() - 1) {
            this.navigateSlide(this.currSlide() + 1);
        }
    }

    /**
     * Goes to the previous slide.
     */
    previousSlide() {
        if (this.currSlide() > 0) {
            this.navigateSlide(this.currSlide() - 1);
        }
    }

    /**
     * Navigates to an exact slide by its index.
     * @param index The slide's index.
     */
    navigateSlide(index: number) {
        if (index >= 0 && index < this.numSlides()) {
            if (index !== this.currSlide()) {
                // Make the navigated slide appear visually before scrolling to it.
                const slideElem = this.carouselElem().nativeElement.children[index];
                if (slideElem?.firstChild instanceof HTMLElement) {
                    slideElem.firstChild.style.display = '';
                }

                this.slideChange.emit({
                    index: index,
                    slide: slideElem
                });

                this.currSlide.set(index);
            }
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
            for (let i = 0; i < this.carouselElem().nativeElement.children.length; ++i) {
                const slideElem = this.carouselElem().nativeElement.children[i];
                if (i !== index && slideElem.firstChild && slideElem.firstChild instanceof HTMLElement) {
                    slideElem.firstChild.style.display = 'none';
                }
            }
            this.hideSlideTimeout = undefined;
        }.bind(this), 500) as unknown as number;
    }
}
