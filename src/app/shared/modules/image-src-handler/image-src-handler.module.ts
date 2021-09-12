import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImageSrcHandlerDirective } from '@modules/image-src-handler/image-src-handler.directive';

@NgModule({
  declarations: [
    ImageSrcHandlerDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ImageSrcHandlerDirective,
  ],
})
export class ImageSrcHandlerModule {
}
