import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BytesPipeModule } from '@modules/bytes/bytes.module';
import { MarkdownModule } from 'ngx-markdown';

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
    MarkdownModule.forChild(),
  ],
})
export class MessageListModule {
}
