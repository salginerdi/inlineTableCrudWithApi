import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {InlineWithApiComponent} from './pages/inline-with-api/inline-with-api.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InlineWithApiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'reusable-comp-crud-with-api';
}
