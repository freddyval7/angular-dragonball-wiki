import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './layout.html',
})
export class Layout implements OnInit {
  router = inject(Router);

  ngOnInit(): void {
    if (this.router.url === '/') {
      this.router.navigate(['/characters']);
    }
  }
}
