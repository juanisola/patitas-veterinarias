/**
 * Route Handler — Proxy explícito al backend FastAPI
 *
 * ¿Por qué Route Handler en lugar de rewrites?
 * Los rewrites de Next.js eliminan el header `Authorization` como medida de
 * seguridad. Al usar un Route Handler controlamos exactamente qué headers se
 * reenvían, garantizando que HTTP Basic Auth llegue intacto al backend.
 *
 * Ruta: /api/[...path] → http://localhost:3000/[...path]
 */

import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

// Headers que NO se deben reenviar al backend
const SKIP_HEADERS = new Set([
  "host",
  "connection",
  "transfer-encoding",
  "keep-alive",
  "proxy-connection",
  "proxy-authorization", // no confundir con authorization del cliente
  "te",
  "trailers",
  "upgrade",
]);

async function proxyRequest(
  request: NextRequest,
  params: { path: string[] }
): Promise<NextResponse> {
  const pathSegments = params.path ?? [];
  const pathname = pathSegments.join("/");

  // Preservar query string
  const url = new URL(request.url);
  const backendUrl = `${BACKEND_URL}/${pathname}${url.search}`;

  // Construir headers reenviados — incluye Authorization explícitamente
  const forwardHeaders = new Headers();
  request.headers.forEach((value, key) => {
    if (!SKIP_HEADERS.has(key.toLowerCase())) {
      forwardHeaders.set(key, value);
    }
  });

  // Leer body solo para métodos que lo admiten
  const hasBody = !["GET", "HEAD", "DELETE"].includes(request.method);
  const body = hasBody ? await request.arrayBuffer() : undefined;

  try {
    const backendResponse = await fetch(backendUrl, {
      method: request.method,
      headers: forwardHeaders,
      body: body,
      // No seguir redirects automáticamente — los reenviamos al cliente
      redirect: "manual",
    });

    // Construir headers de respuesta (eliminar headers problemáticos)
    const responseHeaders = new Headers();
    backendResponse.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (lower !== "transfer-encoding" && lower !== "connection") {
        responseHeaders.set(key, value);
      }
    });

    const responseBody = await backendResponse.arrayBuffer();

    return new NextResponse(responseBody, {
      status: backendResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("[API Proxy] Error al conectar con el backend:", error);
    return NextResponse.json(
      {
        detail:
          "No se pudo conectar con el backend. Verificá que esté corriendo en " +
          BACKEND_URL,
      },
      { status: 503 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await context.params);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await context.params);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await context.params);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await context.params);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await context.params);
}
