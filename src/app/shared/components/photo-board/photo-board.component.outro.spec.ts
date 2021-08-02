import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { Photo } from './interfaces/photo';
import { PhotoBoardModule } from './photo-board.module';
import { PhotoBoardComponent } from './photo-board.component';
import { buildPhotoList } from './test/build-photo-list';

describe(PhotoBoardComponent.name + ' - outros', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoBoardModule],
      declarations: [TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`Should display rows and columns when (@Input photos) has value`, () => {
    component.photos = buildPhotoList();
    fixture.detectChanges();

    expect(component.board.rows.length)
      .withContext('### Number of rows ###')
      .toBe(2);

    // ===> nesse caso, faz sentido ter mais de um expect <===

    expect(component.board.rows[0].length)
      .withContext('### Number of columns from the first row ###')
      .toBe(4);

    expect(component.board.rows[1].length)
      .withContext('### Number of columns from the second row ###')
      .toBe(4);
  });
});

@Component({
  template: ` <app-photo-board [photos]="photos"></app-photo-board> `,
})
class TestComponent {
  @ViewChild(PhotoBoardComponent) board: PhotoBoardComponent;
  photos: Photo[];
}
