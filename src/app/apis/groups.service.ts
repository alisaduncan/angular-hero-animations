import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Contact, Group } from './model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private groupsUrl = 'api/groups';  // URL to web api

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.groupsUrl)
      .pipe(
        // catchError(this.handleError<Group[]>('getGroups', []))
      );
  }

  public getGroup(id: number): Observable<Group> {
    const url = `${this.groupsUrl}/${id}`;
    return this.http.get<Group>(url)
      .pipe(

      )
  }

  public addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.groupsUrl, group, this.httpOptions).pipe();
  }

  public updateGroup(group: Group): Observable<Group> {
    return this.http.put(this.groupsUrl, group, this.httpOptions).pipe(
      map(res => res as Group)
    );
  }
}
