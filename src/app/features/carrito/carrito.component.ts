import { Component, OnInit } from '@angular/core';
import { PRODUCTOS_MOCK,Producto } from '../../shared/mock-productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: (Producto & { cantidad: number })[] = [];
  codigoDescuento: string = '';
  cuponAplicado: boolean = false;
  delivery: number = 0;
  cuponValido: boolean = false;
  descuento: number = 0;


  ngOnInit(): void {
    
    this.carrito = PRODUCTOS_MOCK
      .filter(p => p.enListaDeseos)
      .map(p => ({ ...p, cantidad: 1 }));
  }

  constructor(private router: Router) {}

  aumentarCantidad(producto: Producto): void {
    const item = this.carrito.find(p => p.id === producto.id);
    if (item) item.cantidad++;
  }

  disminuirCantidad(producto: Producto): void {
    const item = this.carrito.find(p => p.id === producto.id);
    if (item && item.cantidad > 1) item.cantidad--;
  }

  eliminarProducto(producto: Producto): void {
    this.carrito = this.carrito.filter(p => p.id !== producto.id);
  }

  vaciarCarrito(): void {
    this.carrito = [];
  }

  obtenerTotalItems(): number {
  return this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
}


  get obtenerSubtotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  get obtenerImpuestos(): number {
    return this.obtenerSubtotal * 0.18;
  }

  get obtenerDescuento(): number {
  const cupon = this.codigoDescuento.trim().toUpperCase();
  if (cupon === 'MUJER20') {
    return this.obtenerSubtotal * 0.20;
  } else if (cupon === 'JEANS15') {
    return this.obtenerSubtotal * 0.15;
  }
  return 0;
}


  get obtenerTotal(): number {
    if (!this.cuponValido) {
    this.descuento = 0;
  }
  return this.obtenerSubtotal + this.obtenerImpuestos + this.delivery - this.descuento;
}


  get cantidadTotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
  }

  aplicarCupon(){
  const cupon = this.codigoDescuento.trim().toUpperCase();
  this.cuponAplicado = true;
  if (cupon === 'MUJER20') {
    this.descuento = this.obtenerSubtotal * 0.20;
    this.cuponValido = true;
  } else if (cupon === 'JEAN15'){
    this.descuento = this.obtenerSubtotal * 0.15;
    this.cuponValido = true;
  } else {
    this.descuento = 0;
    this.cuponValido = false;
  }

  this.obtenerTotal;
}

  irACheckout(): void {
  const resumen = {
    productos: this.carrito,
    subtotal: this.obtenerSubtotal,
    impuestos: this.obtenerImpuestos,
    descuento: this.descuento,
    delivery: this.delivery,
    total: this.obtenerTotal
  };

  this.router.navigate(['/checkout'], {
    state: { resumen }
  });
}

}
