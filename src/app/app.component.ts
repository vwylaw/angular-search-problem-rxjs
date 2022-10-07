import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
} from 'rxjs';
import { Photo } from './model/Photo';
import { PhotoService } from './service/photo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  photos$: Observable<Photo[]>;

  search: FormControl = new FormControl('');

  constructor(private photoService: PhotoService) {
    this.photos$ = this.search.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((input) => photoService.search(input))
    );
  }
}
