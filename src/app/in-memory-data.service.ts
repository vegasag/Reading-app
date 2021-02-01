import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books = [
      { name: "Ole Brumm", published: 2000, id: 1 },
      { name: "Sven Kramer", published: 2010, id: 2 },
      { name: "Ole Bull", published: 1980, id: 3 },
      { name: "Jan Tore Sanner", published: 2010, id:4 },
      { name: "Fredrik Solvang", published: 2018, id:5 },
      { name: "Harry Potter", published: 2002, id: 6 },
      { name: "Jens August", published: 1998, id:7  },
      { name: "Hans Petter Hauge", published: 1900, id:8 },
    ];
    return {books};
  }

  genId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 11;
  }
}