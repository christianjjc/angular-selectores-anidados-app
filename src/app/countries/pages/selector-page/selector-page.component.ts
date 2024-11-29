import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { filter, switchMap, tap } from 'rxjs';
import { SmallCountryI } from '../../interfaces/country.interface';

@Component({
  selector: 'app-selector-page',
  standalone: false,
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent implements OnInit {
  public countriesByRegion: SmallCountryI[] = [];
  public borders: SmallCountryI[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions() {
    return this.countriesService.regions;
  }

  onRegionChanged(): void {
    this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')), //se limpia antes de pedir países
        tap(() => (this.borders = [])), //se limpia antes de pedir países
        switchMap((region) =>
          this.countriesService.getCountriesByRegion(region)
        )
      )
      .subscribe((countries) => {
        this.countriesByRegion = countries;
      });
  }

  onCountryChanged(): void {
    this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('border')!.setValue('')), //se limpia antes de pedir países
        filter((value: string) => value.length > 0),
        switchMap((alphaCode) =>
          this.countriesService.getBorderByAlphaCode(alphaCode)
        ),
        switchMap((country) =>
          this.countriesService.getCountryBordersByCodes(country.borders)
        )
      )
      .subscribe((countries) => {
        this.borders = countries;
      });
  }
}
