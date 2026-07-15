import { inject, Service } from '@angular/core';
import { KETOS } from './mock-data/mock-ketofoods.js';
import { Keto } from './types/keto.js';
import { HttpClient } from '@angular/common/http';

@Service()
export class KetoService {
    private http = inject(HttpClient)
    baseurl = '/api/v1/ketoFoods';
    ketos: Keto[] = KETOS;

    async getKetos(): Promise<Keto[]> {
        const data = await fetch(`${this.baseurl}`)
        return await data.json()
    }

    async getKetoById(id: string): Promise<Keto> {
        const data = await fetch(`${this.baseurl}/${id}`)
        return await data.json();
    }

    deleteKeto(id: string): Promise<void> {
        // New Promise to prevent race condition
        return new Promise((resolve) => {
            this.http.delete(`${this.baseurl}/${id}`)
                .subscribe(() => {
                    resolve()
                });
        });
    }

    updateKeto(id: string, updatedKeto: Keto): Promise<void> {
        // New Promise to prevent race condition
        return new Promise((resolve) => {
            this.http.patch(`${this.baseurl}/${id}`, updatedKeto, {
                keepalive: true,
            })
                .subscribe(() => {
                    resolve()
                });
        });
    }

    createKeto(newKeto: Keto): Promise<void> {
        // New Promise to prevent race condition
        return new Promise((resolve) => {
            const formData = new FormData();
            Object.keys(newKeto).forEach((prop) => {
                const value = newKeto[prop as keyof Keto];

                if (value == undefined) {
                    return;
                }

                formData.append(prop, value instanceof Blob ? value : String(value));
            });
            this.http.post(this.baseurl, formData, {
                keepalive: true,
            })
                .subscribe(() => {
                    resolve();
                });
        });
    }
}
