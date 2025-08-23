import { Component } from '@angular/core';
import { PRODUCTOS_MOCK, Producto } from '../../shared/mock-productos';

@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.component.html',
  styleUrl: './lista-deseos.component.css'
})
export class ListaDeseosComponent {
  producto!: Producto;
  cantidad: number = 1;
  colorSeleccionado: string = '';
  tallaSeleccionada: string = '';

  listaDeseos: Producto[] = PRODUCTOS_MOCK.filter(p => p.enListaDeseos);

  agregarAlCarrito() {
    
    console.log('Agregar al carrito:', {
      producto: this.producto,
      cantidad: this.cantidad,
      color: this.colorSeleccionado,
      talla: this.tallaSeleccionada
    }); }
}
