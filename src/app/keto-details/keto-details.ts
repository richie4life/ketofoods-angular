import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Keto } from '../types/keto.js';
import { KetoService } from '../keto.service.js';
import { CONSTANTS } from '../constants.js';

@Component({
  selector: 'app-keto-details',
  imports: [RouterModule],
  templateUrl: './keto-details.html',
  styleUrl: './keto-details.css',
})
export class KetoDetails {
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  ketoService: KetoService = inject(KetoService);
  ketoId: string;
  currentKeto = signal<Keto>(CONSTANTS.EMPTY_KETO);

  // Compute total macro weight to display percentage breakdown
  totalWeight = computed(() => {
    const k = this.currentKeto();
    return (k.fat || 0) + (k.protein || 0) + (k.netCarbs || 0) || 1;
  });

  fatPercent = computed(() => Math.round(((this.currentKeto().fat || 0) / this.totalWeight()) * 100));
  proteinPercent = computed(() => Math.round(((this.currentKeto().protein || 0) / this.totalWeight()) * 100));
  carbsPercent = computed(() => Math.round(((this.currentKeto().netCarbs || 0) / this.totalWeight()) * 100));

  constructor() {
    this.ketoId = this.route.snapshot.params['id'];
    this.ketoService.getKetoById(this.ketoId)
      .then((ketoData) => {
        this.currentKeto.set(ketoData);
      });
  }

  async deleteKeto() {
    await this.ketoService.deleteKeto(this.ketoId);
    this.router.navigate(['']);
  }
}
