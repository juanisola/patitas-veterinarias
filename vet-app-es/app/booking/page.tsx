"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, addDays, startOfToday } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, User, PawPrint, CheckCircle, AlertCircle } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { vets, availableTimeSlots } from "@/lib/mock-data";
import {
  apiRegister,
  apiLogin,
  apiRegistrarMascota,
  apiReservarTurno,
  mapEspecieToBackend,
  calcularHoraFin,
} from "@/lib/api";

type Species = "dog" | "cat" | "bird" | "other";

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ── Paso 1: selección de turno ──────────────────────────────────────
  const [selectedVet, setSelectedVet] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // ── Paso 2: datos del propietario ──────────────────────────────────
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");

  // ── Paso 2: datos de la mascota ────────────────────────────────────
  const [petName, setPetName] = useState("");
  const [petSpecies, setPetSpecies] = useState<Species | "">("");
  const [reason, setReason] = useState("");

  const today = startOfToday();
  const availableDates = Array.from({ length: 14 }, (_, i) =>
    addDays(today, i + 1)
  );

  // ── Flujo de submit con llamadas reales al backend ──────────────────
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // 1. Registrar usuario cliente en el backend
      //    POST /auth/register → { nombre, email, password }
      let userId: string;
      try {
        const regResult = await apiRegister(ownerName, ownerEmail, ownerPassword);
        userId = regResult.id;
      } catch (err: unknown) {
        // Si el email ya existe, intentar login directamente
        const message = err instanceof Error ? err.message : "";
        if (message.includes("ya está registrado")) {
          const user = await apiLogin(ownerEmail, ownerPassword);
          userId = user.id;
        } else {
          throw err;
        }
      }

      // Credenciales para los siguientes requests (HTTP Basic Auth)
      const creds = { email: ownerEmail, password: ownerPassword };

      // 2. Registrar mascota — POST /mascotas
      //    Mapeo: "dog" → "Perro", "cat" → "Gato", etc.
      const mascotaResult = await apiRegistrarMascota(creds, {
        nombre: petName,
        especie: mapEspecieToBackend(petSpecies as Species),
        propietario_id: userId,
      });

      // 3. Reservar turno — POST /turnos/reservar
      //    El backend requiere hora_fin; la calculamos sumando 30 minutos.
      await apiReservarTurno(creds, {
        mascota_id: mascotaResult.mascota.id,
        veterinario_id: selectedVet,
        fecha: selectedDate,
        hora_inicio: selectedTime,
        hora_fin: calcularHoraFin(selectedTime),
        servicio: reason,
        notas: "",
      });

      setIsComplete(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error inesperado. Intentá de nuevo.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Pantalla de éxito ───────────────────────────────────────────────
  if (isComplete) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-background p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">¡Turno Reservado!</CardTitle>
              <CardDescription>
                Tu turno fue agendado exitosamente en el sistema.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4 text-left">
                <p className="text-sm text-muted-foreground">
                  <strong>Fecha:</strong>{" "}
                  {selectedDate &&
                    format(
                      new Date(selectedDate + "T00:00:00"),
                      "EEEE, d 'de' MMMM 'de' yyyy",
                      { locale: es }
                    )}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Hora:</strong> {selectedTime} –{" "}
                  {calcularHoraFin(selectedTime)}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Veterinario/a:</strong>{" "}
                  {vets.find((v) => v.id === selectedVet)?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Mascota:</strong> {petName}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Recibirás un email de confirmación en{" "}
                <strong>{ownerEmail}</strong> en breve.
              </p>
              <Button onClick={() => router.push("/")} className="w-full">
                Volver al Inicio
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Reservar un Turno
            </h1>
            <p className="mt-2 text-muted-foreground">
              Agendá una visita para tu mascota en pocos pasos
            </p>
          </div>

          {/* Pasos de progreso */}
          <div className="mb-8 flex items-center justify-center gap-4">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                <span
                  className={`text-sm ${
                    step >= s ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s === 1 ? "Fecha y Hora" : "Tus Datos"}
                </span>
                {s < 2 && <div className="h-px w-8 bg-border" />}
              </div>
            ))}
          </div>

          {/* ── Paso 1: Selección de turno ── */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Seleccioná la Fecha del Turno
                </CardTitle>
                <CardDescription>
                  Elegí tu veterinario/a preferido y el horario disponible
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Veterinario */}
                <div className="space-y-2">
                  <Label>Seleccioná un Veterinario/a</Label>
                  <Select value={selectedVet} onValueChange={setSelectedVet}>
                    <SelectTrigger>
                      <SelectValue placeholder="Elegí un veterinario/a" />
                    </SelectTrigger>
                    <SelectContent>
                      {vets.map((vet) => (
                        <SelectItem key={vet.id} value={vet.id}>
                          {vet.name} - {vet.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Fecha */}
                <div className="space-y-2">
                  <Label>Seleccioná una Fecha</Label>
                  <Select
                    value={selectedDate}
                    onValueChange={setSelectedDate}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Elegí una fecha" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDates.map((date) => (
                        <SelectItem
                          key={date.toISOString()}
                          value={format(date, "yyyy-MM-dd")}
                        >
                          {format(date, "EEEE, d 'de' MMMM 'de' yyyy", {
                            locale: es,
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Hora */}
                <div className="space-y-2">
                  <Label>Seleccioná un Horario</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableTimeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-sm"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  {selectedTime && (
                    <p className="text-xs text-muted-foreground">
                      Duración de la consulta: {selectedTime} –{" "}
                      {calcularHoraFin(selectedTime)} (30 min)
                    </p>
                  )}
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedVet || !selectedDate || !selectedTime}
                  className="w-full"
                >
                  Continuar
                </Button>
              </CardContent>
            </Card>
          )}

          {/* ── Paso 2: Datos del propietario y mascota ── */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Tus Datos
                </CardTitle>
                <CardDescription>
                  Completá tus datos para crear tu cuenta y reservar el turno
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
                      <Label htmlFor="ownerName">Nombre Completo</Label>
                      <Input
                        id="ownerName"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerPhone">Teléfono</Label>
                      <Input
                        id="ownerPhone"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="+54 11 1234-5678"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="ownerEmail">Email</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        placeholder="tu@email.com"
                        autoComplete="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerPassword">
                        Contraseña{" "}
                        <span className="text-muted-foreground text-xs">
                          (para tu cuenta)
                        </span>
                      </Label>
                      <Input
                        id="ownerPassword"
                        type="password"
                        value={ownerPassword}
                        onChange={(e) => setOwnerPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                </div>

                {/* Datos de la mascota */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 font-medium text-foreground">
                    <PawPrint className="h-4 w-4" />
                    Datos de la Mascota
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="petName">Nombre de la Mascota</Label>
                      <Input
                        id="petName"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="Nombre de tu mascota"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Especie</Label>
                      <Select
                        value={petSpecies}
                        onValueChange={(v) => setPetSpecies(v as Species)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccioná la especie" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* Los values del frontend se mapean al backend en handleSubmit */}
                          <SelectItem value="dog">Perro</SelectItem>
                          <SelectItem value="cat">Gato</SelectItem>
                          <SelectItem value="bird">Ave</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Motivo de la consulta */}
                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo de la Consulta</Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Describí el motivo de tu visita..."
                    rows={3}
                  />
                </div>

                {/* Error de submit */}
                {submitError && (
                  <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    <p className="text-sm text-destructive">{submitError}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitError("");
                      setStep(1);
                    }}
                    className="flex-1"
                  >
                    Volver
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      !ownerName ||
                      !ownerEmail ||
                      !ownerPhone ||
                      !ownerPassword ||
                      !petName ||
                      !petSpecies ||
                      !reason ||
                      isSubmitting
                    }
                    className="flex-1"
                  >
                    {isSubmitting ? "Reservando..." : "Reservar Turno"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
