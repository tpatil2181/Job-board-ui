export interface CandidateRegistration {
  firstName: string;
  lastName: string;
  mobNo: string;
  email: string;
  password: string;
}


export interface CandidateLogin {
  email: string;
  password: string;
}



export interface Job {
  jobId: number;
  jobTitle: string;
  jobDescription: string;
  role: string;

  employerId: number;
  employerName: string | null;

  jobLocation: string;
  workMode: string;
  employmentType: string;
  industryType: string;

  minExperience: number;
  maxExperience: number;

  minSalary: number;
  maxSalary: number;

  noOfOpenings: number;
  educations: string;

  status: string;
  datePosted: string;
}

export interface Company {
  name: string;
  logo: string;
  color: string;
  jobs: number;
}

export interface Filters {
  types: string[];
  modes: string[];
  exps: string[];
  cats: string[];
  location: string;
  query: string;
}