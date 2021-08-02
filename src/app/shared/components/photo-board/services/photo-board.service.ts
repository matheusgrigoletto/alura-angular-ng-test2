import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Photo } from '../interfaces/photo';

const API_URL = 'http://localhost:3000';

@Injectable()
export class PhotoBoardService {
  constructor(protected http: HttpClient) {}

  getPhotos(): Observable<Photo[]> {
    return this.http
      .get<Photo[]>(`${API_URL}/photos`)
      .pipe(
        map((photos: Photo[]) => {
          return photos.map((photo: Photo) => {
            return { ...photo, description: photo.description.toUpperCase() };
          });
        })
      )
      .pipe(delay(2000));
  }
}
