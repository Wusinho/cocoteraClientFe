import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Tarjeta {
  id: number;
  nombre: string;
  numero: string;
  vencimiento: string;
  tipo: string;
  esSeleccionada: boolean;
}

@Component({
  selector: 'app-elegir-metodo-pago',
  templateUrl: './elegir-metodo-pago.component.html',
  styleUrls: ['./elegir-metodo-pago.component.css']
})
export class ElegirMetodoPagoComponent implements OnInit {
  resumenPedido: any;
  metodoSeleccionado: string = 'Efectivo';
  tarjetas: Tarjeta[] = [];
  mostrarFormulario = false;
  formularioTarjeta: FormGroup;
  nextId = 1;
  totalArticulos: number = 0;
  subtotal: number = 0;
  delivery: number = 0;
  impuestos: number = 0;
  descuento: number = 0;
  total: number = 0;
  carrito: any[] = [];


  constructor(private fb: FormBuilder, private router: Router) {
    this.formularioTarjeta = this.fb.group({
      tipo: [''],  
      numero: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      vencimiento: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      nombre: ['', Validators.required]
    });

    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state;
    if (state) {
      this.totalArticulos = state['totalArticulos'];
      this.subtotal = state['subtotal'];
      this.delivery = state['delivery'];
      this.impuestos = state['impuestos'];
      this.descuento = state['descuento'];
      this.total = state['total'];
      this.carrito = state['carrito'] || [];
    }
    console.log('Navigation state:', nav?.extras.state);

    this.resumenPedido = {
        totalArticulos: this.totalArticulos,
        subtotal: this.subtotal,
        delivery: this.delivery,
        impuestos: this.impuestos,
        descuento: this.descuento,
        total: this.total
      };

  }

  ngOnInit(): void {

    const tarjetasGuardadas = localStorage.getItem('tarjetas');
    if (tarjetasGuardadas) {
      this.tarjetas = JSON.parse(tarjetasGuardadas);
    }

    if (!this.subtotal && !this.total) {
      this.router.navigate(['/carrito']);
    }
  }

  seleccionarMetodo(metodo: string) {
  if (metodo === 'Efectivo') {
    this.metodoSeleccionado = 'Efectivo';
    this.tarjetas.forEach(t => t.esSeleccionada = false);
  } else {
    const tarjetaSeleccionada = this.tarjetas.find(t => `${t.tipo} - ${t.numero}` === metodo);
    if (tarjetaSeleccionada) {
      this.metodoSeleccionado = `${tarjetaSeleccionada.tipo} - ${tarjetaSeleccionada.numero}`;
      this.tarjetas.forEach(t => t.esSeleccionada = t === tarjetaSeleccionada);
    }
  }
}



  agregarTarjeta() {
  const tipoAleatorio = Math.random() < 0.5 ? 'Visa' : 'Mastercard';
  this.formularioTarjeta.get('tipo')?.setValue(tipoAleatorio);

  const numero = this.formularioTarjeta.value.numero;
  const ultimaParte = numero.slice(-4);

  if (this.formularioTarjeta.invalid) {
    console.log('Formulario inválido:', this.formularioTarjeta.value);
    return;
  }

  const nuevaTarjeta: Tarjeta = {
    id: this.tarjetas.length + 1,
    tipo: this.formularioTarjeta.value.tipo,  
    nombre: this.formularioTarjeta.value.nombre,
    numero: `**** **** **** ${ultimaParte}`,
    vencimiento: this.formularioTarjeta.value.vencimiento,
    esSeleccionada: true
  };

  this.tarjetas.forEach(t => t.esSeleccionada = false);
  this.tarjetas.push(nuevaTarjeta);
  this.metodoSeleccionado = nuevaTarjeta.id.toString(); 
  this.formularioTarjeta.reset();
  this.mostrarFormulario = false;
  localStorage.setItem('tarjetas', JSON.stringify(this.tarjetas));
}

eliminarTarjeta(id: number): void {
  this.tarjetas = this.tarjetas.filter(t => t.id !== id);
  localStorage.setItem('tarjetas', JSON.stringify(this.tarjetas));

  if (this.metodoSeleccionado === id.toString()) {
    this.metodoSeleccionado = 'Efectivo';
  }
}


  irOrdenPagada(): void {
  let metodoPagoTexto = 'Efectivo';

  if (this.metodoSeleccionado !== 'Efectivo') {
    const tarjetaSeleccionada = this.tarjetas.find(t => t.id.toString() === this.metodoSeleccionado);
    if (tarjetaSeleccionada) {
      metodoPagoTexto = `${tarjetaSeleccionada.tipo} - ${tarjetaSeleccionada.numero}`;
    }
  }

  this.router.navigate(['/orden-completa'], {
    state: {
      resumenPedido: this.resumenPedido,
      carrito: this.carrito,
      metodoPago: metodoPagoTexto
    }
  });
}



}
