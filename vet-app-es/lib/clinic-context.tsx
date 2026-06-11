"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  Appointment,
  Owner,
  Pet,
  MedicalRecord,
  Vaccine,
  appointments as initialAppointments,
  owners as initialOwners,
  pets as initialPets,
  medicalRecords as initialRecords,
  vaccines as initialVaccines,
} from "./mock-data";
import {
  apiLogin,
  apiGetAgenda,
  apiGetUsuarios,
  apiGetMascotas,
  apiRegistrarMascota,
  apiReservarTurno,
  BackendUser,
  BackendMascota,
  BackendTurnoAgenda,
  mapEstadoToFrontend,
  mapEspecieToFrontend,
} from "./api";

// ─────────────────────────────────────────────
// Tipos del contexto
// ─────────────────────────────────────────────

interface Credentials {
  email: string;
  password: string;
}

interface ClinicContextType {
  // ── Estado local (fallback/mock mientras no hay datos del backend) ──
  appointments: Appointment[];
  owners: Owner[];
  pets: Pet[];
  medicalRecords: MedicalRecord[];
  vaccines: Vaccine[];

  // ── Datos del backend ──
  backendAgenda: BackendTurnoAgenda[];
  backendMascotas: BackendMascota[];
  backendUsuarios: BackendUser[];
  isLoadingData: boolean;
  backendError: string | null;

  // ── Auth ──
  isLoggedIn: boolean;
  currentUser: BackendUser | null;
  credentials: Credentials | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // ── Acciones locales (para compatibilidad con booking actual) ──
  addAppointment: (appointment: Omit<Appointment, "id">) => void;
  updateAppointmentStatus: (id: string, status: Appointment["status"]) => void;
  addOwner: (owner: Omit<Owner, "id" | "pets">) => string;
  addPet: (pet: Omit<Pet, "id">, ownerId: string) => void;
  addMedicalRecord: (record: Omit<MedicalRecord, "id">) => void;

  // ── Acciones del backend ──
  fetchAgenda: (fecha?: string) => Promise<void>;
  fetchMascotas: () => Promise<void>;
  fetchUsuarios: () => Promise<void>;
}

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export function ClinicProvider({ children }: { children: ReactNode }) {
  // ── Estado mock (para compatibilidad con partes del UI que aún no conectan) ──
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [owners, setOwners] = useState<Owner[]>(initialOwners);
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [medicalRecords, setMedicalRecords] =
    useState<MedicalRecord[]>(initialRecords);
  const [vaccines] = useState<Vaccine[]>(initialVaccines);

  // ── Estado del backend ──
  const [backendAgenda, setBackendAgenda] = useState<BackendTurnoAgenda[]>([]);
  const [backendMascotas, setBackendMascotas] = useState<BackendMascota[]>([]);
  const [backendUsuarios, setBackendUsuarios] = useState<BackendUser[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  // ── Auth ──
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<BackendUser | null>(null);
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  // ─────────────────────────────────────────────
  // Login — llama a POST /auth/login del backend
  // ─────────────────────────────────────────────
  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        const user = await apiLogin(email, password);
        setCurrentUser(user);
        setCredentials({ email, password });
        setIsLoggedIn(true);
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCredentials(null);
    setBackendAgenda([]);
    setBackendMascotas([]);
    setBackendUsuarios([]);
  }, []);

  // ─────────────────────────────────────────────
  // Fetch agenda — GET /admin/agenda
  // ─────────────────────────────────────────────
  const fetchAgenda = useCallback(
    async (fecha?: string) => {
      if (!credentials) return;
      setIsLoadingData(true);
      setBackendError(null);
      try {
        const data = await apiGetAgenda(credentials, fecha);
        setBackendAgenda(data.agenda);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error al cargar la agenda";
        setBackendError(message);
      } finally {
        setIsLoadingData(false);
      }
    },
    [credentials]
  );

  // ─────────────────────────────────────────────
  // Fetch mascotas — GET /admin/mascotas
  // ─────────────────────────────────────────────
  const fetchMascotas = useCallback(async () => {
    if (!credentials) return;
    setIsLoadingData(true);
    setBackendError(null);
    try {
      const data = await apiGetMascotas(credentials);
      setBackendMascotas(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al cargar mascotas";
      setBackendError(message);
    } finally {
      setIsLoadingData(false);
    }
  }, [credentials]);

  // ─────────────────────────────────────────────
  // Fetch usuarios — GET /admin/usuarios
  // ─────────────────────────────────────────────
  const fetchUsuarios = useCallback(async () => {
    if (!credentials) return;
    setIsLoadingData(true);
    setBackendError(null);
    try {
      const data = await apiGetUsuarios(credentials);
      setBackendUsuarios(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al cargar usuarios";
      setBackendError(message);
    } finally {
      setIsLoadingData(false);
    }
  }, [credentials]);

  // ─────────────────────────────────────────────
  // Acciones locales (compatibilidad)
  // ─────────────────────────────────────────────
  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const updateAppointmentStatus = (
    id: string,
    status: Appointment["status"]
  ) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  const addOwner = (owner: Omit<Owner, "id" | "pets">): string => {
    const id = `owner-${Date.now()}`;
    const newOwner: Owner = { ...owner, id, pets: [] };
    setOwners((prev) => [...prev, newOwner]);
    return id;
  };

  const addPet = (pet: Omit<Pet, "id">, ownerId: string) => {
    const newPet: Pet = { ...pet, id: `pet-${Date.now()}`, ownerId };
    setPets((prev) => [...prev, newPet]);
    setOwners((prev) =>
      prev.map((o) =>
        o.id === ownerId ? { ...o, pets: [...o.pets, newPet.id] } : o
      )
    );
  };

  const addMedicalRecord = (record: Omit<MedicalRecord, "id">) => {
    const newRecord: MedicalRecord = {
      ...record,
      id: `rec-${Date.now()}`,
    };
    setMedicalRecords((prev) => [...prev, newRecord]);
  };

  return (
    <ClinicContext.Provider
      value={{
        // mock / local
        appointments,
        owners,
        pets,
        medicalRecords,
        vaccines,
        addAppointment,
        updateAppointmentStatus,
        addOwner,
        addPet,
        addMedicalRecord,
        // backend
        backendAgenda,
        backendMascotas,
        backendUsuarios,
        isLoadingData,
        backendError,
        // auth
        isLoggedIn,
        currentUser,
        credentials,
        login,
        logout,
        // fetch actions
        fetchAgenda,
        fetchMascotas,
        fetchUsuarios,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  const context = useContext(ClinicContext);
  if (context === undefined) {
    throw new Error("useClinic must be used within a ClinicProvider");
  }
  return context;
}

// ─────────────────────────────────────────────
// Re-exportamos helpers para uso directo en componentes
// ─────────────────────────────────────────────
export { mapEstadoToFrontend, mapEspecieToFrontend, apiRegistrarMascota, apiReservarTurno };
