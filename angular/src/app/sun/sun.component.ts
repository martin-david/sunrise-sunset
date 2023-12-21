import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatepickerComponent } from './datepicker.component';
import { CountrySelectorComponent } from './country-selector.component';
import Country from './country';
import { SunService } from './sun.service';

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
  ],
  templateUrl: './sun.component.html',
  styleUrl: './sun.component.scss',
})
export class SunComponent {
  constructor(private snackBar: MatSnackBar, private sunService: SunService) {}

  displayDetail = false;
  selectedDate?: Date;
  selectedCountry?: Country;

  selectDateChanged(selectedDate: Date) {
    this.selectedDate = selectedDate;
  }

  selectCountryChanged(selectedCountry: Country) {
    this.selectedCountry = selectedCountry;
  }

  showSunClicked() {
    if (!this.selectedDate) {
      this.snackBar.open('Please select date from calendar.', undefined);
    }

    this.sunService.getSun(
      this.selectedDate!,
      this.selectedCountry!.latitude,
      this.selectedCountry!.longitude
    );
  }

  sunForm = new FormGroup({
    datepicker: new FormControl(),
  });
}
