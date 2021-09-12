import { NgModule } from '@angular/core';

import { FilterPipe } from '@modules/filter/filter.pipe';

@NgModule({
  declarations: [
    FilterPipe,
  ],
  exports: [
    FilterPipe,
  ],
})
export class FilterModule {
}
