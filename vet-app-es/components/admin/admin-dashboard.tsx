"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  PawPrint,
  Calendar,
  Users,
  UserPlus,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Search,
  FileText,
  RefreshCw,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClinic } from "@/lib/clinic-context";
import { apiRegister, apiRegistrarMascota } from "@/lib/api";
import { vets } from "@/lib/mock-data";

// ─────────────────────────────────────────────────────────
// Mapeos de display
// ─────────────────────────────────────────────────────────
const speciesLabels: Record<string, string> = {
  dog: "perro",
  cat: "gato",
  bird: "pájaro",
  other: "otro",
  // También cubre las formas del backend por si llegaran directamente
  Perro: "perro",
  Gato: "gato",
  Ave: "ave",
  Otro: "otro",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  // Estados del backend
  confirmado: "bg-green-100 text-green-800 border-green-200",
  cancelado: "bg-red-100 text-red-800 border-red-200",
  pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

const statusLabels: Record<string, string> = {
  pending: "pendiente",
  confirmed: "confirmado",
  cancelled: "cancelado",
  completed: "completado",
  confirmado: "confirmado",
  cancelado: "cancelado",
  pendiente: "pendiente",
};

// ─────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────
export function AdminDashboard() {
  const {
    backendAgenda,
    backendMascotas,
    backendUsuarios,
    isLoadingData,
    backendError,
    credentials,
    currentUser,
    logout,
    fetchAgenda,
    fetchMascotas,
    fetchUsuarios,
  } = useClinic();

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [selectedVet, setSelectedVet] = useState<string>("all");
  const [clientSearch, setClientSearch] = useState("");
  const [activeTab, setActiveTab] = useState("agenda");

  // ── Estado del formulario nuevo cliente/mascota ──────────────────
  const [newOwnerName, setNewOwnerName] = useState("");
  const [newOwnerEmail, setNewOwnerEmail] = useState("");
  const [newOwnerPhone, setNewOwnerPhone] = useState("");
  const [newOwnerPassword, setNewOwnerPassword] = useState("");
  const [newPetName, setNewPetName] = useState("");
  const [newPetSpecies, setNewPetSpecies] = useState<
    "Perro" | "Gato" | "Ave" | "Otro"
  >("Perro");
  const [newPetBreed, setNewPetBreed] = useState("");
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [addClientError, setAddClientError] = useState("");
  const [addClientSuccess, setAddClientSuccess] = useState("");

  // ── Cargar datos del backend al montar ──────────────────────────
  useEffect(() => {
    fetchAgenda(selectedDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  useEffect(() => {
    if (activeTab === "clients") {
      fetchUsuarios();
      fetchMascotas();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // ── Filtros de agenda ───────────────────────────────────────────
  const filteredAgenda = backendAgenda.filter((apt) => {
    if (selectedVet === "all") return true;
    return apt.veterinario_id === selectedVet;
  });

  // ── Filtrar clientes (usuarios con rol cliente) ─────────────────
  const clientesFiltrados = backendUsuarios
    .filter((u) => u.rol === "cliente")
    .filter(
      (u) =>
        u.nombre.toLowerCase().includes(clientSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(clientSearch.toLowerCase())
    );

  // ── Mascotas por propietario ────────────────────────────────────
  const getMascotasPorPropietario = (propietarioId: string) =>
    backendMascotas.filter((m) => m.propietario_id === propietarioId);

  // ── Navegación de fechas ────────────────────────────────────────
  /*
  ===========================================
  BUG_ID: RF-C01-20260521-004
  ESTADO: INTENCIONAL
  DESCRIPCION:
  La agenda solo permite navegar hacia dias anteriores.
  Al presionar el boton "siguiente dia" (ChevronRight),
  la fecha no avanza: si la fecha seleccionada es hoy o
  posterior, el boton no tiene efecto. La agenda queda
  bloqueada en el pasado y no puede visualizar turnos futuros.
  NO CORREGIR.
  ===========================================

  CODIGO ORIGINAL (navegacion bidireccional — deshabilitada intencionalmente):
  const navigateDate = (direction: "prev" | "next") => {
    const current = new Date(selectedDate + "T00:00:00");
    current.setDate(current.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(format(current, "yyyy-MM-dd"));
  };
  */
  const navigateDate = (direction: "prev" | "next") => {
    const current = new Date(selectedDate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // BUG RF-C01: la condicion bloquea la navegacion hacia el futuro.
    // Si la direccion es "next" y la fecha actual ya es hoy o posterior,
    // la funcion retorna sin actualizar el estado — la fecha nunca avanza.
    if (direction === "next" && current >= today) {
      return; // bloqueo intencional de fechas futuras
    }

    current.setDate(current.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(format(current, "yyyy-MM-dd"));
  };

  // ── Agregar cliente ─────────────────────────────────────────────
  const handleAddClient = async () => {
    if (!newOwnerName || !newOwnerEmail || !newOwnerPassword) return;
    setIsAddingClient(true);
    setAddClientError("");
    setAddClientSuccess("");

    try {
      // 1. Registrar usuario en el backend — POST /auth/register
      const regResult = await apiRegister(
        newOwnerName,
        newOwnerEmail,
        newOwnerPassword
      );

      // 2. Si se indicó una mascota, registrarla — POST /mascotas
      //    Usamos las credenciales del nuevo usuario (o del admin actual)
      if (newPetName && credentials) {
        await apiRegistrarMascota(credentials, {
          nombre: newPetName,
          especie: newPetSpecies,
          raza: newPetBreed || undefined,
          propietario_id: regResult.id,
        });
      }

      setAddClientSuccess(
        `Cliente "${newOwnerName}" registrado exitosamente (ID: ${regResult.id}).`
      );

      // Resetear formulario
      setNewOwnerName("");
      setNewOwnerEmail("");
      setNewOwnerPhone("");
      setNewOwnerPassword("");
      setNewPetName("");
      setNewPetBreed("");

      // Refrescar lista de clientes
      await fetchUsuarios();
      await fetchMascotas();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al registrar el cliente";
      setAddClientError(message);
    } finally {
      setIsAddingClient(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Encabezado */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <PawPrint className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">
                Patitas Sanas
              </span>
              <p className="text-xs text-muted-foreground">
                Panel de Administración
                {currentUser && (
                  <span className="ml-2 font-medium text-primary">
                    — {currentUser.nombre} ({currentUser.rol})
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                Ver Sitio
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        {/* Banner de error global */}
        {backendError && (
          <div className="mb-6 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">
                Error de conexión con el backend
              </p>
              <p className="text-sm text-destructive/80">{backendError}</p>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="agenda" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Agenda
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clientes
            </TabsTrigger>
            <TabsTrigger
              value="add-client"
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Agregar Cliente
            </TabsTrigger>
          </TabsList>

          {/* ── Tab Agenda ── */}
          <TabsContent value="agenda">
            <div className="space-y-6">
              {/* Controles de fecha y veterinario */}
              <Card>
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateDate("prev")}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground capitalize">
                        {format(new Date(selectedDate + "T00:00:00"), "EEEE", {
                          locale: es,
                        })}
                      </p>
                      <p className="font-semibold text-foreground capitalize">
                        {format(
                          new Date(selectedDate + "T00:00:00"),
                          "d 'de' MMMM 'de' yyyy",
                          { locale: es }
                        )}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateDate("next")}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-muted-foreground">
                      Filtrar por veterinario:
                    </Label>
                    <Select value={selectedVet} onValueChange={setSelectedVet}>
                      <SelectTrigger className="w-52">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          Todos los Veterinarios
                        </SelectItem>
                        {vets.map((vet) => (
                          <SelectItem key={vet.id} value={vet.id}>
                            {vet.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => fetchAgenda(selectedDate)}
                      title="Actualizar agenda"
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${isLoadingData ? "animate-spin" : ""}`}
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lista de turnos */}
              <div className="space-y-4">
                {isLoadingData ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Cargando agenda desde el backend...
                      </p>
                    </CardContent>
                  </Card>
                ) : filteredAgenda.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                      <p className="text-lg font-medium text-foreground">
                        Sin turnos
                      </p>
                      <p className="text-sm text-muted-foreground">
                        No hay turnos programados para esta fecha.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredAgenda.map((apt) => (
                    <Card key={apt.id} className="overflow-hidden">
                      <div className="flex">
                        <div className="flex w-24 flex-shrink-0 items-center justify-center bg-primary/10 p-4">
                          <span className="text-lg font-bold text-primary">
                            {apt.hora_inicio}
                          </span>
                        </div>
                        <CardContent className="flex flex-1 flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-foreground">
                                {apt.cliente_nombre}
                              </p>
                              <Badge
                                variant="outline"
                                className={statusColors[apt.estado] ?? ""}
                              >
                                {statusLabels[apt.estado] ?? apt.estado}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">
                                {apt.mascota_nombre}
                              </span>{" "}
                              ({apt.mascota_especie})
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {apt.servicio || apt.notas}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Veterinario/a: {apt.veterinario_nombre} · Hora:{" "}
                              {apt.hora_inicio}–{apt.hora_fin}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {/* Botón de historial — navega a la página de records */}
                            <Link href={`/admin/records/${apt.mascota_id}`}>
                              <Button size="sm" variant="outline">
                                <FileText className="mr-1 h-4 w-4" />
                                Historial
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          {/* ── Tab Clientes ── */}
          <TabsContent value="clients">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar clientes por nombre o email..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    fetchUsuarios();
                    fetchMascotas();
                  }}
                  title="Actualizar lista"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isLoadingData ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>

              {isLoadingData ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {clientesFiltrados.length === 0 ? (
                    <p className="col-span-3 py-8 text-center text-muted-foreground">
                      No se encontraron clientes.
                    </p>
                  ) : (
                    clientesFiltrados.map((cliente) => {
                      const mascotas = getMascotasPorPropietario(cliente.id);
                      return (
                        <Card key={cliente.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                              {cliente.nombre}
                            </CardTitle>
                            <CardDescription>{cliente.email}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <p className="mb-2 text-sm font-medium text-foreground">
                                Mascotas ({mascotas.length}):
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {mascotas.length === 0 ? (
                                  <span className="text-xs text-muted-foreground">
                                    Sin mascotas registradas
                                  </span>
                                ) : (
                                  mascotas.map((mascota) => (
                                    <Link
                                      key={mascota.id}
                                      href={`/admin/records/${mascota.id}`}
                                    >
                                      <Badge
                                        variant="secondary"
                                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                      >
                                        <PawPrint className="mr-1 h-3 w-3" />
                                        {mascota.nombre} ({mascota.especie})
                                      </Badge>
                                    </Link>
                                  ))
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── Tab Agregar Cliente ── */}
          <TabsContent value="add-client">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle>Agregar Nuevo Cliente y Mascota</CardTitle>
                <CardDescription>
                  Registrá un nuevo cliente en el sistema y opcionalmente
                  agregá su primera mascota
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Datos del propietario */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">
                    Datos del Propietario
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newOwnerName">Nombre Completo *</Label>
                      <Input
                        id="newOwnerName"
                        value={newOwnerName}
                        onChange={(e) => setNewOwnerName(e.target.value)}
                        placeholder="Nombre completo del propietario"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newOwnerPhone">Teléfono</Label>
                      <Input
                        id="newOwnerPhone"
                        value={newOwnerPhone}
                        onChange={(e) => setNewOwnerPhone(e.target.value)}
                        placeholder="+54 11 1234-5678"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newOwnerEmail">Email *</Label>
                      <Input
                        id="newOwnerEmail"
                        type="email"
                        value={newOwnerEmail}
                        onChange={(e) => setNewOwnerEmail(e.target.value)}
                        placeholder="propietario@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newOwnerPassword">Contraseña *</Label>
                      <Input
                        id="newOwnerPassword"
                        type="password"
                        value={newOwnerPassword}
                        onChange={(e) => setNewOwnerPassword(e.target.value)}
                        placeholder="Contraseña inicial del cliente"
                      />
                    </div>
                  </div>
                </div>

                {/* Datos de la mascota (opcional) */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 font-medium text-foreground">
                    <PawPrint className="h-4 w-4" />
                    Datos de la Mascota{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      (Opcional)
                    </span>
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="newPetName">Nombre</Label>
                      <Input
                        id="newPetName"
                        value={newPetName}
                        onChange={(e) => setNewPetName(e.target.value)}
                        placeholder="Nombre de la mascota"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Especie</Label>
                      <Select
                        value={newPetSpecies}
                        onValueChange={(v) =>
                          setNewPetSpecies(
                            v as "Perro" | "Gato" | "Ave" | "Otro"
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Valores que acepta el backend directamente */}
                          <SelectItem value="Perro">Perro</SelectItem>
                          <SelectItem value="Gato">Gato</SelectItem>
                          <SelectItem value="Ave">Ave</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPetBreed">Raza</Label>
                      <Input
                        id="newPetBreed"
                        value={newPetBreed}
                        onChange={(e) => setNewPetBreed(e.target.value)}
                        placeholder="Raza"
                      />
                    </div>
                  </div>
                </div>

                {/* Feedback del submit */}
                {addClientError && (
                  <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    <p className="text-sm text-destructive">{addClientError}</p>
                  </div>
                )}
                {addClientSuccess && (
                  <div className="flex items-start gap-2 rounded-lg border border-green-300 bg-green-50 p-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <p className="text-sm text-green-700">{addClientSuccess}</p>
                  </div>
                )}

                <Button
                  onClick={handleAddClient}
                  disabled={
                    !newOwnerName ||
                    !newOwnerEmail ||
                    !newOwnerPassword ||
                    isAddingClient
                  }
                  className="w-full"
                >
                  {isAddingClient ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Agregar Cliente
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
