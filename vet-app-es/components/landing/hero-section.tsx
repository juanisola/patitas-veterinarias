import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PawPrint, Heart, Shield, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/30">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <PawPrint className="h-4 w-4" />
              Atención Veterinaria de Confianza en Buenos Aires
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Cuidamos la Salud de Tu Mascota, Patita a Patita
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
              En Patitas Sanas brindamos servicios veterinarios compasivos y profesionales
              para los integrantes peludos de tu familia. Desde controles de rutina hasta
              atención especializada, el bienestar de tu mascota es nuestra prioridad.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/booking">
                <Button size="lg" className="w-full sm:w-auto">
                  Reservar Turno
                </Button>
              </Link>
              <a href="https://wa.me/541145678900" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Escribinos por WhatsApp
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-5 w-5 text-accent" />
                <span>+15 Años de Experiencia</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-primary" />
                <span>Especialistas Certificados</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>Emergencias 24/7</span>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop"
                alt="Perro feliz en la clínica veterinaria"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-card p-4 shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                  <PawPrint className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">+5000</p>
                  <p className="text-sm text-muted-foreground">Mascotas Felices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
