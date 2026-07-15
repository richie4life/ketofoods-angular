import { Component, inject, signal } from '@angular/core';
import { Keto } from '../types/keto';
import { KetoService } from '../keto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONSTANTS } from '../constants.js';

@Component({
  selector: 'app-keto-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './keto-edit.html',
  styleUrl: './keto-edit.css',
})
export class KetoEdit {
    ketoService: KetoService = inject(KetoService);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  currentKeto = signal<Keto>(CONSTANTS.EMPTY_KETO);
  // TODO: API has the id as a number but when the user creates a keto meal, it is suppose to be a string of uuid v4
  ketoId: string;
  //
  // Marked as optional/nullable to make typescript happy
  // ... acceptable in certain situations but generally bad practice
  ketoForm!: FormGroup

  constructor() {
    this.ketoId = this.route.snapshot.params['id'];
    this.ketoService.getKetoById(this.ketoId)
      .then((ketosData) => {
        this.currentKeto.set(ketosData);
        this.ketoForm = new FormGroup({
          title: new FormControl(this.currentKeto().title),
          calories: new FormControl(this.currentKeto().calories),
          fat: new FormControl(this.currentKeto().fat),
          protein: new FormControl(this.currentKeto().protein),
          netCarbs: new FormControl(this.currentKeto().netCarbs),
        });
      })
  }

  async saveKeto(): Promise<void> {
    const updateKeto: Keto = {
      id: this.currentKeto().id,
      imageUrl: this.currentKeto().image,
      ...this.ketoForm?.value
    };
    await this.ketoService.updateKeto(this.ketoId, updateKeto);

    //Redirect to main page / keto listing
    this.router.navigate([''])
  }
}
