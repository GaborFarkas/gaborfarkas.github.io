import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * A reference hexagon holding a short description and a link.
 */
@Component({
    selector: 'p.reference',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './reference.component.html',
    styleUrl: './reference.component.css'
})
export class ReferenceComponent {
    /**
     * Orientation of the flyout text from the original hexagon.
     */
    @Input() flyoutOrientation: Orientation = Orientation.RIGHT;

    /**
     * The text content of the flyout hexagon.
     */
    @Input() flyoutText?: string;

    /**
     * Flip the flyout text vertically. Useful if the text is upside down.
     */
    @Input() flyoutFlip: boolean = false;

    /**
     * The URL this reference is referring to.
     */
    @Input() url?: string = '';
}

/**
 * Possible orientations between adjacent pointy-up hexagons.
 */
export enum Orientation {
    RIGHT = 'orient-right',
    TOPRIGHT = 'orient-top-right',
    TOPLEFT = 'orient-top-left',
    LEFT = 'orient-left',
    BOTTOMRIGHT = 'orient-bottom-right',
    BOTTOMLEFT = 'orient-bottom-left'
}
