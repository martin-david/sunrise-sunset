import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SunComponent } from './sun/sun.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SunComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Sunrise & Sunset App';
}
