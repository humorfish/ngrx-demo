import {Action} from '@ngrx/store';
import {Book} from '../components/book';

export const ADD_BOOK =             '[Collection] Add Book';
export const ADD_BOOK_SUCCESS =     '[Collection] Add Book Success';
export const ADD_BOOK_FAIL =        '[Collection] Add Book Fail';


export class AddBookAction implements Action {
    readonly type: string = ADD_BOOK;

    constructor(public payload: Book) {}
}

export class AddBookSuccessAction implements Action {
    readonly type = ADD_BOOK_SUCCESS;

    constructor(public payload: Book) { }
  }

export class AddBookFailAction implements Action {
    readonly type = ADD_BOOK_FAIL;

    constructor(public payload: Book) { }
}
