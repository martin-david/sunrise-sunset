import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-sun',
  imports: [ReactiveFormsModule],
  templateUrl: './sun.component.html',
  styleUrl: './sun.component.scss',
})
export class SunComponent {}
