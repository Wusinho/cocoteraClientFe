import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocoteraChatComponent } from './cocotera-chat/cocotera-chat.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CocoteraChatComponent
  ],
  exports: [ CocoteraChatComponent]
})
export class ChatModule { }
