import { Component, effect, inject, signal } from '@angular/core';
import { DragonBallService } from '../../../services/dragonball.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Filters } from '../../../utils/filter-utils';
import { Planet } from '../../../interfaces/planets.interface';
import { PlanetCard } from '../../components/planet-card/planet-card';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { SearchInput } from '../../../characters/pages/characters-page/components/search-input/search-input';

@Component({
  selector: 'app-planets-page',
  imports: [PlanetCard, InfiniteScrollDirective, SearchInput],
  templateUrl: './planets-page.html',
})
export class PlanetsPage {
  dragonBallService = inject(DragonBallService);
  activeRoute = inject(ActivatedRoute);

  // Estado de paginación
  private allPlanets = signal<Planet[]>([]); // Todos los planetas cargados
  displayedPlanets = signal<Planet[]>([]); // planetas mostrados actualmente
  currentPage = signal<number>(1);
  pageSize = 9;
  isLoading = signal<boolean>(false);
  hasMore = signal<boolean>(true);

  filters = signal<Filters>({});
  searchPlanet = signal<string>('');

  planetResource = rxResource({
    params: () => ({
      name: this.searchPlanet(),
    }),
    stream: ({ params }) => {
      this.currentPage.set(1);
      this.hasMore.set(true);
      this.displayedPlanets.set([]);

      return this.dragonBallService.getPlanets(params);
    },
  });

  // Efecto para cuando se cargan nuevos datos completos
  constructor() {
    effect(() => {
      const allData = this.planetResource.value();
      if (allData && allData.length > 0) {
        this.allPlanets.set(allData);
        // Cargar primera página
        this.loadNextPage();
      }
    });
  }

  onScroll() {
    console.log('onScroll');
    // Verificar si podemos cargar más
    if (!this.isLoading() && this.hasMore()) {
      this.loadNextPage();
    }
  }

  private loadNextPage() {
    this.isLoading.set(true);

    // Simular un pequeño delay para mejor UX
    setTimeout(() => {
      const allChars = this.allPlanets();
      const startIndex = (this.currentPage() - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      // Verificar si hay más personajes para cargar
      if (startIndex < allChars.length) {
        const newPlanets = allChars.slice(startIndex, endIndex);

        this.displayedPlanets.update((current) => [...current, ...newPlanets]);
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
  get paginatedPlanets() {
    return this.displayedPlanets();
  }

  goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
