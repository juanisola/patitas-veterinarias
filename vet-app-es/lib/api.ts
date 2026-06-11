/**
 * ─────────────────────────────────────────────────────────────────────────────
 * api.ts — Capa de comunicación con el Backend (FastAPI — Patitas Sanas)
 *
 * URL base: http://localhost:3000  (proxy Next.js → /api/* → backend)
 * Auth:     HTTP Basic (email:password en base64)
 * ─────────────────────────────────────────────────────────────────────────────
 */

// En desarrollo Next.js actúa como proxy (ver next.config.mjs).
// El frontend llama a /api/... y Next.js reenvía a http://localhost:3000/...
const API_BASE = "/api";

// ─────────────────────────────────────────────
// Helpers de autenticación
// ─────────────────────────────────────────────

/** Construye el header Authorization para HTTP Basic Auth. */
export function buildBasicAuthHeader(email: string, password: string): string {
  const encoded =
    typeof window !== "undefined"
      ? btoa(`${email}:${password}`)
      : Buffer.from(`${email}:${password}`).toString("base64");
  return `Basic ${encoded}`;
}

/** Construye los headers base para todas las peticiones JSON. */
export function buildHeaders(
  credentials?: { email: string; password: string } | null
): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (credentials) {
    headers["Authorization"] = buildBasicAuthHeader(
      credentials.email,
      credentials.password
    );
  }
  return headers;
}

// ─────────────────────────────────────────────
// Tipos del Backend (mirroring de los schemas Pydantic)
// ─────────────────────────────────────────────

export interface BackendUser {
  id: string;
  nombre: string;
  email: string;
  rol: "cliente" | "veterinario" | "admin";
  activo: boolean;
}

export interface BackendMascota {
  id: string;
  nombre: string;
  especie: "Perro" | "Gato" | "Ave" | "Otro";
  raza: string;
  edad_anios: number | null;
  peso_kg: number | null;
  alergias: string[];
  propietario_id: string;
  historial: BackendHistorialEntrada[];
  vacunas: BackendVacuna[];
}

export interface BackendHistorialEntrada {
  fecha: string;
  tipo: string;
  diagnostico: string;
  tratamiento: string;
  veterinario_id: string;
  notas_internas?: string;
}

export interface BackendVacuna {
  nombre: string;
  fecha_aplicacion: string;
  proxima_aplicacion: string;
}

export interface BackendTurno {
  id: string;
  cliente_id: string;
  mascota_id: string;
  veterinario_id: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  servicio: string;
  estado: "confirmado" | "cancelado" | "pendiente";
  notas: string;
}

export interface BackendTurnoAgenda extends BackendTurno {
  cliente_nombre: string;
  cliente_email: string;
  mascota_nombre: string;
  mascota_especie: string;
  veterinario_nombre: string;
}

// ─────────────────────────────────────────────
// Mapeos Frontend ↔ Backend
// ─────────────────────────────────────────────

/** Convierte la especie del formato frontend al formato que acepta el backend. */
export function mapEspecieToBackend(
  species: "dog" | "cat" | "bird" | "other"
): "Perro" | "Gato" | "Ave" | "Otro" {
  const map = {
    dog: "Perro",
    cat: "Gato",
    bird: "Ave",
    other: "Otro",
  } as const;
  return map[species];
}

/** Convierte la especie del backend al formato del frontend. */
export function mapEspecieToFrontend(
  especie: "Perro" | "Gato" | "Ave" | "Otro"
): "dog" | "cat" | "bird" | "other" {
  const map = {
    Perro: "dog",
    Gato: "cat",
    Ave: "bird",
    Otro: "other",
  } as const;
  return map[especie];
}

/** Convierte el estado del turno del backend al frontend. */
export function mapEstadoToFrontend(
  estado: string
): "pending" | "confirmed" | "cancelled" | "completed" {
  const map: Record<string, "pending" | "confirmed" | "cancelled" | "completed"> = {
    confirmado: "confirmed",
    cancelado: "cancelled",
    pendiente: "pending",
  };
  return map[estado] ?? "pending";
}

/**
 * Calcula hora_fin sumando 30 minutos a hora_inicio.
 * Formato esperado: "HH:MM"
 */
