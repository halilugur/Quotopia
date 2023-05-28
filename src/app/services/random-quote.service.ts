import { Injectable } from '@angular/core';
import { Quote } from '../models/Quote';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class RandomQuoteService {
  private readonly API_URL = 'https://api.quotable.io/quotes/random';
  constructor() {}

  /**
   * get a random quote from api
   *
   * @returns a random quote
   */
  async getRandomQuote(): Promise<Quote> {
    let quotes: Quote[] = [];
    await axios.get(this.API_URL).then((response) => (quotes = response.data));
    return quotes[0];
  }
}
