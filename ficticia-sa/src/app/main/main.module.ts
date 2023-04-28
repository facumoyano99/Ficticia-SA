import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PrimengModule } from '../primeng/primeng.module';
import { AppModule } from '../app.module';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CreateClientComponent } from './create-client/create-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

@NgModule({
  declarations: [MainComponent, CreateClientComponent, EditClientComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MainModule {}
