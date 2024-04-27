import { Routes } from '@angular/router';
import { PageUrlMapping } from '../models/page-url-mapping.model';

export const routes: Routes = [
    { path: PageUrlMapping.HOME, loadComponent: () => import('../pages/home/home.page').then(m => m.HomePage) },
    { path: PageUrlMapping.ABOUT, loadComponent: () => import('../pages/about/about.page').then(m => m.AboutPage) },
    { path: PageUrlMapping.PARTNERSHIP, loadComponent: () => import('../pages/partnership/partnership.page').then(m => m.PartnershipPage) },
    { path: PageUrlMapping.COUNSELING, loadComponent: () => import('../pages/counseling/counseling.page').then(m => m.CounselingPage) },
    { path: PageUrlMapping.INSIGHTS, loadComponent: () => import('../pages/stories/stories.page').then(m => m.StoriesPage) },
    { path: `${PageUrlMapping.INSIGHTS}/:slug`, loadComponent: () => import('../pages/story/story.page').then(m => m.StoryPage) },
    { path: '**', redirectTo: '/' }
];
