import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PuzzlePiece, generatePuzzle } from '@/models/puzzle.model';
import { CommonModule } from '@angular/common';

/**
 * An SVG-based jigsaw puzzle game as a component.
 */
@Component({
    selector: 'div.jigsaw',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './jigsaw-puzzle.component.html'
})
export class JigsawPuzzleComponent implements OnInit, AfterViewInit {
    /**
     * The puzzle pieces.
     */
    protected puzzlePieces: PuzzlePiece[] = [];

    /**
     * Total width of the puzzle.
     */
    protected width = 0;

    /**
     * Total height of the puzzle.
     */
    protected height = 0;

    /**
     * Gets the width of a single puzzle piece.
     */
    protected get puzzleWidth(): number {
        return this.width / this.columns;
    }

    /**
     * Gets the height of a single puzzle piece.
     */
    protected get puzzleHeight(): number {
        return this.height / this.rows;
    }

    /**
     * Gets or sets if the board has been initialized.
     * Used for avoiding a race condition between loading the ref image and initializing the view.
     */
    private initialized = false;

    /**
     * The currently dragged item.
     */
    private draggedItem?: SVGPathElement;

    /**
     * The offset between the dragged item's origin and the drag point.
     */
    private dragOffset: [number, number] = [0, 0];

    /**
     * The URL of the puzzle's picture.
     */
    @Input({ required: true }) image!: string;

    /**
     * Number of columns in the puzzle.
     */
    @Input() columns = 0;

    /**
     * Number of rows in the puzzle
     */
    @Input() rows = 0;

    /**
     * Indices of the fixed puzzle pieces (glued to their correct position).
     */
    @Input() fixedPieces: number[] = [];

    /**
     * Gets the element reference of the puzzle board SVG.
     */
    @ViewChild('svg') svg?: ElementRef<SVGSVGElement>;

    /**
     * Fired when the puzzle is solved.
     */
    @Output() completed = new EventEmitter();

    ngOnInit(): void {
        // Generate puzzle pieces and fix down the necessary ones.
        this.puzzlePieces = [...generatePuzzle(this.columns, this.rows, 3)];
        this.puzzlePieces.forEach((value, index) => {
            if (this.fixedPieces.includes(index)) {
                value.locked = true;
            }
        });

        // Preload the background image to get its dimensions for the SVG CRS.
        const image = new Image();
        image.src = this.image;
        image.onload = function (this: JigsawPuzzleComponent) {
            this.width = image.width;
            this.height = image.height;

            if (!this.initialized) {
                this.initializePuzzle();
            }
        }.bind(this);
    }

    ngAfterViewInit(): void {
        if (!this.initialized) {
            this.initializePuzzle();
        }
    }

    /**
     * Event listener for initializing the drag of a single puzzle piece.
     * @param evt The pointer event.
     */
    protected onDragStart(evt: MouseEvent | TouchEvent) {
        if (this.svg?.nativeElement && !this.draggedItem && evt.target instanceof SVGPathElement) {
            // Get the corresponding puzzle piece to check if it's already locked.
            if (!this.puzzlePieces.find(piece => piece.dom === evt.target)?.locked) {
                // Store the puzzle element and the offset.
                this.draggedItem = evt.target;
                // Move the piece to top of the DOM.
                this.draggedItem.parentElement?.appendChild(this.draggedItem);
                // Offset is the difference between the elem's origin (top-left) and the click position.
                // Start with the click position.
                this.dragOffset = this.getSvgPointerCoordinates(evt);
                // Extract the origin from the elem's transformation matrix and calculate the difference.
                // NOTE: this only works if the elem has a transform property set. In our case, this is guaranteed.
                const translate = this.draggedItem.transform.baseVal.getItem(0);
                this.dragOffset[0] -= translate.matrix.e;
                this.dragOffset[1] -= translate.matrix.f;
            }
        }
    }

    /**
     * Event listener for moving a selected puzzle piece on the board.
     * @param evt The pointer event.
     */
    protected onDragMove(evt: MouseEvent | TouchEvent) {
        if (this.draggedItem) {
            evt.preventDefault();
            const svgCoords = this.getSvgPointerCoordinates(evt);
            // Constrain the coordinates to the board area.
            svgCoords[0] = Math.max(Math.min(svgCoords[0] - this.dragOffset[0], this.width), 0);
            svgCoords[1] = Math.max(Math.min(svgCoords[1] - this.dragOffset[1], this.height), 0);
            // Set the elem's origin by offsetting with the calculated offset.
            this.draggedItem.setAttributeNS(null, 'transform', `translate(${svgCoords[0]} ${svgCoords[1]})`);
        }
    }

