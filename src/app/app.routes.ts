import { Routes } from '@angular/router';
import { PageUrlMapping, StoryUrlMapping } from '../models/page-url-mapping.model';

export const routes: Routes = [
    { path: PageUrlMapping.HOME, loadComponent: () => import('../pages/home/home.page').then(m => m.HomePage) },
    { path: PageUrlMapping.ABOUT, loadComponent: () => import('../pages/about/about.page').then(m => m.AboutPage) },
    { path: PageUrlMapping.PARTNERSHIP, loadComponent: () => import('../pages/partnership/partnership.page').then(m => m.PartnershipPage) },
    { path: PageUrlMapping.COUNSELING, loadComponent: () => import('../pages/counseling/counseling.page').then(m => m.CounselingPage) },
    { path: PageUrlMapping.INSIGHTS, loadComponent: () => import('../pages/stories/stories.page').then(m => m.StoriesPage) },
    {
        path: `${PageUrlMapping.INSIGHTS}`,
        loadComponent: () => import('../pages/story/story.page').then(m => m.StoryPage),
        children: [
            { path: StoryUrlMapping.WEBPROG2, loadComponent: () => import('../components/story/insight/web-programming-2/web-programming-2.component').then(m => m.WebProgramming2Component) },
            { path: '**', loadComponent: () => import('../components/not-found/not-found.component').then(m => m.NotFoundComponent), data: { text: 'Uh oh! This story must have been left for a journey.' } }
        ]
    },
    { path: '**', redirectTo: '/' }
];
