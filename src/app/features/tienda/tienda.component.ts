import { Component, OnInit  } from '@angular/core';
import { Options, LabelType  } from '@angular-slider/ngx-slider';
import { PRODUCTOS_MOCK, Producto } from '../../shared/mock-productos';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent {
  precioMin = 25;
  precioMax = 120;
  currentPage = 1;
  products: Producto[] = [];

  ngOnInit(): void {
    this.products = PRODUCTOS_MOCK;
  }

    sliderOptions: Options = {
      floor: 25,
      ceil: 120,
      step: 1,
      showTicksValues: false,
      translate: (value: number, label: LabelType): string => {
        return label === LabelType.Low || label === LabelType.High ? `S/. ${value}` : '';
      }
    };


 get totalPagesArray() {
  const total = Math.ceil(this.products.length / 12);
  return Array.from({ length: total }, (_, i) => i + 1);
}


}
