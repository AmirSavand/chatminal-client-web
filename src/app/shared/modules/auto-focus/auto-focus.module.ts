import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutoFocusDirective } from '@modules/auto-focus/auto-focus.directive';

@NgModule({
  declarations: [
    AutoFocusDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AutoFocusDirective,
  ],
})
export class AutoFocusModule {
}
