// export interfacee employer {

// }
export interface employer {}

export interface registerEmployer {
    employerName:string;
    website:string;
    email:string;
    password:string;
    contact:number;
}

export interface PostedJob {
  jobId: number;
  jobTitle: string;
  datePosted: string;
  status: string;
}

export interface ChangeJobStatus{
    jobId:number;
    status:string;
}