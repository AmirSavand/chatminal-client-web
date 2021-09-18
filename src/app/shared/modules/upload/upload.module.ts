import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UploadDirective } from './upload.directive';

@NgModule({
  declarations: [
    UploadDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UploadDirective,
  ],
})
export class UploadModule {
}
