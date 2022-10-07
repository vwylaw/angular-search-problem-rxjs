import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Photo } from '../model/Photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private httpCllient: HttpClient) {}

  search(input: string): Observable<Photo[]> {
    return this.httpCllient
      .get<Photo[]>(
        'https://jsonplaceholder.typicode.com/albums/' +
          (input.length % 100) +
          '/photos'
      )
      .pipe(tap((val) => console.log('Search executed: ' + input)));
  }
}
