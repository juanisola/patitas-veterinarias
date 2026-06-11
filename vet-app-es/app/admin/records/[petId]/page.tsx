"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  ArrowLeft,
  PawPrint,
  Weight,
  Calendar,
  AlertTriangle,
  Syringe,
  FileText,
  Plus,
  Loader2,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClinic } from "@/lib/clinic-context";
import { apiGetHistorial, BackendMascota, BackendHistorialEntrada, BackendVacuna } from "@/lib/api";
import { vets } from "@/lib/mock-data";

// ─────────────────────────────────────────────
// Helpers de display
// ─────────────────────────────────────────────

const especieEmoji: Record<string, string> = {
  Perro: "🐕",
  Gato: "🐱",
  Ave: "🐦",
  Otro: "🐾",
};

function getVetNombre(vetId: string): string {
  const vet = vets.find((v) => v.id === vetId);
  return vet?.name ?? vetId;
}

// ─────────────────────────────────────────────
// Página principal
// ─────────────────────────────────────────────

export default function PetRecordsPage({
  params,
}: {
  params: Promise<{ petId: string }>;
}) {
  const { petId } = use(params);
  const { credentials, currentUser } = useClinic();

  const [mascota, setMascota] = useState<BackendMascota | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("profile");

  // ── Formulario historial ─────────────────
  const [newTipo, setNewTipo] = useState("consulta");
  const [newDiagnosis, setNewDiagnosis] = useState("");
  const [newTreatment, setNewTreatment] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // ── Cargar datos del backend ────────────
  useEffect(() => {
    if (!credentials) {
      setError("Sesión no iniciada. Volvé al panel e ingresá de nuevo.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    apiGetHistorial(credentials, petId)
      .then((data) => {
        setMascota(data);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : "Error al cargar la mascota";
        setError(msg);
      })
      .finally(() => setIsLoading(false));
  }, [petId, credentials]);

  // ── Agregar entrada al historial (veterinario/admin) ──
  const handleAddRecord = async () => {
    if (!newDiagnosis || !newTreatment || !credentials) return;
    setIsSaving(true);
    setSaveError("");

    try {
      const res = await fetch(`/api/mascotas/${petId}/historial`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${credentials.email}:${credentials.password}`)}`,
        },
        body: JSON.stringify({
          tipo: newTipo,
          diagnostico: newDiagnosis,
          tratamiento: newTreatment,
          notas_internas: newNotes,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail ?? "Error al guardar el registro");
      }

      // Recargar historial
      const updated = await apiGetHistorial(credentials, petId);
      setMascota(updated);
      setNewDiagnosis("");
      setNewTreatment("");
      setNewNotes("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      setSaveError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // ─────────────────────────────────────────
  // Estados de carga y error
  // ─────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Cargando expediente clínico...
          </p>
        </div>
      </div>
    );
  }

  if (error || !mascota) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="py-12">
            <PawPrint className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground">
              {error ?? "Mascota no encontrada"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              ID buscado: <code className="font-mono text-xs">{petId}</code>
            </p>
            <Link href="/admin">
              <Button className="mt-4">Volver al Panel</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const esVetOAdmin =
    currentUser?.rol === "veterinario" || currentUser?.rol === "admin";

  return (
    <div className="min-h-screen bg-background">
      {/* Encabezado */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
              {especieEmoji[mascota.especie] ?? "🐾"}
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {mascota.nombre}
              </h1>
              <p className="text-sm text-muted-foreground">
                {mascota.especie}
                {mascota.raza ? ` — ${mascota.raza}` : ""}
                {mascota.peso_kg != null ? ` · ${mascota.peso_kg} kg` : ""}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 flex h-auto w-full flex-wrap gap-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <PawPrint className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Historial Médico
            </TabsTrigger>
            <TabsTrigger value="vaccines" className="flex items-center gap-2">
              <Syringe className="h-4 w-4" />
              Vacunas
            </TabsTrigger>
          </TabsList>

          {/* ── Tab Perfil ── */}
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PawPrint className="h-5 w-5 text-primary" />
                    Información Básica
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Nombre</p>
                      <p className="font-medium text-foreground">
                        {mascota.nombre}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Especie</p>
                      <p className="font-medium text-foreground">
                        {mascota.especie}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Raza</p>
                      <p className="font-medium text-foreground">
                        {mascota.raza || "—"}
                      </p>
                    </div>
                    {mascota.peso_kg != null && (
                      <div className="flex items-center gap-2">
                        <Weight className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Peso</p>
                          <p className="font-medium text-foreground">
                            {mascota.peso_kg} kg
                          </p>
                        </div>
                      </div>
                    )}
                    {mascota.edad_anios != null && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Edad</p>
                          <p className="font-medium text-foreground">
                            {mascota.edad_anios} año
                            {mascota.edad_anios !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                      Alergias
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mascota.alergias.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {mascota.alergias.map((a, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200"
                          >
                            {a}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Sin alergias conocidas
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      ID en el sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <code className="rounded bg-muted px-2 py-1 text-xs font-mono">
                      {mascota.id}
                    </code>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Propietario ID:{" "}
                      <code className="font-mono">{mascota.propietario_id}</code>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ── Tab Historial Médico ── */}
          <TabsContent value="history">
            <div className="space-y-6">
              {/* Formulario nuevo registro — solo para vet/admin */}
              {esVetOAdmin ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-primary" />
                      Agregar Nuevo Registro
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tipo">Tipo de Registro</Label>
                        <select
                          id="tipo"
                          value={newTipo}
                          onChange={(e) => setNewTipo(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="consulta">Consulta</option>
                          <option value="vacunacion">Vacunación</option>
                          <option value="cirugia">Cirugía</option>
                          <option value="control">Control</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="diagnosis">Diagnóstico *</Label>
                        <Input
                          id="diagnosis"
                          value={newDiagnosis}
                          onChange={(e) => setNewDiagnosis(e.target.value)}
                          placeholder="Diagnóstico o motivo"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="treatment">Tratamiento *</Label>
                      <Textarea
                        id="treatment"
                        value={newTreatment}
                        onChange={(e) => setNewTreatment(e.target.value)}
                        placeholder="Describí el tratamiento..."
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recordNotes">
                        Notas Internas{" "}
                        <span className="text-xs text-muted-foreground">
                          (Solo personal clínico)
                        </span>
                      </Label>
                      <Textarea
                        id="recordNotes"
                        value={newNotes}
                        onChange={(e) => setNewNotes(e.target.value)}
                        placeholder="Notas internas..."
                        rows={2}
                      />
                    </div>
                    {saveError && (
                      <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                        <p className="text-sm text-destructive">{saveError}</p>
                      </div>
                    )}
                    <Button
                      onClick={handleAddRecord}
                      disabled={!newDiagnosis || !newTreatment || isSaving}
                    >
                      {isSaving ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4" />
                      )}
                      {isSaving ? "Guardando..." : "Agregar Registro"}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                  <ShieldAlert className="h-4 w-4 text-yellow-600" />
                  <p className="text-sm text-yellow-700">
                    Solo veterinarios y administradores pueden agregar registros.
                  </p>
                </div>
              )}

              {/* Línea de tiempo del historial */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Línea de Tiempo del Historial Médico
                </h3>
                {mascota.historial.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="text-lg font-medium text-foreground">
                        Sin registros médicos
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Agregá el primer registro usando el formulario de arriba.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-0 before:h-full before:w-0.5 before:bg-border">
                    {[...mascota.historial]
                      .sort(
                        (a: BackendHistorialEntrada, b: BackendHistorialEntrada) =>
                          new Date(b.fecha).getTime() -
                          new Date(a.fecha).getTime()
                      )
                      .map((entrada: BackendHistorialEntrada, idx: number) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-6 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                            <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                          </div>
                          <Card>
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <CardTitle className="text-base">
                                      {entrada.diagnostico}
                                    </CardTitle>
                                    <Badge variant="secondary" className="text-xs">
                                      {entrada.tipo}
                                    </Badge>
                                  </div>
                                  <CardDescription className="capitalize">
                                    {(() => {
                                      try {
                                        return format(
                                          new Date(entrada.fecha + "T00:00:00"),
                                          "d 'de' MMMM 'de' yyyy",
                                          { locale: es }
                                        );
                                      } catch {
                                        return entrada.fecha;
                                      }
                                    })()}{" "}
                                    · {getVetNombre(entrada.veterinario_id)}
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                  Tratamiento
                                </p>
                                <p className="text-sm text-foreground">
                                  {entrada.tratamiento}
                                </p>
                              </div>
                              {entrada.notas_internas && (
                                <div className="rounded-md border border-yellow-200 bg-yellow-50 p-2">
                                  <p className="text-xs font-medium text-yellow-700">
                                    🔒 Nota interna (solo personal clínico)
                                  </p>
                                  <p className="text-sm text-yellow-800">
                                    {entrada.notas_internas}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* ── Tab Vacunas ── */}
          <TabsContent value="vaccines">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                Calendario de Vacunas
              </h3>
              {mascota.vacunas.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Syringe className="mb-4 h-12 w-12 text-muted-foreground" />
                    <p className="text-lg font-medium text-foreground">
                      Sin registros de vacunas
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Las vacunas registradas por el veterinario aparecerán aquí.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {mascota.vacunas.map((vacuna: BackendVacuna, idx: number) => {
                    const hoy = new Date();
                    const proxima = new Date(
                      vacuna.proxima_aplicacion + "T00:00:00"
                    );
                    const diasRestantes = Math.ceil(
                      (proxima.getTime() - hoy.getTime()) /
                        (1000 * 60 * 60 * 24)
                    );

                    let statusColor =
                      "bg-green-100 text-green-700 border-green-200";
                    let statusLabel = "Al día";
                    if (diasRestantes < 0) {
                      statusColor = "bg-red-100 text-red-700 border-red-200";
                      statusLabel = "Vencida";
                    } else if (diasRestantes <= 30) {
                      statusColor =
                        "bg-yellow-100 text-yellow-700 border-yellow-200";
                      statusLabel = "Próxima a vencer";
                    }

                    return (
                      <Card key={idx}>
                        <CardContent className="flex items-center gap-4 p-4">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full ${
                              diasRestantes < 0
                                ? "bg-red-100"
                                : diasRestantes <= 30
                                ? "bg-yellow-100"
                                : "bg-green-100"
                            }`}
                          >
                            <Syringe
                              className={`h-6 w-6 ${
                                diasRestantes < 0
                                  ? "text-red-600"
                                  : diasRestantes <= 30
                                  ? "text-yellow-600"
                                  : "text-green-600"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-foreground">
                                {vacuna.nombre}
                              </p>
                              <Badge
                                variant="outline"
                                className={statusColor}
                              >
                                {statusLabel}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground capitalize">
                              Aplicada:{" "}
                              {(() => {
                                try {
                                  return format(
                                    new Date(
                                      vacuna.fecha_aplicacion + "T00:00:00"
                                    ),
                                    "d MMM yyyy",
                                    { locale: es }
                                  );
                                } catch {
                                  return vacuna.fecha_aplicacion;
                                }
                              })()}
                            </p>
                            <p className="text-sm text-muted-foreground capitalize">
                              Próxima:{" "}
                              {(() => {
                                try {
                                  return format(
                                    new Date(
                                      vacuna.proxima_aplicacion + "T00:00:00"
                                    ),
                                    "d MMM yyyy",
                                    { locale: es }
                                  );
                                } catch {
                                  return vacuna.proxima_aplicacion;
                                }
                              })()}
                              {diasRestantes > 0 &&
                                ` (en ${diasRestantes} días)`}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
