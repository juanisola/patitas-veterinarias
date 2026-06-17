"""
╔══════════════════════════════════════════════════════════════════╗
║        PATITAS SANAS — Backend API                              ║
║        Proyecto Académico — Testing de Aplicaciones — UADE      ║
║        FastAPI + JSON Persistence (sin DB relacional/NoSQL)     ║
╠══════════════════════════════════════════════════════════════════╣
║  BUGS INTENCIONALES ACTIVOS:                                    ║
║  RF-A01-20260521-001 — Turnos superpuestos permitidos           ║
║  RF-A03-20260521-002 — Recordatorios de email deshabilitados    ║
╚══════════════════════════════════════════════════════════════════╝
"""

import json
import logging
import os
import uuid
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any, Dict, List, Literal, Optional

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel

# ─────────────────────────────────────────────
# LOGGING
# ─────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("patitas_sanas.log", encoding="utf-8"),
    ],
)
logger = logging.getLogger("patitas_sanas")

# ─────────────────────────────────────────────
# RUTAS DE ARCHIVOS JSON
# ─────────────────────────────────────────────
DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)

USUARIOS_FILE       = DATA_DIR / "usuarios.json"
TURNOS_FILE         = DATA_DIR / "turnos.json"
MASCOTAS_FILE       = DATA_DIR / "mascotas.json"
NOTIFICACIONES_FILE = DATA_DIR / "notificaciones.json"

# ─────────────────────────────────────────────
# SEED DATA
# ─────────────────────────────────────────────
SEED_USUARIOS = [
    {
        "id": "usr-001",
        "nombre": "Dr. Martín López",
        "email": "martin.lopez@patitassanas.com",
        "password": "vet1234",
        "rol": "veterinario",
        "activo": True,
    },
    {
        "id": "usr-002",
        "nombre": "Dra. Sofía Ramos",
        "email": "sofia.ramos@patitassanas.com",
        "password": "vet5678",
        "rol": "veterinario",
        "activo": True,
    },
    {
        "id": "usr-003",
        "nombre": "Admin Patitas",
        "email": "admin@patitassanas.com",
        "password": "admin2025",
        "rol": "admin",
        "activo": True,
    },
    {
        "id": "usr-004",
        "nombre": "Carlos Gómez",
        "email": "carlos.gomez@gmail.com",
        "password": "carlos123",
        "rol": "cliente",
        "activo": True,
    },
    {
        "id": "usr-005",
        "nombre": "Laura Fernández",
        "email": "laura.fer@hotmail.com",
        "password": "laura456",
        "rol": "cliente",
        "activo": True,
    },
]

SEED_MASCOTAS = [
    {
        "id": "mas-001",
        "nombre": "Rocco",
        "especie": "Perro",
        "raza": "Labrador",
        "edad_anios": 3,
        "peso_kg": 28.5,
        "alergias": ["Penicilina"],
        "propietario_id": "usr-004",
        "historial": [
            {
                "fecha": "2024-11-10",
                "tipo": "consulta",
                "diagnostico": "Otitis leve",
                "tratamiento": "Gotas óticas 7 días",
                "veterinario_id": "usr-001",
                "notas_internas": "Propietario poco colaborador en la limpieza de orejas.",
            }
        ],
        "vacunas": [
            {
                "nombre": "Antirrábica",
                "fecha_aplicacion": "2024-03-15",
                "proxima_aplicacion": "2025-03-15",
            },
            {
                "nombre": "Séxtuple",
                "fecha_aplicacion": "2024-03-15",
                "proxima_aplicacion": "2025-03-15",
            },
        ],
    },
    {
        "id": "mas-002",
        "nombre": "Luna",
        "especie": "Gato",
        "raza": "Siamés",
        "edad_anios": 5,
        "peso_kg": 4.2,
        "alergias": [],
        "propietario_id": "usr-005",
        "historial": [
            {
                "fecha": "2025-01-20",
                "tipo": "vacunacion",
                "diagnostico": "Control anual",
                "tratamiento": "Triple felina aplicada",
                "veterinario_id": "usr-002",
                "notas_internas": "Gato muy estresado. Usar guantes en próxima visita.",
            }
        ],
        "vacunas": [
            {
                "nombre": "Triple Felina",
                "fecha_aplicacion": "2025-01-20",
                "proxima_aplicacion": "2026-01-20",
            }
        ],
    },
    {
        "id": "mas-003",
        "nombre": "Paco",
        "especie": "Ave",
        "raza": "Loro Amazónico",
        "edad_anios": 2,
        "peso_kg": 0.4,
        "alergias": [],
        "propietario_id": "usr-004",
        "historial": [
            {
                "fecha": "2025-03-05",
                "tipo": "consulta",
                "diagnostico": "Control de plumaje y pico",
                "tratamiento": "Suplemento vitamínico 30 días",
                "veterinario_id": "usr-001",
                "notas_internas": "Ave activa, sin signos de enfermedad.",
            }
        ],
        "vacunas": [],
    },
    {
        "id": "mas-004",
        "nombre": "Chispitas",
        "especie": "Otro",
        "raza": "Hámster Sirio",
        "edad_anios": 1,
        "peso_kg": 0.12,
        "alergias": [],
        "propietario_id": "usr-005",
        "historial": [
            {
                "fecha": "2025-04-18",
                "tipo": "consulta",
                "diagnostico": "Revisión general de roedor",
                "tratamiento": "Sin tratamiento requerido",
                "veterinario_id": "usr-002",
                "notas_internas": "Ejemplar saludable.",
            }
        ],
        "vacunas": [],
    },
]

