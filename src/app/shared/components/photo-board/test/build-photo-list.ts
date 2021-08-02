import { Photo } from '../interfaces/photo';

export function buildPhotoList(): Photo[] {
  const photos: Photo[] = [];

  for (let i = 0; i < 8; i++) {
    photos.push({
      id: i,
      description: 'Description for photo ' + i,
      url: 'http://placehold.it/350x150',
    });
  }
  return photos;
}
