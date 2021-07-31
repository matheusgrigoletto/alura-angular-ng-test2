import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { PhotoFrameModule } from './photo-frame.module';
import { PhotoFrameComponent } from './photo-frame.component';

describe(PhotoFrameComponent.name, () => {
  let component: PhotoFrameComponent;
  let fixture: ComponentFixture<PhotoFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`#${PhotoFrameComponent.prototype.like.name}
    should trigger (@Output liked) once when called multiple times within debounce time`, fakeAsync(() => {
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    component.like();
    tick(500);
    expect(times).toBe(1);
  }));

  it(`#${PhotoFrameComponent.prototype.like.name}
    should trigger (@Output liked) twice when called outside debounce time`, fakeAsync(() => {
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    tick(500);
    component.like();
    tick(500);
    expect(times).toBe(2);
  }));

  it(`[DOM] Should display number of likes when (@Input likes) is incremented`, () => {
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement =
      fixture.nativeElement.querySelector('.like-counter');
    expect(element.textContent.trim()).toBe('1');
  });

  it(`[DOM] Should update aria-label when (@Input likes) is incremented`, () => {
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement =
      fixture.nativeElement.querySelector('.like-counter');

    expect(element.getAttribute('aria-label')).toBe('1: people liked');
  });

  it(`[DOM] Should have aria-label with 0 (@Input likes)`, () => {
    const element: HTMLElement =
      fixture.nativeElement.querySelector('.like-counter');

    expect(element.getAttribute('aria-label')).toBe('0: people liked');
  });

  it(`[DOM] Should display image with src and description when bound to properties`, () => {
    const description = 'A description';
    const image = 'https://placehold.it/200x200';

    component.description = description;
    component.src = image;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector(
      '.photo-frame__image'
    );

    expect(element.getAttribute('src')).toBe(image);
    expect(element.getAttribute('alt')).toBe(description);
  });
});
