import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [],
  imports: [CommonModule, PasswordModule, ButtonModule,TableModule],
  exports: [PasswordModule, ButtonModule,TableModule],
})
export class PrimengModule {}
