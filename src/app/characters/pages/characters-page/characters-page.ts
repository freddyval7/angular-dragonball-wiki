import { Component, computed, inject, signal } from '@angular/core';
import { DbCard } from '../../../components/db-card/db-card';
import { rxResource } from '@angular/core/rxjs-interop';
import { DragonBallService } from '../../../services/dragonball.service';
import { RouterOutlet } from '../../../../../node_modules/@angular/router/types/_router_module-chunk';

@Component({
  selector: 'app-charactersPage',
  imports: [DbCard],
  templateUrl: './characters-page.html',
})
export class CharactersPage {
  dragonBallService = inject(DragonBallService);

  dragonBallResource = rxResource({
    stream: () => {
      return this.dragonBallService.getCharacters();
    },
  });

  characters = computed(() => this.dragonBallResource.value()?.items);
}
