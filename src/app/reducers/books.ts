import { createSelector } from 'reselect';
import { Book } from '../components/book';

import * as book from '../actions/book';
import * as collection from '../actions/collection';

export interface State {
	ids: string[];
	entities: {
		[id: string]: Book
	};
	selectedBookId: string | null;
}

export const initialState: State = {
	ids: [],
	entities: {},
	selectedBookId: null
};

export function reducer(state = initialState, action: book.Actions | collection.Actions): State
{
	switch (action.type)
	{
		case book.SEARCH_COMPLETE:
		case collection.LOAD_SUCCESS:
		{
			const books = action.payload;
			// tslint:disable-next-line:no-shadowed-variable
			const newBooks = books.filter((bookT: Book) => !state.entities[bookT.id]);

			const newBookIds = newBooks.map((bookT: Book) => bookT.id);
			const newBookEntities = newBooks.reduce((entities: { [id: string]: Book }, bookT: Book) => {
				return Object.assign(entities, {
					[bookT.id]: book
				});
			}, {});

			return {
				ids: [...state.ids, ...newBookIds],
				entities: Object.assign({}, state.entities, newBookEntities),
				selectedBookId: state.selectedBookId
			};
		}

		case book.LOAD:
		{
			const bookT = action.payload;
			if (state.ids.indexOf(bookT.id) > -1)
			{
				return state;
			}

			return {
				ids: [...state.ids, bookT.id],
				entities: Object.assign({}, state.entities, {
					[bookT.id]: bookT
				}),
				selectedBookId: state.selectedBookId
			};
		}

		case book.SELECT: {
			return {
				ids: state.ids,
				entities: state.entities,
				selectedBookId: action.payload
			};
		}

		default:
			return state;
	}
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getIds = (state: State) => state.ids;
export const getEntities = (state: State) => state.entities;
export const getSelectedId = (state: State) => state.selectedBookId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
	return entities[selectedId];
});
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
	return ids.map(id => entities[id]);
});
