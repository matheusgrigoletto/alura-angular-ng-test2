import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDirectiveModule } from './action.module';
import { ActionDirective } from './action.directive';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe(ActionDirective.name, () => {
  let fixture: ComponentFixture<TestComponent> = null;
  let component: TestComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionDirectiveModule],
      declarations: [TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`[DOM] (@Output appAction) should emit event with payload when ENTER key is pressed`, () => {
    /*const divElem: HTMLElement = fixture.nativeElement.querySelector(
      'div.dummy-component'
    );*/
    const divElem: HTMLElement = fixture.debugElement.query(
      By.directive(ActionDirective)
    ).nativeElement;

    const event: KeyboardEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    divElem.dispatchEvent(event);

    expect(component.hasEvent()).toBeTrue();
  });

  it(`[DOM] (@Output appAction) should emit event with payload when clicked`, () => {
    const divElem: HTMLElement = fixture.nativeElement.querySelector(
      'div.dummy-component'
    );
    const event: Event = new Event('click');
    divElem.dispatchEvent(event);

    expect(component.hasEvent()).toBeTrue();
  });

  // Não é uma boa prática ter mais de um expect no mesmo teste, mas é um exemplo
  it(`[DOM] (@Output appAction) should emit event with payload when clicked or ENTER key is pressed`, () => {
    const divElem: HTMLElement = fixture.nativeElement.querySelector(
      'div.dummy-component'
    );

    const clickEvent: Event = new Event('click');
    divElem.dispatchEvent(clickEvent);

    expect(component.hasEvent()).withContext('### Click event ###').toBeTrue();

    component.clearEvent();

    const keyboardEvent: KeyboardEvent = new KeyboardEvent('keyup', {
      key: 'Enter',
    });
    divElem.dispatchEvent(keyboardEvent);

    expect(component.hasEvent())
      .withContext('### Keyboard event "keyup" ###')
      .toBeTrue();
  });
});

@Component({
  template: `<div
    class="dummy-component"
    (appAction)="actionHandler($event)"
  ></div>`,
})
class TestComponent {
  private event: Event = null;

  actionHandler(event: Event) {
    this.event = event;
  }

  hasEvent(): boolean {
    return !!this.event;
  }

  clearEvent() {
    this.event = null;
  }
}
