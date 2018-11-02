import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromRoot from '../reducers';
import {Book} from '../components/book';

@Component({
	selector: 'app-collection',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<mat-card>
			<mat-card-title>
			My Collection
			</mat-card-title>
		</mat-card>
		<app-book-preview-list [books]="books$ | async"></app-book-preview-list>
	`,
	styles: [
		`
			mat-card-title {
				display: flex;
				justify-content: center;
			}
		`
	]
})
export class CollectionComp
{
	books$: Observable<Book[]>;

	constructor(store: Store<fromRoot.State>)
	{
		this.books$ = store.select(fromRoot.getBookCollection);
	}
}
