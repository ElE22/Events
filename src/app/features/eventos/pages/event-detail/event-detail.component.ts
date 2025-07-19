import { Component,  signal, WritableSignal, computed, OnChanges, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormArray, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { SatisfactionOptionComponent } from "@app/shared/components/satisfaction-option/satisfaction-option.component"; // <-- Importación clave
import { actualizarEstado, EventData } from '@features/eventos/interfaces/eventData.interface'; // Asegúrate de que esta ruta sea correcta


@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SatisfactionOptionComponent], // <-- Aquí se usa ReactiveFormsModule
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export default class EventDetailComponent  {
  //input
  event = input<EventData>();
  currentEvent = input<EventData>();
  
  //output
  close = output<void>();
  estadoUpdated = output<actualizarEstado>();

  isEditOptionsModalOpen: WritableSignal<boolean> = signal(false);
  hasSatisfactionOptions = computed(() =>
    this.event() ?  this.event()!.opciones_satisfaccion.length > 0 : false
  );

  // --- Métodos del Modal de Detalles ---
  closeDetailsModal(): void {
    this.close.emit();
  }

  //cambiando el estado del evento
  saveEventStatus(newStatus: Event): void { // Recibe el nuevo estado directamente
   const selectElement = newStatus.target as HTMLSelectElement;
    const newStatusValue = selectElement.value as 'active' | 'finished';
    this.estadoUpdated.emit({id:  this.event()!.id, newEstado: newStatusValue ==='active' ? 0 : 1 });
  }

  openEditOptionsModal(): void {
   this.isEditOptionsModalOpen.set(true);
  }

  // --- Métodos del Modal de Edición de Opciones ---
  closeEditOptionsModal(): void {
    this.isEditOptionsModalOpen.set(false);
  }

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