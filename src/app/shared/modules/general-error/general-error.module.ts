import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { GeneralErrorComponent } from '@modules/general-error/general-error.component';



@NgModule({
  declarations: [GeneralErrorComponent],
  exports: [
    GeneralErrorComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
})
export class GeneralErrorModule { }
