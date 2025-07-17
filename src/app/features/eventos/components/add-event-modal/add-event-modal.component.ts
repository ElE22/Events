import { JsonPipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { SatisfactionOptionComponent } from "@app/shared/components/satisfaction-option/satisfaction-option.component";

@Component({
  selector: 'app-add-event-modal',
  imports: [ReactiveFormsModule, JsonPipe, SatisfactionOptionComponent],
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.css'
})
export class AddEventModalComponent {
  closeModalForm = output<void>();

  closeModal(){
    this.closeModalForm.emit();
  }

  fb = inject(FormBuilder);
  eventForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^[a-zA-Z\s]+$/)  // solo letras y espacios
      ]],
    description: [''],
    location: '',
    estado: '',
    opciones: this.fb.control<string[]>([]), // Inicializa un FormArray vacío para las opciones de satisfacción
  })

  handleSubmit(){
     const newEvent = this.eventForm.value;
      console.log('Evento creado:', newEvent);
    if (this.eventForm.valid) {
     
      // Aquí podrías agregar la lógica para enviar el evento a un servicio o almacenarlo en un estado global
      this.closeModal(); // Cierra el modal después de crear el evento
    } else {
      console.log('Formulario inválido');
    }
  }

  updateOptionsArray(options: string[]): void {
  const opcionesControl = this.eventForm.get('opciones');

  if (!opcionesControl) {
    console.error('El control "opciones" no existe en el formulario.');
    return;
  }

  if (!Array.isArray(options)) {
    console.error('El valor proporcionado no es un arreglo de strings:', options);
    return;
  }

  opcionesControl.setValue(options);
  // console.log('Formulario actualizado:', this.eventForm.value);
}



}
