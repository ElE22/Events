import { Component,  signal, WritableSignal, computed, OnChanges, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormArray, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { SatisfactionOptionComponent } from "@app/shared/components/satisfaction-option/satisfaction-option.component"; // <-- Importación clave
import { EventData } from '@features/eventos/interfaces/eventData.interface'; // Asegúrate de que esta ruta sea correcta


@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SatisfactionOptionComponent], // <-- Aquí se usa ReactiveFormsModule
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export default class EventDetailComponent implements OnChanges {

  eventId = input<number | null>(null);
  close = output<void>();
  eventUpdated = output<EventData>();

  mockEventsData: { [key: number]: EventData } = {
      1: {
        id: 1,
        nombre: 'Conferencia Anual de Tecnología 2025',
        descripcion: 'Un evento imperdible para profesionales y entusiastas de la tecnología, explorando las últimas tendencias en IA, blockchain y ciberseguridad. Contará con ponentes internacionales y talleres interactivos. Prepárate para dos días de inmersión total en el futuro digital.',
        fecha: '2025-10-15',
        lugar: 'Centro de Convenciones',
        estado: 'active',
        opciones_satisfaccion: [
          ['Calidad del contenido presentado'],
          ['Organización y logística del evento', 'fdvdf'],
          ['Interacción con los ponentes y network', "dsvsd"],
          ['Relevancia de los temas tratados', "dsvfsdvsd"], 
          ['Experiencia general del evento y facilidades', "vfdf"]
        ]
      },
      2: {
        id: 2,
        nombre: 'Seminario de Marketing Digital',
        descripcion: 'Sesiones intensivas sobre SEO, SEM, redes sociales y content marketing, con casos de éxito y talleres prácticos. Este seminario te brindará las herramientas para potenciar tu presencia online.',
        fecha: '2024-05-20',
        lugar: 'Auditorio Principal',
        estado: 'finished',
        opciones_satisfaccion: [
          ['Utilidad de la información recibida', 'Hola'],
          ['Claridad de las presentaciones y ejemplos', "hee"],
          ['Aplicabilidad de las técnicas aprendidas', '4r3']
        ]
      },
      3: {
        id: 3,
        nombre: 'Exposición de Arte (sin opciones)',
        descripcion: 'Una exposición de arte contemporáneo.',
        fecha: '2025-03-01',
        lugar: 'Museo Central',
        estado: 'active',
        opciones_satisfaccion: [["Vision", "buena"], ["Vision2", "buena2"]]
      }
    };

  currentEvent: WritableSignal<EventData | null> = signal(null);
  isDetailsModalOpen: WritableSignal<boolean> = signal(false);
  isEditOptionsModalOpen: WritableSignal<boolean> = signal(false);

  // FormGroup para el formulario de edición de opciones
  // editOptionsForm: FormGroup;

  hasSatisfactionOptions = computed(() =>
    this.currentEvent() ?  this.currentEvent()!.opciones_satisfaccion.length > 0 : false
   
  );

  // // Inyectamos FormBuilder para construir el formulario reactivo
  // constructor(private fb: FormBuilder) {
  //   // Inicializamos el formulario con un FormArray para las opciones de satisfacción
  //   this.editOptionsForm = this.fb.group({
  //     satisfactionOptions: this.fb.array([]) // Empieza vacío
  //   });
  // }

  // // Getter para acceder fácilmente al FormArray en la plantilla
  // get satisfactionOptionsArray(): FormArray {
  //   return this.editOptionsForm.get('satisfactionOptions') as FormArray;
  // }

  ngOnChanges(): void {
    if (this.eventId() !== null) {
      this.loadEventDetails(this.eventId()!);
    } else {
      this.closeDetailsModal();
    }
  }

  private loadEventDetails(id: number): void {
    const event = this.mockEventsData[id];
    if (event) {
      this.currentEvent.set(event);
      this.isDetailsModalOpen.set(true);
    } else {
      console.warn(`Evento con ID ${id} no encontrado.`);
      this.closeDetailsModal();
    }
  }

  // --- Métodos del Modal de Detalles ---
  closeDetailsModal(): void {
    this.close.emit();
  }

  //cambiando el estado del evento
  saveEventStatus(newStatus: Event): void { // Recibe el nuevo estado directamente
   const selectElement = newStatus.target as HTMLSelectElement;
    const newStatusValue = selectElement.value as 'active' | 'finished';
    console.log(`Nuevo estado seleccionado: ${newStatusValue}`);
    if (this.currentEvent()) {
      const updatedEvent = { ...this.currentEvent()! };
      updatedEvent.estado = newStatusValue;
      this.currentEvent.set(updatedEvent);

      console.log(`Simulando guardar estado del evento ${updatedEvent.nombre}: ${updatedEvent.estado}`);
      // alert(`Estado del evento ${updatedEvent.nombre} cambiado a: ${updatedEvent.estado}`);

      this.eventUpdated.emit(updatedEvent);
    }
  }

  openEditOptionsModal(): void {
    if (this.currentEvent()) {
      // // Limpiamos el FormArray antes de llenarlo
      // // this.satisfactionOptionsArray.clear();
      // const options = this.currentEvent()!.opciones_satisfaccion;

      // if (options && options.length > 0) {
      //   options.forEach(option => {
      //     this.satisfactionOptionsArray.push(this.fb.control(option, Validators.required));
      //   });
      // } else {
      //   // Si no hay opciones, añadimos una vacía por defecto
      //   this.satisfactionOptionsArray.push(this.fb.control('', Validators.required));
      // }
      this.isEditOptionsModalOpen.set(true);
    }
  }

  // --- Métodos del Modal de Edición de Opciones ---
  closeEditOptionsModal(): void {
    this.isEditOptionsModalOpen.set(false);
  }

  // addEditableOption(): void {
  //   this.satisfactionOptionsArray.push(this.fb.control('', Validators.required));
  // }

  // removeEditableOption(index: number): void {
  //   this.satisfactionOptionsArray.removeAt(index);
  // }

  saveEditedOptions(): void {
  //   if (this.currentEvent() && this.editOptionsForm.valid) { // <-- Validar el formulario
  //     // Obtenemos los valores del FormArray
  //     const newOptions: string[] = this.satisfactionOptionsArray.controls
  //       .map(control => control.value.trim())
  //       .filter(value => value !== ''); // Filtramos valores vacíos

  //     const updatedEvent : EventData = { ...this.currentEvent()! };
  //     updatedEvent.opciones_satisfaccion = newOptions;
  //     this.currentEvent.set(updatedEvent);

  //     console.log(`Simulando guardar opciones de satisfacción para ${updatedEvent.nombre}:`, newOptions);
  //     alert('Opciones de satisfacción actualizadas para el evento: ' + updatedEvent.nombre);

  //     this.eventUpdated.emit(updatedEvent);
  //     this.closeEditOptionsModal();
  //   } else {
  //     // Marcar todos los campos como "touched" para mostrar errores de validación
  //     this.editOptionsForm.markAllAsTouched();
  //     alert('Por favor, completa todas las opciones de satisfacción o elimínalas si están vacías.');
  //   }
  // }
   console.log("Hola de saveEditedOptions");
  }
}