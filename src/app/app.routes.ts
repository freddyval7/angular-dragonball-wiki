import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Homepage } from './homepage/homepage/homepage';
import { CharactersPage } from './characters/pages/characters-page/characters-page';
import { CharacterDetails } from './characters/pages/character-details/character-details';
import { PlanetsPage } from './planets/pages/planets-page/planets-page';
import { PlanetDetails } from './planets/pages/planet-details/planet-details';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Homepage,
        title: 'Home',
      },
      {
        path: 'characters',
        component: CharactersPage,
        title: 'Characters',
        children: [
          {
            path: ':id',
            component: CharacterDetails,
            title: 'Character',
          },
        ],
      },
      {
        path: 'planets',
        component: PlanetsPage,
        title: 'Planets',
        children: [
          {
            path: ':id',
            component: PlanetDetails,
            title: 'Planet',
          },
        ],
      },
    ],
  },
];
