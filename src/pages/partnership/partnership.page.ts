import { Component } from '@angular/core';
import { JigsawPuzzleComponent } from '../../components/jigsaw-puzzle/jigsaw-puzzle.component';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from '../../components/timeline/timeline/timeline.component';
import { TimelineItemComponent } from '../../components/timeline/timeline-item/timeline-item.component';
import { faCode, faFileContract, faFileLines, faLightbulb, faMagnifyingGlassChart, faMoneyBillWaveAlt, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { Meta } from '@angular/platform-browser';

/**
 * Main content of the partnership page.
 */
@Component({
    selector: 'partnership-page',
    standalone: true,
    imports: [CommonModule, JigsawPuzzleComponent, TimelineComponent, TimelineItemComponent, FontAwesomeModule],
    templateUrl: './partnership.page.html',
    styleUrl: './partnership.page.css'
})
export class PartnershipPage {
    //#region Font awesome icons
    protected faLightbulb = faLightbulb;

    protected faFileLines = faFileLines;

    protected faCode = faCode;

    protected faSitemap = faSitemap;

    protected faMagnifyingGlassChart = faMagnifyingGlassChart;

    protected faHandshake = faHandshake;

    protected faFileContract = faFileContract;

    protected faMoneyBillWave = faMoneyBillWaveAlt;
    //#endregion

    constructor(private meta: Meta) {
        this.meta.updateTag({ property: 'og:description', content: 'As the leader of a high-tech SME, you are on the verge of joining the big leagues. You realize the competencies your company will need to scale and wonder how you should build your team up. Let me help you make this process as pleasant as it can be.' });
    }

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
