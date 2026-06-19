import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Main content of the publications page.
 */
@Component({
    selector: 'publications-page',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './publications.page.html'
})
export class PublicationsPage { }
