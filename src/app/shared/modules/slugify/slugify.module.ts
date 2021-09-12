import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SlugifyPipe } from '@modules/slugify/slugify.pipe';

@NgModule({
  declarations: [
    SlugifyPipe,
  ],
  imports: [
    CommonModule,
  ],
})
export class SlugifyModule {
}
