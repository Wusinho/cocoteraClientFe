import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { TiendaComponent } from './features/tienda/tienda.component';
import { ListaDeseosComponent } from './features/lista-deseos/lista-deseos.component';
import { CarritoComponent } from './features/carrito/carrito.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { ElegirMetodoPagoComponent } from './features/elegir-metodo-pago/elegir-metodo-pago.component';
import { ProductCardComponent } from './features/product-card/product-card.component';
import { DetalleProductoComponent } from './features/detalle-producto/detalle-producto.component';
import { OrdenCompletaComponent } from './features/orden-completa/orden-completa.component';
import { OrdenTrackComponent } from './features/orden-track/orden-track.component';
import { SobreNosotrosComponent } from './features/sobre-nosotros/sobre-nosotros.component';
import { ChatModule } from './features/chat/chat.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    TiendaComponent,
    ProductCardComponent, 
    DetalleProductoComponent,
    ListaDeseosComponent,
    CarritoComponent,
    CheckoutComponent,
    ElegirMetodoPagoComponent,
    OrdenCompletaComponent,
    OrdenTrackComponent,
    SobreNosotrosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSliderModule,
    FormsModule,
    ReactiveFormsModule,
    ChatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
