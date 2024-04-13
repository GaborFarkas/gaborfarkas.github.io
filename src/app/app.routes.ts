import { Routes } from '@angular/router';
import { PageUrlMapping } from '../models/page-url-mapping.model';

export const routes: Routes = [
    { path: PageUrlMapping.HOME, loadComponent: () => import('../pages/home/home.page').then(m => m.HomePage) },
    { path: PageUrlMapping.ABOUT, loadComponent: () => import('../pages/about/about.page').then(m => m.AboutPage) },
    { path: PageUrlMapping.PARTNERSHIP, loadComponent: () => import('../pages/partnership/partnership.page').then(m => m.PartnershipPage) },
    { path: PageUrlMapping.COUNSELING, loadComponent: () => import('../pages/counseling/counseling.page').then(m => m.CounselingPage) },
    { path: '**', redirectTo: '/' }
];
