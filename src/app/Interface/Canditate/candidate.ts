// export interface Candidate {

//   first_name: string;
//   last_name:string;
//   mobNo:string;
//   email:string;
//   education:string;
//   resumeId: number;
//   skills:string;  
// }

export interface Candidate {
  candidateId: number;
  firstName: string;
  lastName: string;
  candidateTitle: string | null;
  candidateAbout: string | null;
  mobNo: string;

  educations: Education[];
  experiences: Experience[];
  certifications: Certification[];
  skills: Skill[];

  resumeId: number | null;
  imageId: number | null;

  isActive: boolean;
  createdDate: string;
}

export interface Education {
  educationId: number;

  instituteName: string;
  degree: string;
  fieldOfStudy: string;

  startDate: string;
  endDate: string | null;

  grade?: string;
  description?: string;

  candidateId: number;
}

export interface Experience {
  experienceId: number;

  companyName: string;
  jobTitle: string;
  employmentType: string;

  startDate: string;
  endDate: string | null;

  currentlyWorking: boolean;

  location?: string;
  description?: string;

  candidateId: number;
}

export interface Certification {
  certificationId: number;

  certificationName: string;
  issuingOrganization: string;

  issueDate: string;
  expiryDate?: string | null;

  credentialId?: string;
  credentialUrl?: string;

  candidateId: number;
}


export interface Skill {
  skillId: number;

  skillName: string;
  skillLevel?: string;

  candidateId: number;
}

export interface Resume {
  id: number;
  filePath: string;
  candidateId: number;
}


export interface JobApplication {
  jobId: number;
  candidateId: number;
  employeerId: number;
  
  // applicationDate: string;
  // status: string;
  // id: number;
  // filePath: string;
  // candidateId: number;
}


export interface AppliedJob {
  applyid: number;
  // candidateId: number;
  JobTitle: string;
  Comapny: string;
  WorkMode: string;
  Status: string;
  // filePath: string;

}