/**
 * Created by a4p2 on 8/2/2017.
 */


import {Directive, ElementRef, Output, EventEmitter, Input} from "@angular/core";
@Directive({
  selector : '[infinite-scroll]',
  host : {
    '(scroll)' : 'onScroll($event)'
  }
})

export class InfiniteScrollDirective {
  public element : any ;
  @Output() onScrollMethod = new EventEmitter();
  @Input() lang : string;
  constructor (private el : ElementRef){
      this.element = this.el.nativeElement ;
  }
  onScroll($event){
    if(this.lang == 'ar' && this.element.scrollLeft < 50 ){
      this.onScrollMethod.emit();
    }
    else if(this.lang == 'en' && this.element.scrollLeft == (this.element.scrollWidth - this.element.clientWidth)){
      this.onScrollMethod.emit();
    }
  }
}
