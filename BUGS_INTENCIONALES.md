# BUGS_INTENCIONALES.md
# Proyecto: Patitas Sanas — Sistema de Gestión Veterinaria
# Materia: Testing de Aplicaciones — UADE 2025

---

## BUG 1 — RF-A01-20260521-001

**Componente:** Backend  
**Archivo:** `patitas-veterinarias-main/main.py`  
**Función:** `reservar_turno()` — `POST /turnos/reservar`  

### Descripción
Turnos superpuestos permitidos. La validación de solapamiento horario fue eliminada completamente.

### Código ANTES
```python
turnos_vet_dia = [t for t in turnos
    if t["veterinario_id"] == body.veterinario_id
    and t["fecha"] == body.fecha
    and t["estado"] != "cancelado"]
for t in turnos_vet_dia:
    if body.hora_inicio < t["hora_fin"] and body.hora_fin > t["hora_inicio"]:
        raise HTTPException(status_code=409, detail="Conflicto de horario...")
```

### Código DESPUÉS (bug activo)
```python
# ===========================================
# BUG_ID: RF-A01-20260521-001
# ESTADO: INTENCIONAL — NO CORREGIR
# ===========================================
# Validación eliminada. Sin restricción de horarios.
```

### Pasos para reproducir
1. `POST /turnos/reservar` con vet=usr-001, fecha=2025-12-15, 09:00-09:30
2. Repetir el mismo request exacto
3. Ambos devuelven 201 Created

### Comportamiento esperado
Segunda llamada → `409 Conflict`

### Comportamiento observado
Segunda llamada → `201 Created` (turno duplicado guardado)

---

## BUG 2 — RF-A03-20260521-002

**Componente:** Backend  
**Archivo:** `patitas-veterinarias-main/main.py`  
**Función:** `reservar_turno()` — `POST /turnos/reservar`  

### Descripción
No se envían emails de recordatorio 24 hs antes del turno. La llamada a `_simular_notificacion(tipo="recordatorio")` está deshabilitada.

### Código ANTES
```python
dt_turno = datetime.strptime(f"{body.fecha} {body.hora_inicio}", "%Y-%m-%d %H:%M")
dt_recordatorio = dt_turno - timedelta(hours=24)
_simular_notificacion(tipo="recordatorio", turno_id=nuevo_turno["id"], ...)
```

### Código DESPUÉS (bug activo)
```python
# ===========================================
# BUG_ID: RF-A03-20260521-002
# ESTADO: INTENCIONAL — NO CORREGIR
# ===========================================
# Llamada comentada intencionalmente
# try: ... _simular_notificacion(tipo="recordatorio"...) <-- DESHABILITADO
logger.debug("[RF-A03] Recordatorio DESHABILITADO intencionalmente")
```

### Pasos para reproducir
1. Reservar un turno
2. Revisar `data/notificaciones.json`
3. No existe ninguna entrada con `"tipo": "recordatorio"`

### Comportamiento esperado
`notificaciones.json` contiene confirmación + recordatorio (2 entradas)

### Comportamiento observado
`notificaciones.json` contiene solo la confirmación (1 entrada)

---

## BUG 3 — RF-C02-20260521-003

**Componente:** Frontend  
**Archivo:** `vet-app-es/app/booking/page.tsx`  
**Función:** `handleSubmit()`  

### Descripción
Un usuario con email ya registrado recibe "Credenciales inválidas" al intentar reservar turno. El fallback a login fue reemplazado por un error.

### Código ANTES
```typescript
if (message.includes("ya está registrado")) {
  const user = await apiLogin(ownerEmail, ownerPassword);  // fallback correcto
  userId = user.id;
}
```

### Código DESPUÉS (bug activo)
```typescript
/*
BUG_ID: RF-C02-20260521-003 — INTENCIONAL — NO CORREGIR
*/
if (message.includes("ya está registrado")) {
  throw new Error("Credenciales inválidas");  // error falso, sin intentar login
}
```

### Pasos para reproducir
1. Ir a `/booking` en el frontend
2. Ingresar email ya registrado: `carlos.gomez@gmail.com` / `carlos123`
3. Completar mascota y horario → Confirmar Turno

### Comportamiento esperado
Sistema autentica al usuario y reserva el turno exitosamente

### Comportamiento observado
UI muestra: **"Credenciales inválidas"** — turno no reservado

---

## BUG 4 — RF-C01-20260521-004

**Componente:** Frontend  
**Archivo:** `vet-app-es/components/admin/admin-dashboard.tsx`  
**Función:** `navigateDate()`  

### Descripción
La agenda solo muestra días anteriores. El botón ▶ (siguiente día) no funciona para fechas desde hoy en adelante.

### Código ANTES
```typescript
const navigateDate = (direction: "prev" | "next") => {
  const current = new Date(selectedDate + "T00:00:00");
  current.setDate(current.getDate() + (direction === "next" ? 1 : -1));
  setSelectedDate(format(current, "yyyy-MM-dd"));
};
```

### Código DESPUÉS (bug activo)
```typescript
/*
BUG_ID: RF-C01-20260521-004 — INTENCIONAL — NO CORREGIR
*/
const navigateDate = (direction: "prev" | "next") => {
  const current = new Date(selectedDate + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (direction === "next" && current >= today) {
    return;  // BUG: bloquea navegación al futuro
  }
  current.setDate(current.getDate() + (direction === "next" ? 1 : -1));
  setSelectedDate(format(current, "yyyy-MM-dd"));
};
```

### Pasos para reproducir
1. Ir a `/admin` → Login → Tab "Agenda"
2. Presionar el botón ▶ (ChevronRight) con la fecha en hoy

### Comportamiento esperado
La fecha avanza día a día hacia el futuro

### Comportamiento observado
El botón ▶ no tiene efecto. La agenda queda bloqueada en el presente o pasado.

---

## Resumen

| BUG_ID | Archivo | Función | Tipo |
|---|---|---|---|
| RF-A01-20260521-001 | main.py | reservar_turno() | Eliminación de validación |
| RF-A03-20260521-002 | main.py | reservar_turno() | Código comentado |
| RF-C02-20260521-003 | booking/page.tsx | handleSubmit() | Error falso |
| RF-C01-20260521-004 | admin-dashboard.tsx | navigateDate() | Condición de bloqueo |
