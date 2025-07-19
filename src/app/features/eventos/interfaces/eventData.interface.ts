// --- Interfaces para los datos del evento ---
export interface EventData {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  estado: number;
  opciones_satisfaccion: [string, string?][];
}


export interface actualizarEstado {
  id: string;
  newEstado: number;
}