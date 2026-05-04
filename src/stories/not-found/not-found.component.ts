import { Component, computed, input } from '@angular/core';
import { randomizer } from '@/utils/array';
import { AttributedPicture } from '@/models/attributed-picture.model';
import { CommonModule } from '@angular/common';

/**
 * Custom 404 component insertable into any context.
 */
@Component({
    selector: 'not-found',
    imports: [CommonModule],
    templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
    /**
     * The description text.
     */
    public text = input('');

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
    protected image = computed(() => {
        const random = randomizer(this.images);
        return random.next().value!;
    });
}
