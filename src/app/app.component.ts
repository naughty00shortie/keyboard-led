import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import { KeyboardComponent } from './keyboard/keyboard.component';
import {TitleComponent} from "./title/title.component";
import {TextComponent} from "./text/text.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    KeyboardComponent,
    TitleComponent,
    TextComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularclient';
}

