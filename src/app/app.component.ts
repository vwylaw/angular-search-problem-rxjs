import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { MovieSearchResponse } from './model/MovieSearchResponse';
import { MovieService } from './service/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // use the movieSearchResponse Observable directly in the template directly using the async pipe
  results$: Observable<MovieSearchResponse>;
  // results: MovieSearchResponse;

  //switch to use angular reactive form
  search: FormControl = new FormControl('');

  constructor(private movieService: MovieService) {
    this.results$ = this.search.valueChanges.pipe(
      debounceTime(250), // debounce input to prevent unneccessary call
      map((input) => input.trim()), // trim input 
      distinctUntilChanged(), // prevent unneccessary call if input is same as the previous
      switchMap((input) =>
        input === ''
          ? of(new MovieSearchResponse()) 
          : movieService.search(input) // only call if input is not empty
      )
    );
  }

  // regarding the previous implementation, besides the performance issues
  // where a search is performed on every keyup event. most critically 
  // it could result in a race condition where response from an old request
  // may arrive at a later time affecting the correctness of the application
  //
  // doSearch(input: string): void {
  //   this.movieService
  //     .search(input)
  //     .subscribe((results: MovieSearchResponse) => (this.results = results));
  // }
}
