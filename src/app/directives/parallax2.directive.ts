import {ViewContainerRef, Directive, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective implements AfterViewInit {
  el: HTMLElement;
  img: HTMLImageElement;
  imgOrgWidth: any;
  imgOrgHeight: any;

  constructor(
    private viewContainer: ViewContainerRef
  ) {
    this.el = this.viewContainer.element.nativeElement;
  }

  ngAfterViewInit() {
    this.img = <HTMLImageElement>this.el.querySelector('img');
    this.img.onload = () => {
      this.imgOrgWidth = this.imgOrgWidth || this.img.offsetWidth;
      this.imgOrgHeight = this.imgOrgHeight || this.img.offsetHeight;
      console.log(this.img.offsetWidth, this.img.offsetHeight, this.img.width, this.img.height);

      this.setParallaxImage();
      this.updateParallaxImage();
      window.addEventListener('scroll', () => {
        this.updateParallaxImage();
      });
      window.addEventListener('resize', () => {
        this.setParallaxImage();
        this.updateParallaxImage();
      });
    };
  }

  private setParallaxImage() {
    let imgSize = this.imgOrgWidth > this.el.offsetWidth ?
      { width : this.el.offsetWidth + 'px'} : { height : this.el.offsetHeight * 1.5 + 'px'};
    Object.assign(this.img.style, {
      display: 'block', position: 'absolute', bottom: 0, left: 0
    }, imgSize);

    // set container style
    Object.assign(this.el.style, {
      position: 'relative', overflow: 'hidden'
    });

    // wrap image with a div, then set style
    let imgWrapperEl: HTMLElement = <HTMLElement>this.el.querySelector('.parallax-img-wrapper');
    if (!imgWrapperEl) {
      imgWrapperEl = document.createElement('div');
      imgWrapperEl.className = 'parallax-img-wrapper';
      imgWrapperEl.appendChild(this.img);
      this.el.appendChild(imgWrapperEl);
    }
    Object.assign(imgWrapperEl.style, {
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1
    });
  }

  private updateParallaxImage(): void {
    let elRect = this.el.getBoundingClientRect();
    let imgRect = this.img.getBoundingClientRect();

    let imgDist = imgRect.height - elRect.height;
    let bottom = this.el.offsetTop + elRect.height;
    let top = this.el.offsetTop;
    let scrollTop = document.body.scrollTop;
    let windowBottom = scrollTop + window.innerHeight;
    let percentScrolled =
      (windowBottom - top) / (elRect.height + window.innerHeight);

    let parallax = Math.round((imgDist * percentScrolled));
    if (
      (bottom > scrollTop) && (top < (scrollTop + window.innerHeight))
    ) {
      this.img.style.bottom = parallax * -1 + 'px';
    }
  }
}
