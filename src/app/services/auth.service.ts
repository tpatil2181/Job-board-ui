import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidateLogin, CandidateRegistration } from '../Interface/models';
import { CandidateChangePassword } from '../Interface/Canditate/candidate-chagepass';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId:number=0;

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  register(Candidate: CandidateRegistration): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, Candidate);
  }
  login(CandidateLog: CandidateLogin): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, CandidateLog);
  }

  changePassword(CandidateLog: CandidateChangePassword,id:number): Observable<any> {
    return this.http.post(`${this.baseUrl}/changePass/${id}`, CandidateLog);
  }

 uploadResume(file: File, candidateId: number) {
  const formData = new FormData();

  formData.append('file', file);   // key = "file"
  formData.append('candidateId', candidateId.toString());

  return this.http.post(`${this.baseUrl}/uploadResume/${candidateId}`, formData);
  }
}
