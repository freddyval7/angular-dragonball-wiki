import { Component, inject } from '@angular/core';
import { DbCard } from '../../components/db-card/db-card';
import { rxResource } from '@angular/core/rxjs-interop';
import { DragonBallService } from '../../services/dragonball.service';

@Component({
  selector: 'app-homepage',
  imports: [DbCard],
  templateUrl: './homepage.html',
})
export class Homepage {
  dragonBallService = inject(DragonBallService);

  dragonBallResource = rxResource({
    stream: () => {
      return this.dragonBallService.getCharacters();
    },
  });
}
