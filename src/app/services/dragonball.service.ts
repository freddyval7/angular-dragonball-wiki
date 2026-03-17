import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DBResponse, Item } from '../interfaces/dragonballResponse.interface';
import { CharacterDetail } from '../interfaces/characterDetail.interface';

const baseUrl = 'https://dragonball-api.com/api';

interface Options {
  page?: number;
  limit?: number;
  gender?: string;
  race?: string;
  affiliation?: string;
  name?: string;
}

@Injectable({ providedIn: 'root' })
export class DragonBallService {
  private http = inject(HttpClient);

  getCharacters(options: Options) {
    const { limit = 9, page = 1, gender = '', race = '', affiliation = '', name = '' } = options;

    let params = new HttpParams().set('limit', limit.toString()).set('page', page.toString());

    if (gender) {
      params = params.set('gender', gender);
    }

    if (race) {
      params = params.set('race', race);
    }

    if (affiliation) {
      params = params.set('affiliation', affiliation);
    }

    if (name) {
      params = params.set('name', name);
    }

    return this.http
      .get<DBResponse>(`${baseUrl}/characters`, {
        params,
      })
      .pipe(
        map((response) => {
          return this.extractCharacters(response);
        }),
      );
  }

  getCharacterById(id: string): Observable<CharacterDetail> {
    return this.http.get<CharacterDetail>(`${baseUrl}/characters/${id}`);
  }

  private extractCharacters(response: DBResponse) {
    // Verificar si la respuesta es un array (respuesta filtrada)
    if (Array.isArray(response)) {
      console.log('response is array');
      return response;
    }

    // Si es paginada, retornar los items
    console.log('response is not array');
    return response.items;
  }
}
