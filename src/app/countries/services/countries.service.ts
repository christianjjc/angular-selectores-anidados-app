import { Injectable } from '@angular/core';
import { RegionI } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private _regions: RegionI[] = [
    RegionI.Africa,
    RegionI.Americas,
    RegionI.Asia,
    RegionI.Europa,
    RegionI.Oceania,
  ];

  constructor() {}

  get regions(): RegionI[] {
    return [...this._regions];
  }
}
