import { Observable, empty, of } from 'rxjs';
import {debounceTime, map, switchMap, skip, takeUntil} from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { GoogleBookService } from '../service/google-books';
import * as book from '../actions/book';
import { Injectable } from '@angular/core';

@Injectable()
export class BookEffects
{
	@Effect()
	search$: Observable<Action> = this.actions$
		.ofType(book.SEARCH)
		.pipe(debounceTime(300))
		.pipe(map(toPayload))
		.pipe(switchMap((query: string) => {
			if (query === '') {
				return empty();
			}

			const nextSearch$ = this.actions$.ofType(book.SEARCH).pipe(skip(1));

			return this.googleBooks.searchBooks(query)
				.pipe(takeUntil(nextSearch$))
				.pipe(map(books => new book.SearchCompleteAction(books)))
				.toPromise()
				.catch(() => of(new book.SearchCompleteAction([])));
		}));

	constructor(private actions$: Actions, private googleBooks: GoogleBookService) { }
}
