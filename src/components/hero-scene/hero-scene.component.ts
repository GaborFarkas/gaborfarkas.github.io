import { AfterViewInit, Component, computed, ElementRef, input, OnDestroy, OnInit, output, signal, viewChild, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypewriterComponent } from '@/components/typewriter/typewriter.component';
import { HeroScene } from '@/models/hero.model';

/**
 * An animated hero scene used on the home page.
 */
@Component({
    selector: 'div.hero-scene',
    imports: [CommonModule, TypewriterComponent],
    templateUrl: './hero-scene.component.html',
    styleUrl: './hero-scene.component.css'
})
export class HeroSceneComponent implements AfterViewInit, OnInit, OnDestroy {
    /**
     * Available hero scenes.
     */
    protected HeroScene = HeroScene;

    /**
     * The hero image used in the animation.
     */
    public heroImg = input('');

    /**
     * The scene of this animation.
     */
    public heroScene = input(HeroScene.LONGTERM);

    /**
     * The frequency the animation should be restarted automatically in ms.
     */
    public autoRestartInterval = input(0);

    /**
     * Fires an event when a hero change is requested.
     */
    public heroChanged = output();

    /**
     * Gets or sets if the current hero is animating and cannot be clicked.
     */
    protected animating = signal(false);

    /**
     * Gets the element reference of the scene's container div.
     */
    public sceneContainer = viewChild.required<ElementRef<HTMLDivElement>>('sceneContainer');

    /**
     * Gets the component reference of all typewriter animations.
     */
    private typewriters = viewChildren(TypewriterComponent);

    /**
     * Gets the element reference of the research scene's canvas element.
     */
    private wallOfFame = viewChild<ElementRef<HTMLCanvasElement>>('wallOfFame');

    /**
     * Key of the animation restart interval.
     */
    private restartIntervalKey_?: number;

    /**
     * Calculates month labels from the start of the company and returns them in an array.
     */
    private companyMonths = computed(() => {
        const today = new Date();
        const endDate = +new Date(`${today.getFullYear()}-${today.getMonth()}-01`);
        const cursor = new Date('2018-08-01');
        const monthLbls: string[] = [];

        while (+cursor < endDate) {
            monthLbls.push(`${cursor.getFullYear()} ${cursor.toLocaleString('en', { month: 'long' })}`);
            // Note: months are 0-indexed, and 12 sets next year automatically.
            cursor.setMonth(cursor.getMonth() + 1);
        }

        return monthLbls;
    });

    /**
     * Gets the width of the wall of fame canvas in ceiled rems.
     */
    protected wallOfFameWidth = computed(() => {
        const cols = Math.ceil(this.companyMonths().length / 3) + 1;
        return Math.ceil(cols * HeroSceneComponent.frameDims[0] + (cols - 2) * HeroSceneComponent.gap);
    });

    /**
     * The frame dimensions on the wall of fame in rems.
     */
    private static frameDims: [number, number] = [4.24, 5.57];

    /**
     * The inset picture dimensions on the wall of fame in rems.
     */
    private static picDims: [number, number] = [2.8, 3.48];

    /**
     * The gap between frames on the wall of fame in rems.
     */
    private static gap = 0.75;

    ngOnInit(): void {
        if (this.autoRestartInterval()) {
            this.restartIntervalKey_ = setInterval(function (this: HeroSceneComponent) {
                // Use a small delay for the auto restart, as mobiles can choke on the animations.
                this.restart(50);
            }.bind(this), this.autoRestartInterval()) as unknown as number;
        }
    }

    ngOnDestroy(): void {
        if (this.restartIntervalKey_) {
            clearInterval(this.restartIntervalKey_);
        }
    }

    ngAfterViewInit(): void {
        const wallOfFrameElem = this.wallOfFame()?.nativeElement;
        if (wallOfFrameElem) {
            // Draw wall of fame with canvas methods.
            this.initializeWallOfFame(wallOfFrameElem);
        }
    }

