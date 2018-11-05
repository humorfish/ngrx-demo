import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromRoot from './reducers';
import * as layout from './actions/layout';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent
{
	showSidenav$: Observable<boolean>;

	constructor(private store: Store<fromRoot.State>)
	{
		this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
	}

	closeSidenav()
	{
		this.store.dispatch(new layout.CloseSidenavAction());
	}

	openSidenav()
	{
		this.store.dispatch(new layout.OpenSidenavAction());
	}
}
