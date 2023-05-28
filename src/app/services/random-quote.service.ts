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
   * Retrieves a random quote from the API.
   *
   * @returns A Promise that resolves to a random quote object.
   */
  async getRandomQuote(): Promise<Quote> {
    let quotes: Quote[] = [];
    await axios.get(this.API_URL).then((response) => (quotes = response.data));
    return quotes[0];
  }
}
