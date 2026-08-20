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
  languages: language[];
  projects:Project[];
  skills: Skill[];

  resumeId: number | null;
  imageId: number | null;

  isActive: boolean;
  createdDate: string;
}

// export interface Education {
//   educationId: number;

//   instituteName: string;
//   degree: string;
//   fieldOfStudy: string;

//   startDate: string;
//   endDate: string | null;

//   grade?: string;
//   description?: string;

//   candidateId: number;
// }

export interface Education {
  educationId?: number;
  degree: string;
  college: string;
  fieldOfStudy :string;
  smonth: string;
  syear: number;
  emonth: string | null;
  eyear: number | null;
  isCurrentlystudying: boolean;
  // startYear: string;
  // endYear: string;
  percentage: number;
  candidateId?: number;
}

export interface Experience {
  candExpId?: number;
  candidateId?: number;
  companyName: string;
  jobTitle: string;
  location: string;
  workMode: string;
  smonth: string;
  syear: number;
  // emonth?: string;
  // eyear?: number;

  emonth: string | null;
  eyear: number | null;
  // joiningDate: Date;
  // endingDate: Date;
  isCurrentCompanny: boolean;
  aboutJobProfile: string;
}


// export interface Experience {
//   experienceId: number;

//   companyName: string;
//   jobTitle: string;
//   employmentType: string;

//   startDate: string;
//   endDate: string | null;

//   currentlyWorking: boolean;

//   location?: string;
//   description?: string;

//   candidateId: number;
// }

export interface Certification {
  certificationId?: number;
  certificateName: string;
  issueingOrganization: string;
  smonth: string;
  syear: number;
  emonth: string | null;
  eyear: number | null;
  certiid?: number;
  certiurl?: string;
  candidateId?: number;
}

export interface Project {
  projectId?: number;
  projectTitle: string;
  role: string;
  // FieldOfStudy: string;
  smonth: string;
  syear: number;
  emonth: string | null;
  eyear: number | null;
  isOngoing: boolean;
  discription: string;
  casestudyurl: string;
  candidateId?: number;
}

// export interface Certification {
//   certificationId: number;

//   certificationName: string;
//   issuingOrganization: string;

//   issueDate: string;
//   expiryDate?: string | null;

//   credentialId?: string;
//   credentialUrl?: string;

//   candidateId: number;
// }



export interface language {
  langId?: number;
  language: string;
  proficiency: string;
  candidateId: number;
}

// export enum Months {
//   JANUARY = 'JANUARY',
//   FEBRUARY = 'FEBRUARY',
//   MARCH = 'MARCH',
//   APRIL = 'APRIL',
//   MAY = 'MAY',
//   JUNE = 'JUNE',
//   JULY = 'JULY',
//   AUGUST = 'AUGUST',
//   SEPTEMBER = 'SEPTEMBER',
//   OCTOBER = 'OCTOBER',
//   NOVEMBER = 'NOVEMBER',
//   DECEMBER = 'DECEMBER'
// }


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
  dateApplied:string;
  WorkMode: string;
  status: string;
}