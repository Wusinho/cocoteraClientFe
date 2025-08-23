import { Injectable } from '@angular/core';

export type ChatReply = { reply: string };

// Estados del flujo (incluye 3er nivel para tiendas → direcciones)
type Step =
  | 'root'
  | 'tiendas'             // nivel 1 (submenu Tiendas)
  | 'tiendas_dir'         // nivel 2 (submenu Direcciones -> tercer nodo aquí)
  | 'contacto'            // nivel 1
  | 'envios';             // nivel 1

@Injectable({ providedIn: 'root' })
export class ChatService {
  private step: Step = 'root';

  async send(message: string): Promise<ChatReply> {
    const reply = this.handle((message || '').trim().toLowerCase());
    return { reply };
  }

  // ------------ Router principal ------------
  private handle(msg: string): string {
    if (!msg || msg === '0' || msg.includes('menu')) {
      this.step = 'root';
      return this.menu();
    }

    if (this.step === 'root') {
      if (msg === '1') { this.step = 'tiendas';  return this.menuTiendas();  }
      if (msg === '2') { this.step = 'contacto'; return this.menuContacto(); }
      if (msg === '3') { this.step = 'envios';   return this.menuEnvios();   }
      return `No entendí. ${this.menuHint()}`;
    }

    if (this.step === 'tiendas') {
      if (msg === '1') { // Direcciones → TERCER NODO
        this.step = 'tiendas_dir';
        return this.menuTiendasDirecciones();
      }
      if (msg === '2') { // Horarios (hoja)
        return this.tiendasHorarios();
      }
      if (msg === '0') { this.step = 'root'; return this.menu(); }
      return `Elige 1 o 2. ${this.volverHint()}`;
    }

    if (this.step === 'tiendas_dir') { // 3er nodo: Lima vs Provincias
      if (msg === '1') return this.tiendasDireccionesLima();
      if (msg === '2') return this.tiendasDireccionesProvincias();
      if (msg === '0') { this.step = 'root'; return this.menu(); }
      return `Elige 1 (Lima) o 2 (Provincias). ${this.volverHint()}`;
    }

    if (this.step === 'contacto') {
      if (msg === '1') return this.contactoTienda();
      if (msg === '2') return this.contactoOnline();
      if (msg === '0') { this.step = 'root'; return this.menu(); }
      return `Elige 1 o 2. ${this.volverHint()}`;
    }

    if (this.step === 'envios') {
      if (msg === '1') return this.enviosLima();
      if (msg === '2') return this.enviosProvincias();
      if (msg === '0') { this.step = 'root'; return this.menu(); }
      return `Elige 1 o 2. ${this.volverHint()}`;
    }

    // fallback
    this.step = 'root';
    return this.menu();
  }

  // ------------ Menús ------------
  private menu(): string {
    return (
`📋 *Menú principal*
1) Tiendas
2) Contacto
3) Envíos
(Escribe 1, 2 o 3. ${this.volverHint()})`
    );
  }
  private menuHint() { return 'Escribe 1, 2 o 3. 0 para volver al menú.'; }
  private volverHint() { return 'Escribe 0 para volver al menú.'; }

  private menuTiendas(): string {
    return (
`🏬 *Tiendas*
1) Direcciones
2) Horarios
${this.volverHint()}`
    );
  }
  private menuTiendasDirecciones(): string {
    return (
`📍 *Direcciones de tiendas*
1) Lima Metropolitana
2) Provincias
${this.volverHint()}`
    );
  }
  private menuContacto(): string {
    return (
`☎️ *Contacto*
1) Asesor en tienda
2) Atención online
${this.volverHint()}`
    );
  }
  private menuEnvios(): string {
    return (
`🚚 *Envíos*
1) Lima Metropolitana
2) Provincias
${this.volverHint()}`
    );
  }

  // ------------ Respuestas (hojas) ------------
  private tiendasHorarios(): string {
    return (
`🕒 *Horarios*
• L–S: 10:00–21:00
• D: 11:00–20:00
(Pueden variar por feriados.)
${this.volverHint()}`
    );
  }

  private tiendasDireccionesLima(): string {
    return (
`📍 *Tiendas en Lima*
• Cocotera Miraflores — Av. Larco 999, Miraflores
• Cocotera San Isidro — C. Los Libertadores 155, San Isidro
${this.volverHint()}`
    );
  }

  private tiendasDireccionesProvincias(): string {
    return (
`🗺️ *Tiendas en Provincias*
• Cocotera Arequipa (Mall Plaza) — Av. Ejército 793, Cayma
• Cocotera Trujillo (Mall Aventura) — Av. América Nte. 1234
${this.volverHint()}`
    );
  }

  private contactoTienda(): string {
    return (
`👤 *Asesor en tienda* (nombres ficticios)
• Valentina Ríos — WhatsApp: +51 987 111 222
• Diego Salazar — WhatsApp: +51 987 333 444
${this.volverHint()}`
    );
  }

  private contactoOnline(): string {
    return (
`🌐 *Atención online* (nombre ficticio)
• Mariana Paredes
• WhatsApp: +51 999 888 777
• Email: ayuda@cocotera.pe
${this.volverHint()}`
    );
  }

  private enviosLima(): string {
    return (
`🚚 *Lima Metropolitana*
• 1–2 días hábiles
• Gratis desde S/199
${this.volverHint()}`
    );
  }

  private enviosProvincias(): string {
    return (
`🚛 *Provincias*
• 2–5 días hábiles
• Costo referencial S/15 (gratis desde S/299)
${this.volverHint()}`
    );
  }
}
