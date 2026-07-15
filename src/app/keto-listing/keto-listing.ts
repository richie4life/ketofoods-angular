import { Component, inject, signal } from '@angular/core';
import { Keto } from '../types/keto.js';
import { KETOS } from '../mock-data/mock-ketofoods.js';
import { KetoService } from '../keto.service.js';
import { RouterModule } from '@angular/router';
import { KetoOverview } from '../keto-overview/keto-overview.js';
// import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-keto-listing',
  imports: [KetoOverview, RouterModule],
  templateUrl: './keto-listing.html',
  styleUrl: './keto-listing.css',
})
export class KetoListing {
  ketoservice: KetoService = inject(KetoService);
  ketos = signal<Keto[]>([])

  constructor() {
    this.ketoservice.getKetos()
    .then((ketosData) => {
      this.ketos.set(ketosData);
    });
  }
}
