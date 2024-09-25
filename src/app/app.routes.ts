import { Routes } from '@angular/router';
import { PageUrlMapping, StoryUrlMapping } from '@/models/page-url-mapping.model';

export const routes: Routes = [
    { path: PageUrlMapping.MAP, loadComponent: () => import('@/pages/map/map.page').then(m => m.MapPage) },
    {
        path: '',
        loadComponent: () => import('@/layouts/framed/framed.layout').then(m => m.FramedLayout),
        children: [
            { path: PageUrlMapping.HOME, loadComponent: () => import('@/pages/home/home.page').then(m => m.HomePage) },
            { path: PageUrlMapping.ABOUT, loadComponent: () => import('@/pages/about/about.page').then(m => m.AboutPage) },
            { path: PageUrlMapping.PUBLICATIONS, loadComponent: () => import('@/pages/publications/publications.page').then(m => m.PublicationsPage) },
            { path: PageUrlMapping.PARTNERSHIP, loadComponent: () => import('@/pages/partnership/partnership.page').then(m => m.PartnershipPage) },
            { path: PageUrlMapping.COUNSELING, loadComponent: () => import('@/pages/counseling/counseling.page').then(m => m.CounselingPage) },
            { path: PageUrlMapping.INSIGHTS, loadComponent: () => import('@/pages/stories/stories.page').then(m => m.StoriesPage) },
            { path: PageUrlMapping.FEATUREMATRIX, loadComponent: () => import('@/pages/web-mapping/feature-matrix/feature-matrix.page').then(m => m.FeatureMatrixPage) },
            {
                path: `${PageUrlMapping.INSIGHTS}`,
                loadComponent: () => import('@/layouts/story/story.layout').then(m => m.StoryLayout),
                children: [
                    { path: StoryUrlMapping.WEBPROG2, loadComponent: () => import('@/components/story/insight/web-programming-2/web-programming-2.component').then(m => m.WebProgramming2Component) },
                    { path: StoryUrlMapping.SWDEVTECH, loadComponent: () => import('@/components/story/insight/software-development-technologies/software-development-technologies.component').then(m => m.SoftwareDevelopmentTechnologiesComponent) },
                    { path: '**', loadComponent: () => import('@/components/not-found/not-found.component').then(m => m.NotFoundComponent), data: { text: 'Uh oh! This story must have been left for a journey.' } }
                ]
            },
            { path: '**', redirectTo: '/' }
        ]
    }
];
