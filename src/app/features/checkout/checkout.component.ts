import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  resumen: any;
  cantidadTotal: number = 0;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.resumen = nav?.extras.state?.['resumen'];
  }

  ngOnInit(): void {
    if (!this.resumen) {
      this.router.navigate(['/carrito']);
    } else {
    this.cantidadTotal = this.resumen.productos
      .map((p: any) => p.cantidad)
      .reduce((total: number, cant: number) => total + cant, 0); 
  }
  console.log('Resumen recibido en Checkout:', this.resumen);

  }

  irMetodoPago(): void {
  this.router.navigate(['/elegir-metodo-pago'], {
    state: {
      totalArticulos: this.cantidadTotal,
      subtotal: this.resumen.subtotal,
      delivery: this.resumen.delivery,
      impuestos: this.resumen.impuestos,
      descuento: this.resumen.descuento,
      total: this.resumen.total,
      carrito: this.resumen.productos  
    }
  });
} 

  
}
