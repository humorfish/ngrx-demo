import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {AppComponent} from './app.component';
import {ComponentsModule} from './components';
import {MaterialModule} from './material.module';

import { GoogleBookService } from './service/google-books';
import { DBModule } from '@ngrx/db';
import { schema } from './db';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
	BrowserModule,
	BrowserAnimationsModule,
	HttpClientModule,
    MaterialModule,
    ComponentsModule,
	RouterModule.forRoot([], {useHash: true}),
	StoreModule.forRoot(reducer),
	DBModule.provideDB(schema),
  ],
  providers: [GoogleBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
