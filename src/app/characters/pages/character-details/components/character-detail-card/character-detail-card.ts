import { Component, input } from '@angular/core';
import { CharacterDetail } from '../../../../../interfaces/characterDetail.interface';
import { TransformationCard } from '../transformation-card/transformation-card';

@Component({
  selector: 'character-detail-card',
  imports: [TransformationCard],
  templateUrl: './character-detail-card.html',
})
export class CharacterDetailCard {
  character = input.required<CharacterDetail | undefined>();
}
