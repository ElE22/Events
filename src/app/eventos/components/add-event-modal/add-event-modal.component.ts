import { JsonPipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { isValidDate } from 'rxjs/internal/util/isDate';

@Component({
  selector: 'app-add-event-modal',
  imports: [ReactiveFormsModule, JsonPipe],
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
    opciones: this.fb.array([
      this.fb.group({
        option: ['', Validators.required],
        label:['', Validators.required]
      })
    ])
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

  addControl(){
    
    this.eventForm.controls.opciones.push(
      this.fb.group({ 
        option: ['', Validators.required],
        label: ['', Validators.required]
      }))
  }

  deleteControl(index: number){
    this.eventForm.controls.opciones.removeAt(index);
  }
}
