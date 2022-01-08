import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { Leader } from '../shared/leader';
import { baseURL } from '../shared/BaseURL';
import { ProcessHttpMsgService } from './process-http-msg.service';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    private processHttpMsg:ProcessHttpMsgService) { }

  getLeaders():Observable<Leader[]>{
    return this.http.get<Leader[]>(`${baseURL}leadership`).pipe(catchError(this.processHttpMsg.handleError));
  }

  getFeaturedLeader():Observable<Leader>{
    return this.http.get<Leader[]>(`${baseURL}leadership?featured=true`).pipe(map(leader=>leader[0])).pipe(catchError(this.processHttpMsg.handleError));
  }
}
