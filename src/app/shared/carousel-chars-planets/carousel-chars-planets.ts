import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnChanges,
  output,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-carousel-chars-planets',
  imports: [],
  templateUrl: './carousel-chars-planets.html',
})
export class CarouselCharsPlanets implements AfterViewInit, OnChanges {
  images = input.required<string[] | undefined>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  swiper: Swiper | undefined = undefined;

  slideSelected = output<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].firstChange) {
      return;
    }

    setTimeout(() => {
      this.swiperInit();
    }, 100);
  }

  ngAfterViewInit() {
    this.swiperInit();
  }

  swiperInit() {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    this.swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      slidesPerView: 3,
      spaceBetween: 10,

      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },

      on: {
        click: (swiper: Swiper) => {
          // emit the url of the image clicked
          const activeSlide = swiper.slides[swiper.clickedIndex];
          const imgUrl = activeSlide.querySelector('img')!.src;
          this.slideSelected.emit(imgUrl);
        },
      },
    });
  }
}
