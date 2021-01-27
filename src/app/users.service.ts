import { Injectable } from '@angular/core';
import { User, UserProperty } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: Map<number, User> = new Map();
  private id: number;
  userProperties: Array<UserProperty> = ['email', 'password', 'nickname', 'phone', 'website']

  constructor() {
    // this.forTesting();
    this.users = new Map([
      [0, {
        email: 'davidtsiklauri7@gmail.com',
        password: '1374b0bac8417215cad2de9fb23d7b00df22f544dd2c2eb2105c52fd2cd95dc8698ce83a4b4526742f3ec9e9b22ad612fcfc6eb08c21d9bdd1493b599a6937b2d09b9a70fbf3d0312b9ca820b2c58131817cd5ab44d16a8caa6712d5217e04491bc2cdf183db39bf5c730396f14ac93707',
        nickname: 'ohNoItIsEncrypted',
        phone: '+380123456789',
        website: 'ohNoItIsEncrypted.com',
        passwordKeys: [44251354483277, 557155574455811]
      }],
      [1, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [2, {
        email: "123456789@g",
        password: "316499d01091441811c0201",
        nickname: "123456789-is-password",
        phone: "+380123456789",
        website: "123456789.password",
        passwordKeys: [1407237466687, 1602254288287],
      }]
    ]);
    this.id = this.users.size;
  }

  private forTesting() {
    this.users = new Map([
      [0, {
        email: 'davidtsiklauri7@gmail.com',
        password: '1374b0bac8417215cad2de9fb23d7b00df22f544dd2c2eb2105c52fd2cd95dc8698ce83a4b4526742f3ec9e9b22ad612fcfc6eb08c21d9bdd1493b599a6937b2d09b9a70fbf3d0312b9ca820b2c58131817cd5ab44d16a8caa6712d5217e04491bc2cdf183db39bf5c730396f14ac93707',
        nickname: 'ohNoItIsEncrypted',
        phone: '+380123456789',
        website: 'ohNoItIsEncrypted.com',
        passwordKeys: [44251354483277, 557155574455811]
      }],
      [1, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [2, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [3, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [4, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [5, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [6, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [7, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [8, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [9, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [10, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [11, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [12, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [13, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [14, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [15, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [16, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [17, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [18, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [19, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [20, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }],
      [21, {
        email: "makegeorgiagreatagain@gmail.com",
        password: "3d5507edc27600ea279dac235c4c35bea3dd3f1e80c2c542178c19b965cbdeadc1242ad99923215fcdfa611fc55289a5e7dfa8d318b6a8879c600210507d9e332c9e9ee9d756816b6ddd3a0a61d865ceac2a9a2d06dc291e8a14414ec57873010dced4f34845134bcfbf51a623908b07859e2116d510f38c00483024dbdbb7",
        nickname: "MakeGeorgiaGreatAgain",
        phone: "+380987654321",
        website: "MakeGeorgiaGreatAgain.ge/ka",
        passwordKeys: [984036275833, 38000937311179],
      }]
    ]);
  }

  getUsers(): Map<number, User> {
    return this.users;
  }

  getUser( id: number ): User | undefined {
    return this.users.get(id);
  }

  addUser( user: User ): void {
    this.users.set(this.id, user);
    ++this.id;
  }

  checkTypeWithKeys( key: string ): key is UserProperty | 'passwordKeys' {
    return key === 'passwordKeys' || this.checkType(key);
  }

  checkType( key: string ): key is UserProperty {
    return this.userProperties.some( k => k === key );
  }

  deleteUser( id: number ): boolean {
    return this.users.delete(id);
  }

  changeUser( id: number, user: User ): boolean {
    const oldData = this.users.get(id);
    if( !oldData ) return false;

    for( let key of Object.getOwnPropertyNames(user) ) {
      if( !this.checkTypeWithKeys(key) ) continue;

      if( (function(k: string): k is UserProperty {return k !== 'passwordKeys'})(key) ){
        if( !user[key] ) {
          user[key] = oldData[key];
        }
      } else {
        if( !user[key]?.[0] ) {
          user[key] = oldData[key];
        }
      }
    }

    this.users.set(id, user);
    return true;
  }
}
