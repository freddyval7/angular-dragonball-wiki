import { Component, inject } from '@angular/core';
import { CharacterDetailCard } from './components/character-detail-card/character-detail-card';
import { ActivatedRoute } from '@angular/router';
import { DragonBallService } from '../../../services/dragonball.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-character-details',
  imports: [CharacterDetailCard],
  templateUrl: './character-details.html',
})
export class CharacterDetails {
  dragonBallService = inject(DragonBallService);

  activatedRoute = inject(ActivatedRoute);

  characterId = toSignal(this.activatedRoute.params.pipe(map(({ id }) => id)));

  characterResource = rxResource({
    params: () => this.characterId,
    stream: () => {
      return this.dragonBallService.getCharacterById(this.characterId());
    },
  });
}
