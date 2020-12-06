import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxInfiToastModule } from 'projects/ngx-infi-toast/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxInfiToastModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
