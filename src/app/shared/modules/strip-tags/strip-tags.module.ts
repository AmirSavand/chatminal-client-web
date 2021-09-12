import { NgModule } from '@angular/core';
import { StripTagsPipe } from './strip-tags.pipe';

@NgModule({
  declarations: [
    StripTagsPipe,
  ],
  exports: [
    StripTagsPipe,
  ],
})
export class StripTagsModule {
}
