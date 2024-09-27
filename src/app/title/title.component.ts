import { Component } from '@angular/core';
import { NgxShinyTextComponent } from '@omnedia/ngx-shiny-text';
import { NgxGradientTextComponent } from '@omnedia/ngx-gradient-text';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [NgxShinyTextComponent,
    NgxGradientTextComponent],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {

}
