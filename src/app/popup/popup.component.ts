import { Component, OnInit } from '@angular/core';
import { fadeIn, popIn } from '../animations';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [
    fadeIn,
    popIn
  ]
})
export class PopupComponent implements OnInit {

  container = false;

  constructor(
    private popupService: PopupService,
  ) { }

  ngOnInit(): void {
  }

  get text(): string {return this.popupService.text}

  accept() {this.popupService.accept()}
  deny() {this.popupService.deny()}
}
