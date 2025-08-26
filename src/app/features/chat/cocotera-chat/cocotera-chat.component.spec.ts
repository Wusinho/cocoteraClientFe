import { ChatService, ChatReply } from "../chat.service";

const rta = async (p: Promise<ChatReply>) => (await p).reply;

describe('ChatService', () => {
  let svc: ChatService;

  beforeEach(() => {
    svc = new ChatService();
  });

  // --- Menú raíz y normalización ---
  it('muestra el menú principal con vacío, "0" o textos que incluyan "menu"', async () => {
    expect(await rta(svc.send(''))).toContain('Menú principal');
    expect(await rta(svc.send('0'))).toContain('Menú principal');
    expect(await rta(svc.send('ver menu por favor'))).toContain('Menú principal');
  });

  it('normaliza entrada (trim y lowercase): "  1  " debe abrir Tiendas', async () => {
    const reply = await rta(svc.send('  1  '));
    expect(reply).toContain('Tiendas');
  });

  // --- Flujo Tiendas ---
  it('navega: Root -> Tiendas -> Direcciones -> Lima', async () => {
    expect(await rta(svc.send('1'))).toContain('Tiendas');                // Root -> Tiendas
    expect(await rta(svc.send('1'))).toContain('Direcciones de tiendas'); // Tiendas -> Direcciones
    const lima = await rta(svc.send('1'));                                // Direcciones -> Lima
    expect(lima).toContain('Tiendas en Lima');
    expect(lima).toContain('Miraflores');
    expect(lima).toContain('San Isidro');
  });

  // --- Flujo Contacto ---
  it('navega: Root -> Contacto -> 2 (Atención online)', async () => {
    expect(await rta(svc.send('2'))).toContain('Contacto');
    const online = await rta(svc.send('2'));
    expect(online).toContain('Atención online');
    expect(online).toContain('ayuda@cocotera.pe');
  });

  // --- Flujo Envíos ---
  it('navega: Root -> Envíos -> 1 (Lima Metropolitana)', async () => {
    expect(await rta(svc.send('3'))).toContain('Envíos');
    const limaEnv = await rta(svc.send('1'));
    expect(limaEnv).toContain('Lima Metropolitana');
    expect(limaEnv).toContain('Gratis desde S/199');
  });

  // --- Opciones inválidas (dos ejemplos) ---
  it('en Root: opción inválida muestra pista/ayuda', async () => {
    const reply = await rta(svc.send('9'));
    expect(reply).toContain('No entendí');
    expect(reply).toContain('Escribe 1, 2 o 3');
  });

  it('en Tiendas -> Direcciones: opción inválida muestra pista específica', async () => {
    await svc.send('1'); // Tiendas
    await svc.send('1'); // Direcciones
    const reply = await rta(svc.send('9'));
    expect(reply).toContain('Elige 1 (Lima) o 2 (Provincias)');
    expect(reply).toContain('Escribe 0 para volver al menú.');
  });

  // --- Volver al menú desde distintos niveles ---
  it('la opción "0" vuelve al menú principal desde niveles internos', async () => {
    await svc.send('1'); // Tiendas
    expect(await rta(svc.send('0'))).toContain('Menú principal');

    await svc.send('1'); // Tiendas
    await svc.send('1'); // Direcciones
    expect(await rta(svc.send('0'))).toContain('Menú principal');

    await svc.send('3'); // Envíos
    expect(await rta(svc.send('0'))).toContain('Menú principal');
  });
});
