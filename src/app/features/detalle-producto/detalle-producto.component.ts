import { AfterViewInit, Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PRODUCTOS_MOCK, Producto } from '../../shared/mock-productos';
import { getRandomWithout } from '../../utils/array-utils'; 

interface Review {
  nombre: string;
  titulo: string;
  descripcion: string;
  rating: number;
  fecha: string; 
}


@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit, AfterViewInit  {
@ViewChild('carousel', { static: false }) carouselRef!: ElementRef;
  productoActual!: Producto;
  productosRecomendados: Producto[] = [];
  producto!: Producto;
  idProducto!: number;
  cantidad: number = 1;
  colorSeleccionado: string = '';
  tallaSeleccionada: string = '';

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.idProducto = +idParam;
        this.producto = PRODUCTOS_MOCK.find(p => p.id === this.idProducto)!;
      }
    });

    this.idProducto = Number(this.route.snapshot.paramMap.get('id'));
    this.productoActual = PRODUCTOS_MOCK.find(p => p.id === this.idProducto)!;

    const productosDisponibles = PRODUCTOS_MOCK.filter(p => p.id !== this.idProducto);
    this.productosRecomendados = this.getRandomProducts(productosDisponibles, 6);
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

  reviewsMock: Review[] = [
    {
      nombre: 'Camila R.',
      titulo: 'Me encantó el jean',
      descripcion: 'Muy cómodo, lo uso para salir y queda perfecto.',
      rating: 5,
      fecha: 'Hace 2 semanas'
    },
    {
      nombre: 'Valeria M.',
      titulo: 'Buena relación calidad-precio',
      descripcion: 'Pensé que sería más ajustado, pero está bien.',
      rating: 4,
      fecha: 'Hace 1 semana'
    },
    {
      nombre: 'Lucía F.',
      titulo: 'Un poco largo',
      descripcion: 'Tuve que ajustarlo, pero el diseño está genial.',
      rating: 3.5,
      fecha: 'Hace 3 días'
    },
    {
      nombre: 'Daniela S.',
      titulo: 'Perfecto para la oficina',
      descripcion: 'Me gusta combinarlo con blusas. Muy versátil.',
      rating: 4.5,
      fecha: 'Hace 1 día'
    }
  ];

  reviewForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.reviewForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      estrellas: [0, Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  getRandomProducts(arr: Producto[], count: number): Producto[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  aumentarCantidad() {
    this.cantidad++;
  }

  disminuirCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }
  
  seleccionarColor(color: string) {
    this.colorSeleccionado = color;
  }

  seleccionarTalla(talla: string) {
    this.tallaSeleccionada = talla;
  }

  agregarAlCarrito() {
    
    console.log('Agregar al carrito:', {
      producto: this.producto,
      cantidad: this.cantidad,
      color: this.colorSeleccionado,
      talla: this.tallaSeleccionada
    }); }

  comprarAhora() {
    
    console.log('Comprar ahora:', {
      producto: this.producto,
      cantidad: this.cantidad,
      color: this.colorSeleccionado,
      talla: this.tallaSeleccionada
    });
  }

  agregarAWishlist() {
    this.producto.enListaDeseos = !this.producto.enListaDeseos;
    console.log('Lista de deseos actualizada:', {
      producto: this.producto.nombre,
      enListaDeseos: this.producto.enListaDeseos
    });
  }


  enviarReview(nombre: string, email: string, rating: number, titulo: string, descripcion: string): void {
    console.log('Review enviada:', { nombre, email, rating, titulo, descripcion });
  }

  obtenerTiempoRelativo(fecha: Date): string {
    const now = new Date();
    const diff = Math.floor((+now - +new Date(fecha)) / 1000);
    if (diff < 60) return 'Hace unos segundos';
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} minutos`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} horas`;
    if (diff < 2592000) return `Hace ${Math.floor(diff / 86400)} días`;
    return `Hace más de un mes`;
  }
}
