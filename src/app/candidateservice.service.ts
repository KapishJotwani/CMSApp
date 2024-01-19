import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateserviceService {
  private apiUrl = 'http://localhost:8181/api';

  constructor(private http: HttpClient) {}

 
  getCandidates(table_name: String): Observable<any[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<any[]>(url);
  }

  getCandidate(candidateId: number, table_name:String): Observable<any> {
    console.log("Service:",candidateId)
    console.log("Service:",table_name)
    const url = `${this.apiUrl}/${table_name}/ById/${candidateId}`;
    console.log(url)
    return this.http.get<any>(url);
  }

  updateCandidate(candidateId: number, updatedCandidate: any, table_name:String): Observable<any> {
    const url = `${this.apiUrl}/${table_name}/update`;
    return this.http.put(url, updatedCandidate);
  }
}