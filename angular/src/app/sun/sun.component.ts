import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatepickerComponent } from './datepicker.component';
import { CountrySelectorComponent } from './country-selector.component';
import { CommonModule } from '@angular/common';

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
  displayDetail = true;

  sunForm = new FormGroup({
    datepicker: new FormControl(),
  });
}
