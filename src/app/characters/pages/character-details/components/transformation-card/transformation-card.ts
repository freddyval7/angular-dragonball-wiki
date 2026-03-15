import { Component, input } from '@angular/core';
import { Transformation } from '../../../../../interfaces/characterDetail.interface';

@Component({
  selector: 'transformation-card',
  imports: [],
  templateUrl: './transformation-card.html',
})
export class TransformationCard {
  transformation = input.required<Transformation>();
}