SEED_TURNOS = [
    {
        "id": "tur-001",
        "cliente_id": "usr-004",
        "mascota_id": "mas-001",
        "veterinario_id": "usr-001",
        "fecha": "2025-06-10",
        "hora_inicio": "09:00",
        "hora_fin": "09:30",
        "servicio": "Consulta general",
        "estado": "confirmado",
        "notas": "",
    },
    {
        "id": "tur-002",
        "cliente_id": "usr-005",
        "mascota_id": "mas-002",
        "veterinario_id": "usr-002",
        "fecha": "2025-06-10",
        "hora_inicio": "10:00",
        "hora_fin": "10:30",
        "servicio": "Vacunación",
        "estado": "confirmado",
        "notas": "",
    },
]

SEED_NOTIFICACIONES: List[Dict] = []


# ─────────────────────────────────────────────
# CAPA DE PERSISTENCIA
# ─────────────────────────────────────────────

def _load(path: Path, seed: Any) -> Any:
    if not path.exists():
        _save(path, seed)
        return seed
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def _save(path: Path, data: Any) -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def load_usuarios() -> List[Dict]:
    return _load(USUARIOS_FILE, SEED_USUARIOS)

def save_usuarios(data: list) -> None:
    _save(USUARIOS_FILE, data)

def load_turnos() -> List[Dict]:
    return _load(TURNOS_FILE, SEED_TURNOS)

def save_turnos(data: list) -> None:
    _save(TURNOS_FILE, data)

def load_mascotas() -> List[Dict]:
    return _load(MASCOTAS_FILE, SEED_MASCOTAS)

def save_mascotas(data: list) -> None:
    _save(MASCOTAS_FILE, data)

def load_notificaciones() -> List[Dict]:
    return _load(NOTIFICACIONES_FILE, SEED_NOTIFICACIONES)

def save_notificaciones(data: list) -> None:
    _save(NOTIFICACIONES_FILE, data)


# ─────────────────────────────────────────────
# AUTH — HTTP Basic
# ─────────────────────────────────────────────
security = HTTPBasic()


def get_current_user(credentials: HTTPBasicCredentials = Depends(security)) -> Dict:
    usuarios = load_usuarios()
    for u in usuarios:
        if u["email"] == credentials.username and u["password"] == credentials.password:
            logger.info("Login HTTP Basic exitoso: %s (rol=%s)", u["email"], u["rol"])
            return u
    logger.warning("Login HTTP Basic fallido para: %s", credentials.username)
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales inválidas",
        headers={"WWW-Authenticate": "Basic"},
    )


