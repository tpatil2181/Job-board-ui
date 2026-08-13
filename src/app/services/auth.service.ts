import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CandidateLogin, CandidateRegistration, Job } from '../Interface/models';
import { CandidateChangePassword } from '../Interface/Canditate/candidate-chagepass';
import { AppliedJob, Candidate, JobApplication } from '../Interface/Canditate/candidate';
import { PostedJob, PostJob } from '../Interface/employerModel';
import { HttpParams } from '@angular/common/http';
import { registerEmployer } from '../Interface/employerModel';
import { JobSearchDTO } from '../Interface/Application/job_search';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private baseUrl = 'http://localhost:8080';

  // private candidateUrl = 'http://localhost:8080/Hireflow/candidate'

  // private employerUrl = 'http://localhost:8080/Hireflow/employer'

  // codespace url
  private baseUrl = 'https://curly-happiness-69gvp65gq79wcr55-8080.app.github.dev';

  private candidateUrl = `${this.baseUrl}/Hireflow/candidate`;

  private employerUrl = `${this.baseUrl}/Hireflow/employer`;


  // private employerNoAuthUrl ='http://localhost:8080/employer'




//=====================demo Varuiable to store candidate data========================
  // private candidateSubject = new BehaviorSubject<Candidate | null>(null);

  // candidate$ = this.candidateSubject.asObservable();

  
  //  private candidateSubject = new BehaviorSubject<Candidate | null>(
  //     JSON.parse(localStorage.getItem('candidate') || 'null')
  //   );

  // candidate$ = this.candidateSubject.asObservable();


  userId: number = 0;

  constructor(private http: HttpClient) { }


  private candidateSubject = new BehaviorSubject<Candidate | null>(this.getCandidateFromStorage());
  candidate$ = this.candidateSubject.asObservable();

  private getCandidateFromStorage(): Candidate | null {

    const data = localStorage.getItem('candidate');

    if (!data) {
      return null;
    }

    try {

      return JSON.parse(data);

    } catch {

      return null;

    }

  }



  
  //================================App Service================================


  getAllJobs(
    pageNo: number = 1,
    pageSize: number = 5,
    sortBy: string = 'jobId',
    sortDir: string = 'ASE'
  ): Observable<any> {

    const filters: JobSearchDTO = {};

    let params = new HttpParams()
      .set('pageNo', pageNo)
      .set('pageSize', pageSize)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.post<any>(
      `${this.baseUrl}/jobsearch`,
      filters,
      { params }
    );

  }


  // getAllJobs(): Observable<Job[]> {
  //       return this.http.get<Job[]>(`${this.baseUrl}/jobsearch`);
  // }

  login(CandidateLog: CandidateLogin): Observable<any> {
    return this.http.post(`${this.baseUrl}/cnd_login`, CandidateLog);
  }

  register(Candidate: CandidateRegistration): Observable<any> {
    return this.http.post(`${this.baseUrl}/cnd_register`, Candidate);
  }

  EmployerRegister(Employer: registerEmployer): Observable<any> {
    return this.http.post(`${this.baseUrl}/emp_register`, Employer);
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


  // Store/update candidate
  // setCandidate(candidate: Candidate): void {
  //   console.log('Setting beherival candidate:', candidate);
  //   this.candidateSubject.next(candidate);

  // }

  // Get current candidate synchronously
  getCandidate(): Candidate | null {

    return this.candidateSubject.value;

  }

  // Clear candidate during logout
  clearCandidate(): void {

    this.candidateSubject.next(null);

  }

  setCandidate(candidate: Candidate) {
    localStorage.setItem('candidate', JSON.stringify(candidate));
    this.candidateSubject.next(candidate);
  }
  // Store/update candidate



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


  //=================================Job Searching wiery=================================


  // searchJobs(filters: {
  //   // keyword?: string;
  //   jobTitle?: string;
  //   jobLocation?: string;
  //   workMode?: string;
  //   experience?: number;
  //   salary?: number;
  //   industryType?: string;
  //   employmentTypes?: string[];
  // }) {

  //   console.log("Filters:", filters);

  //   let params = new HttpParams();

  //   Object.entries(filters).forEach(([key, value]) => {

  //     console.log(key, value);

  //     if (value !== null && value !== undefined && value !== '') {
  //       params = params.set(key, value.toString());
  //     }


  //   });

  //   console.log("Params:", params.toString());

  //   return this.http.get<any>(
  //     `${this.baseUrl}/jobsearch`,
  //     { params }
  //   );
  // }


  // New Search job service start
  //==================Running Job Search service with JobSearchDTO==================
  searchJobs(
    filters: JobSearchDTO,
    pageNo: number = 1,
    pageSize: number = 5,
    sortBy: string = 'jobId',
    sortDir: string = 'ASE'
  ) {

    console.log("Filters:", filters);

    let params = new HttpParams()
      .set('pageNo', pageNo)
      .set('pageSize', pageSize)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    console.log("Request URL Params:", params.toString());
    console.log("Request Body:", filters);

    return this.http.post<any>(
      `${this.baseUrl}/jobsearch`,
      filters,
      { params }
    );

  }


  // New Search job service end


  //==================Running Job Search service with multiple filters and array parameters==================
  // searchJobs(filters: {
  //   jobTitle?: string;
  //   jobLocation?: string;
  //   workMode?: string[];
  //   experience?: number;
  //   salary?: number;
  //   industryType?: string;
  //   employmentTypes?: string[];
  //   categories?: string[];
  // }) {

  //   console.log("Filters:", filters);

  //   let params = new HttpParams();

  //   Object.entries(filters).forEach(([key, value]) => {

  //     console.log(key, value);

  //     // Skip empty values
  //     if (
  //       value === null ||
  //       value === undefined ||
  //       value === '' ||
  //       (Array.isArray(value) && value.length === 0)
  //     ) {
  //       return;
  //     }

  //     // Handle array parameters (employmentTypes)
  //     if (Array.isArray(value)) {

  //       value.forEach(item => {
  //         params = params.append(key, item);
  //       });

  //     } else {

  //       // Handle normal parameters
  //       params = params.set(key, value.toString());

  //     }

  //   });

  //   console.log("Request URL Params:", params.toString());

  //   return this.http.get<any>(
  //     `${this.baseUrl}/jobsearch`,
  //     { params }
  //   );
  // }

  //==================Running Job Search service with multiple filters and array parameters==================



  //=================================Candidate Spacific Request=================================

  getCandidateProfile() {
    // console.log('Loading candidate profile...');
    // console.log(localStorage.getItem('token'));
    return this.http.post<any>(`${this.candidateUrl}/profile`, null);
  }

  uploadResume(file: File, candidateId: number) {
    const formData = new FormData();

    formData.append('file', file);   // key = "file"
    formData.append('candidateId', candidateId.toString());

    return this.http.post(`${this.candidateUrl}/uploadResume/${candidateId}`, formData);
  }

  getResume(resumeId: number): Observable<Blob> {
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
    return this.http.post<any>(`${this.employerUrl}/comapnyHome`, null);
  }


  getPostedJobs(employerId: number): Observable<PostedJob[]> {
    return this.http.get<PostedJob[]>(`${this.employerUrl}/AllPostedJobs/${employerId}`);
    // return this.http.get<PostedJob[]>(`${this.employerNoAuthUrl}/allAppliedJobs/${employerId}`);
  }

  postJob(job: PostJob): Observable<PostJob> {
    return this.http.post<PostJob>(`${this.employerUrl}/postJob`, job);
  }

}


