(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appointments",
    ()=>appointments,
    "availableTimeSlots",
    ()=>availableTimeSlots,
    "medicalRecords",
    ()=>medicalRecords,
    "owners",
    ()=>owners,
    "pets",
    ()=>pets,
    "vaccines",
    ()=>vaccines,
    "vets",
    ()=>vets
]);
const vets = [
    {
        // ID real del backend (seed: usr-001)
        id: "usr-001",
        name: "Dr. Martín López",
        specialty: "Clínica General y Cirugía",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
    },
    {
        // ID real del backend (seed: usr-002)
        id: "usr-002",
        name: "Dra. Sofía Ramos",
        specialty: "Medicina Interna y Cardiología",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face"
    }
];
const owners = [
    {
        id: "owner-1",
        name: "Ana Martínez",
        email: "ana.martinez@email.com",
        phone: "+54 11 4567-8901",
        pets: [
            "pet-1",
            "pet-2"
        ]
    },
    {
        id: "owner-2",
        name: "Roberto Silva",
        email: "roberto.silva@email.com",
        phone: "+54 11 2345-6789",
        pets: [
            "pet-3"
        ]
    },
    {
        id: "owner-3",
        name: "Laura Fernández",
        email: "laura.fernandez@email.com",
        phone: "+54 11 9876-5432",
        pets: [
            "pet-4"
        ]
    }
];
const pets = [
    {
        id: "pet-1",
        name: "Max",
        species: "dog",
        breed: "Golden Retriever",
        weight: 32,
        birthDate: "2020-03-15",
        allergies: [
            "Pollo"
        ],
        pastSurgeries: [
            "Castración (2021)"
        ],
        ownerId: "owner-1"
    },
    {
        id: "pet-2",
        name: "Luna",
        species: "cat",
        breed: "Siamés",
        weight: 4.5,
        birthDate: "2021-07-22",
        allergies: [],
        pastSurgeries: [],
        ownerId: "owner-1"
    },
    {
        id: "pet-3",
        name: "Rocky",
        species: "dog",
        breed: "Bulldog",
        weight: 25,
        birthDate: "2019-11-08",
        allergies: [
            "Carne vacuna",
            "Lácteos"
        ],
        pastSurgeries: [
            "Cirugía de cadera (2022)"
        ],
        ownerId: "owner-2"
    },
    {
        id: "pet-4",
        name: "Mia",
        species: "cat",
        breed: "Persa",
        weight: 5,
        birthDate: "2022-01-30",
        allergies: [],
        pastSurgeries: [
            "Esterilización (2023)"
        ],
        ownerId: "owner-3"
    }
];
const appointments = [
    {
        id: "apt-1",
        vetId: "usr-001",
        petId: "pet-1",
        ownerId: "owner-1",
        date: "2026-05-14",
        time: "09:00",
        reason: "Control anual y vacunación",
        status: "confirmed"
    },
    {
        id: "apt-2",
        vetId: "usr-001",
        petId: "pet-3",
        ownerId: "owner-2",
        date: "2026-05-14",
        time: "10:30",
        reason: "Control post-cirugía de cadera",
        status: "pending"
    },
    {
        id: "apt-3",
        vetId: "usr-002",
        petId: "pet-2",
        ownerId: "owner-1",
        date: "2026-05-14",
        time: "11:00",
        reason: "Refuerzo de vacuna",
        status: "confirmed"
    },
    {
        id: "apt-4",
        vetId: "usr-002",
        petId: "pet-4",
        ownerId: "owner-3",
        date: "2026-05-14",
        time: "14:00",
        reason: "Consulta por problema de piel",
        status: "pending"
    },
    {
        id: "apt-5",
        vetId: "usr-001",
        petId: "pet-1",
        ownerId: "owner-1",
        date: "2026-05-15",
        time: "09:30",
        reason: "Limpieza dental",
        status: "confirmed"
    }
];
const medicalRecords = [
    {
        id: "rec-1",
        petId: "pet-1",
        date: "2025-11-15",
        diagnosis: "Infección leve de oído",
        treatment: "Gotas antibióticas para oídos, 7 días de tratamiento",
        vetId: "vet-1",
        notes: "El paciente respondió bien al tratamiento. No se requiere seguimiento a menos que reaparezcan los síntomas."
    },
    {
        id: "rec-2",
        petId: "pet-1",
        date: "2025-06-20",
        diagnosis: "Control anual de salud",
        treatment: "Vacuna antirrábica administrada, prevención de heartworm recetada",
        vetId: "vet-1"
    },
    {
        id: "rec-3",
        petId: "pet-3",
        date: "2026-02-10",
        diagnosis: "Displasia de cadera - control post-cirugía",
        treatment: "Ejercicios de fisioterapia, medicación antiinflamatoria",
        vetId: "vet-2",
        notes: "La recuperación avanza bien. Continuar ejercicios por 4 semanas más."
    },
    {
        id: "rec-4",
        petId: "pet-2",
        date: "2025-08-05",
        diagnosis: "Infección respiratoria alta",
        treatment: "Antibióticos y reposo por 10 días",
        vetId: "vet-2"
    }
];
const vaccines = [
    {
        id: "vac-1",
        petId: "pet-1",
        name: "Antirrábica",
        dateAdministered: "2025-06-20",
        nextDueDate: "2026-06-20",
        status: "up-to-date"
    },
    {
        id: "vac-2",
        petId: "pet-1",
        name: "DHPP",
        dateAdministered: "2025-06-20",
        nextDueDate: "2026-06-20",
        status: "up-to-date"
    },
    {
        id: "vac-3",
        petId: "pet-1",
        name: "Bordetella",
        dateAdministered: "2025-06-20",
        nextDueDate: "2026-05-20",
        status: "due-soon"
    },
    {
        id: "vac-4",
        petId: "pet-2",
        name: "FVRCP",
        dateAdministered: "2024-12-15",
        nextDueDate: "2025-12-15",
        status: "overdue"
    },
    {
        id: "vac-5",
        petId: "pet-2",
        name: "Antirrábica",
        dateAdministered: "2024-12-15",
        nextDueDate: "2026-12-15",
        status: "up-to-date"
    },
    {
        id: "vac-6",
        petId: "pet-3",
        name: "Antirrábica",
        dateAdministered: "2025-09-10",
        nextDueDate: "2026-09-10",
        status: "up-to-date"
    },
    {
        id: "vac-7",
        petId: "pet-4",
        name: "FVRCP",
        dateAdministered: "2025-03-01",
        nextDueDate: "2026-03-01",
        status: "overdue"
    }
];
const availableTimeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiGetAgenda",
    ()=>apiGetAgenda,
    "apiGetDisponibilidad",
    ()=>apiGetDisponibilidad,
    "apiGetHistorial",
    ()=>apiGetHistorial,
    "apiGetMascotas",
    ()=>apiGetMascotas,
    "apiGetUsuarios",
    ()=>apiGetUsuarios,
    "apiLogin",
    ()=>apiLogin,
    "apiRegister",
    ()=>apiRegister,
    "apiRegistrarMascota",
    ()=>apiRegistrarMascota,
    "apiReservarTurno",
    ()=>apiReservarTurno,
    "buildBasicAuthHeader",
    ()=>buildBasicAuthHeader,
    "buildHeaders",
    ()=>buildHeaders,
    "calcularHoraFin",
    ()=>calcularHoraFin,
    "mapEspecieToBackend",
    ()=>mapEspecieToBackend,
    "mapEspecieToFrontend",
    ()=>mapEspecieToFrontend,
    "mapEstadoToFrontend",
    ()=>mapEstadoToFrontend
]);
/**
 * ─────────────────────────────────────────────────────────────────────────────
 * api.ts — Capa de comunicación con el Backend (FastAPI — Patitas Sanas)
 *
 * URL base: http://localhost:3000  (proxy Next.js → /api/* → backend)
 * Auth:     HTTP Basic (email:password en base64)
 * ─────────────────────────────────────────────────────────────────────────────
 */ // En desarrollo Next.js actúa como proxy (ver next.config.mjs).
