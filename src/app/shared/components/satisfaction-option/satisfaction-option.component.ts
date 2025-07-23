import { JsonPipe } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import {  FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-satisfaction-option',
  imports: [ReactiveFormsModule],
  templateUrl: './satisfaction-option.component.html',
  styleUrl: './satisfaction-option.component.css'
})
export class SatisfactionOptionComponent {
  rowsChanged = output<string[]>();
  loadData = input<[string, string?][] | null>(null);

  constructor() {
    this.optionsFrom.valueChanges.subscribe(() => {
      this.emitUpdate();
    });
  }

  ngOnInit() {
    if (this.loadData()) {
      this.loadDataIntoFormArray();
    }
  }

  fb = inject(FormBuilder);
  optionsFrom = this.fb.group({
    opciones: this.fb.array([
      this.fb.group({
        option: ['', [Validators.required, Validators.minLength(3)]],
        label: [''],
      }),
      this.fb.group({
        option: ['', [Validators.required, Validators.minLength(3)]],
        label: [''],
      })
    ])
  })

  deleteControl(index: number) {
    this.optionsFrom.controls.opciones.removeAt(index);
    this.emitUpdate();

  }

  addControl() {
    const newControl = this.fb.group({
      option: ['', [Validators.required, Validators.minLength(3)]],
      label: [''],
    });
    this.optionArray().push(newControl);
    this.emitUpdate();
  }

  optionArray(): FormArray<FormGroup> {
    return this.optionsFrom.get('opciones') as FormArray<FormGroup>;
  }
  emitUpdate(): void {
    const arraysoptions = this.optionArray()
    this.rowsChanged.emit(arraysoptions.value)
  }

  loadDataIntoFormArray(): void {
    const data = this.loadData();
    const formArray = this.optionsFrom.get('opciones') as FormArray;
    // Limpiamos lo anterior
    formArray.clear();

    // Llenamos con la nueva data
    data?.forEach(([option, label]) => {
      formArray.push(
        this.fb.group({
          option: [option, Validators.required],
          label: [label]
        })
      );
    });
  }

  moveUp(index: number) {
    if (index > 0) {
      const options = this.optionArray();
      const temp = options.at(index);
      options.setControl(index, options.at(index - 1));
      options.setControl(index - 1, temp);
    }
  }

  moveDown(index: number) {
    const options = this.optionArray();
    if (index < options.length - 1) {
      const temp = options.at(index);
      options.setControl(index, options.at(index + 1));
      options.setControl(index + 1, temp);
    }
  }
   
}