    /**
     * Event listener for releasing a puzzle piece.
     */
    protected onDragEnd() {
        if (this.svg && this.draggedItem) {
            // Calculate the correct position of the dragged piece on the board.
            const piece = this.puzzlePieces.find(piece => piece.dom === this.draggedItem);
            if (piece) {
                const centerPos = [piece.column * this.puzzleWidth + this.puzzleWidth / 2, piece.row * this.puzzleHeight + this.puzzleHeight / 2];

                // Get its current position.
                const translate = this.draggedItem.transform.baseVal.getItem(0);
                const currPos = [translate.matrix.e, translate.matrix.f];

                // If the item is approximately in the right position, fix it down.
                if ((this.width - Math.abs(centerPos[0] - currPos[0])) / this.width > 0.95 && (this.height - Math.abs(centerPos[1] - currPos[1])) / this.height > 0.95) {
                    this.draggedItem.setAttributeNS(null, 'transform', `translate(${centerPos[0]} ${centerPos[1]})`);
                    piece.locked = true;

                    const firstPuzzleSvg = this.svg.nativeElement.querySelector('path');
                    if (firstPuzzleSvg) {
                        this.svg.nativeElement.insertBefore(this.draggedItem, firstPuzzleSvg);
                    }

                    if (this.puzzlePieces.every(piece => piece.locked)) {
                        this.completed.emit();
                    }
                }

                this.draggedItem = undefined;
                this.dragOffset = [0, 0];
            }
        }
    }

    /**
     * Sets an initial transform value for every puzzle piece on the board.
     */
    private initializePuzzle(): void {
        if (this.width && this.height && this.svg?.nativeElement) {
            this.initialized = true;
            // Get all path elements
            const pieceSvgs = this.svg.nativeElement.querySelectorAll('path');
            for (let i = 0; i < pieceSvgs.length; ++i) {
                // Find the associated puzzle piece (currently they are in the same order).
                const piece = this.puzzlePieces[i];

                // Generate shape
                pieceSvgs[i].setAttributeNS(null, 'd', this.generatePath(piece));

                // Set initial position.
                pieceSvgs[i].setAttributeNS(null, 'transform', `translate(${piece.locked ?
                    piece.column * this.puzzleWidth + this.puzzleWidth / 2 :
                    this.getRandomCoordinates(this.width, 0.3)} ${piece.locked ?
                        piece.row * this.puzzleHeight + this.puzzleHeight / 2 :
                        this.getRandomCoordinates(this.height, 0.3)})`);
                // Store association for later.
                piece.dom = pieceSvgs[i];
            }

            // Move every fixed element to the bottom of the DOM.
            for (const piece of this.puzzlePieces) {
                if (piece.locked && piece.dom) {
                    const firstPuzzleSvg = this.svg.nativeElement.querySelector('path');
                    if (firstPuzzleSvg) {
                        this.svg.nativeElement.insertBefore(piece.dom, firstPuzzleSvg);
                    }
                }
            }
        }
    }

    /**
     * Calculates a random ordinate in a constrained SVG coordinate system's single axis.
     * @param dimension The total length of the SVG CRS axis.
     * @param bufferRatio The constraint ratio.
     * @returns A random ordinate.
     */
    private getRandomCoordinates(dimension: number, bufferRatio: number): number {
        return Math.round(Math.random() * (dimension - dimension * bufferRatio * 2) + dimension * bufferRatio);
    }

    /**
     * Returns the pointer coordinates of a browser event in the SVG's coordinate system.
     * @param event The original browser event.
     * @returns The [x, y] pointer coordinates in SVG CRS. On any error, the browser coordinates are returned.
     */
    private getSvgPointerCoordinates(event: MouseEvent | TouchEvent): [number, number] {
        const x = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
        const y = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
        if (this.svg?.nativeElement) {
            const ctm = this.svg.nativeElement.getScreenCTM();
            if (ctm) {
                return [(x - ctm.e) / ctm.a, (y - ctm.f) / ctm.d];
            }
        }

        return [x, y];
    }

    /**
     * Generates an SVG path element's d attribute for a puzzle piece.
     * @param puzzle The puzzle piece.
     * @returns The d attribute.
     */
    private generatePath(puzzle: PuzzlePiece): string {
        return `M0 0 ${this.generateEdge(puzzle.topEdge, this.puzzleWidth, Direction.RIGHT)} ${this.generateEdge(puzzle.rightEdge, this.puzzleHeight, Direction.DOWN)} ${this.generateEdge(puzzle.bottomEdge, this.puzzleWidth, Direction.LEFT)} ${this.generateEdge(puzzle.leftEdge, this.puzzleHeight, Direction.UP)}`;
    }

    /**
     * Generates an SVG path element's d attribute for a single edge of a puzzle piece.
     * @param edgeVariant The edge type to generate.
     * @param dimension The length of the edge.
     * @returns The d attribute.
     */
    private generateEdge(edgeVariant: number, dimension: number, direction: Direction): string {
        const horizontal = direction === Direction.LEFT || direction === Direction.RIGHT;
        const forward = direction === Direction.RIGHT || direction === Direction.DOWN;
        const positive = Math.sign(edgeVariant) === 1;
        if (edgeVariant === 0) {
            // Straight edge
            return `${horizontal ? 'h' : 'v'} ${forward ? '' : '-'}${dimension}`;
        } else {
            // Bezier curve
            const recipe = this.edgeRecipes[edgeVariant];
            if (!recipe) {
                throw new Error(`Unsupported edge variant ${edgeVariant}. Cannot generate puzzle SVG.`);
            }
            const scaledRecipe = recipe.map(seg => seg.map(coord => coord * dimension)) as [number, number][];
            return `c ${this.generateCoordinates(horizontal, forward, positive, scaledRecipe)}`;
        }
    }

