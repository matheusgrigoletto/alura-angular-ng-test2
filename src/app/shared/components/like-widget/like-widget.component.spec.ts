import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeWidgetComponent } from './like-widget.component';
import { LikeWidgetModule } from './like-widget.module';

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  it(`#${LikeWidgetComponent.prototype.like.name}
    should trigger (@Output liked) when called`, () => {
    spyOn(component.liked, 'emit');
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  });

  it(`[DOM] Should display number of likes when clicked`, (done) => {
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges();
      const counterElem: HTMLElement =
        fixture.nativeElement.querySelector('.like-counter');
      expect(counterElem.textContent.trim()).toBe('1');
      done();
    });

    const likeWidgetContainer: HTMLElement =
      fixture.nativeElement.querySelector('.like-widget-container');
    likeWidgetContainer.click();
  });

  it(`[DOM] Should display number of likes when ENTER key is pressed`, (done) => {
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges();
      const counterElem: HTMLElement =
        fixture.nativeElement.querySelector('.like-counter');
      expect(counterElem.textContent.trim()).toBe('1');
      done();
    });

    const likeWidgetContainer: HTMLElement =
      fixture.nativeElement.querySelector('.like-widget-container');

    const event: KeyboardEvent = new KeyboardEvent('keyup', {
      key: 'Enter',
    });

    likeWidgetContainer.dispatchEvent(event);
  });
});
