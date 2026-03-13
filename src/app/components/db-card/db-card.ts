import { Component, input } from '@angular/core';
import { Item } from '../../interfaces/dragonballResponse.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'db-card',
  imports: [RouterLink],
  templateUrl: './db-card.html',
})
export class DbCard {
  character = input.required<Item>();
}
