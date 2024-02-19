import { Routes } from '@angular/router';
import { PageUrlMapping } from '../models/page-url-mapping.model';

export const routes: Routes = [
    { path: PageUrlMapping.HOME, loadComponent: () => import('../pages/home/home.component').then(m => m.HomeComponent) }
];
