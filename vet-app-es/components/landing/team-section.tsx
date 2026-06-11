import { Card, CardContent } from "@/components/ui/card";
import { vets } from "@/lib/mock-data";

export function TeamSection() {
  return (
    <section id="team" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Conocé a Nuestro Equipo</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Nuestros veterinarios con experiencia están dedicados a brindar la atención de mayor calidad para tus mascotas.
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl gap-8 md:grid-cols-2">
          {vets.map((vet) => (
            <Card key={vet.id} className="overflow-hidden border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={vet.image}
                  alt={vet.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-foreground">{vet.name}</h3>
                <p className="mt-1 text-primary">{vet.specialty}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
