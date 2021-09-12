import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';


@NgModule({
  declarations: [
    RoomComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    FormsModule,
  ],
})
export class RoomModule { }