def require_roles(*roles: str):
    def dependency(current_user: Dict = Depends(get_current_user)):
        if current_user["rol"] not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Se requiere uno de los roles: {list(roles)}",
            )
        return current_user
    return dependency


# ─────────────────────────────────────────────
# SCHEMAS Pydantic
# ─────────────────────────────────────────────
class RegistroUsuarioRequest(BaseModel):
    nombre: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class ReservaTurnoRequest(BaseModel):
    mascota_id: str
    veterinario_id: str
    fecha: str
    hora_inicio: str
    hora_fin: str
    servicio: str
    notas: Optional[str] = ""


class HistorialEntradaRequest(BaseModel):
    tipo: str
    diagnostico: str
    tratamiento: str
    notas_internas: Optional[str] = ""


class VacunaRequest(BaseModel):
    nombre: str
    fecha_aplicacion: str
    proxima_aplicacion: str


EspecieMascota = Literal["Perro", "Gato", "Ave", "Otro"]


class RegistroMascotaRequest(BaseModel):
    nombre: str
    especie: EspecieMascota
    raza: Optional[str] = ""
    edad_anios: Optional[int] = None
    peso_kg: Optional[float] = None
    alergias: Optional[List[str]] = []
    propietario_id: Optional[str] = None


# ─────────────────────────────────────────────
# APP
# ─────────────────────────────────────────────
app = FastAPI(
    title="Patitas Sanas — API",
    description=(
        "Backend del sistema de gestión integral para la veterinaria Patitas Sanas. "
        "Proyecto académico — Testing de Aplicaciones — UADE 2025."
    ),
    version="1.0.0",
)


