import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModelDebounceModule } from '@modules/model-debounce/model-debounce.module';
import { SelectModule } from '@modules/select/select.module';

import { FiltersComponent } from '@modules/filters/filters.component';

@NgModule({
  declarations: [
    FiltersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModelDebounceModule,
    SelectModule,
  ],
  exports: [
    FiltersComponent,
  ],
})
export class FiltersModule {
}
