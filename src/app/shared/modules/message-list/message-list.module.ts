import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BytesPipeModule } from '@modules/bytes/bytes.module';

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
    BytesPipeModule,
  ],
})
export class MessageListModule {
}
