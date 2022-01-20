import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutoFocusModule } from '@modules/auto-focus/auto-focus.module';
import { MessageListModule } from '@modules/message-list/message-list.module';
import { ModelDebounceModule } from '@modules/model-debounce/model-debounce.module';
import { UploadModule } from '@modules/upload/upload.module';

import { RoomRoutingModule } from 'src/app/room/room-routing.module';
import { RoomComponent } from 'src/app/room/room.component';


@NgModule({
  declarations: [
    RoomComponent,
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    FormsModule,
    FontAwesomeModule,
    UploadModule,
    MessageListModule,
    ModelDebounceModule,
    AutoFocusModule,
  ],
})
export class RoomModule { }
