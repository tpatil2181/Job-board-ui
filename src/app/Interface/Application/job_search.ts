export interface ExperienceFilterDTO {
  minExperience: number;
  maxExperience: number;
}

export interface JobSearchDTO {
  search?:string;
  jobTitle?: string;
  jobLocation?: string;
  employerName?: string;

  workModes?: string[];

  employmentTypes?: string[];

  industryTypes?: string[];

  minSalary?: number;
  maxSalary?: number;

  datePosted?: string;

  experiences?: ExperienceFilterDTO[];
}