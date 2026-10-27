# Patitas Sanas — Sistema de gestión veterinaria

Aplicación web para gestionar una veterinaria: reserva de turnos, historial clínico de mascotas, agenda para veterinarios y panel de administración.

Proyecto académico de la materia **Testing de Aplicaciones** (UADE). El código incluye **defectos intencionales y documentados** para practicar técnicas de testing: ver [`BUGS_INTENCIONALES.md`](BUGS_INTENCIONALES.md).

## Stack

| Capa | Tecnología |
|---|---|
| Backend | Python 3.10+, FastAPI, Pydantic |
| Persistencia | Archivos JSON (sin base de datos) |
| Autenticación | HTTP Basic |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui |

## Estructura

```
.
├── patitas-veterinarias-main/   # Backend (API REST con FastAPI)
│   ├── main.py
│   ├── requirements.txt
│   └── data/                    # Datos de ejemplo en JSON
├── vet-app-es/                  # Frontend (Next.js)
│   ├── app/                     # Páginas: inicio, reserva, admin
│   └── components/
└── BUGS_INTENCIONALES.md        # Defectos documentados a propósito
```

## Cómo correrlo

Hacen falta dos terminales: una para el backend y otra para el frontend.

**1. Backend** (puerto 3001, el que espera el frontend por defecto)

```bash
cd patitas-veterinarias-main
python -m venv .venv
source .venv/bin/activate        # En Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 3001
```

La documentación interactiva de la API queda en http://localhost:3001/docs (Swagger) y http://localhost:3001/redoc.

**2. Frontend** (puerto 3000)

```bash
cd vet-app-es
npm install
npm run dev
```

Abrir http://localhost:3000. El frontend reenvía las llamadas `/api/*` al backend. Si el backend corre en otro puerto, definir `NEXT_PUBLIC_BACKEND_URL` (por ejemplo `http://localhost:8000`).

## Usuarios de prueba

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | admin@patitassanas.com | admin2025 |
| Veterinario | martin.lopez@patitassanas.com | vet1234 |
| Veterinario | sofia.ramos@patitassanas.com | vet5678 |
| Cliente | carlos.gomez@gmail.com | carlos123 |
| Cliente | laura.fer@hotmail.com | laura456 |

Son datos de ejemplo para desarrollo; no usar contraseñas reales.

## Principales endpoints

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/register`, `/auth/login` | Registro e inicio de sesión |
| GET | `/turnos/disponibilidad` | Disponibilidad por veterinario |
| POST | `/turnos/reservar` | Reservar un turno |
| GET / POST | `/mascotas/{id}/historial` | Ver o agregar historial clínico |
| POST | `/mascotas/{id}/vacunas` | Registrar una vacuna |
| GET | `/admin/agenda`, `/admin/usuarios`, `/admin/mascotas` | Panel administrativo |

El detalle completo de cada endpoint está en `/docs` con el backend corriendo.
