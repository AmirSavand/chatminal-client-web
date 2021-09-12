import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BadgeComponent } from '@modules/badge/badge.component';

@NgModule({
  declarations: [
    BadgeComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BadgeComponent,
  ],
})
export class BadgeModule {
}
