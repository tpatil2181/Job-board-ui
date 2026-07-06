import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CandidateLogin, CandidateRegistration, Job } from '../Interface/models';
import { CandidateChangePassword } from '../Interface/Canditate/candidate-chagepass';
import { AppliedJob, Candidate, JobApplication } from '../Interface/Canditate/candidate';
import { PostedJob } from '../Interface/employerModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = 'http://localhost:8080';

  private candidateUrl ='http://localhost:8080/Hireflow/candidate'

  private employerUrl= 'http://localhost:8080/Hireflow/employer'

  // private employerNoAuthUrl ='http://localhost:8080/employer'


  // private candidateSubject = new BehaviorSubject<Candidate | null>(null);

  // candidate$ = this.candidateSubject.asObservable();

  userId: number = 0;

 private candidateSubject = new BehaviorSubject<Candidate | null>(
    JSON.parse(localStorage.getItem('candidate') || 'null')
  );

  candidate$ = this.candidateSubject.asObservable();



  constructor(private http: HttpClient) { }



//================================App Service================================

  getAllJobs(): Observable<Job[]> {
        return this.http.get<Job[]>(`${this.baseUrl}/jobsearch`);
  }

  login(CandidateLog: CandidateLogin): Observable<any> {
        return this.http.post(`${this.baseUrl}/cnd_login`, CandidateLog);
  }

  register(Candidate: CandidateRegistration): Observable<any> {
        return this.http.post(`${this.baseUrl}/emp_register`, Candidate);
  }

  EmployerRegister(Candidate: CandidateRegistration): Observable<any> {
    return this.http.post(`${this.baseUrl}/cnd_register`, Candidate);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('candidate');
    // localStorage.clear();
    this.candidateSubject.next(null);
  }

  setCandidate(candidate: Candidate) {
      localStorage.setItem('candidate',JSON.stringify(candidate));
      this.candidateSubject.next(candidate);
  }

  getCandidateOfAngularApp(): Candidate | null {
      return this.candidateSubject.value;
  }
  // getCandidate(email: string): Observable<Candidate> {
  //   return this.http.get<Candidate>(`${this.baseUrl}/candidate/${email}`);
  // }

  getLoggedInCandidate() {
    const data = localStorage.getItem('candidate');
    return data ? JSON.parse(data) : null;
  }

  getJobById(jobId: number): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/job/${jobId}`);  
  }



//=================================Candidate Spacific Request=================================

getCandidateProfile() {
      // console.log('Loading candidate profile...');
      // console.log(localStorage.getItem('token'));
      return this.http.post<any>(`${this.candidateUrl}/profile`,null);
  }

uploadResume(file: File, candidateId: number) {
    const formData = new FormData();

    formData.append('file', file);   // key = "file"
    formData.append('candidateId', candidateId.toString());

    return this.http.post(`${this.candidateUrl}/uploadResume/${candidateId}`, formData);
  }

getResume(resumeId:number):Observable<Blob>{
    return this.http.get(`${this.candidateUrl}/resume/${resumeId}`, {
    responseType: 'blob'
    });
  }

jobApplicationRequest(jobApplication: JobApplication): Observable<any> {
    // console.log('Sending Data:', jobApplication);  //Remove this letter for security resone it is printing data on console
    return this.http.post(`${this.candidateUrl}/jobApplication`, jobApplication);
  }

getAppliedJobs(): Observable<AppliedJob[]> {
      return this.http.get<AppliedJob[]>(`${this.candidateUrl}/allAppliedJobs`);
      // localhost:8080/Hireflow/candidate/allAppliedJobs
  }

withdrawJobApplication(applicationId: number): Observable<string> {
    return this.http.delete(
      `${this.candidateUrl}/withdrawAppln/${applicationId}`,
      {
        responseType: 'text'
      }
    );
  }

changePassword(CandidateChangepass: CandidateChangePassword): Observable<any> {
    return this.http.post(`${this.candidateUrl}/changePass `, CandidateChangepass);
  }





//=================================Employeer Spacific Request=================================


getEmployerProfile() {
      // console.log('Loading candidate profile...');
      // console.log(localStorage.getItem('token'));
      return this.http.post<any>(`${this.employerUrl}/comapnyHome`,null);
  }


  getPostedJobs(employerId: number): Observable<PostedJob[]> {
      return this.http.get<PostedJob[]>(`${this.employerUrl}/AllPostedJobs/${employerId}`);
      // return this.http.get<PostedJob[]>(`${this.employerNoAuthUrl}/allAppliedJobs/${employerId}`);

  }







}


