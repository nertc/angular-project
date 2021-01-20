import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';
import { promise } from 'protractor';
import { of, Subject, Subscription } from 'rxjs';
import { reduce, scan, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {
  fg: FormGroup = new FormGroup({});
  currencies: Array<string> = [];
  $changeLeftExchange = new Subject<{v: number, i?: number}>();
  subscriptions: Array<Subscription> = [];
  rightFocused: boolean = false;
  leftFocused: boolean = false;
  oldOnclick = document.onclick;
  leftChanged: boolean = false;
  rightChanged: boolean = false;
  triggerChange = setTimeout(() => {}, 0);

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
      next: ({v, i = this.left.length - 1}) => {
        if (!v || this.left.length + v < 1) return;

        if (v > 0) {
          this.left.push(this.createFormElement());
        } else {
          this.remove(i);
        }
        
        if(this.left.length > 1) {
          this.right.get('val')?.disable();
        } else {
          this.right.get('val')?.enable();
        }
      }
    }));
  }

  defineFormgroup(): void {
    this.fg = new FormGroup({
      'left': new FormArray([
        this.createFormElement()
      ]),
      'right': this.createFormElement()
    });

    const currencyRateGenerator = async({currency, val: value}: { currency: string, val: string }, input: AbstractControl): Promise<number> => {
      return new Promise<number>( res => {
        this.http.get(`https://api.exchangeratesapi.io/latest?base=${currency}&symbols=${input.get('currency')?.value}`)
          .pipe(take(1)).subscribe(info => {
            if (!('rates' in info && input.get('currency')?.value in info['rates'])) return;
            const rate = info['rates'][input.get('currency')?.value];

            res(Number(value) * Number(rate));
          })
        });
    };

    this.subscriptions.push(this.left.valueChanges.subscribe(pair => {
      if(!this.leftFocused && !this.leftChanged) return;
      if(this.left.invalid) return;

      clearTimeout(this.triggerChange);
      this.triggerChange = setTimeout(() => {
        let finalFunction: Promise<number> = (async () => 0)();
        this.subscriptions.push(
          of(...pair).pipe(
            reduce((acc, v) => this.asyncMerger(currencyRateGenerator(v, this.right), acc), finalFunction),
            take(1)
          ).subscribe(v => v.then(ans => this.right.get('val')?.setValue(ans.toFixed(2))))
        );
      }, 500);
    }));
    
    this.subscriptions.push(this.right.valueChanges.subscribe(o => {
      if(!this.rightFocused && !this.rightChanged) return;
      if(this.left.length > 1) return;
      if(this.right.invalid) return;
      if(!('currency' in o && 'val' in o)) return;

      clearTimeout(this.triggerChange);
      this.triggerChange = setTimeout(() => {
        const input =  <AbstractControl>this.left.get('0');
        currencyRateGenerator(o, input).then(ans => input.get('val')?.setValue(ans.toFixed(2)));
      }, 500)
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
      'val': new FormControl('0', { validators: [Validators.required, Validators.pattern('\\d+\\.?\\d*')] })
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

  remove( index: number ): void {
    if( this.left.length <= 1 ) return;
    this.leftChanged = true;
    this.left.removeAt(index);
    this.leftChanged = false;
  }

  selectCurrency( currency: string, index: number = -1 ) {
    if(index !== -1) {
      this.leftChanged = true;
      this.left.get(index.toString())?.get('currency')?.setValue(currency);
      this.leftChanged = false;
    } else {
      if( this.left.length > 1 ) {
        this.right.get('currency')?.setValue(currency);
        this.leftChanged = true;
        const leftCur = this.left.get('0')?.get('currency');
        leftCur?.setValue(leftCur?.value);
        this.leftChanged = false;
      } else {
        this.rightChanged = true;
        this.right.get('currency')?.setValue(currency);
        this.rightChanged = false;
      }
    }
  }

  async asyncMerger(p1: Promise<number>, p2: Promise<number>): Promise<number> {
    return (await p1) + (await p2);
  }
}
