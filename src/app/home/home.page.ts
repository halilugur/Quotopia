import { RandomQuoteService } from './../services/random-quote.service';
import { Component } from '@angular/core';
import { Quote } from '../models/Quote';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public quote: Quote | undefined;

  constructor(private quoteService: RandomQuoteService) {
    this.quoteService.getRandomQuote().then((quote) => {
      this.quote = quote;
    });
  }
}
