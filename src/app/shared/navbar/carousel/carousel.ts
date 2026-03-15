import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnChanges,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
})
export class Carousel implements AfterViewInit, OnChanges {
  images = input.required<string[] | undefined>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  swiper: Swiper | undefined = undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'].firstChange) {
      return;
    }

    // Innecesario para que se actualicen los puntos de navegación

    // if (!this.swiper) return;

    // this.swiper.destroy(true, true);

    // const paginationElement: HTMLDivElement =
    //   this.swiperDiv().nativeElement.querySelector('.swiper-pagination');

    // paginationElement.innerHTML = '';

    // Con esto basta

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
      slidesPerView: 1,

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
    });
  }
}
