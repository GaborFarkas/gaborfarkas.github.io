import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root application component.
 */
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent { }
