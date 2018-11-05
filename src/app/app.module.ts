import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {DBModule} from '@ngrx/db';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {ComponentsModule} from './components';
import {MaterialModule} from './material.module';

import {GoogleBookService} from './service/google-books';
import {schema} from './db';
import {reducer} from './reducers';
import {BookEffects} from './effects/books';
import {CollectionEffects} from './effects/collection';
import {BookExistsGuard} from './guards/book-exists';

import {CollectionComp} from './pages/collection.comp';

import {PagesModule} from './pages';
import {FindBookComp} from './pages/find-book.comp';
import {ViewBookComp} from './pages/view-book.comp';
import {NotFoundComp} from './pages/not-found.comp';

export const ROUTES = [
	{
		path: '',
		component: CollectionComp
	},
	{
		path: 'book/find',
		component: FindBookComp
	},
	{
		path: 'book/:id',
		canActivate: [BookExistsGuard],
		component: ViewBookComp
	},
	{
		path: '**',
		component: NotFoundComp
	},
];

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
	PagesModule,
	RouterModule.forRoot(ROUTES, {useHash: true}),
	StoreModule.forRoot(reducer),
	EffectsModule.forRoot([BookEffects]),
	EffectsModule.forRoot([CollectionEffects]),
	StoreDevtoolsModule.instrument(),
	DBModule.provideDB(schema),
  ],
  providers: [BookExistsGuard, GoogleBookService],
  bootstrap: [AppComponent]
})
export class AppModule {}
