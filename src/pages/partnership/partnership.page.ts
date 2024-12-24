import { Component, signal } from '@angular/core';
import { JigsawPuzzleComponent } from '@/components/jigsaw-puzzle/jigsaw-puzzle.component';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from '@/components/timeline/timeline/timeline.component';
import { TimelineItemComponent } from '@/components/timeline/timeline-item/timeline-item.component';
import { faCode, faFileContract, faFileLines, faLightbulb, faMagnifyingGlassChart, faMoneyBillWaveAlt, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';

/**
 * Main content of the partnership page.
 */
@Component({
    selector: 'partnership-page',
    imports: [CommonModule, JigsawPuzzleComponent, TimelineComponent, TimelineItemComponent, FontAwesomeModule],
    templateUrl: './partnership.page.html',
    styleUrl: './partnership.page.css'
})
export class PartnershipPage {
    //#region Font awesome icons
    protected readonly faLightbulb = signal(faLightbulb);

    protected readonly faFileLines = signal(faFileLines);

    protected readonly faCode = signal(faCode);

    protected readonly faSitemap = signal(faSitemap);

    protected readonly faMagnifyingGlassChart = signal(faMagnifyingGlassChart);

    protected readonly faHandshake = signal(faHandshake);

    protected readonly faFileContract = signal(faFileContract);

    protected readonly faMoneyBillWave = signal(faMoneyBillWaveAlt);
    //#endregion

    /**
     * The page puzzle has been completed.
     */
    protected puzzleComplete = signal(false);

    /**
     * Marks the puzzle as completed.
     */
    protected completePuzzle(): void {
        this.puzzleComplete.set(true);
    }
}
