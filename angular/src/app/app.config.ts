import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import LoggerService from './logger.service';
import CountryService from './sun/country.service';
import { SunService } from './sun/sun.service';

export const appProviders = [
  provideRouter(routes),
  provideAnimations(),
  provideHttpClient(),
  provideProtractorTestingSupport(),
  LoggerService,
  CountryService,
  SunService,
];

export const appConfig: ApplicationConfig = {
  providers: [appProviders],
};
