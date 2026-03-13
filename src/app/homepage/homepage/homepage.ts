import { Component } from '@angular/core';
import { DbCard } from '../../components/db-card/db-card';

@Component({
  selector: 'app-homepage',
  imports: [DbCard],
  templateUrl: './homepage.html',
})
export class Homepage {}
