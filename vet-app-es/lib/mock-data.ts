export interface Vet {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

export interface Pet {
  id: string;
  name: string;
  species: "dog" | "cat" | "bird" | "other";
  breed: string;
  weight: number;
  birthDate: string;
  allergies: string[];
  pastSurgeries: string[];
  ownerId: string;
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  pets: string[];
}

export interface Appointment {
  id: string;
  vetId: string;
  petId: string;
  ownerId: string;
  date: string;
  time: string;
  reason: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

export interface MedicalRecord {
  id: string;
  petId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  vetId: string;
  notes?: string;
}

export interface Vaccine {
  id: string;
  petId: string;
  name: string;
  dateAdministered: string;
  nextDueDate: string;
  status: "up-to-date" | "due-soon" | "overdue";
}

export const vets: Vet[] = [
  {
    // ID real del backend (seed: usr-001)
    id: "usr-001",
    name: "Dr. Martín López",
    specialty: "Clínica General y Cirugía",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
  },
  {
    // ID real del backend (seed: usr-002)
    id: "usr-002",
    name: "Dra. Sofía Ramos",
    specialty: "Medicina Interna y Cardiología",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
  },
];

export const owners: Owner[] = [
  {
    id: "owner-1",
    name: "Ana Martínez",
    email: "ana.martinez@email.com",
    phone: "+54 11 4567-8901",
    pets: ["pet-1", "pet-2"],
  },
  {
    id: "owner-2",
    name: "Roberto Silva",
    email: "roberto.silva@email.com",
    phone: "+54 11 2345-6789",
    pets: ["pet-3"],
  },
  {
    id: "owner-3",
    name: "Laura Fernández",
    email: "laura.fernandez@email.com",
    phone: "+54 11 9876-5432",
    pets: ["pet-4"],
  },
];

export const pets: Pet[] = [
  {
    id: "pet-1",
    name: "Max",
    species: "dog",
    breed: "Golden Retriever",
    weight: 32,
    birthDate: "2020-03-15",
    allergies: ["Pollo"],
    pastSurgeries: ["Castración (2021)"],
    ownerId: "owner-1",
  },
  {
    id: "pet-2",
    name: "Luna",
    species: "cat",
    breed: "Siamés",
    weight: 4.5,
    birthDate: "2021-07-22",
    allergies: [],
    pastSurgeries: [],
    ownerId: "owner-1",
  },
  {
    id: "pet-3",
    name: "Rocky",
    species: "dog",
    breed: "Bulldog",
    weight: 25,
    birthDate: "2019-11-08",
    allergies: ["Carne vacuna", "Lácteos"],
    pastSurgeries: ["Cirugía de cadera (2022)"],
    ownerId: "owner-2",
  },
  {
    id: "pet-4",
    name: "Mia",
    species: "cat",
    breed: "Persa",
    weight: 5,
    birthDate: "2022-01-30",
    allergies: [],
    pastSurgeries: ["Esterilización (2023)"],
    ownerId: "owner-3",
  },
];

export const appointments: Appointment[] = [
  {
    id: "apt-1",
    vetId: "usr-001",
    petId: "pet-1",
    ownerId: "owner-1",
    date: "2026-05-14",
    time: "09:00",
    reason: "Control anual y vacunación",
    status: "confirmed",
  },
  {
    id: "apt-2",
    vetId: "usr-001",
    petId: "pet-3",
    ownerId: "owner-2",
    date: "2026-05-14",
    time: "10:30",
    reason: "Control post-cirugía de cadera",
    status: "pending",
  },
  {
    id: "apt-3",
    vetId: "usr-002",
    petId: "pet-2",
    ownerId: "owner-1",
    date: "2026-05-14",
    time: "11:00",
    reason: "Refuerzo de vacuna",
    status: "confirmed",
  },
  {
    id: "apt-4",
    vetId: "usr-002",
    petId: "pet-4",
    ownerId: "owner-3",
    date: "2026-05-14",
    time: "14:00",
    reason: "Consulta por problema de piel",
    status: "pending",
  },
  {
    id: "apt-5",
    vetId: "usr-001",
    petId: "pet-1",
    ownerId: "owner-1",
    date: "2026-05-15",
    time: "09:30",
    reason: "Limpieza dental",
    status: "confirmed",
  },
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: "rec-1",
    petId: "pet-1",
    date: "2025-11-15",
    diagnosis: "Infección leve de oído",
    treatment: "Gotas antibióticas para oídos, 7 días de tratamiento",
    vetId: "vet-1",
    notes: "El paciente respondió bien al tratamiento. No se requiere seguimiento a menos que reaparezcan los síntomas.",
  },
  {
    id: "rec-2",
    petId: "pet-1",
    date: "2025-06-20",
    diagnosis: "Control anual de salud",
    treatment: "Vacuna antirrábica administrada, prevención de heartworm recetada",
    vetId: "vet-1",
  },
  {
    id: "rec-3",
    petId: "pet-3",
    date: "2026-02-10",
    diagnosis: "Displasia de cadera - control post-cirugía",
    treatment: "Ejercicios de fisioterapia, medicación antiinflamatoria",
    vetId: "vet-2",
    notes: "La recuperación avanza bien. Continuar ejercicios por 4 semanas más.",
  },
  {
    id: "rec-4",
    petId: "pet-2",
    date: "2025-08-05",
    diagnosis: "Infección respiratoria alta",
    treatment: "Antibióticos y reposo por 10 días",
    vetId: "vet-2",
  },
];

export const vaccines: Vaccine[] = [
  {
    id: "vac-1",
    petId: "pet-1",
    name: "Antirrábica",
    dateAdministered: "2025-06-20",
    nextDueDate: "2026-06-20",
    status: "up-to-date",
  },
  {
    id: "vac-2",
    petId: "pet-1",
    name: "DHPP",
    dateAdministered: "2025-06-20",
    nextDueDate: "2026-06-20",
    status: "up-to-date",
  },
  {
    id: "vac-3",
    petId: "pet-1",
    name: "Bordetella",
    dateAdministered: "2025-06-20",
    nextDueDate: "2026-05-20",
    status: "due-soon",
  },
  {
    id: "vac-4",
    petId: "pet-2",
    name: "FVRCP",
    dateAdministered: "2024-12-15",
    nextDueDate: "2025-12-15",
    status: "overdue",
  },
  {
    id: "vac-5",
    petId: "pet-2",
    name: "Antirrábica",
    dateAdministered: "2024-12-15",
    nextDueDate: "2026-12-15",
    status: "up-to-date",
  },
  {
    id: "vac-6",
    petId: "pet-3",
    name: "Antirrábica",
    dateAdministered: "2025-09-10",
    nextDueDate: "2026-09-10",
    status: "up-to-date",
  },
  {
    id: "vac-7",
    petId: "pet-4",
    name: "FVRCP",
    dateAdministered: "2025-03-01",
    nextDueDate: "2026-03-01",
    status: "overdue",
  },
];

export const availableTimeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];
