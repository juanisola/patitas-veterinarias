import Link from "next/link";
import { PawPrint, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Marca */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <PawPrint className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Patitas Sanas</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Atención veterinaria profesional para tus queridas mascotas en Buenos Aires desde 2010.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#services" className="hover:text-foreground transition-colors">
                  Nuestros Servicios
                </Link>
              </li>
              <li>
                <Link href="/#team" className="hover:text-foreground transition-colors">
                  Nuestro Equipo
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-foreground transition-colors">
                  Reservar Turno
                </Link>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Horarios</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Lunes - Viernes: 9:00 - 18:00</li>
              <li>Sábado: 9:00 - 14:00</li>
              <li>Domingo: Cerrado</li>
              <li className="font-medium text-accent">Línea de Emergencias 24/7</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Contacto</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +54 11 4567-8900
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                info@patitassanas.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Av. Santa Fe 1234, Palermo, Buenos Aires</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Patitas Sanas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
