import { AfterViewInit, Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { PRODUCTOS_MOCK, Producto } from '../../shared/mock-productos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit  {
  @ViewChild('carousel', { static: false }) carouselRef!: ElementRef;
  products: Producto[] = []; 

  ngOnInit(): void {
    this.products = PRODUCTOS_MOCK;
  }

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  startAutoScroll(): void {
    const carousel = this.carouselRef.nativeElement;
    const scrollStep = carousel.offsetWidth / 4;
    setInterval(() => {
      if (
        carousel.scrollLeft + scrollStep >=
        carousel.scrollWidth - carousel.offsetWidth
      ) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' }); 
      } else {
        carousel.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    }, 3000);
  }
}
