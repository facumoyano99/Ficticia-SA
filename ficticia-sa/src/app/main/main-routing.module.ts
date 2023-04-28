import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent,
      // },
    ],
  },
  {
    path: 'createClient',
    component: CreateClientComponent,
  },
  {
    path: 'editClient/:id',
    component: EditClientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