    /**
     * Path traversal recipes for puzzle edges in [major axis, minor axis] format.
     * Coordinate pairs should be interpreted as relative distances from the last ones in forward and right relative directions from the major axis' bearing.
     * Example: [1, 0.3] -> go forward 1 unit and go right 0.3 units.
     * Coordinates are normalized -> they must be multiplied with the puzzle piece's length.
     * Negative indices must hold the reversed variant of the same edge type.
     * Recipes work best with square pieces (aestethically).
     * TODO: Replace 2nd variant with something more smooth.
     */
    private edgeRecipes: Record<number, [number, number][]> = {
        1: [[0.160, -0.028], [0.365, -0.046], [0.353, -0.008], [-0.093, 0.226], [0.019, 0.287], [0.159, 0.276], [0.170, -0.013], [0.158, -0.101], [0.109, -0.276], [-0.016, -0.033], [0.262, -0.013], [0.379, 0.008]],
        [-1]: [[0.117, -0.020], [0.395, -0.040], [0.379, -0.008], [-0.049, 0.176], [-0.061, 0.263], [0.109, 0.276], [0.139, 0.011], [0.251, -0.051], [0.159, -0.276], [-0.012, -0.038], [0.193, -0.021], [0.353, 0.008]],
        2: [[0.1387, 0.0423], [0.3439, 0.0878], [0.3353, 0.0611], [-0.0041, -0.134], [-0.0119, -0.2087], [0.0275, -0.2497], [0.0252, -0.0339], [0.2263, -0.0586], [0.2782, 0.0055], [0.0503, 0.0671], [-0.0462, 0.235], [-0.0256, 0.2403], [0.0839, 0.0265], [0.2453, -0.0298], [0.3825, -0.0602]],
        [-2]: [[0.1371, 0.0303], [0.2986, 0.0867], [0.3825, 0.0602], [0.0207, -0.0053], [-0.0759, -0.1732], [-0.0256, -0.2403], [0.0519, -0.0641], [0.253, -0.0394], [0.2782, -0.0055], [0.0394, 0.041], [0.0316, 0.1157], [0.0275, 0.2497], [-0.0086, 0.0267], [0.1966, -0.0188], [0.3353, -0.0611]],
        3: [[0.138, -0.012], [0.297, -0.046], [0.4, -0.023], [0.017, 0.004], [-0.047, 0.117], [-0.048, 0.183], [0.002, 0.048], [0.044, 0.077], [0.121, 0.073], [0.056, -0.004], [0.108, -0.002], [0.122, -0.07], [0.006, -0.033], [-0.025, -0.188], [0, -0.194], [0.081, -0.018], [0.265, 0.018], [0.405, 0.032]],
        [-3]: [[0.14, -0.014], [0.323, -0.05], [0.405, -0.032], [0.025, 0.007], [-0.006, 0.162], [0, 0.194], [0.014, 0.068], [0.066, 0.067], [0.122, 0.07], [0.077, 0.004], [0.119, -0.025], [0.121, -0.073], [-0.001, -0.066], [-0.065, -0.179], [-0.048, -0.183], [0.103, -0.023], [0.262, 0.011], [0.4, 0.023]]
    }

    /**
     * Transforms edge recipes to SVG coordinates.
     * @param horizontal Edge is horizontal (true -> xy, false -> yx).
     * @param forward Edge direction is foward, coordinates are in increasing order.
     * @param positive The puzzle connector is looking outwards.
     * @param recipe The coordinates of the edge.
     * @returns The transformed coordinates as an SVG string.
     */
    private generateCoordinates(horizontal: boolean, forward: boolean, positive: boolean, recipe: [number, number][]) {
        if (!forward) {
            recipe.forEach(coord => coord[0] *= -1);
            if (positive) {
                recipe.forEach(coord => coord[1] *= -1);
            }
        } else if (!positive) {
            recipe.forEach(coord => coord[1] *= -1);
        }
        const xIndex = horizontal ? 0 : 1;
        const yIndex = 1 - xIndex;
        const coordStr = recipe.reduce((acc, coord) => acc += `${coord[xIndex]} ${coord[yIndex]}, `, '');
        return coordStr.trim();
    }
}

/**
 * Puzzle edge directions.
 */
enum Direction {
    /**
     * The edge is going from right to left.
     */
    LEFT,
    /**
     * The edge is going from left to right.
     */
    RIGHT,
    /**
     * The edge is going from top to bottom.
     */
    DOWN,
    /**
     * The edge is going from bottom to top.
     */
    UP
}
