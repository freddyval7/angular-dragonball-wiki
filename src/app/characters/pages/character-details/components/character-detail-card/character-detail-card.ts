import { Component, computed, input } from '@angular/core';
import { CharacterDetail } from '../../../../../interfaces/characterDetail.interface';
import { Carousel } from '../../../../../shared/navbar/carousel/carousel';

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
}
