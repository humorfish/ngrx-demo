import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material.module';
import {PipesModule} from '../pipes';

import {ViewBookComp} from './view-book.comp';
import {CollectionComp} from './collection.comp';
import {NotFoundComp} from './not-found.comp';
import {SelectedActionComp} from './selected-book.comp';
import {FindBookComp} from './find-book.comp';
import {ComponentsModule} from '../components';

export const PAGES = [
	CollectionComp,
	NotFoundComp,
	ViewBookComp,
	SelectedActionComp,
	FindBookComp
];

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialModule,
		RouterModule,
		PipesModule,
		ComponentsModule
	  ],
	declarations: PAGES,
	exports: PAGES
})
export class PagesModule
{}
