import { Component, computed, inject, signal } from '@angular/core';
import { DbCard } from '../../../components/db-card/db-card';
import { rxResource } from '@angular/core/rxjs-interop';
import { DragonBallService } from '../../../services/dragonball.service';
import { ActivatedRoute } from '@angular/router';
import { FilterCharacters } from './components/filter-characters/filter-characters';
import { Filters } from '../../../utils/filter-utils';

@Component({
  selector: 'app-charactersPage',
  imports: [DbCard, FilterCharacters],
  templateUrl: './characters-page.html',
})
export class CharactersPage {
  dragonBallService = inject(DragonBallService);
  activeRoute = inject(ActivatedRoute);

  filters = signal<Filters>({});

  dragonBallResource = rxResource({
    params: () => ({
      ...this.filters(),
    }),
    stream: ({ params }) => {
      return this.dragonBallService.getCharacters(params);
    },
  });

  characters = computed(() => this.dragonBallResource.value());
}
