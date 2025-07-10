import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  private isOpened = signal<Boolean>(false);
  public isOpenComputed = computed<Boolean>(()=> this.isOpened())
  constructor() { }

  toggle() {
    this.isOpened.update(open => !open);
  }

  close(){
    this.isOpened.set(false);
  }

  open(){
    this.isOpened.set(true);
  }


}
