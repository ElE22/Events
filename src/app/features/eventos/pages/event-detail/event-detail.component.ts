import { Component,  signal, WritableSignal, computed, OnChanges, input, output, inject, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormArray, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { SatisfactionOptionComponent } from "@app/shared/components/satisfaction-option/satisfaction-option.component"; // <-- Importación clave
import { actualizarEstado, EventData } from '@features/eventos/interfaces/eventData.interface'; // Asegúrate de que esta ruta sea correcta
import { EventosService } from '../../services/eventos.service';


@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SatisfactionOptionComponent, NgClass], // <-- Aquí se usa ReactiveFormsModule
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export default class EventDetailComponent {
  //Servicios
  private eventosService = inject(EventosService);

  //input
  event = input<EventData>();
  
  //output
  close = output<void>();

  //modal detalles
  isEditOptionsModalOpen: WritableSignal<boolean> = signal(false);
  //computed
  hasSatisfactionOptions = computed(() =>
    this.event() ?  this.event()!.opciones_satisfaccion.length > 0 : false
  );

  // --- Métodos del Modal de Detalles ---
  closeDetailsModal(): void {
    this.close.emit();
  }

  //formulario
  private fb = inject(FormBuilder);
  opcionesUpdateForm= this.fb.group({
    opciones_satisfaccion: this.fb.array([],[Validators.required])
  })

  optionArray(): FormArray<FormGroup>{
    return this.opcionesUpdateForm.get('opciones_satisfaccion') as FormArray<FormGroup>;
  }

  //cambiando el estado del evento
  saveEventStatus(newStatus: Event): void { // Recibe el nuevo estado directamente
   const selectElement = newStatus.target as HTMLSelectElement;
    const newStatusValue = selectElement.value as 'active' | 'finished';
    this.eventosService.actualizarEstadoEvento({id:  this.event()!.id, newEstado: newStatusValue ==='active' ? 0 : 1 }); 
  }

  openEditOptionsModal(): void {
   this.isEditOptionsModalOpen.set(true);
  }

  // --- Métodos del Modal de Edición de Opciones ---
  closeEditOptionsModal(): void {
    this.isEditOptionsModalOpen.set(false);
  }

  updateOpciones(opciones: any[]){
     if (!this.optionArray()) {
      console.error('El control "opciones" no existe en el formulario.');
      return;
    }

    if (!Array.isArray(opciones)) {
      console.error('El valor proporcionado no es un arreglo de strings:', opciones);
      return;
    }
    this.optionArray().clear();

    for (const grupo of opciones) {
     this.optionArray().push(this.fb.group({
      option: [grupo.option ?? '', [Validators.required, Validators.minLength(3)]], 
      label: [grupo.label ?? '']
    }))
    }
  }

  saveEditedOptions(): void {
    if(!this.isEqual () && this.opcionesUpdateForm.valid){
      const updatedEvent : EventData = { ...this.event()! };
      //mapeando las opciones para que queden en el formato correcto
      updatedEvent.opciones_satisfaccion = this.optionArray().controls.map(control => [control.value.option.trim(), control.value.label.trim()]);
      this.eventosService.actualizarEvento(updatedEvent)
      return;
    }

  }

  // compara si los arrays son iguales o si hay algun cambio
  isEqual(): boolean {
    const eventosOp = this.event()?.opciones_satisfaccion
    const eventosForm: any = this.opcionesUpdateForm.value.opciones_satisfaccion
    if ((eventosForm && eventosOp) && (eventosForm.length == eventosOp.length)) {
      for (let index = 0; index < eventosForm.length; index++) {
        if (eventosForm[index].option != eventosOp[index][0]) {
          //si no son iguales devuelve false
          return false;
        } else if (eventosForm[index].label != eventosOp[index][1]) {
          //si no son iguales devuelve false
          return false
        }
      }
      //si son iguales devuelve true
      return true;
    }
    // si no entra en el if default devuelve false
    return false;
  }

}