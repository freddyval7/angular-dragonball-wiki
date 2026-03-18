import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { DBResponse, Item } from '../interfaces/dragonballResponse.interface';
import { CharacterDetail } from '../interfaces/characterDetail.interface';
import { Planet, PlanetResponse } from '../interfaces/planets.interface';

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
  private cacheCharacters = new Map<string, Item[]>();
  private cacheCharacterDetail = new Map<string, CharacterDetail>();
  private cachePlanets = new Map<string, Planet[]>();
  private cachePlanetDetail = new Map<string, Planet>();

  getCharacters(options: Options) {
    const { limit = 100, page = 1, gender = '', race = '', affiliation = '', name = '' } = options;

    const key = `${limit}-${page}-${gender}-${race}-${affiliation}-${name}`;
    if (this.cacheCharacters.has(key)) {
      return of(this.cacheCharacters.get(key));
    }

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
        tap((response) => {
          this.cacheCharacters.set(key, response);
        }),
      );
  }

  getCharacterById(id: string): Observable<CharacterDetail> {
    const key = `${id}`;

    if (this.cacheCharacterDetail.has(key)) {
      return of(this.cacheCharacterDetail.get(key)!);
    }
    return this.http.get<CharacterDetail>(`${baseUrl}/characters/${id}`).pipe(
      tap((response) => {
        this.cacheCharacterDetail.set(key, response);
      }),
    );
  }

  getPlanets(options: Options) {
    const { limit = 100, page = 1, name = '' } = options;
    const key = `${name}-${limit}`;

    if (this.cachePlanets.has(key)) {
      return of(this.cachePlanets.get(key)!);
    }

    let params = new HttpParams().set('limit', limit.toString()).set('page', page.toString());

    if (name) {
      params = params.set('name', name);
    }

    return this.http
      .get<PlanetResponse>(`${baseUrl}/planets`, {
        params,
      })
      .pipe(
        map((response) => {
          return this.extractPlanets(response);
        }),
        tap((response) => {
          this.cachePlanets.set(key, response);
        }),
      );
  }

  private extractCharacters(response: DBResponse) {
    // Verificar si la respuesta es un array (respuesta filtrada)
    if (Array.isArray(response)) {
      return response;
    }

    // Si es paginada, retornar los items
    return response.items;
  }

  private extractPlanets(response: PlanetResponse) {
    // Verificar si la respuesta es un array (respuesta filtrada)
    if (Array.isArray(response)) {
      return response;
    }

    // Si es paginada, retornar los items
    return response.items;
  }
}
