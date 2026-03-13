import { Component, input } from '@angular/core';
import { CharacterResponse } from '../../interfaces/dragonball.interface';

@Component({
  selector: 'db-card',
  imports: [],
  templateUrl: './db-card.html',
})
export class DbCard {
  characters = input.required<CharacterResponse>();
}
