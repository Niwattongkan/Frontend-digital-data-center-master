import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective {
  @Input() public appAutoFocus: boolean;
  constructor( private el: ElementRef ) { }
  public ngAfterContentInit() {

    setTimeout(() => {

      this.el.nativeElement.focus();

    }, 500);

  }
}
