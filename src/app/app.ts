import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header],
  template: `
    <app-header />
    <main class="max-w-[1200px]! mx-auto">
      <router-outlet />
    </main>
  `,
})
export class App {}
