import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { PhotoListModule } from './photo-list.module';
import { PhotoListComponent } from './photo-list.component';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';

describe(PhotoListComponent.name, () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let service: PhotoBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoListModule, HttpClientModule],
    }).compileComponents();

    service = TestBed.inject(PhotoBoardService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`[DOM] Should display board when data arrives`, () => {
    const photos$ = of(buildPhotoList());
    spyOn(service, 'getPhotos').and.returnValue(photos$);

    fixture.detectChanges();

    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('### Should display board ###').not.toBeNull();
    expect(loader).withContext('### Should not display loader ###').toBeNull();
  });

  it(`[DOM] Should display loader while waiting for data`, () => {
    spyOn(service, 'getPhotos').and.returnValue(null);

    fixture.detectChanges();

    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('### Should not display board ###').toBeNull();
    expect(loader).withContext('### Should display loader ###').not.toBeNull();
  });
});
