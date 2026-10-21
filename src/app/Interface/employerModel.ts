// export interfacee employer {

// }
export interface Employer {
	  employeerId:number;
    employeerName:string;
    empEmail:string;
    website:string;
    contact:number;
}

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
  salary: string;
  minExperience: number;
  maxExperience: number;
  workMode: string;
  jobLocation: string;
  noOfApplicants: number;
}


export interface ApplicantWiseJob {
  jobId: number;
  jobTitle: string;
  companyName: string;
  jobLocation: string;
  workMode: string;
  maxSalary: string;
  totalApplicants: number;
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
  noOfApplicants:number
}


export interface EmployerChangePassword {
  currentPass: string;
  newPass: string;
}


export interface ChangeCandidateStatus{
    applyid:number;
    status:string;
}