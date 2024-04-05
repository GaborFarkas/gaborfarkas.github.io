import { Component } from '@angular/core';
import { JigsawPuzzleComponent } from '../../components/jigsaw-puzzle/jigsaw-puzzle.component';
import { CommonModule } from '@angular/common';

/**
 * Main content of the partnership page.
 */
@Component({
    selector: 'partnership-page',
    standalone: true,
    imports: [CommonModule, JigsawPuzzleComponent],
    templateUrl: './partnership.page.html',
    styleUrl: './partnership.page.css'
})
export class PartnershipPage {
    /**
     * The page puzzle has been completed.
     */
    protected puzzleComplete: boolean = false;

    /**
     * Marks the puzzle as completed.
     */
    protected completePuzzle(): void {
        this.puzzleComplete = true;
    }
}
