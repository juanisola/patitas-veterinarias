import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Syringe, Scissors, AlertCircle } from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Consultas Generales",
    description: "Exámenes de salud completos, diagnóstico y planes de tratamiento para tu mascota. Nos tomamos el tiempo de entender las necesidades de tu animal.",
  },
  {
    icon: Syringe,
    title: "Vacunas y Prevención",
    description: "Programas completos de vacunación y atención preventiva para mantener a tus mascotas protegidas contra enfermedades comunes.",
  },
  {
    icon: Scissors,
    title: "Cirugía",
    description: "Desde procedimientos de rutina hasta cirugías complejas, realizadas con equipos y técnicas de última generación.",
  },
  {
    icon: AlertCircle,
    title: "Emergencias 24/7",
    description: "Atención de urgencias las 24 horas cuando tu mascota más lo necesita. Llamá a nuestra línea de emergencias en cualquier momento.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-card py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Nuestros Servicios</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Ofrecemos servicios veterinarios integrales para asegurar que tu mascota reciba la mejor atención posible en cada etapa de su vida.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} className="border-border bg-background transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