export function calcularHoraFin(horaInicio: string): string {
  const [h, m] = horaInicio.split(":").map(Number);
  const totalMinutos = h * 60 + m + 30;
  const hFin = Math.floor(totalMinutos / 60) % 24;
  const mFin = totalMinutos % 60;
  return `${String(hFin).padStart(2, "0")}:${String(mFin).padStart(2, "0")}`;
}

// ─────────────────────────────────────────────
// Endpoints de la API
// ─────────────────────────────────────────────

/**
 * POST /auth/login
 * Autentica al usuario con email y contraseña.
 */
export async function apiLogin(
  email: string,
  password: string
): Promise<BackendUser> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Credenciales inválidas");
  }
  return res.json();
}

/**
 * POST /auth/register
 * Registra un nuevo cliente.
 */
export async function apiRegister(
  nombre: string,
  email: string,
  password: string
): Promise<{ mensaje: string; id: string }> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Error al registrar usuario");
  }
  return res.json();
}

/**
 * GET /admin/agenda?fecha=YYYY-MM-DD
 * Retorna la agenda del día (veterinario o admin).
 */
export async function apiGetAgenda(
  credentials: { email: string; password: string },
  fecha?: string
): Promise<{ total: number; agenda: BackendTurnoAgenda[] }> {
  const params = fecha ? `?fecha=${fecha}` : "";
  const res = await fetch(`${API_BASE}/admin/agenda${params}`, {
    headers: buildHeaders(credentials),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Error al obtener la agenda");
  }
  return res.json();
}

/**
 * GET /admin/usuarios
 * Lista todos los usuarios (solo admin).
 */
export async function apiGetUsuarios(credentials: {
  email: string;
  password: string;
}): Promise<BackendUser[]> {
  const res = await fetch(`${API_BASE}/admin/usuarios`, {
    headers: buildHeaders(credentials),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Error al obtener usuarios");
  }
  return res.json();
}

/**
 * GET /admin/mascotas
 * Lista todas las mascotas (veterinario o admin).
 */
export async function apiGetMascotas(credentials: {
  email: string;
  password: string;
}): Promise<BackendMascota[]> {
  const res = await fetch(`${API_BASE}/admin/mascotas`, {
    headers: buildHeaders(credentials),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Error al obtener mascotas");
  }
  return res.json();
}

/**
 * POST /mascotas
 * Registra una nueva mascota.
 */
export async function apiRegistrarMascota(
  credentials: { email: string; password: string },
  data: {
    nombre: string;
    especie: "Perro" | "Gato" | "Ave" | "Otro";
    raza?: string;
    edad_anios?: number | null;
    peso_kg?: number | null;
    alergias?: string[];
    propietario_id?: string;
  }
): Promise<{ mensaje: string; mascota: BackendMascota }> {
  const res = await fetch(`${API_BASE}/mascotas`, {
    method: "POST",
    headers: buildHeaders(credentials),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Error al registrar mascota");
  }
  return res.json();
}

/**
 * POST /turnos/reservar
 * Reserva un turno (requiere auth de cliente/veterinario/admin).
 */
export async function apiReservarTurno(
  credentials: { email: string; password: string },
  data: {
    mascota_id: string;
    veterinario_id: string;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    servicio: string;
    notas?: string;
  }
): Promise<{ mensaje: string; turno: BackendTurno }> {
  const res = await fetch(`${API_BASE}/turnos/reservar`, {
    method: "POST",
    headers: buildHeaders(credentials),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Error al reservar el turno");
  }
  return res.json();
}

/**
 * GET /mascotas/{mascota_id}/historial
 * Retorna el historial clínico de una mascota.
 */
export async function apiGetHistorial(
  credentials: { email: string; password: string },
  mascotaId: string
): Promise<BackendMascota> {
  const res = await fetch(`${API_BASE}/mascotas/${mascotaId}/historial`, {
    headers: buildHeaders(credentials),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Error al obtener el historial");
  }
  return res.json();
}

/**
 * GET /turnos/disponibilidad?fecha=YYYY-MM-DD
 * Retorna la disponibilidad de turnos (endpoint público).
 */
export async function apiGetDisponibilidad(
  fecha?: string
): Promise<Record<string, { veterinario_id: string; turnos: BackendTurno[] }>> {
  const params = fecha ? `?fecha=${fecha}` : "";
  const res = await fetch(`${API_BASE}/turnos/disponibilidad${params}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Error al obtener disponibilidad");
  }
  return res.json();
}