// El frontend llama a /api/... y Next.js reenvía a http://localhost:3000/...
const API_BASE = "/api";
function buildBasicAuthHeader(email, password) {
    const encoded = ("TURBOPACK compile-time truthy", 1) ? btoa(`${email}:${password}`) : "TURBOPACK unreachable";
    return `Basic ${encoded}`;
}
function buildHeaders(credentials) {
    const headers = {
        "Content-Type": "application/json"
    };
    if (credentials) {
        headers["Authorization"] = buildBasicAuthHeader(credentials.email, credentials.password);
    }
    return headers;
}
function mapEspecieToBackend(species) {
    const map = {
        dog: "Perro",
        cat: "Gato",
        bird: "Ave",
        other: "Otro"
    };
    return map[species];
}
function mapEspecieToFrontend(especie) {
    const map = {
        Perro: "dog",
        Gato: "cat",
        Ave: "bird",
        Otro: "other"
    };
    return map[especie];
}
function mapEstadoToFrontend(estado) {
    const map = {
        confirmado: "confirmed",
        cancelado: "cancelled",
        pendiente: "pending"
    };
    return map[estado] ?? "pending";
}
function calcularHoraFin(horaInicio) {
    const [h, m] = horaInicio.split(":").map(Number);
    const totalMinutos = h * 60 + m + 30;
    const hFin = Math.floor(totalMinutos / 60) % 24;
    const mFin = totalMinutos % 60;
    return `${String(hFin).padStart(2, "0")}:${String(mFin).padStart(2, "0")}`;
}
async function apiLogin(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.detail ?? "Credenciales inválidas");
    }
    return res.json();
}
async function apiRegister(nombre, email, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            email,
            password
        })
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.detail ?? "Error al registrar usuario");
    }
    return res.json();
}
async function apiGetAgenda(credentials, fecha) {
    const params = fecha ? `?fecha=${fecha}` : "";
    const res = await fetch(`${API_BASE}/admin/agenda${params}`, {
        headers: buildHeaders(credentials)
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.detail ?? "Error al obtener la agenda");
    }
    return res.json();
}
async function apiGetUsuarios(credentials) {
    const res = await fetch(`${API_BASE}/admin/usuarios`, {
        headers: buildHeaders(credentials)
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.detail ?? "Error al obtener usuarios");
    }
    return res.json();
}
async function apiGetMascotas(credentials) {
    const res = await fetch(`${API_BASE}/admin/mascotas`, {
        headers: buildHeaders(credentials)
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.detail ?? "Error al obtener mascotas");
    }
    return res.json();
}
async function apiRegistrarMascota(credentials, data) {
    const res = await fetch(`${API_BASE}/mascotas`, {
        method: "POST",
        headers: buildHeaders(credentials),
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.detail ?? "Error al registrar mascota");
    }
    return res.json();
}
async function apiReservarTurno(credentials, data) {
    const res = await fetch(`${API_BASE}/turnos/reservar`, {
        method: "POST",
        headers: buildHeaders(credentials),
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.detail ?? "Error al reservar el turno");
    }
    return res.json();
}
async function apiGetHistorial(credentials, mascotaId) {
    const res = await fetch(`${API_BASE}/mascotas/${mascotaId}/historial`, {
        headers: buildHeaders(credentials)
    });
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.detail ?? "Error al obtener el historial");
    }
    return res.json();
}
async function apiGetDisponibilidad(fecha) {
    const params = fecha ? `?fecha=${fecha}` : "";
    const res = await fetch(`${API_BASE}/turnos/disponibilidad${params}`);
    if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        throw new Error(err.detail ?? "Error al obtener disponibilidad");
    }
    return res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/clinic-context.tsx [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClinicProvider",
    ()=>ClinicProvider,
    "useClinic",
    ()=>useClinic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
const ClinicContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ClinicProvider({ children }) {
    _s();
    // ── Estado mock (para compatibilidad con partes del UI que aún no conectan) ──
    const [appointments, setAppointments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["appointments"]);
    const [owners, setOwners] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["owners"]);
    const [pets, setPets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pets"]);
    const [medicalRecords, setMedicalRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["medicalRecords"]);
    const [vaccines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vaccines"]);
    // ── Estado del backend ──
    const [backendAgenda, setBackendAgenda] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [backendMascotas, setBackendMascotas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [backendUsuarios, setBackendUsuarios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingData, setIsLoadingData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [backendError, setBackendError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ── Auth ──
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [credentials, setCredentials] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ─────────────────────────────────────────────
    // Login — llama a POST /auth/login del backend
    // ─────────────────────────────────────────────
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClinicProvider.useCallback[login]": async (email, password)=>{
            try {
                const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiLogin"])(email, password);
                setCurrentUser(user);
                setCredentials({
                    email,
                    password
                });
                setIsLoggedIn(true);
                return true;
            } catch  {
                return false;
            }
        }
    }["ClinicProvider.useCallback[login]"], []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClinicProvider.useCallback[logout]": ()=>{
            setIsLoggedIn(false);
            setCurrentUser(null);
            setCredentials(null);
            setBackendAgenda([]);
            setBackendMascotas([]);
            setBackendUsuarios([]);
        }
    }["ClinicProvider.useCallback[logout]"], []);
    // ─────────────────────────────────────────────
    // Fetch agenda — GET /admin/agenda
    // ─────────────────────────────────────────────
    const fetchAgenda = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClinicProvider.useCallback[fetchAgenda]": async (fecha)=>{
            if (!credentials) return;
            setIsLoadingData(true);
            setBackendError(null);
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGetAgenda"])(credentials, fecha);
                setBackendAgenda(data.agenda);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Error al cargar la agenda";
                setBackendError(message);
            } finally{
                setIsLoadingData(false);
            }
        }
    }["ClinicProvider.useCallback[fetchAgenda]"], [
        credentials
    ]);
    // ─────────────────────────────────────────────
    // Fetch mascotas — GET /admin/mascotas
    // ─────────────────────────────────────────────
    const fetchMascotas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClinicProvider.useCallback[fetchMascotas]": async ()=>{
            if (!credentials) return;
            setIsLoadingData(true);
            setBackendError(null);
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGetMascotas"])(credentials);
                setBackendMascotas(data);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Error al cargar mascotas";
                setBackendError(message);
            } finally{
                setIsLoadingData(false);
            }
        }
    }["ClinicProvider.useCallback[fetchMascotas]"], [
        credentials
    ]);
    // ─────────────────────────────────────────────
    // Fetch usuarios — GET /admin/usuarios
    // ─────────────────────────────────────────────
    const fetchUsuarios = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClinicProvider.useCallback[fetchUsuarios]": async ()=>{
            if (!credentials) return;
            setIsLoadingData(true);
            setBackendError(null);
            try {
                const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiGetUsuarios"])(credentials);
                setBackendUsuarios(data);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Error al cargar usuarios";
                setBackendError(message);
            } finally{
                setIsLoadingData(false);
            }
        }
    }["ClinicProvider.useCallback[fetchUsuarios]"], [
        credentials
    ]);
    // ─────────────────────────────────────────────
    // Acciones locales (compatibilidad)
    // ─────────────────────────────────────────────
    const addAppointment = (appointment)=>{
        const newAppointment = {
            ...appointment,
            id: `apt-${Date.now()}`
        };
        setAppointments((prev)=>[
                ...prev,
                newAppointment
            ]);
    };
    const updateAppointmentStatus = (id, status)=>{
        setAppointments((prev)=>prev.map((apt)=>apt.id === id ? {
                    ...apt,
                    status
                } : apt));
    };
    const addOwner = (owner)=>{
        const id = `owner-${Date.now()}`;
        const newOwner = {
            ...owner,
            id,
            pets: []
        };
        setOwners((prev)=>[
                ...prev,
                newOwner
            ]);
        return id;
    };
    const addPet = (pet, ownerId)=>{
        const newPet = {
            ...pet,
            id: `pet-${Date.now()}`,
            ownerId
        };
        setPets((prev)=>[
                ...prev,
                newPet
            ]);
        setOwners((prev)=>prev.map((o)=>o.id === ownerId ? {
                    ...o,
                    pets: [
                        ...o.pets,
                        newPet.id
                    ]
                } : o));
    };
    const addMedicalRecord = (record)=>{
        const newRecord = {
            ...record,
            id: `rec-${Date.now()}`
        };
        setMedicalRecords((prev)=>[
                ...prev,
                newRecord
            ]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClinicContext.Provider, {
        value: {
            // mock / local
            appointments,
            owners,
            pets,
            medicalRecords,
            vaccines,
            addAppointment,
            updateAppointmentStatus,
            addOwner,
            addPet,
            addMedicalRecord,
            // backend
            backendAgenda,
            backendMascotas,
            backendUsuarios,
            isLoadingData,
            backendError,
            // auth
            isLoggedIn,
            currentUser,
            credentials,
            login,
            logout,
            // fetch actions
            fetchAgenda,
            fetchMascotas,
            fetchUsuarios
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/clinic-context.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, this);
}
_s(ClinicProvider, "BfAm8kjWa1HcDXlF5yWcVmV/sfI=");
_c = ClinicProvider;
function useClinic() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ClinicContext);
    if (context === undefined) {
        throw new Error("useClinic must be used within a ClinicProvider");
    }
    return context;
}
_s1(useClinic, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
;
var _c;
__turbopack_context__.k.register(_c, "ClinicProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/admin/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clinic$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/clinic-context.tsx [app-client] (ecmascript) <locals>");
"use client";
;
;
function AdminLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clinic$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ClinicProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/app/admin/layout.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = AdminLayout;
var _c;
__turbopack_context__.k.register(_c, "AdminLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_0o~2pk5._.js.map