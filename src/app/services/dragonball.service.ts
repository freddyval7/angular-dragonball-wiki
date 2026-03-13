import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterResponse } from '../interfaces/dragonball.interface';

const baseUrl = 'https://www.dragonball-api.com/api';

@Injectable({ providedIn: 'root' })
export class DragonBallService {
  hptt = inject(HttpClient);

  getCharacters(): Observable<CharacterResponse[]> {
    return this.hptt.get<CharacterResponse[]>(`${baseUrl}/characters`);
  }
}
