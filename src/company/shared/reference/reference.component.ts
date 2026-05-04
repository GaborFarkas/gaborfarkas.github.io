import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

/**
 * A reference hexagon holding a short description and a link.
 */
@Component({
    selector: 'p.reference',
    imports: [CommonModule],
    templateUrl: './reference.component.html',
    styleUrl: './reference.component.css',
    host: {
        'class': 'relative overflow-hidden hover:overflow-visible'
    }
})
export class ReferenceComponent {
    /**
     * Orientation of the flyout text from the original hexagon.
     */
    public flyoutOrientation = input(Orientation.RIGHT);

    /**
     * The text content of the flyout hexagon.
     */
    public flyoutText = input<string>();

    /**
     * Flip the flyout text vertically. Useful if the text is upside down.
     */
    public flyoutFlip = input(false);

    /**
     * The URL this reference is referring to.
     */
    public url = input<string>();
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
