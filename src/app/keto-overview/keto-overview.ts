import { input, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KETO } from '../mock-data/mock-ketofood.js';
import { Keto } from '../types/keto.js';

@Component({
  selector: 'app-keto-overview',
  imports: [RouterModule],
  templateUrl: './keto-overview.html',
  styleUrl: './keto-overview.css',
})
export class KetoOverview {
  currentKeto = input.required<Keto>();
}
