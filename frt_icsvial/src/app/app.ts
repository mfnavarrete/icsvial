import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.layout.html',
  styleUrl: './app.layout.css'
})
export class App {
  protected readonly currentYear = new Date().getFullYear();
}
