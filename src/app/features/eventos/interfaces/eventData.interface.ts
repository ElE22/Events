// --- Interfaces para los datos del evento ---
export interface EventData {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  estado: 'active' | 'finished';
  opciones_satisfaccion: [string, string?][];
}