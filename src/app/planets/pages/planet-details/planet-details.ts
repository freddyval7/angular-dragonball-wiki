import { Component, inject } from '@angular/core';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DragonBallService } from '../../../services/dragonball.service';
import { PlanetDetailCard } from './components/planet-detail-card/planet-detail-card';

@Component({
  selector: 'app-planet-details',
  imports: [PlanetDetailCard],
  templateUrl: './planet-details.html',
})
export class PlanetDetails {
  dragonBallService = inject(DragonBallService);

  activatedRoute = inject(ActivatedRoute);

  planetId = toSignal(this.activatedRoute.params.pipe(map(({ id }) => id)));

  planetResource = rxResource({
    params: () => this.planetId,
    stream: () => {
      return this.dragonBallService.getPlanetById(this.planetId());
    },
  });
}
