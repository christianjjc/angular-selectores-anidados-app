import { Injectable } from '@angular/core';
import {
  CountryI,
  RegionI,
  SmallCountryI,
} from '../interfaces/country.interface';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  // private  baseUrl=`https://restcountries.com/v3.1/region/americas?fields=cca3,name,borders`
  private baseUrl = `https://restcountries.com/v3.1`;

  private _regions: RegionI[] = [
    RegionI.Africa,
    RegionI.Americas,
    RegionI.Asia,
    RegionI.Europa,
    RegionI.Oceania,
  ];

  constructor(private httpClient: HttpClient) {}

  get regions(): RegionI[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: RegionI): Observable<SmallCountryI[]> {
    if (!region) return of([]);
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.httpClient.get<CountryI[]>(url).pipe(
      map((countries) =>
        countries.map((country) => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
      ),
      tap((response) => console.log(response))
    );
  }
}
