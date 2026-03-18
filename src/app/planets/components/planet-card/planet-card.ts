import { Component, input } from '@angular/core';
import { Planet } from '../../../interfaces/planets.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'planet-card',
  imports: [RouterLink],
  templateUrl: './planet-card.html',
})
export class PlanetCard {
  planet = input.required<Planet>();
}
