import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="bg-secondary/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Visitanos</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Estamos ubicados en el corazón de Palermo, Buenos Aires. ¡Pasate o llamanos!
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Mapa */}
          <Card className="overflow-hidden border-border">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.016885!2d-58.4109!3d-34.5875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM1JzE1LjAiUyA1OMKwMjQnMzkuMiJX!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Patitas Sanas"
              />
            </div>
          </Card>

          {/* Información de contacto */}
          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Av. Santa Fe 1234, Palermo</p>
                <p className="text-muted-foreground">Buenos Aires, Argentina</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Horarios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-muted-foreground">Lunes - Viernes: 9:00 - 18:00</p>
                <p className="text-muted-foreground">Sábado: 9:00 - 14:00</p>
                <p className="text-muted-foreground">Domingo: Cerrado</p>
                <p className="mt-2 font-medium text-accent">Servicio de Emergencias 24/7</p>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <a href="tel:+541145678900" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  <Phone className="mr-2 h-5 w-5" />
                  Llamanos
                </Button>
              </a>
              <a href="https://wa.me/541145678900" target="_blank" rel="noopener noreferrer" className="block">
                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
