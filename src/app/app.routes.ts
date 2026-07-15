import { Routes } from '@angular/router';
import { KetoListing } from './keto-listing/keto-listing';
import { KetoDetails } from './keto-details/keto-details';
import { KetoEdit } from './keto-edit/keto-edit';
import { KetoCreate } from './keto-create/keto-create';

export const routes: Routes = [
        {
        path: '',
        component: KetoListing,
        title: 'Keto Listing',
    },
    {
        path: 'keto/create',
        component: KetoCreate,
        title: 'Keto Create'
    },
    {
        path: 'keto/:id',
        component: KetoDetails,
        title: 'Keto Details',
    },
    {
        path: 'keto/edit/:id',
        component: KetoEdit,
        title: 'Keto Edit'
    }
];
