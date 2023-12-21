import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import SunResponse from './sun';

@Component({
  standalone: true,
  selector: 'app-sun-detail',
  imports: [CommonModule, MatIconModule],
  templateUrl: './sun-detail.component.html',
  styleUrl: './sun-detail.component.scss',
})
export class SunDetailComponent {
  @Input() sun?: SunResponse;
}
