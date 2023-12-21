import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatepickerComponent } from './datepicker.component';
import { CountrySelectorComponent } from './country-selector.component';
import Country from './country';
import SunResponse from './sun';

@Component({
  standalone: true,
  selector: 'app-sun-detail',
  imports: [CommonModule, MatIconModule],
  templateUrl: './sun-detail.component.html',
  styleUrl: './sun-detail.component.scss',
})
export class SunComponent {
  @Input sun?: SunResponse;
}
