// export interfacee employer {

// }
export interface employer {}


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