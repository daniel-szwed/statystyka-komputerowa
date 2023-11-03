import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { SvgDisplayComponent } from './svg-display/svg-display.component';
import { RoundToOneDecimalPipe } from './round-to-one-decimal.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SvgDisplayComponent,
    ResultComponent,
    HomeComponent,
    RoundToOneDecimalPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
