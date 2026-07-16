import { Component, inject, signal, computed } from '@angular/core';
import { Keto } from '../types/keto.js';
import { KetoService } from '../keto.service.js';
import { RouterModule } from '@angular/router';
import { KetoOverview } from '../keto-overview/keto-overview.js';

@Component({
  selector: 'app-keto-listing',
  imports: [KetoOverview, RouterModule],
  templateUrl: './keto-listing.html',
  styleUrl: './keto-listing.css',
})
export class KetoListing {
  ketoservice: KetoService = inject(KetoService);
  ketos = signal<Keto[]>([]);
  searchTerm = signal<string>('');

  // Dynamically computed list filtered by search term (matches titles or calorie values)
  filteredKetos = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) {
      return this.ketos();
    }
    return this.ketos().filter((keto) => 
      keto.title?.toLowerCase().includes(term) || 
      keto.calories?.toString().includes(term)
    );
  });

  constructor() {
    this.ketoservice.getKetos()
    .then((ketosData) => {
      this.ketos.set(ketosData);
    });
  }

  updateSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }
}
