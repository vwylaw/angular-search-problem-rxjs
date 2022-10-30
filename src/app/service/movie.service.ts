import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MovieSearchResponse } from '../model/MovieSearchResponse';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpCllient: HttpClient) {}

  search(input: string): Observable<MovieSearchResponse> {
    return this.httpCllient
      .get<MovieSearchResponse>(`https://www.omdbapi.com?apikey=c887bb44&s=${input}`)
      .pipe(
        tap(() => console.log('Search executed: ' + input))      
      );
  }
}
