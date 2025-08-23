import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { TiendaComponent } from './features/tienda/tienda.component';
import { ListaDeseosComponent } from './features/lista-deseos/lista-deseos.component';
import { CarritoComponent } from './features/carrito/carrito.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { ElegirMetodoPagoComponent } from './features/elegir-metodo-pago/elegir-metodo-pago.component';
import { DetalleProductoComponent } from './features/detalle-producto/detalle-producto.component';
import { OrdenTrackComponent } from './features/orden-track/orden-track.component';
import { OrdenCompletaComponent } from './features/orden-completa/orden-completa.component';
import { SobreNosotrosComponent } from './features/sobre-nosotros/sobre-nosotros.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'tienda/producto/:id', component: DetalleProductoComponent },
  { path: 'listaDeseos', component: ListaDeseosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'elegir-metodo-pago', component: ElegirMetodoPagoComponent },
  { path: 'orden-completa', component: OrdenCompletaComponent },
  { path: 'track-pedido', component: OrdenTrackComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
