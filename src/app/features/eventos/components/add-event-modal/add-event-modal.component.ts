import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { SatisfactionOptionComponent } from "@app/shared/components/satisfaction-option/satisfaction-option.component";
import { EventosService } from '../../services/eventos.service';
import { EventData } from '../../interfaces/eventData.interface';

@Component({
  selector: 'app-add-event-modal',
  imports: [ReactiveFormsModule, JsonPipe, SatisfactionOptionComponent, NgClass],
  templateUrl: './add-event-modal.component.html',
  styleUrl: './add-event-modal.component.css'
})
export class AddEventModalComponent {
  closeModalForm = output<void>();
  eventosService = inject(EventosService)
  private fb = inject(FormBuilder);
  eventForm = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^[a-zA-Z\s0-9]+$/)
      ]],
    descripcion: [''],
    lugar: '',
    opciones_satisfaccion: this.fb.array([],[Validators.required])
  })

  private optionArray(): FormArray<FormGroup> {
    return this.eventForm.get('opciones_satisfaccion') as FormArray<FormGroup>;
  }
  
  handleSubmit(){
    const newEvent = this.eventForm.value;
    if (this.eventForm.valid) {
      // console.log("Form:: ", this.eventForm.controls.opciones_satisfaccion.controls.map(name => name.value));
      const formValue = this.eventForm.value;

      const test: EventData = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        nombre: formValue.nombre ?? '',
        descripcion: formValue.descripcion ?? '',
        lugar: formValue.lugar ?? '',
        estado: 0,
        fecha: `${Date.now()}`,
        opciones_satisfaccion: this.optionArray().controls.map(g => [g.value.option, g.value.label])
      };
      this.eventosService.crearEvento(test)
      this.closeModal();
    } else {
      console.log('Formulario inválido');
    }
  }

  updateOptionsArray(options:  any[]): void {
    if (!this.optionArray()) {
      console.error('El control "opciones" no existe en el formulario.');
      return;
    }

    if (!Array.isArray(options)) {
      console.error('El valor proporcionado no es un arreglo de strings:', options);
      return;
    }
    this.optionArray().clear();

    for (const grupo of options) {
     this.optionArray().push(this.fb.group({
      option: [grupo.option ?? '', [Validators.required, Validators.minLength(3)]], 
      label: [grupo.label ?? '']
    }))
    }
  }

  closeModal(){
    this.closeModalForm.emit();
  }

}
