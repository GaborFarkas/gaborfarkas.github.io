import { Component, Input } from '@angular/core';
import { randomizer } from '@/utils/array';
import { AttributedPicture } from '@/models/attributed-picture.model';
import { CommonModule } from '@angular/common';

/**
 * Custom 404 component insertable into any context.
 */
@Component({
    selector: 'not-found',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
    /**
     * The description text.
     */
    @Input() text = '';

    /**
     * Possible notfound images to choose one from randomly.
     */
    private images: AttributedPicture[] = [
        {
            url: 'assets/notfound-1.png',
            attributionUrl: 'http://www.freepik.com',
            attributionText: 'Image by macrovector_official on Freepik'
        },
        {
            url: 'assets/notfound-2.png',
            attributionUrl: 'http://www.freepik.com',
            attributionText: 'Image by pch.vector on Freepik'
        }
    ];

    /**
     * The notfound image.
     */
    protected image: AttributedPicture;

    constructor() {
        const random = randomizer(this.images);
        this.image = random.next().value!;
    }
}
