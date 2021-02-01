import { Injectable } from '@angular/core';
import { BOOKS } from './mock-books';
import { Book } from './book'
import { Observable, of, ObservableLike } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient, private messageService: MessageService) { }
  private booksUrl = 'api/books';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  getBooks(): Observable<Book[]> {
    this.messageService.add('BookService: fetched book');
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        tap(_ => this.log('fetched books')),
        catchError(this.handleError<Book[]>('getBooks', [])
        ));
  }

getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Book>(`getHero id=${id}`))
    );
  }

  private log(message: string){
    this.messageService.add(`Bookservice: ${message}`)
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateBook(book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, this.httpOptions).pipe(
      tap(_ => this.log(`updated book=${book.id}`)),
      catchError(this.handleError<any>('updateBook'))
    )
  }

}

