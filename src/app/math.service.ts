import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {
  private primes: Array<number> = [];
  private checkNotPrime: Array<boolean> = [];
  private MAX_NUMBER: number = Math.sqrt(Number.MAX_SAFE_INTEGER / 100);

  constructor() {
    this.getPrimes();
  }

  // Eratosthenes Sieve
  private async getPrimes(): Promise<void> {
    for( let i = 2; i < this.MAX_NUMBER; ++i ) {
      if( !this.checkNotPrime[i] ) {
        if( i !== 2 ) this.primes.push(i);
        for( let j = i * i; j < this.MAX_NUMBER; j += i ) {
          this.checkNotPrime[j] = true;
        }
      }
    }
  }

  // Encrypt with RSA
  encrypt( text: string): [string, number, number] {
    const p = this.primes[this.randomInt(this.primes.length)];
    const q = this.primes[this.randomInt(this.primes.length)];

    const phi = (p - 1) * (q - 1);

    const n = p * q;

    let e = this.randomInt(phi);
    while( e < phi ) {
      if( this.gcd( e, phi ) === 1 ) break;
      e++;
    }

    return [this.encryptionAlgorithm(text, e, n), e, n];
  }
  
  private encryptionAlgorithm( text: string, e: number, n: number ): string {
    let output = "";
    for( let i = 0; i < text.length; ++i ) {
      const message = text.charCodeAt(i);
      let c: number = this.binpow(message, e, n);
      c = c * (i + 1);
      output += c.toString(16);
    }

    return output;
  }

  compareEncryption( oldText: string, newText: string, e: number, n: number ): boolean {
    return oldText === this.encryptionAlgorithm(newText, e, n);
  }

  // Eucliean GCD
  gcd( a: number, b: number ): number {
    if( b === 0 ) return a;
    return this.gcd( b, a % b );
  }

  randomInt( max: number ): number {
    return Math.floor(Math.random() * max);
  }

  // Binary Pow with Modulo
  binpow( num: number, pow: number, mod: number ): number {
    let ans = 1;

    while( pow > 0 ) {
      if( pow & 1 ) {
        ans = (ans * num) % mod;
      }
      num = (num * num) % mod;
      pow >>= 1;
    }

    return ans;
  }
}
