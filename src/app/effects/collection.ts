import { LoadSuccessAction } from './../actions/collection';
import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Database} from '@ngrx/db/src/database';
import {Observable, defer, of} from 'rxjs';

import * as collection from '../actions/collection';
import {startWith, switchMap, toArray, map, mergeMap} from 'rxjs/operators';
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
		.pipe(ofType(collection.LOAD))
		.pipe(startWith(new collection.LoadAction()))
		.pipe(switchMap(() =>
		{
			return this.db.query('books')
				.pipe(toArray())
				.pipe(map(((books: Book[]) => new collection.LoadSuccessAction(books))))
				.toPromise()
				.catch(err => of(new collection.LoadFailAction(err)));
		}));

	@Effect()
	addBookToCollection$: Observable<Action> = this.actions$
		.pipe(ofType(collection.ADD_BOOK))
		.pipe(map((action: collection.AddBookAction) => action.payload))
		.pipe(mergeMap(book =>
		{
			return this.db.insert('books', [book])
				.pipe(map(() => new collection.AddBookSuccessAction(book)))
				.toPromise()
				.catchE()

		}))
}

