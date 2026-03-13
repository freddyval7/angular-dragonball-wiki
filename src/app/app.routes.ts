import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { CharacterDetails } from './characters/pages/character-details/character-details';
import { PlanetsPage } from './planets/pages/planets-page/planets-page';
import { PlanetDetails } from './planets/pages/planet-details/planet-details';
import { CharactersPage } from './characters/pages/characters-page/characters-page';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: 'characters',
        component: CharactersPage,
        title: 'DB Wiki',
      },
      {
        path: 'characters/:id',
        component: CharacterDetails,
        title: 'Character',
      },
      {
        path: 'planets',
        component: PlanetsPage,
        title: 'Planets',
      },
      {
        path: 'planets/:id',
        component: PlanetDetails,
        title: 'Planet',
      },
    ],
  },
  { path: '**', redirectTo: '/characters' },
];
