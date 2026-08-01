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

export interface PostJob {
  jobTitle: string
  employerId: number
  workMode: string
  jobLocation: string
  minExperience: number
  maxExperience: number
  minSalary: number
  maxSalary: number
  noOfOpenings: number
  jobDescription: string
  role: string
  employmentType: string
  industryType: string
  educations: string
  status: string
  datePosted: string
}