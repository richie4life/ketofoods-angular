import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Keto } from '../types/keto.js';
import { KetoService } from '../keto.service.js';
import { CONSTANTS } from '../constants.js';
import { KETOS } from '../mock-data/mock-ketofoods.js';

@Component({
  selector: 'app-keto-details',
  imports: [RouterModule],
  templateUrl: './keto-details.html',
  styleUrl: './keto-details.css',
})
export class KetoDetails {

  // TODO: Un comment this later
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  ketoService: KetoService = inject(KetoService);
  ketoId: string;
  currentKeto = signal<Keto>(CONSTANTS.EMPTY_KETO);

  constructor() {
    this.ketoId = this.route.snapshot.params['id'];
    this.ketoService.getKetoById(this.ketoId)
      .then((ketoData) => {
        this.currentKeto.set(ketoData);
      });
  }

  async deleteKeto() {
    await this.ketoService.deleteKeto(this.ketoId);
    this, this.router.navigate([''])
  }
}
