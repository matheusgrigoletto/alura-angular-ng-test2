import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange, SimpleChanges } from '@angular/core';

import { Photo } from './interfaces/photo';
import { PhotoBoardModule } from './photo-board.module';
import { PhotoBoardComponent } from './photo-board.component';

function buildPhotoList(): Photo[] {
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

describe(PhotoBoardComponent.name, () => {
  let component: PhotoBoardComponent;
  let fixture: ComponentFixture<PhotoBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoBoardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`Should display rows and columns when (@Input photos) has value`, () => {
    component.photos = buildPhotoList();
    fixture.detectChanges();
    const change: SimpleChanges = {
      photos: new SimpleChange([], component.photos, true),
    };
    component.ngOnChanges(change);

    expect(component.rows.length).withContext('### Number of rows ###').toBe(2);

    // ===> nesse caso, faz sentido ter mais de um expect <===

    expect(component.rows[0].length)
      .withContext('### Number of columns from the first row ###')
      .toBe(4);

    expect(component.rows[1].length)
      .withContext('### Number of columns from the second row ###')
      .toBe(4);
  });
});
