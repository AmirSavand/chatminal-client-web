import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';

@NgModule({
  declarations: [
    NewComponent,
  ],
  imports: [
    CommonModule,
    NewRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class NewModule {
}
