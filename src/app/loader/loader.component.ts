import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('bigSmall', [
      state('big', style({
        transform: 'scale(1,1)',
        opacity: 1
      })),
      state('small', style({
        transform: 'scale(0.6, 0.6)',
        opacity: 0.25
      })),
      transition('small<=>big', [
        animate('0.65s')
      ])
    ])
  ]
})
export class LoaderComponent implements OnInit {
  isBig = true;

  constructor() { }

  ngOnInit(): void {
  }

  onDone(): void {
    this.isBig = !this.isBig;
  }
}
