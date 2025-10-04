import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule
  ],
})
export class AppModule { }
