import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appImageSrcHandler]',
})
export class ImageSrcHandlerDirective implements OnInit {

  @Input() defaultSrc = '/assets/profile.png';

  constructor(private elementRef: ElementRef<HTMLImageElement>) {
  }

  @HostListener('error') onError(): void {
    this.elementRef.nativeElement.src = this.defaultSrc;
  }

  ngOnInit(): void {
    if (!this.elementRef.nativeElement.src) {
      this.onError();
    }
  }
}
