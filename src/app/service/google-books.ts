import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from '../components/book';


@Injectable()
export class GoogleBookService
{
	private API_PATH = 'https://www.googleapis.com/books/v1/volumes';

	constructor(private httpClient: HttpClient) {}

	searchBooks(queryTile: string): Observable<Book[]>
	{
		return this.httpClient.get(`${this.API_PATH}?q=${queryTile}`).pipe(map((res: any) => res.items || []));
	}

	retrieveBook(volumeId: string): Observable<Book>
	{
		return this.httpClient.get(`${this.API_PATH}/${volumeId}`).pipe(map((res: Book) => res));
	}
}
