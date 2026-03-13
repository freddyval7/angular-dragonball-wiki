import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { DBResponse } from '../interfaces/dragonballResponse.interface';

const baseUrl = 'https://dragonball-api.com/api';

@Injectable({ providedIn: 'root' })
export class DragonBallService {
  private hptt = inject(HttpClient);
  limit = signal('9');

  getCharacters(limitQuery?: string): Observable<DBResponse> {
    if (limitQuery) {
      this.limit.set(limitQuery);
    }

    return this.hptt.get<DBResponse>(`${baseUrl}/characters?limit=${this.limit()}`);
  }
}
