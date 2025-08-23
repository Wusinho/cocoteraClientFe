import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden-completa',
  templateUrl: './orden-completa.component.html',
  styleUrl: './orden-completa.component.css'
})
export class OrdenCompletaComponent {
  resumenPedido: any;
  productos: any[] = [];
  metodoPago: string = '';
  fechaEntrega: string = '';
  idOrden: string = '';
  idTransaccion: string = '';

  constructor(private router: Router) {

    const nav = history.state;
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 3);
    const fechaCreacion = new Date();
    this.resumenPedido = nav.resumenPedido;
    this.productos = nav.carrito || [];
    this.metodoPago = nav.metodoPago || 'Desconocido';
    this.fechaEntrega = hoy.toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    this.idOrden = this.generarCodigo('SDGT');
    localStorage.setItem('ultimoOrderId', this.idOrden);
    localStorage.setItem('fechaCreacionOrden', fechaCreacion.toISOString()); 
    this.idTransaccion = this.generarCodigo('TR');
  }

  generarCodigo(prefijo: string): string {
    return `${prefijo}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  }
}
