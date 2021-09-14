import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RoomRoutingModule } from 'src/app/room/room-routing.module';
import { RoomComponent } from 'src/app/room/room.component';


@NgModule({
  declarations: [
    RoomComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    FormsModule,
    FontAwesomeModule,
  ],
})
export class RoomModule { }
