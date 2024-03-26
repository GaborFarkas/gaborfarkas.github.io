import { Routes } from '@angular/router';
import { PageUrlMapping } from '../models/page-url-mapping.model';

export const routes: Routes = [
    { path: PageUrlMapping.HOME, loadComponent: () => import('../pages/home/home.page').then(m => m.HomePage) },
    { path: PageUrlMapping.ABOUT, loadComponent: () => import('../pages/about/about.page').then(m => m.AboutPage) },
    { path: '**', redirectTo: '/' }
];