    /**
     * Toggles the hero image.
     */
    toggleHero() {
        if (!this.animating()) {
            this.animating.set(true);
            setTimeout(function (this: HeroSceneComponent) {
                this.heroChanged.emit();
                this.animating.set(false);
            }.bind(this), 500);
        }
    }

    /**
     * Restarts all animations of the current hero scene.
     * @param [timeout=0] Restart delay, increase this if the browser cannot restart the CSS animations on small devices.
     */
    restart(timeout = 0) {
        // Restart CSS animations
        this.sceneContainer().nativeElement.style.display = 'none';
        setTimeout(function (this: HeroSceneComponent) {
            this.sceneContainer().nativeElement.style.display = '';

            // Restart typewriter (JS) animations
            if (this.typewriters) {
                for (const typewriter of this.typewriters()) {
                    typewriter.startAnimation();
                }
            }
        }.bind(this), timeout);
    }

    /**
     * Draws the employee of the month wall of fame in a canvas element.
     */
    private initializeWallOfFame(canvas: HTMLCanvasElement) {
        // Scale up as we will need to zoom in.
        const scale = 5;
        canvas.height = canvas.clientHeight * scale;
        canvas.width = canvas.clientWidth * scale;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            let xCursor = 0, yCursor = 0;
            // Get the pixels/rem ratio as the Canvas API draws in pixels. Scale up as well.
            const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) * scale;
            ctx.font = `${Math.round(0.2 * rem)}px serif`;
            ctx.textAlign = 'center';

            // Calculate some common values for the drawn images and texts.
            const gapPx = Math.floor(HeroSceneComponent.gap * rem);
            const picDimsPx = HeroSceneComponent.picDims.map(dim => Math.floor(dim * rem));
            const frameDimsPx = HeroSceneComponent.frameDims.map(dim => Math.floor(dim * rem));
            const picInset = [Math.floor(frameDimsPx[0] * 0.17), Math.floor(frameDimsPx[1] * 0.19)];
            const textOffset = [Math.floor(frameDimsPx[0] * 0.5), Math.floor(frameDimsPx[1] * 0.89)];

            // Get image resources.
            const frameImg = new Image();
            frameImg.onload = () => {
                const employeeImg = new Image();
                employeeImg.onload = () => {
                    for (const monthLbl of this.companyMonths()) {
                        ctx.drawImage(employeeImg, xCursor + picInset[0], yCursor + picInset[1],
                            picDimsPx[0], picDimsPx[1]);
                        ctx.drawImage(frameImg, xCursor, yCursor, frameDimsPx[0], frameDimsPx[1]);
                        ctx.fillText(monthLbl, xCursor + textOffset[0], yCursor + textOffset[1]);

                        yCursor += frameDimsPx[1] + gapPx;
                        if (yCursor > frameDimsPx[1] * 3) {
                            yCursor = 0;
                            xCursor += frameDimsPx[0] + gapPx;
                        }
                    }

                    if (yCursor > 0) xCursor += frameDimsPx[0] + gapPx;
                    yCursor = frameDimsPx[1] + gapPx;

                    // The array contains labels up to the last month. That should be the final frame in a new col.
                    const now = new Date();
                    now.setMonth(now.getMonth() - 1);
                    const lastMonth = `${now.getFullYear()} ${now.toLocaleString('en', { month: 'long' })}`;

                    ctx.drawImage(employeeImg, xCursor + picInset[0], yCursor + picInset[1],
                        picDimsPx[0], picDimsPx[1]);
                    ctx.drawImage(frameImg, xCursor, yCursor, frameDimsPx[0], frameDimsPx[1]);
                    ctx.fillText(lastMonth, xCursor + textOffset[0], yCursor + textOffset[1]);
                }
                employeeImg.src = 'assets/eotm.png';
            }
            frameImg.src = 'assets/eotm-frame.png';
        }
    }
}
