# Patitas Sanas — API Backend

Proyecto académico integrador — Materia **Testing de Aplicaciones** — UADE 2025.

---

## Stack Técnico

| Capa | Tecnología |
|---|---|
| Lenguaje | Python 3.10+ |
| Framework | FastAPI |
| Persistencia | Archivos JSON planos (sin DB) |
| Autenticación | HTTP Basic |
| Documentación | Swagger UI / ReDoc (nativo FastAPI) |

---

## Estructura del Proyecto

```
patitas_sanas/
├── main.py              # Toda la aplicación (un único archivo robusto)
├── requirements.txt
├── README.md
└── data/                # Generada automáticamente al iniciar
    ├── usuarios.json
    ├── turnos.json
    ├── mascotas.json
    └── notificaciones.json
```

---

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
pip install -r requirements.txt

# 2. Levantar el servidor
uvicorn main:app --reload --port 8000
```

Acceder a la documentación interactiva:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## Usuarios Precargados (seed data)

| Email | Password | Rol |
|---|---|---|
| martin.lopez@patitassanas.com | vet1234 | veterinario |
| sofia.ramos@patitassanas.com | vet5678 | veterinario |
| admin@patitassanas.com | admin2025 | admin |
| carlos.gomez@gmail.com | carlos123 | cliente |
| laura.fer@hotmail.com | laura456 | cliente |

> La autenticación en los endpoints protegidos usa **HTTP Basic**
> (usuario = email, contraseña = password).

---

## Endpoints Disponibles

### Autenticación
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/auth/register` | Registrar nuevo cliente | No |
| POST | `/auth/login` | Login (retorna datos del usuario) | No |

### Turnos
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/turnos/disponibilidad` | Ver disponibilidad por veterinario | No |
| POST | `/turnos/reservar` | Reservar turno | Cliente/Vet/Admin |

### Historial Clínico
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/mascotas/{id}/historial` | Ver expediente completo | Cliente/Vet/Admin |
| POST | `/mascotas/{id}/historial` | Agregar diagnóstico/tratamiento | Vet/Admin |
| POST | `/mascotas/{id}/vacunas` | Registrar vacuna | Vet/Admin |

### Administración
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/admin/agenda` | Agenda diaria centralizada | Vet/Admin |
| GET | `/admin/usuarios` | Listar usuarios | Admin |
| GET | `/admin/mascotas` | Listar mascotas | Vet/Admin |

---

## Bugs Intencionales (para el equipo de QA)

> ⚠️ Ver el bloque de comentarios al final de `main.py` para la descripción
> completa de cada bug, su ubicación y cómo reproducirlo.

| # | Endpoint | Descripción breve |
|---|---|---|
| 1 | `POST /auth/register` | Validación de email laxa (solo verifica `@`) |
| 2 | `POST /turnos/reservar` | Operador `>=` rechaza turnos back-to-back válidos |
| 3 | `POST /mascotas/{id}/vacunas` | No valida que proxima_aplicacion > fecha_aplicacion |

---

## Logs

El sistema genera `patitas_sanas.log` en el directorio raíz con todas las
operaciones relevantes (login, registro, reservas, errores).
