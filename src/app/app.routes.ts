import { Routes } from '@angular/router';
import { PageUrlMapping, StoryUrlMapping } from '@/app/page-url-mapping.model';

export const routes: Routes = [
    {
        path: PageUrlMapping.MAP,
        loadComponent: () => import('@/web-mapping/map/map.page').then(m => m.MapPage)
    },
    {
        path: PageUrlMapping.SANDBOX,
        loadComponent: () => import('@/layout/layouts/application/application.layout').then(m => m.ApplicationLayout),
        children: [
            { path: '', loadComponent: () => import('@/web-mapping/sandbox/sandbox.page').then(m => m.SandboxPage) }
        ]
    },
    {
        path: '',
        loadComponent: () => import('@/layout/layouts/framed/framed.layout').then(m => m.FramedLayout),
        children: [
            { path: PageUrlMapping.HOME, loadComponent: () => import('@/company/landing/landing.page').then(m => m.LandingPage) },
            { path: PageUrlMapping.ABOUT, loadComponent: () => import('@/company/about/about.page').then(m => m.AboutPage) },
            { path: PageUrlMapping.PUBLICATIONS, loadComponent: () => import('@/company/publications/publications.page').then(m => m.PublicationsPage) },
            { path: PageUrlMapping.PARTNERSHIP, loadComponent: () => import('@/company/partnership/partnership.page').then(m => m.PartnershipPage) },
            { path: PageUrlMapping.COUNSELING, loadComponent: () => import('@/company/counseling/counseling.page').then(m => m.CounselingPage) },
            { path: PageUrlMapping.INSIGHTS, loadComponent: () => import('@/stories/stories.page').then(m => m.StoriesPage) },
            { path: PageUrlMapping.CASESTUDIES, loadComponent: () => import('@/stories/stories.page').then(m => m.StoriesPage) },
            { path: PageUrlMapping.FEATUREMATRIX, loadComponent: () => import('@/web-mapping/feature-matrix/feature-matrix.page').then(m => m.FeatureMatrixPage) },
            {
                path: `${PageUrlMapping.INSIGHTS}`,
                loadComponent: () => import('@/stories/story/story.layout').then(m => m.StoryLayout),
                children: [
                    { path: StoryUrlMapping.WEBPROG2, loadComponent: () => import('@/stories/story/insight/web-programming-2/web-programming-2.component').then(m => m.WebProgramming2Component) },
                    { path: StoryUrlMapping.SWDEVTECH, loadComponent: () => import('@/stories/story/insight/software-development-technologies/software-development-technologies.component').then(m => m.SoftwareDevelopmentTechnologiesComponent) },
                    { path: StoryUrlMapping.GDPR, loadComponent: () => import('@/stories/story/insight/how-to-gdpr/how-to-gdpr.component').then(m => m.HowToGdprComponent) },
                    { path: '**', loadComponent: () => import('@/stories/story/not-found/not-found.component').then(m => m.NotFoundComponent), data: { text: 'Uh oh! This story must have been left for a journey.' } }
                ]
            },
            {
                path: `${PageUrlMapping.CASESTUDIES}`,
                loadComponent: () => import('@/stories/story/story.layout').then(m => m.StoryLayout),
                children: [
                    { path: StoryUrlMapping.LINUXPROG, loadComponent: () => import('@/stories/story/casestudy/linux-as-programming-language/linux-as-programming-language.component').then(m => m.LinuxAsProgrammingLanguageComponent) },
                    { path: StoryUrlMapping.PARTITIONING, loadComponent: () => import('@/stories/story/casestudy/technical-domain-partitioning/technical-domain-partitioning.component').then(m => m.TechnicalDomainPartitioningComponent) },
                    { path: '**', loadComponent: () => import('@/stories/story/not-found/not-found.component').then(m => m.NotFoundComponent), data: { text: 'Uh oh! This story must have been left for a journey.' } }
                ]
            },
            { path: '**', redirectTo: '/' }
        ]
    }
];
