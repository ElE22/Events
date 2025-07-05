import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'home', loadComponent: () => import('./eventos/pages/home/home.component')},
    {path: 'events', loadComponent: ()=> import('./eventos/pages/event-manager/event-manager.component')},
    {path:'**', redirectTo: 'home'},
];