@app.exception_handler(RequestValidationError)
def validation_exception_handler(request, exc: RequestValidationError):
    errores = exc.errors()
    for error in errores:
        campo = " → ".join(str(loc) for loc in error.get("loc", []))
        if "especie" in campo and error.get("type") in ("literal_error", "string_type", "enum"):
            return JSONResponse(
                status_code=400,
                content={
                    "detail": (
                        f"Especie inválida: '{error.get('input', '')}'. "
                        "Los valores permitidos son: 'Perro', 'Gato', 'Ave', 'Otro'."
                    )
                },
            )
    return JSONResponse(
        status_code=400,
        content={"detail": [e["msg"] for e in errores]},
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    load_usuarios()
    load_turnos()
    load_mascotas()
    load_notificaciones()
    logger.info("Patitas Sanas API iniciada. Archivos JSON inicializados.")


# ═══════════════════════════════════════════════
# A. MÓDULO DE AUTENTICACIÓN Y USUARIOS
# ═══════════════════════════════════════════════

@app.post(
    "/auth/register",
    summary="Registro de nuevo cliente",
    tags=["Autenticación"],
    status_code=201,
)
def register(body: RegistroUsuarioRequest):
    """
    Registra un nuevo usuario con rol **cliente**.
    Valida que el email no esté ya registrado.

    > ⚠️ **BUG INTENCIONAL (validación laxa de email)**:
    > Solo verifica que el email contenga "@".
    > Emails como `foo@` son aceptados.
    """
    usuarios = load_usuarios()

    # Validación laxa intencional — solo verifica presencia de "@"
    if "@" not in body.email:
        raise HTTPException(status_code=400, detail="Email inválido")

    if any(u["email"] == body.email for u in usuarios):
        logger.warning("Registro fallido — email ya existe: %s", body.email)
        raise HTTPException(status_code=409, detail="El email ya está registrado")

    nuevo = {
        "id": f"usr-{uuid.uuid4().hex[:8]}",
        "nombre": body.nombre,
        "email": body.email,
        "password": body.password,
        "rol": "cliente",
        "activo": True,
    }
    usuarios.append(nuevo)
    save_usuarios(usuarios)
    logger.info("Nuevo usuario registrado: %s (id=%s)", body.email, nuevo["id"])
    return {"mensaje": "Usuario registrado exitosamente", "id": nuevo["id"]}


@app.post(
    "/auth/login",
    summary="Login de usuario",
    tags=["Autenticación"],
)
def login(body: LoginRequest):
    """
    Autentica al usuario con email y contraseña.
    Retorna los datos del usuario (sin contraseña) si las credenciales son correctas.
    """
    usuarios = load_usuarios()
    for u in usuarios:
        if u["email"] == body.email and u["password"] == body.password:
            logger.info("Login POST exitoso: %s (rol=%s)", u["email"], u["rol"])
            return {k: v for k, v in u.items() if k != "password"}
    logger.warning("Login POST fallido: %s", body.email)
    raise HTTPException(status_code=401, detail="Credenciales inválidas")


# ═══════════════════════════════════════════════
# B. MÓDULO A — GESTIÓN DE TURNOS Y AGENDA
# ═══════════════════════════════════════════════

@app.get(
    "/turnos/disponibilidad",
    summary="Ver disponibilidad de turnos por veterinario",
    tags=["Turnos"],
)
def ver_disponibilidad(fecha: Optional[str] = None):
    """
    Retorna todos los turnos confirmados, opcionalmente filtrados por fecha (YYYY-MM-DD).
    """
    turnos = load_turnos()
    usuarios = load_usuarios()
    vets = {u["id"]: u["nombre"] for u in usuarios if u["rol"] == "veterinario"}

    if fecha:
        turnos = [t for t in turnos if t["fecha"] == fecha]

    resultado = {}
    for vet_id, vet_nombre in vets.items():
        turnos_vet = [t for t in turnos if t["veterinario_id"] == vet_id]
        resultado[vet_nombre] = {
            "veterinario_id": vet_id,
            "turnos": turnos_vet,
        }

    return resultado


@app.post(
    "/turnos/reservar",
    summary="Reservar un turno",
    tags=["Turnos"],
    status_code=201,
)
def reservar_turno(
    body: ReservaTurnoRequest,
    current_user: Dict = Depends(get_current_user),
):
    """
    Permite a un cliente autenticado reservar un turno.
    Simula envío de email de confirmación.
    """
    turnos = load_turnos()
    usuarios = load_usuarios()

    vet = next(
        (u for u in usuarios if u["id"] == body.veterinario_id and u["rol"] == "veterinario"),
        None,
    )
    if not vet:
        raise HTTPException(status_code=404, detail="Veterinario no encontrado")

    mascotas = load_mascotas()
    mascota = next((m for m in mascotas if m["id"] == body.mascota_id), None)
    if not mascota:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")
    if current_user["rol"] == "cliente" and mascota["propietario_id"] != current_user["id"]:
        raise HTTPException(status_code=403, detail="La mascota no pertenece al usuario autenticado")

    # ===========================================
    # BUG_ID: RF-A01-20260521-001
    # ESTADO: INTENCIONAL
    # DESCRIPCION:
    # El sistema permite reservar turnos superpuestos.
    # La validacion de solapamiento horario fue eliminada
    # completamente. Dos o mas turnos pueden coincidir en
    # el mismo veterinario, fecha y horario sin ningun error.
    # NO CORREGIR.
    # ===========================================
    #
    # CODIGO ORIGINAL eliminado intencionalmente:
    # turnos_vet_dia = [
    #     t for t in turnos
    #     if t["veterinario_id"] == body.veterinario_id
    #     and t["fecha"] == body.fecha
    #     and t["estado"] != "cancelado"
    # ]
    # for t in turnos_vet_dia:
    #     if body.hora_inicio < t["hora_fin"] and body.hora_fin > t["hora_inicio"]:
    #         logger.warning("Intento de doble booking...")
    #         raise HTTPException(
    #             status_code=409,
    #             detail=f"Conflicto de horario con turno existente ({t['hora_inicio']}-{t['hora_fin']})",
    #         )

    nuevo_turno = {
        "id": f"tur-{uuid.uuid4().hex[:8]}",
        "cliente_id": current_user["id"],
        "mascota_id": body.mascota_id,
        "veterinario_id": body.veterinario_id,
        "fecha": body.fecha,
        "hora_inicio": body.hora_inicio,
        "hora_fin": body.hora_fin,
        "servicio": body.servicio,
        "estado": "confirmado",
        "notas": body.notas or "",
    }
    turnos.append(nuevo_turno)
    save_turnos(turnos)
    logger.info(
        "Turno reservado: id=%s cliente=%s vet=%s fecha=%s %s-%s",
        nuevo_turno["id"], current_user["id"], body.veterinario_id,
        body.fecha, body.hora_inicio, body.hora_fin,
    )

    # Email de confirmacion (activo)
    _simular_notificacion(
        tipo="confirmacion",
        turno_id=nuevo_turno["id"],
        destinatario_email=current_user["email"],
        mensaje=f"Su turno con {vet['nombre']} el {body.fecha} a las {body.hora_inicio} fue confirmado.",
    )

    # ===========================================
    # BUG_ID: RF-A03-20260521-002
    # ESTADO: INTENCIONAL
    # DESCRIPCION:
    # No se envian correos de recordatorio 24 horas antes del turno.
    # La llamada a _simular_notificacion() para tipo "recordatorio"
    # fue deshabilitada completamente. El email de confirmacion
    # funciona normalmente. Solo fallan los recordatorios.
    # NO CORREGIR.
    # ===========================================
    #
    # CODIGO ORIGINAL deshabilitado intencionalmente:
    # try:
    #     dt_turno = datetime.strptime(f"{body.fecha} {body.hora_inicio}", "%Y-%m-%d %H:%M")
    #     dt_recordatorio = dt_turno - timedelta(hours=24)
    #     _simular_notificacion(
    #         tipo="recordatorio",
    #         turno_id=nuevo_turno["id"],
    #         destinatario_email=current_user["email"],
    #         mensaje=f"Recordatorio: manana tiene turno a las {body.hora_inicio} con {vet['nombre']}.",
    #         programado_para=dt_recordatorio.isoformat(),
    #     )
    # except ValueError:
    #     logger.error("No se pudo programar recordatorio - formato invalido")
    logger.debug(
        "[RF-A03-20260521-002] Recordatorio de email DESHABILITADO intencionalmente — turno=%s",
        nuevo_turno["id"],
    )

    return {"mensaje": "Turno reservado exitosamente", "turno": nuevo_turno}


def _simular_notificacion(
    tipo: str,
    turno_id: str,
    destinatario_email: str,
    mensaje: str,
    programado_para: Optional[str] = None,
) -> None:
    """Simula el envio de un email registrandolo en notificaciones.json y en los logs."""
    notificaciones = load_notificaciones()
    nueva = {
        "id": f"not-{uuid.uuid4().hex[:8]}",
        "tipo": tipo,
        "turno_id": turno_id,
        "destinatario": destinatario_email,
        "mensaje": mensaje,
        "enviado_en": datetime.now().isoformat(),
        "programado_para": programado_para,
        "estado": "simulado",
    }
    notificaciones.append(nueva)
    save_notificaciones(notificaciones)
    logger.info(
        "[EMAIL SIMULADO] tipo=%s para=%s turno=%s msg='%s'",
        tipo, destinatario_email, turno_id, mensaje,
    )


# ═══════════════════════════════════════════════
# C. MÓDULO B — HISTORIAL CLÍNICO DIGITAL
# ═══════════════════════════════════════════════

@app.post(
    "/mascotas",
    summary="Registrar una nueva mascota",
    tags=["Historial Clínico"],
    status_code=201,
)
def registrar_mascota(
    body: RegistroMascotaRequest,
    current_user: Dict = Depends(get_current_user),
):
    """Da de alta una nueva mascota en el sistema."""
    if not body.nombre or not body.nombre.strip():
        raise HTTPException(
            status_code=400,
            detail="El nombre de la mascota es obligatorio. No se permiten nombres vacios.",
        )

    usuarios = load_usuarios()
    if body.propietario_id:
        if current_user["rol"] == "cliente" and body.propietario_id != current_user["id"]:
            raise HTTPException(
                status_code=403,
                detail="Los clientes solo pueden registrar mascotas a su propio nombre.",
            )
        propietario = next((u for u in usuarios if u["id"] == body.propietario_id), None)
        if not propietario:
            raise HTTPException(status_code=404, detail="Propietario no encontrado.")
        propietario_id = body.propietario_id
    else:
        propietario_id = current_user["id"]

    mascotas = load_mascotas()
    nueva_mascota = {
        "id": f"mas-{uuid.uuid4().hex[:8]}",
        "nombre": body.nombre.strip(),
        "especie": body.especie,
        "raza": body.raza or "",
        "edad_anios": body.edad_anios,
        "peso_kg": body.peso_kg,
        "alergias": body.alergias or [],
        "propietario_id": propietario_id,
        "historial": [],
        "vacunas": [],
    }
    mascotas.append(nueva_mascota)
    save_mascotas(mascotas)
    logger.info(
        "Mascota registrada: id=%s nombre='%s' especie=%s propietario=%s por usuario=%s",
        nueva_mascota["id"], nueva_mascota["nombre"], nueva_mascota["especie"],
        propietario_id, current_user["id"],
    )
    return {"mensaje": "Mascota registrada exitosamente", "mascota": nueva_mascota}


@app.get(
    "/mascotas/{mascota_id}/historial",
    summary="Obtener historial clinico de una mascota",
    tags=["Historial Clínico"],
)
def get_historial(
    mascota_id: str,
    current_user: Dict = Depends(get_current_user),
):
    """
    Retorna el expediente completo de la mascota.
    - Clientes: ven todos los datos excepto notas_internas.
    - Veterinarios / Admin: ven el expediente completo.
    """
    mascotas = load_mascotas()
    mascota = next((m for m in mascotas if m["id"] == mascota_id), None)
    if not mascota:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")

    if current_user["rol"] == "cliente" and mascota["propietario_id"] != current_user["id"]:
        raise HTTPException(status_code=403, detail="Acceso denegado")

    logger.info("Historial consultado: mascota=%s por usuario=%s", mascota_id, current_user["id"])

    resultado = dict(mascota)
    if current_user["rol"] == "cliente":
        resultado["historial"] = [
            {k: v for k, v in entrada.items() if k != "notas_internas"}
            for entrada in resultado.get("historial", [])
        ]

    return resultado


@app.post(
    "/mascotas/{mascota_id}/historial",
    summary="Agregar entrada al historial clinico",
    tags=["Historial Clínico"],
    status_code=201,
)
def add_historial(
    mascota_id: str,
    body: HistorialEntradaRequest,
    current_user: Dict = Depends(require_roles("veterinario", "admin")),
):
    """Agrega un diagnostico o registro sanitario. Requiere rol veterinario o admin."""
    mascotas = load_mascotas()
    idx = next((i for i, m in enumerate(mascotas) if m["id"] == mascota_id), None)
    if idx is None:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")

    nueva_entrada = {
        "fecha": datetime.now().strftime("%Y-%m-%d"),
        "tipo": body.tipo,
        "diagnostico": body.diagnostico,
        "tratamiento": body.tratamiento,
        "veterinario_id": current_user["id"],
        "notas_internas": body.notas_internas or "",
    }
    mascotas[idx]["historial"].append(nueva_entrada)
    save_mascotas(mascotas)
    logger.info(
        "Historial actualizado: mascota=%s por veterinario=%s tipo=%s",
        mascota_id, current_user["id"], body.tipo,
    )
    return {"mensaje": "Entrada agregada al historial", "entrada": nueva_entrada}


@app.post(
    "/mascotas/{mascota_id}/vacunas",
    summary="Registrar vacuna en calendario sanitario",
    tags=["Historial Clínico"],
    status_code=201,
)
def add_vacuna(
    mascota_id: str,
    body: VacunaRequest,
    current_user: Dict = Depends(require_roles("veterinario", "admin")),
):
    """
    Registra una vacuna con fecha de aplicacion y proxima aplicacion.
    Requiere rol veterinario o admin.

    > BUG INTENCIONAL: No se valida que proxima_aplicacion sea posterior
    > a fecha_aplicacion. Acepta cualquier orden de fechas.
    """
    mascotas = load_mascotas()
    idx = next((i for i, m in enumerate(mascotas) if m["id"] == mascota_id), None)
    if idx is None:
        raise HTTPException(status_code=404, detail="Mascota no encontrada")

    nueva_vacuna = {
        "nombre": body.nombre,
        "fecha_aplicacion": body.fecha_aplicacion,
        "proxima_aplicacion": body.proxima_aplicacion,
    }
    mascotas[idx]["vacunas"].append(nueva_vacuna)
    save_mascotas(mascotas)
    logger.info(
        "Vacuna registrada: mascota=%s vacuna='%s' aplicada=%s proxima=%s",
        mascota_id, body.nombre, body.fecha_aplicacion, body.proxima_aplicacion,
    )
    return {"mensaje": "Vacuna registrada", "vacuna": nueva_vacuna}


# ═══════════════════════════════════════════════
# D. MÓDULO C — PANEL DE ADMINISTRACIÓN
# ═══════════════════════════════════════════════

@app.get(
    "/admin/agenda",
    summary="Agenda diaria centralizada",
    tags=["Administración"],
)
def admin_agenda(
    fecha: Optional[str] = None,
    current_user: Dict = Depends(require_roles("veterinario", "admin")),
):
    """Vista centralizada de todos los turnos. Filtra por fecha si se proporciona."""
    turnos = load_turnos()
    usuarios = load_usuarios()
    mascotas = load_mascotas()

    if fecha:
        turnos = [t for t in turnos if t["fecha"] == fecha]

    usuarios_idx = {u["id"]: u for u in usuarios}
    mascotas_idx = {m["id"]: m for m in mascotas}

    agenda = []
    for t in sorted(turnos, key=lambda x: (x["fecha"], x["hora_inicio"])):
        cliente = usuarios_idx.get(t["cliente_id"], {})
        mascota = mascotas_idx.get(t["mascota_id"], {})
        vet = usuarios_idx.get(t["veterinario_id"], {})
        agenda.append({
            **t,
            "cliente_nombre": cliente.get("nombre", "—"),
            "cliente_email": cliente.get("email", "—"),
            "mascota_nombre": mascota.get("nombre", "—"),
            "mascota_especie": mascota.get("especie", "—"),
            "veterinario_nombre": vet.get("nombre", "—"),
        })

    logger.info(
        "Agenda consultada por %s (rol=%s) — fecha=%s — %d turnos",
        current_user["email"], current_user["rol"], fecha or "todos", len(agenda),
    )
    return {"total": len(agenda), "agenda": agenda}


@app.get(
    "/admin/usuarios",
    summary="Listar todos los usuarios registrados",
    tags=["Administración"],
)
def admin_usuarios(
    current_user: Dict = Depends(require_roles("admin")),
):
    """Retorna todos los usuarios (sin contraseñas). Solo accesible por admin."""
    usuarios = load_usuarios()
    return [{k: v for k, v in u.items() if k != "password"} for u in usuarios]


@app.get(
    "/admin/mascotas",
    summary="Listar todas las mascotas registradas",
    tags=["Administración"],
)
def admin_mascotas(
    current_user: Dict = Depends(require_roles("veterinario", "admin")),
):
    """Retorna todas las mascotas con su historial completo."""
    mascotas = load_mascotas()
    return mascotas


# ═══════════════════════════════════════════════
# HEALTH CHECK
# ═══════════════════════════════════════════════

@app.get("/", tags=["Sistema"])
def root():
    return {
        "sistema": "Patitas Sanas API",
        "version": "1.0.0",
        "estado": "operativo",
        "documentacion": "/docs",
    }


@app.get("/health", tags=["Sistema"])
def health():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}


# ─────────────────────────────────────────────────────────────────────────────
# TABLA DE BUGS INTENCIONALES ACTIVOS EN ESTE ARCHIVO
# ─────────────────────────────────────────────────────────────────────────────
#
#  BUG_ID               FUNCION           DESCRIPCION
#  RF-A01-20260521-001  reservar_turno()  Validacion de solapamiento eliminada.
#                                         Dos turnos pueden coincidir en mismo
#                                         veterinario/fecha/horario sin error.
#
#  RF-A03-20260521-002  reservar_turno()  Llamada a _simular_notificacion()
#                                         para tipo="recordatorio" deshabilitada.
#                                         No se generan recordatorios 24hs antes.
#
# ─────────────────────────────────────────────────────────────────────────────
