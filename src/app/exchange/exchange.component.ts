import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { of, Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  fg: FormGroup = new FormGroup({});
  currencies: Array<string> = [];
  $changeLeftExchange = new Subject<number>();
  subscriptions: Array<Subscription> = [];
  rightFocused: boolean = false;
  leftFocused: boolean = false;
  oldOnclick = document.onclick;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.oldOnclick = document.onclick;
    document.onclick = e => {
      const dropdowns = document.getElementsByClassName('selected');
      Array.from(dropdowns).forEach(el => {
        if( !el.contains(<Node>e.target) ) {
          el.classList.remove('selected');
        }
      });
    }

    this.subscriptions.push(this.http.get(`https://api.exchangeratesapi.io/latest`).subscribe({
      next: v => {
        if ('rates' in v)
          this.currencies = Object.getOwnPropertyNames(v['rates']);
        else
          this.currencies = [];
        this.defineFormgroup();
      }
    }));

    this.defineFormgroup();

    this.subscriptions.push(this.$changeLeftExchange.subscribe({
      next: v => {
        if (!v || this.left.length + v < 1) return;

        if (v > 0) {
          this.left.push(this.createFormElement());
        } else {
          this.left.removeAt(this.left.length - 1);
        }
      }
    }));
  }

  defineFormgroup(): void {
    this.fg = new FormGroup({
      'left': new FormArray([
        this.createFormElement(),
        this.createFormElement()
      ]),
      'right': this.createFormElement()
    });

    const updateInput = ({currency, val: value}: { currency: string, val: string }, input: AbstractControl): void => {
      this.subscriptions.push(this.http.get(`https://api.exchangeratesapi.io/latest?base=${currency}&symbols=${input.get('currency')?.value}`)
          .pipe(take(1)).subscribe(info => {
            if (!('rates' in info && input.get('currency')?.value in info['rates'])) return;
            const rate = info['rates'][input.get('currency')?.value];
            input.get('val')?.setValue(Number(input.get('val')?.value) + Number(value) * Number(rate));
          }));
    };

    this.subscriptions.push(this.left.valueChanges.subscribe(pair => {
      if(!this.leftFocused) return;
      if(this.left.invalid) return;
      this.right.get('val')?.setValue(0);
      this.subscriptions.push(
        of(...pair).subscribe(o => updateInput(o, this.right))
      );
    }));
    
    this.subscriptions.push(this.right.valueChanges.subscribe(o => {
      if(!this.rightFocused) return;
      if(this.left.length > 1) return;
      if(this.right.invalid) return;
      if(!('currency' in o && 'val' in o)) return;
      const input =  <AbstractControl>this.left.get('0');
      input.get('val')?.setValue(0);
      updateInput(o, input);
    }));
  }

  get left(): FormArray {
    return <FormArray>this.fg.get('left');
  }

  get right(): FormGroup {
    return <FormGroup>this.fg.get('right');
  }

  isValid(index: number): boolean {
    return this.left.get(index.toString())?.valid ?? false;
  }

  createFormElement(): FormGroup {
    return new FormGroup({
      'currency': new FormControl(this.currencies[0]),
      'val': new FormControl('0', { validators: [Validators.required, Validators.pattern("\\d+(\\.\\d+)?")] })
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    document.onclick = this.oldOnclick;
  }

  swap(): void {
    const leftInput = this.left.get('0');
    const [leftCur, leftVal] = [leftInput?.get('currency'), leftInput?.get('val')];
    const [rightCur, rightVal] = [this.right?.get('currency'), this.right?.get('val')];
    
    const [lcur, lval] = [leftCur?.value, leftVal?.value];
    const [rcur, rval] = [rightCur?.value, rightVal?.value];
    leftCur?.setValue(rcur), leftVal?.setValue(rval);
    rightCur?.setValue(lcur), rightVal?.setValue(lval);
  }
}
