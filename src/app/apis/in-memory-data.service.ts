import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact, Group } from './model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  public createDb(): {contacts: Contact[], groups: Group[]} {
    const contacts = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

    const groups = [
      { id: 111, name: 'Favorites', contacts: contacts.slice(2, 5) },
      { id: 112, name: 'Friends', contacts: [contacts[3], contacts[6], contacts[9]]},
      { id: 113, name: 'Doctors', contacts: [contacts[0], contacts[7]] },
      { id: 114, name: 'Girl Gang', contacts: [contacts[1], contacts[4], contacts[7], contacts[8]]}
    ];

    return {contacts, groups}
  }

  private genId(entity: (Contact | Group)[], collectionName: string): number {
    const defaultIndex = collectionName === 'contacts' ? 11 : 111;
    return entity.length > 0 ? Math.max(...entity.map(e => e.id)) + 1 : defaultIndex;
  }
}
