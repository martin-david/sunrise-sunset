import { HttpClient } from '@angular/common/http';
import { asyncData } from '../../testing/async-observable-helpers';
import { CountryService } from './country.service';
import Country from './country';
import LoggerService from '../logger.service';

describe('CountryService (with spies)', () => {
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let countryService: CountryService;

  beforeEach(() => {
    loggerServiceSpy = jasmine.createSpyObj('LoggerService', ['log', 'error']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    countryService = new CountryService(loggerServiceSpy, httpClientSpy);
  });

  it('should return expected countries (HttpClient called once)', (done: DoneFn) => {
    const expectedCountries: Country[] = [
      {
        code: 'BR',
        name: 'Brazil',
        latitude: -14.235004,
        longitude: -51.92528,
      },
      {
        code: 'CZ',
        name: 'Czech Republic',
        latitude: 49.817492,
        longitude: 15.472962,
      },
      { code: 'FR', name: 'France', latitude: 46.227638, longitude: 2.213749 },
    ];

    httpClientSpy.get.and.returnValue(asyncData(expectedCountries));

    countryService.getCountries().subscribe({
      next: (countries) => {
        expect(countries)
          .withContext('expected countries')
          .toEqual(expectedCountries);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
