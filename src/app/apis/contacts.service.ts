import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Contact } from './model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private contactsUrl = 'api/contacts';  // URL to web api

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl)
      .pipe(
        // catchError(this.handleError<Contact[]>('getHeroes', []))
      );
  }

  public getContact(id: number): Observable<Contact> {
    const url = `${this.contactsUrl}/${id}`;
    return this.http.get<Contact>(url)
      .pipe(

      )
  }

  public addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contact, this.httpOptions).pipe();
  }

  public updateContact(contact: Contact): Observable<Contact> {
    return this.http.put(this.contactsUrl, contact, this.httpOptions).pipe(
      map(res => res as Contact)
    );
  }
}
