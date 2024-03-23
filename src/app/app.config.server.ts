import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideRouter, ROUTES } from '@angular/router';
import { routes } from './app.routes';
import { AppShellComponent } from './app-shell/app-shell.component';

const serverConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServerRendering(),
    {
        provide: ROUTES,
        multi: true,
        useValue: [
            {
                path: 'shell',
                component: AppShellComponent
            }
        ]
    }
]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
