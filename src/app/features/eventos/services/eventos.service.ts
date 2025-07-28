import { Injectable, signal } from '@angular/core';
import { actualizarEstado, EventData } from '../interfaces/eventData.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Evento {
  id?: number;
  nombre: string;
  fecha: string;
  descripcion: string;
}


@Injectable({
  providedIn: 'root'
})
export class EventosService {  
  private apiUrl = 'http://localhost:3000/api/eventos';

  constructor(private http: HttpClient) {}

 private eventosGlobal= signal<EventData[]>([
       {
          id: "23443-43-4-3",
          nombre: 'Seminario de Marketing Digital',
          descripcion: '',
          fecha: '2024-05-20',
          lugar: '',
          estado: 1,
          opciones_satisfaccion: [
            ['Utilidad de la información recibida', 'Hola'],
            ['Claridad de las presentaciones y ejemplos', "hee"],
            ['Aplicabilidad de las técnicas aprendidas', '4r3']
          ]
        }, {
          id: "wfdf-rf-rf-rr-re",
          nombre: 'Conferencia Anual de Tecnología 2025',
          descripcion: 'Un evento imperdible para profesionales y entusiastas de la tecnología, explorando las últimas tendencias en IA, blockchain y ciberseguridad. Contará con ponentes internacionales y talleres interactivos. Prepárate para dos días de inmersión total en el futuro digital.',
          fecha: '2025-10-15',
          lugar: 'Centro de Convenciones',
          estado: 1,
          opciones_satisfaccion: [
            ['Calidad del contenido presentado', ''],
            ['Organización y logística del evento', 'fdvdf'],
            ['Interacción con los ponentes y network', "dsvsd"],
            ['Relevancia de los temas tratados', "dsvfsdvsd"], 
            ['Experiencia general del evento y facilidades', "vfdf"]
          ]
        },
         {
          id: '4345435435545-4-34',
          nombre: 'Exposición de Arte (sin opciones)',
          descripcion: 'Una exposición de arte contemporáneo.',
          fecha: '2025-03-01',
          lugar: 'Museo Central',
          estado: 1,
          opciones_satisfaccion: [["Vision", "buena"], ["Vision2", "buena2"]]
        },
        {
          id: '4345435435545-4354-34',
          nombre: 'ExposING',
          descripcion: 'Una exposición de arte contemporáneo.',
          fecha: '2022-02-01',
          lugar: 'Museoal',
          estado: 0,
          opciones_satisfaccion: [["Vision", "buena"], ["Vision2", "buena2"]]
        },
         {
          id: '4345435435545-4354-12',
          nombre: 'ExposINGsdd',
          descripcion: 'Una exposición de arte contemporáneo.',
          fecha: '2022-02-01',
          lugar: 'Museoal',
          estado: 0,
          opciones_satisfaccion: [["Vision", "buena"], ["Vision2", "buena2"]]
        },{
          id: '4345435435545-4334r2434-12',
          nombre: 'Hola eventos',
          descripcion: 'Una exposición de arte contemporáneo dfewfwerew.',
          fecha: '2025-12-01',
          lugar: 'Nose io',
          estado: 0,
          opciones_satisfaccion: [["Vision", "buena"], ["Vision2", "buena2"]]
        },
        {
          id: '4345435435545-werewrwe34r2434-12',
          nombre: 'adios eventos',
          descripcion: 'Una exposición de arte contemporáneo dfewfwerew.',
          fecha: '2025-12-01',
          lugar: 'Nose io',
          estado: 0,
          opciones_satisfaccion: [["Vision", "buena"], ["Vision2", "buena2"]]
        }
      ]);

  getEventos(): EventData[] {
    // return this.http.get<Evento[]>(this.apiUrl, { withCredentials: true });
    // let resp = this.eventosGlobal().map(event => event.id)
    return this.eventosGlobal();
  }

  getEventoByID(id: string): EventData[] {
    // return this.http.get<any>(`${this.apiUrl}/${id}`);
    return this.eventosGlobal().filter(evento => evento.id === id )
  }

  // crearEvento(evento: Evento): Observable<Evento> {
  //   return this.http.post<Evento>(this.apiUrl, evento, { withCredentials: true });
  // }
  crearEvento(evento: EventData): void {
     this.eventosGlobal().push(evento)
  }

  actualizarEvento(id: number, evento: Evento): Observable<Evento> {
    return this.http.patch<Evento>(`${this.apiUrl}/${id}`, evento, { withCredentials: true });
  }

  eliminarEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  // actualizarEstadoEvento(newEstado: actualizarEstado): void {
  //   //return this.http.put(`${this.apiUrl}/${id}/estado`, { estado: nuevoEstado }, {withCredentials: true});
  //   let eventoActualizado! : EventData;
  //   for (const evento of this.eventosGlobal()) {
  //     if(evento.id  == newEstado.id){
  //       evento.estado = newEstado.newEstado
  //       eventoActualizado = evento

  //     }
      
  //   }
    
  // }
  actualizarEstadoEvento(newEstado: actualizarEstado): void {
  const actualizados = this.eventosGlobal().map(evento => 
      evento.id === newEstado.id 
        ? { ...evento, estado: newEstado.newEstado } 
        : evento
    );

  console.log("global ser: ", actualizados[3].estado)
  this.eventosGlobal.set(actualizados)
}

}
