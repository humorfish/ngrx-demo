import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Book} from '../components/book';

import * as fromRoot from '../reducers';
import * as book from '../actions/book';
import {take} from 'rxjs/operators';

@Component({
	selector: 'app-find-book-page',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<app-book-search
			[query]="searchQuery$ | async"
			[searching]="loading$ | async"
			(search)="search($event)"
		></app-book-search>
		<app-book-preview-list [books]="books$ | async"></app-book-preview-list>
	`
})
export class FindBookComp
{
	searchQuery$: Observable<string>;
	books$: Observable<Book[]>;
	loading$: Observable<boolean>;

	constructor(private store: Store<fromRoot.State>)
	{
		this.searchQuery$ = store.select(fromRoot.getSearchQuery).pipe(take(1));
		this.books$ = store.select(fromRoot.getSearchResults);
		this.loading$ = store.select(fromRoot.getSearchLoading);
	}

	search(query: string)
	{
		this.store.dispatch(new book.SearchAction(query));
	}
}
