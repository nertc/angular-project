import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  public isShown: boolean = false;
  public text: string = "";
  private $event = new Subject<boolean>();

  constructor() { }

  create( message: string, $event: Subject<boolean> = new Subject<boolean>() ): Subject<boolean> {
    this.text = message;
    this.isShown = true;
    this.$event = $event;
    return this.$event;
  }

  accept() {
    this.isShown = false;
    this.$event.next(true);
  }

  deny() {
    this.isShown = false;
    this.$event.next(false);
  }
}
