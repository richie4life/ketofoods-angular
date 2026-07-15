import { Component, inject } from '@angular/core';
import { Keto } from '../types/keto';
import { KetoService } from '../keto.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-keto-create',
  imports: [ReactiveFormsModule],
  templateUrl: './keto-create.html',
  styleUrl: './keto-create.css',
})
export class KetoCreate {
  ketoService: KetoService = inject(KetoService);
  router: Router = inject(Router)
  newKetoForm: FormGroup;

  constructor() {
    this.newKetoForm = new FormGroup({
      title: new FormControl(''),
      calories: new FormControl(0),
      fat: new FormControl(0),
      protein: new FormControl(0),
      netCarbs: new FormControl(0),
      imageUrl: new FormControl(''),
      ketoImage: new FormControl(null)

    })
  }

  async createKeto(): Promise<void> {
    const newKeto: Keto = {
      ...this.newKetoForm.value
    };
    await this.ketoService.createKeto(newKeto);

    //Redirect to main page / keto listing
    this.router.navigate([''])
  }
  onFileSelected(event: Event) {
    if (event?.target) {
      const element = event.target as HTMLInputElement;
      if (element?.files) {
        const file = element.files[0];
        this.newKetoForm.patchValue({ ketoImage: file});

      }
    }
  }
}
