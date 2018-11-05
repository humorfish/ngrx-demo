import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {Book} from '../components/book';
import * as fromRoot from '../reducers';
import * as collection from '../actions/collection';

@Component({
	selector: 'app-selected-book',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<app-book-detail
			[book]="book$ | async"
			[inCollection]="isSelectedBookInCollection$ | async"
			(add)="addToCollection($event)"
			(remove)="removeFromCollection($event)"
		>
		</app-book-detail>
	`
})
export class SelectedActionComp
{
	book$: Observable<Book>;
	isSelectedBookInCollection$: Observable<boolean>;

	constructor(private store: Store<fromRoot.State>)
	{
		this.book$ = store.select(fromRoot.getSelectedBook);
		this.isSelectedBookInCollection$ = store.select(fromRoot.isSelectedBookInCollection);
	}

	addToCollection(book: Book)
	{
		this.store.dispatch(new collection.AddBookAction(book));
	}

	removeFromCollection(book: Book)
	{
		this.store.dispatch(new collection.RemoveBookAction(book));
	}
}
