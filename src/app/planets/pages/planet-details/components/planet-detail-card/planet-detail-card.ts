import { Component, computed, input, signal, effect, inject } from '@angular/core';
import { Planet } from '../../../../../interfaces/planets.interface';
import { CarouselCharsPlanets } from '../../../../../shared/carousel-chars-planets/carousel-chars-planets';
import { Router } from '@angular/router';

@Component({
  selector: 'planet-detail-card',
  imports: [CarouselCharsPlanets],
  templateUrl: './planet-detail-card.html',
})
export class PlanetDetailCard {
  router = inject(Router);
  planet = input.required<Planet>();

  allCharacters = computed(() => {
    return this.planet().characters;
  });

  characterUrlSelectedInSlice = signal<string>('');
  characterSelectedId = signal<number>(0);

  constructor() {
    // Efecto que se ejecuta cuando characterUrl cambia
    effect(() => {
      const url = this.characterUrlSelectedInSlice();

      if (url && this.allCharacters().length > 0) {
        this.findCharacterByUrl(url);
        this.router.navigate(['/characters/', this.characterSelectedId()]);
      }
    });
  }

  characterImages = computed(() => {
    if (!this.allCharacters()) return [];

    return this.allCharacters().map((c) => c.image);
  });

  private findCharacterByUrl(url: string) {
    // Buscar personaje que coincida con la URL
    const character = this.planet().characters.find((char) => char.image === url);

    if (character) {
      this.characterSelectedId.set(character.id);
    } else {
      this.characterSelectedId.set(0);
    }
  }
}
