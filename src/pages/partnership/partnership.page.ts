import { Component } from '@angular/core';
import { JigsawPuzzleComponent } from '../../components/jigsaw-puzzle/jigsaw-puzzle.component';

/**
 * Main content of the partnership page.
 */
@Component({
    selector: 'partnership-page',
    standalone: true,
    imports: [JigsawPuzzleComponent],
    templateUrl: './partnership.page.html'
})
export class PartnershipPage {
}
