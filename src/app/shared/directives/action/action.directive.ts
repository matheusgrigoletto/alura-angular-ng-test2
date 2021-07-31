import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appAction]',
})
export class ActionDirective {
  @Output() appAction: EventEmitter<Event> = new EventEmitter<Event>();

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    this.appAction.emit(event);
  }

  @HostListener('keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    this.appAction.emit(event);
  }
}
