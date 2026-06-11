module.exports = [
"[project]/lib/mock-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    const encoded = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : Buffer.from(`${email}:${password}`).toString("base64");
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
}),
"[project]/lib/clinic-context.tsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClinicProvider",
    ()=>ClinicProvider,
    "useClinic",
    ()=>useClinic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
const ClinicContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function ClinicProvider({ children }) {
    // ── Estado mock (para compatibilidad con partes del UI que aún no conectan) ──
    const [appointments, setAppointments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appointments"]);
    const [owners, setOwners] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["owners"]);
    const [pets, setPets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["pets"]);
    const [medicalRecords, setMedicalRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["medicalRecords"]);
    const [vaccines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["vaccines"]);
    // ── Estado del backend ──
    const [backendAgenda, setBackendAgenda] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [backendMascotas, setBackendMascotas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [backendUsuarios, setBackendUsuarios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingData, setIsLoadingData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [backendError, setBackendError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // ── Auth ──
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [credentials, setCredentials] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // ─────────────────────────────────────────────
    // Login — llama a POST /auth/login del backend
    // ─────────────────────────────────────────────
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (email, password)=>{
        try {
            const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiLogin"])(email, password);
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
    }, []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setIsLoggedIn(false);
        setCurrentUser(null);
        setCredentials(null);
        setBackendAgenda([]);
        setBackendMascotas([]);
        setBackendUsuarios([]);
    }, []);
    // ─────────────────────────────────────────────
    // Fetch agenda — GET /admin/agenda
    // ─────────────────────────────────────────────
    const fetchAgenda = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (fecha)=>{
        if (!credentials) return;
        setIsLoadingData(true);
        setBackendError(null);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiGetAgenda"])(credentials, fecha);
            setBackendAgenda(data.agenda);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Error al cargar la agenda";
            setBackendError(message);
        } finally{
            setIsLoadingData(false);
        }
    }, [
        credentials
    ]);
    // ─────────────────────────────────────────────
    // Fetch mascotas — GET /admin/mascotas
    // ─────────────────────────────────────────────
    const fetchMascotas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!credentials) return;
        setIsLoadingData(true);
        setBackendError(null);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiGetMascotas"])(credentials);
            setBackendMascotas(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Error al cargar mascotas";
            setBackendError(message);
        } finally{
            setIsLoadingData(false);
        }
    }, [
        credentials
    ]);
    // ─────────────────────────────────────────────
    // Fetch usuarios — GET /admin/usuarios
    // ─────────────────────────────────────────────
    const fetchUsuarios = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!credentials) return;
        setIsLoadingData(true);
        setBackendError(null);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiGetUsuarios"])(credentials);
            setBackendUsuarios(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Error al cargar usuarios";
            setBackendError(message);
        } finally{
            setIsLoadingData(false);
        }
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ClinicContext.Provider, {
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
function useClinic() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ClinicContext);
    if (context === undefined) {
        throw new Error("useClinic must be used within a ClinicProvider");
    }
    return context;
}
;
}),
"[project]/app/admin/layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clinic$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/clinic-context.tsx [app-ssr] (ecmascript) <locals>");
"use client";
;
;
function AdminLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clinic$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ClinicProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/app/admin/layout.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_0etk~py._.js.map