import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatepickerComponent } from './datepicker.component';
import { CountrySelectorComponent } from './country-selector.component';
import Country from './country';
import { SunService } from './sun.service';
import SunResponse from './sun';
import { SunDetailComponent } from './sun-detail.component';
import LoggerService from '../logger.service';

@Component({
  standalone: true,
  selector: 'app-sun',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    DatepickerComponent,
    CountrySelectorComponent,
    SunDetailComponent,
  ],
  templateUrl: './sun.component.html',
  styleUrl: './sun.component.scss',
})
export class SunComponent {
  constructor(
    private logger: LoggerService,
    private snackBar: MatSnackBar,
    private sunService: SunService
  ) {}

  selectedDate?: Date;
  selectedCountry?: Country;
  sun?: SunResponse;

  selectDateChanged(selectedDate: Date) {
    this.selectedDate = selectedDate;
  }

  selectCountryChanged(selectedCountry: Country) {
    this.selectedCountry = selectedCountry;
  }

  showSunClicked() {
    const isValid = this.validate();
    if (!isValid) return;

    this.sunService
      .getSun(
        this.selectedDate!,
        this.selectedCountry!.latitude,
        this.selectedCountry!.longitude
      )
      .subscribe((sunResponse: SunResponse) => {
        this.logger.log(sunResponse);
        this.sun = sunResponse;
      });
  }

  validate(): boolean {
    if (!this.selectedDate) {
      this.snackBar.open('Please select date.', undefined, {
        duration: 3000,
        panelClass: 'app-notification-error',
      });
      return false;
    }

    if (!this.selectedCountry) {
      this.snackBar.open('Please select country.', undefined, {
        duration: 3000,
        panelClass: 'app-notification-error',
      });
      return false;
    }

    return true;
  }
}
