module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/[...path]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
/**
 * Route Handler — Proxy explícito al backend FastAPI
 *
 * ¿Por qué Route Handler en lugar de rewrites?
 * Los rewrites de Next.js eliminan el header `Authorization` como medida de
 * seguridad. Al usar un Route Handler controlamos exactamente qué headers se
 * reenvían, garantizando que HTTP Basic Auth llegue intacto al backend.
 *
 * Ruta: /api/[...path] → http://localhost:3000/[...path]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
// Headers que NO se deben reenviar al backend
const SKIP_HEADERS = new Set([
    "host",
    "connection",
    "transfer-encoding",
    "keep-alive",
    "proxy-connection",
    "proxy-authorization",
    "te",
    "trailers",
    "upgrade"
]);
async function proxyRequest(request, params) {
    const pathSegments = params.path ?? [];
    const pathname = pathSegments.join("/");
    // Preservar query string
    const url = new URL(request.url);
    const backendUrl = `${BACKEND_URL}/${pathname}${url.search}`;
    // Construir headers reenviados — incluye Authorization explícitamente
    const forwardHeaders = new Headers();
    request.headers.forEach((value, key)=>{
        if (!SKIP_HEADERS.has(key.toLowerCase())) {
            forwardHeaders.set(key, value);
        }
    });
    // Leer body solo para métodos que lo admiten
    const hasBody = ![
        "GET",
        "HEAD",
        "DELETE"
    ].includes(request.method);
    const body = hasBody ? await request.arrayBuffer() : undefined;
    try {
        const backendResponse = await fetch(backendUrl, {
            method: request.method,
            headers: forwardHeaders,
            body: body,
            // No seguir redirects automáticamente — los reenviamos al cliente
            redirect: "manual"
        });
        // Construir headers de respuesta (eliminar headers problemáticos)
        const responseHeaders = new Headers();
        backendResponse.headers.forEach((value, key)=>{
            const lower = key.toLowerCase();
            if (lower !== "transfer-encoding" && lower !== "connection") {
                responseHeaders.set(key, value);
            }
        });
        const responseBody = await backendResponse.arrayBuffer();
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](responseBody, {
            status: backendResponse.status,
            headers: responseHeaders
        });
    } catch (error) {
        console.error("[API Proxy] Error al conectar con el backend:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            detail: "No se pudo conectar con el backend. Verificá que esté corriendo en " + BACKEND_URL
        }, {
            status: 503
        });
    }
}
async function GET(request, context) {
    return proxyRequest(request, await context.params);
}
async function POST(request, context) {
    return proxyRequest(request, await context.params);
}
async function PUT(request, context) {
    return proxyRequest(request, await context.params);
}
async function PATCH(request, context) {
    return proxyRequest(request, await context.params);
}
async function DELETE(request, context) {
    return proxyRequest(request, await context.params);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0v_v02_._.js.map