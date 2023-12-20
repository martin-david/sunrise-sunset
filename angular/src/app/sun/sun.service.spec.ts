import { HttpClient } from '@angular/common/http';
import { asyncData } from '../../testing/async-observable-helpers';
import { SunService } from './sun.service';
import SunResponse from './sun';
import LoggerService from '../logger.service';

describe('SunService (with spies)', () => {
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let sunService: SunService;

  beforeEach(() => {
    loggerServiceSpy = jasmine.createSpyObj('LoggerService', ['log', 'error']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    sunService = new SunService(loggerServiceSpy, httpClientSpy);
  });

  it('should return expected sun (HttpClient called once)', (done: DoneFn) => {
    const expectedSun: SunResponse = {
      date: new Date(2023, 11, 20), // month is 0-based, that's why we need 11 for December
      sunrise: '6:53:41 AM',
      sunset: '2:59:48 PM',
      timezone: 'UTC',
      utc_offset: 0,
    };

    const response = {
      results: {
        date: '2023-12-20',
        sunrise: '6:53:41 AM',
        sunset: '2:59:48 PM',
        first_light: '4:54:41 AM',
        last_light: '4:58:48 PM',
        dawn: '6:15:22 AM',
        dusk: '3:38:07 PM',
        solar_noon: '10:56:44 AM',
        golden_hour: '2:02:23 PM',
        day_length: '8:06:07',
        timezone: 'UTC',
        utc_offset: 0,
      },
      status: 'OK',
    };

    httpClientSpy.get.and.returnValue(asyncData(response));

    sunService.getSun(new Date(2023, 12, 20), 49.817492, 15.472962).subscribe({
      next: (sun) => {
        expect(sun).withContext('expected sun').toEqual(expectedSun);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
