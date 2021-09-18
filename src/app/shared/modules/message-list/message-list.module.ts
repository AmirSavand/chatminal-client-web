import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MessageListComponent } from './message-list.component';

@NgModule({
  declarations: [
    MessageListComponent,
  ],
  exports: [
    MessageListComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class MessageListModule {
}
