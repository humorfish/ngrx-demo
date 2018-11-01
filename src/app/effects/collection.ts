import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Database} from '@ngrx/db/src/database';
import {Observable, defer, of} from 'rxjs';

import * as collection from '../actions/collection';
import {startWith, switchMap, toArray, map, mergeMap, catchError} from 'rxjs/operators';
import {Book} from '../components/book';

@Injectable()
export class CollectionEffects
{
	constructor(private actions$: Actions, private db: Database) {}

	@Effect({dispatch: false})
	openDB$: Observable<any> = defer(() => {
		return this.db.open('books_app');
	});

	@Effect()
	loadCollection$: Observable<any> = this.actions$
		.pipe(
			ofType(collection.LOAD),
			startWith(new collection.LoadAction()),
			switchMap(() =>
			{
				return this.db.query('books')
					.pipe(
						toArray(),
						map(((books: Book[]) => new collection.LoadSuccessAction(books))),
						catchError(err => of(new collection.LoadFailAction(err)))
					);
			})
		);

	@Effect()
	addBookToCollection$: Observable<Action> = this.actions$
		.pipe(ofType(collection.ADD_BOOK),
			map((action: collection.AddBookAction) => action.payload),
			mergeMap(book =>
			{
				return this.db.insert('books', [book])
					.pipe(
						map(() => new collection.AddBookSuccessAction(book)),
						catchError(() => of(new collection.AddBookFailAction(book)))
					);
			})
		);

	@Effect()
	removeBookFromCollection$: Observable<Action> = this.actions$
		.pipe(
			ofType(collection.REMOVE_BOOK),
			map((action: collection.RemoveBookAction) => action.payload),
			mergeMap(book =>
			{
				return this.db.executeWrite('books', 'delete', [ book.id ])
					.pipe(
						map(() => new collection.RemoveBookSuccessAction(book)),
						catchError(() => of(new collection.RemoveBookFailAction(book)))
					);
			})
		);

}

