import { Component, computed, input, signal } from '@angular/core';
import {
  CharacterDetail,
  Transformation,
} from '../../../../../interfaces/characterDetail.interface';
import { Carousel } from '../../../../../shared/carousel/carousel';

@Component({
  selector: 'character-detail-card',
  imports: [Carousel],
  templateUrl: './character-detail-card.html',
  styles: [
    `
      .swiper {
        width: 100%;
        height: 500px;
      }
    `,
  ],
})
export class CharacterDetailCard {
  character = input.required<CharacterDetail | undefined>();

  characterImages = computed(() => {
    const char = this.character();
    if (!char) return [];

    return [char.image, ...char.transformations.map((t) => t.image)];
  });

  characterData = computed(() => {
    const char = this.character();
    if (!char) return {};

    return {
      name: char.name,
      description: char.description,
      race: char.race,
      gender: char.gender,
      affiliation: char.affiliation,
      ki: char.ki,
      maxKi: char.maxKi,
    };
  });

  selectedState = signal<number>(0);

  actualState = computed(() => {
    const char = this.character();
    if (!char) return undefined;

    if (this.selectedState() === 0) return char;

    return char.transformations[this.selectedState() - 1];
  });

  showDescription = signal(false);

  toggleDescription() {
    this.showDescription.set(!this.showDescription());
  }
}
