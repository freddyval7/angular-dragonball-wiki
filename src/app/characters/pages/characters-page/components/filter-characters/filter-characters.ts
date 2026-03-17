import { Component, inject, output, signal } from '@angular/core';
import {
  AffiliationOptions,
  Filters,
  GenderOptions,
  RaceOptions,
} from '../../../../../utils/filter-utils';
import { DragonBallService } from '../../../../../services/dragonball.service';
import { Router } from '@angular/router';

@Component({
  selector: 'filter-characters',
  imports: [],
  templateUrl: './filter-characters.html',
})
export class FilterCharacters {
  dragonBallService = inject(DragonBallService);
  router = inject(Router);

  genderOptions = GenderOptions;
  raceOptions = RaceOptions;
  affiliationOptions = AffiliationOptions;

  filters = output<Filters>();

  selectedFilter = signal<Filters>({});

  updateFilter(key: keyof Filters, value: string) {
    const filter = { ...this.selectedFilter() };
    filter[key] = value;
    this.selectedFilter.set(filter);

    this.filters.emit(filter);
  }
}
