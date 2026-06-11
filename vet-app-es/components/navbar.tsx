"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, PawPrint, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <PawPrint className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Patitas Sanas</span>
        </Link>

        {/* Navegación escritorio */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors">
            Servicios
          </Link>
          <Link href="/#team" className="text-muted-foreground hover:text-foreground transition-colors">
            Equipo
          </Link>
          <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contacto
          </Link>
          <Link href="/admin">
            <Button variant="outline" size="sm">
              Admin
            </Button>
          </Link>
          <Link href="/booking">
            <Button>Reservar Turno</Button>
          </Link>
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Link
              href="/#services"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link
              href="/#team"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Equipo
            </Link>
            <Link
              href="/#contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Admin
              </Button>
            </Link>
            <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">Reservar Turno</Button>
            </Link>
            <a
              href="tel:+541145678900"
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Phone className="h-4 w-4" />
              +54 11 4567-8900
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
