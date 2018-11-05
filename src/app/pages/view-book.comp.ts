import {OnDestroy, Component, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store, select} from '@ngrx/store';

import * as fromRoot from '../reducers';
import * as book from '../actions/book';
import {map} from 'rxjs/operators';

@Component({
	selector: 'app-view-book',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<app-selected-book></app-selected-book>
	`
})
export class ViewBookComp implements OnDestroy
{
	actionSub$: Subscription;

	constructor(store: Store<fromRoot.State>, route: ActivatedRoute)
	{
		this.actionSub$ = route.params
			.pipe(
				select<string>('id'),
				map(id => new book.SearchAction(id))
			)
			.subscribe(store);
	}

	ngOnDestroy()
	{
		this.actionSub$.unsubscribe();
	}
}
