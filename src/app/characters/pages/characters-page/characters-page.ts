import { Component, computed, effect, inject, signal } from '@angular/core';
import { DbCard } from '../../../components/db-card/db-card';
import { rxResource } from '@angular/core/rxjs-interop';
import { DragonBallService } from '../../../services/dragonball.service';
import { ActivatedRoute } from '@angular/router';
import { FilterCharacters } from './components/filter-characters/filter-characters';
import { Filters } from '../../../utils/filter-utils';
import { SearchInput } from './components/search-input/search-input';

import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Item } from '../../../interfaces/dragonballResponse.interface';

@Component({
  selector: 'app-charactersPage',
  imports: [DbCard, FilterCharacters, SearchInput, InfiniteScrollDirective],
  templateUrl: './characters-page.html',
})
export class CharactersPage {
  dragonBallService = inject(DragonBallService);
  activeRoute = inject(ActivatedRoute);

  // Estado de paginación
  private allCharacters = signal<Item[]>([]); // Todos los personajes cargados
  displayedCharacters = signal<Item[]>([]); // Personajes mostrados actualmente
  currentPage = signal<number>(1);
  pageSize = 9;
  isLoading = signal<boolean>(false);
  hasMore = signal<boolean>(true);

  filters = signal<Filters>({});
  searchCharacter = signal<string>('');

  // Recurso para cargar todos los personajes (solo cuando cambian filtros o búsqueda)
  dragonBallResource = rxResource({
    params: () => ({
      ...this.filters(),
      name: this.searchCharacter(),
    }),
    stream: ({ params }) => {
      // Resetear paginación cuando cambian los filtros
      this.currentPage.set(1);
      this.hasMore.set(true);
      this.displayedCharacters.set([]);

      return this.dragonBallService.getCharacters(params);
    },
  });

  // Efecto para cuando se cargan nuevos datos completos
  constructor() {
    effect(() => {
      const allData = this.dragonBallResource.value();
      if (allData && allData.length > 0) {
        this.allCharacters.set(allData);
        // Cargar primera página
        this.loadNextPage();
      }
    });
  }

  onScroll() {
    // Verificar si podemos cargar más
    if (!this.isLoading() && this.hasMore()) {
      this.loadNextPage();
    }
  }

  private loadNextPage() {
    this.isLoading.set(true);

    // Simular un pequeño delay para mejor UX
    setTimeout(() => {
      const allChars = this.allCharacters();
      const startIndex = (this.currentPage() - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      // Verificar si hay más personajes para cargar
      if (startIndex < allChars.length) {
        const newCharacters = allChars.slice(startIndex, endIndex);

        this.displayedCharacters.update((current) => [...current, ...newCharacters]);
        this.currentPage.update((page) => page + 1);

        // Verificar si ya no hay más personajes
        if (endIndex >= allChars.length) {
          this.hasMore.set(false);
        }
      } else {
        this.hasMore.set(false);
      }

      this.isLoading.set(false);
    }, 800); // Pequeño delay para evitar múltiples llamadas
  }

  // Getter para usar en el template
  get paginatedCharacters() {
    return this.displayedCharacters();
  }

  goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
