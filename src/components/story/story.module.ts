import { NgModule } from "@angular/core";
import { WebProgramming2Component } from "./insight/web-programming-2/web-programming-2.component";

/**
 * Collection module for all the story pages in the application.
 * TODO: Write some sort of prebuild task to automatically update the list.
 */
@NgModule({
    imports: [WebProgramming2Component],
    exports: [WebProgramming2Component]
})
export class StoryModule { }
