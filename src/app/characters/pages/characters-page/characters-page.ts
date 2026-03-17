import { Component, computed, inject, signal } from '@angular/core';
import { DbCard } from '../../../components/db-card/db-card';
import { rxResource } from '@angular/core/rxjs-interop';
import { DragonBallService } from '../../../services/dragonball.service';
import { ActivatedRoute } from '@angular/router';
import { FilterCharacters } from './components/filter-characters/filter-characters';
import { Filters } from '../../../utils/filter-utils';
import { SearchInput } from './components/search-input/search-input';

@Component({
  selector: 'app-charactersPage',
  imports: [DbCard, FilterCharacters, SearchInput],
  templateUrl: './characters-page.html',
})
export class CharactersPage {
  dragonBallService = inject(DragonBallService);
  activeRoute = inject(ActivatedRoute);

  filters = signal<Filters>({});

  searchCharacter = signal<string>('');

  dragonBallResource = rxResource({
    params: () => ({
      ...this.filters(),
      name: this.searchCharacter(),
    }),
    stream: ({ params }) => {
      return this.dragonBallService.getCharacters(params);
    },
  });

  characters = computed(() => this.dragonBallResource.value());
}
