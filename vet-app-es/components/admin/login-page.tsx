"use client";

import { useState } from "react";
import { PawPrint, Lock, Mail } from "lucide-react";
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
import { useClinic } from "@/lib/clinic-context";

export function LoginPage() {
  const { login } = useClinic();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // login() llama a POST /auth/login del backend
    const success = await login(email, password);
    if (!success) {
      setError("Credenciales inválidas. Verificá tu email y contraseña.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <PawPrint className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Acceso al Sistema</CardTitle>
          <CardDescription>
            Ingresá con tu email para acceder al panel de Patitas Sanas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="pl-10"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                required
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              <Lock className="mr-2 h-4 w-4" />
              {isLoading ? "Verificando..." : "Ingresar"}
            </Button>
          </form>

          {/* Credenciales de referencia para el entorno académico */}
          <div className="mt-6 rounded-lg border border-dashed border-border p-3">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Credenciales de prueba:
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>
                <span className="font-mono font-semibold">Admin:</span>{" "}
                admin@patitassanas.com / admin2025
              </p>
              <p>
                <span className="font-mono font-semibold">Vet 1:</span>{" "}
                martin.lopez@patitassanas.com / vet1234
              </p>
              <p>
                <span className="font-mono font-semibold">Cliente:</span>{" "}
                carlos.gomez@gmail.com / carlos123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
