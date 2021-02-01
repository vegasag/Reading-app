import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service'
import { Book } from '../book';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService, private messageService: MessageService ) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

}

