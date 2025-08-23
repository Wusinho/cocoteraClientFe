import { Component } from '@angular/core';

@Component({
  selector: 'app-orden-track',
  templateUrl: './orden-track.component.html',
  styleUrls: ['./orden-track.component.css']
})
export class OrdenTrackComponent {
  orderId: string = '';
  savedOrderId: string | null = '';
  fechaCreacion: Date | null = null;
  simulacionFecha: Date | null = null;
  orderFound: boolean = false;
  orderNotFound: boolean = false;

  orderSteps = [
    { label: 'Pedido realizado', icon: 'fas fa-clipboard-check', date: '', completed: false },
    { label: 'Pedido aceptado', icon: 'fas fa-clipboard-list', date: '', completed: false },
    { label: 'En Progreso', icon: 'fas fa-box', date: '', completed: false },
    { label: 'En camino', icon: 'fas fa-truck', date: '', completed: false },
    { label: 'Entregado', icon: 'fas fa-box-open', date: '', completed: false }
  ];

  ngOnInit() {
    this.savedOrderId = localStorage.getItem('ultimoOrderId');
    const fechaCreacionStr = localStorage.getItem('fechaCreacionOrden');
    this.fechaCreacion = fechaCreacionStr ? new Date(fechaCreacionStr) : null;

    const simulacionFechaStr = localStorage.getItem('simulacionFechaOrden');
  if (simulacionFechaStr) {
    this.simulacionFecha = new Date(simulacionFechaStr);
  } else {
    this.simulacionFecha = this.fechaCreacion ? new Date(this.fechaCreacion) : null;
  }
  }

  trackOrder() {
    if (this.orderId === this.savedOrderId && this.fechaCreacion) {
      this.actualizarOrderSteps();
      this.orderFound = true;
      this.orderNotFound = false;
    } else {
      this.orderFound = false;
      this.orderNotFound = true;
    }
  }


simularAvanceDias() {
  if (this.simulacionFecha) {
    this.simulacionFecha.setDate(this.simulacionFecha.getDate() + 1);
    localStorage.setItem('simulacionFechaOrden', this.simulacionFecha.toISOString());
    this.actualizarOrderSteps();
  }
}

reiniciarTracking() {
  localStorage.removeItem('simulacionFechaOrden');
  this.simulacionFecha = this.fechaCreacion ? new Date(this.fechaCreacion) : null;
  this.actualizarOrderSteps();
}


  actualizarOrderSteps() {
    const baseDate = this.fechaCreacion!;
    const diasPasados = Math.floor((+this.simulacionFecha! - +baseDate) / (1000 * 60 * 60 * 24));

    this.orderSteps[0].date = this.formatearFecha(baseDate); 
    this.orderSteps[1].date = this.formatearFecha(baseDate, 0, 5); 
    this.orderSteps[2].date = this.formatearFecha(baseDate, 1); 
    this.orderSteps[3].date = this.formatearFecha(baseDate, 2); 
    this.orderSteps[4].date = this.formatearFecha(baseDate, 3); 

    this.orderSteps.forEach((step, index) => {
      step.completed = diasPasados >= index;
    });
  }

  formatearFecha(baseDate: Date, diasSumar: number = 0, minutosSumar: number = 0): string {
    const fecha = new Date(baseDate);
    fecha.setDate(fecha.getDate() + diasSumar);
    fecha.setMinutes(fecha.getMinutes() + minutosSumar);
    return fecha.toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
