import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import CountryService from './country.service';
import Country from './country';

@Component({
  standalone: true,
  selector: 'app-country-selector',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.scss',
})
export class CountrySelectorComponent implements OnInit {
  countryControl = new FormControl<string | Country>('');
  countries: Country[] = [];
  filteredOptions$: Observable<Country[]>;

  constructor(private countryService: CountryService) {
    this.filteredOptions$ = of([]);
  }

  ngOnInit(): void {
    this.filteredOptions$ = this.countryControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this.filter(name as string) : this.countries.slice();
      })
    );

    this.countryService
      .getCountries()
      .subscribe((countries) => (this.countries = [...countries]));
  }

  displayCountry(country: Country): string {
    return country && country.name ? country.name : '';
  }

  private filter(name: string): Country[] {
    const filterValue = name.toLowerCase();
    return this.countries.filter((country) =>
      country.name.toLowerCase().includes(filterValue)
    );
  }
}
