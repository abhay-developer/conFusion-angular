import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { Leader } from '../shared/leader';
import { baseURL } from '../shared/BaseURL';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient) { }

  getLeaders():Observable<Leader[]>{
    return this.http.get<Leader[]>(`${baseURL}leadership`);
  }

  getFeaturedLeader():Observable<Leader>{
    return this.http.get<Leader[]>(`${baseURL}leadership?featured=true`).pipe(map(leader=>leader[0]));
  }
}
