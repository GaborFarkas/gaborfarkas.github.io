import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnDestroy, ViewChild } from '@angular/core';
import { Orientation, ReferenceComponent } from '@/components/reference/reference.component';
import { RangePipe } from '@/pipes/range.pipe';
import { ReferenceDescriptor } from '@/models/reference.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/**
 * A column with reponsive edge decorations on each side. The decorations are hard-coded hexagons on this site.
 */
@Component({
    selector: 'div.col-decorated',
    standalone: true,
    imports: [CommonModule, ReferenceComponent, RangePipe, FontAwesomeModule],
    templateUrl: './decorated-column.component.html',
    styleUrl: './decorated-column.component.css'
})
export class DecoratedColumnComponent implements AfterViewInit, OnDestroy {
    /**
     * The width of the pattern on a single side in elements.
     */
    protected decorationRows = 0;

    /**
     * The height of the pattern on a single side in elements.
     */
    protected decorationColumns = 0;

    /**
     * The observer instance triggering resize events on the content container.
     */
    private resizeObserver?: ResizeObserver;

    /**
     * The left-column decorator references indexed by decorator row numbers.
     */
    protected leftColRefs: Record<number, ReferenceDescriptor> = {};

    /**
     * The right-column decorator references indexed by decorator row numbers.
     */
    protected rightColRefs: Record<number, ReferenceDescriptor> = {};

    /**
     * Possible orientations for the references' flyout text.
     */
    protected Orientation = Orientation;

    /**
     * References to hide in the decoration.
     */
    @Input() set references(val: ReferenceDescriptor[]) {
        // Break up references to columns as soon as they are set.
        const leftColRefs: Record<number, ReferenceDescriptor> = {};
        const rightColRefs: Record<number, ReferenceDescriptor> = {};
        let left = true;
        let row = 1;

        for (const ref of val) {
            (left ? leftColRefs : rightColRefs)[row] = ref;
            if (!left) {
                row += 2;
            }
            left = !left;
        }

        this.leftColRefs = leftColRefs;
        this.rightColRefs = rightColRefs;
    }

    /**
     * The class of the container element.
     */
    @HostBinding('class') protected class = 'w-full flex justify-between';

    /**
     * The content container's element.
     */
    @ViewChild('content') private contentElem?: ElementRef<HTMLDivElement>;

    /**
     * Event listener adjusting the number of drawable hexagons when the content container's size changes.
     */
    onResize() {
        if (this.contentElem?.nativeElement?.parentElement) {
            const decorWidth = Math.floor((this.contentElem.nativeElement.parentElement.clientWidth -
                this.contentElem.nativeElement.clientWidth) / 2);
            // Get the pixel size of the hexagon.
            const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const hexaSize = 3.75 * rem;

            this.decorationColumns = Math.floor(decorWidth / (hexaSize + 0.5 * rem));
            this.decorationRows = Math.floor(this.contentElem.nativeElement.clientHeight / hexaSize);
        }
    }

    ngAfterViewInit(): void {
        if (this.contentElem?.nativeElement) {
            // Dispatch a resize event when the container's size changes.
            this.resizeObserver = new ResizeObserver(() =>
                this.contentElem?.nativeElement.dispatchEvent(new Event('resize')));
            this.resizeObserver.observe(this.contentElem.nativeElement);
        }
    }

    ngOnDestroy(): void {
        if (this.resizeObserver) {
            // Clean up observer.
            this.resizeObserver.disconnect();
            this.resizeObserver = undefined;
        }
    }
}
