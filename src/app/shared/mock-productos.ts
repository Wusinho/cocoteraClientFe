export interface Producto {
  id: number;
  nombre: string;
  imagen: string;
  descripcion: string;
  precio: number;
  color: string;
  talla: string;
  colorHex: string;
  rating: number;
  enListaDeseos?: boolean;
}

export const PRODUCTOS_MOCK: Producto[] = [
  {
    id: 1,
    nombre: 'Jean Felipa Azul',
    imagen: 'assets/img/jean-felipa2.jpeg',
    descripcion: 'Elegante diseño',
    precio: 79.00,
    color: 'Azul',
    talla: 'S',
    colorHex: '#808080',
    rating: 4.5,
    enListaDeseos: true
  },
  {
    id: 2,
    nombre: 'Jean Mom Fit Negro',
    imagen: 'assets/img/modelo-aqua.jpeg',
    descripcion: 'Elegante diseño',
    precio: 89.90,
    color: 'Negro',
    talla: 'M',
    colorHex: '#808080',
    rating: 4.2,
    enListaDeseos: true
  },
  {
    id: 3,
    nombre: 'Jean Beige Clásico',
    imagen: 'assets/img/jean-estefany.jpeg',
    descripcion: 'Elegante diseño',
    precio: 69.00,
    color: 'Beige',
    talla: 'S',
    colorHex: '#808080',
    rating: 4.0,
    enListaDeseos: false
  },
  {
    id: 4,
    nombre: 'Jean Felipa Azul',
    imagen: 'assets/img/jean-felipa2.jpeg',
    descripcion: 'Elegante diseño',
    precio: 79.00,
    color: 'Azul',
    talla: 'S',
    colorHex: '#808080',
    rating: 4.5,
    enListaDeseos: false
  },
  {
    id: 5,
    nombre: 'Jean Mom Fit Negro',
    imagen: 'assets/img/jean-alexandra.jpeg',
    descripcion: 'Elegante diseño',
    precio: 89.90,
    color: 'Negro',
    talla: 'L',
    colorHex: '#353131ff',
    rating: 4.2,
    enListaDeseos: true
  },
  {
    id: 6,
    nombre: 'Jean Beige Clásico',
    imagen: 'assets/img/jean-estefany.jpeg',
    descripcion: 'Elegante diseño',
    precio: 69.00,
    color: 'Beige',
    talla: 'S',
    colorHex: '#808080',
    rating: 4.0,
    enListaDeseos: false
  },
  {
    id: 7,
    nombre: 'Jean Felipa Azul',
    imagen: 'assets/img/jean-felipa.jpeg',
    descripcion: 'Elegante diseño',
    precio: 79.00,
    color: 'Azul',
    talla: 'M',
    colorHex: '#808080',
    rating: 4.5,
    enListaDeseos: false
  },
  {
    id: 8,
    nombre: 'Jean Mom Fit Negro',
    imagen: 'assets/img/jean-alexandra.jpeg',
    descripcion: 'Elegante diseño',
    precio: 89.90,
    color: 'Negro',
    talla: 'S',
    colorHex: '#808080',
    rating: 4.2,
    enListaDeseos: false
  },
  {
    id: 9,
    nombre: 'Jean Beige Clásico',
    imagen: 'assets/img/jean-estefany.jpeg',
    descripcion: 'Elegante diseño',
    precio: 69.00,
    color: 'Beige',
    talla: 'S',
    colorHex: '#808080',
    rating: 4.0,
    enListaDeseos: false
  },
  {
    id: 10,
    nombre: 'Jean Felipa Azul',
    imagen: 'assets/img/jean-felipa.jpeg',
    descripcion: 'Elegante diseño',
    precio: 79.00,
    color: 'Azul',
    talla: 'XL',
    colorHex: '#808080',
    rating: 4.5,
    enListaDeseos: false
  },
  {
    id: 11,
    nombre: 'Jean Mom Fit Negro',
    imagen: 'assets/img/jean-alexandra.jpeg',
    descripcion: 'Elegante diseño',
    precio: 89.90,
    color: 'Negro',
    talla: 'S',
    colorHex: '#808080',
    rating: 4.2,
    enListaDeseos: false
  },
  {
    id: 12,
    nombre: 'Jean Beige Clásico',
    imagen: 'assets/img/jean-estefany.jpeg',
    descripcion: 'Elegante diseño',
    precio: 69.00,
    color: 'Beige',
    talla: 'S',
    colorHex: '#808080',
    rating: 4.0,
    enListaDeseos: false
  },
  {
    id: 13,
    nombre: 'Jean Felipa Azul',
    imagen: 'assets/img/jean-felipa.jpeg',
    descripcion: 'Elegante diseño',
    precio: 79.00,
    color: 'Azul',
    talla: 'S',
    colorHex: '#808080',
    rating: 4.5,
    enListaDeseos: false
  },
  {
    id: 14,
    nombre: 'Jean Mom Fit Negro',
    imagen: 'assets/img/jean-alexandra.jpeg',
    descripcion: 'Elegante diseño',
    precio: 89.90,
    color: 'Negro',
    talla: 'S',
    colorHex: '#808080',
    rating: 4.2,
    enListaDeseos: false
  },
  {
    id: 15,
    nombre: 'Jean Beige Clásico',
    imagen: 'assets/img/jean-estefany.jpeg',
    descripcion: 'Elegante diseño',
    precio: 69.00,
    color: 'Beige',
    talla: 'S',
    colorHex: '#808080',
    rating: 4.0,
    enListaDeseos: false
  }
];