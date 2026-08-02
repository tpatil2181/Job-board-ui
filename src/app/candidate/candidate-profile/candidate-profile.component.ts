import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Candidate } from '../../Interface/Canditate/candidate';
import { SharedModule } from "../../pages/shared.module";
import { EducationFormComponent, EducationEntry } from '../education-form/education-form.component';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { AlertService } from '../../services/alert.service.service';
import { ExperienceEntry, ExperienceFormComponent } from '../experience-form/experience-form.component';
import { CertificationEntry, CertificationFormComponent } from '../certification-form/certification-form.component';
import { ProjectEntry, ProjectFormComponent } from '../project-form/project-form.component';
import { LanguageEntry, LanguageFormComponent } from '../language-form/language-form.component';


export interface TimelineItem {
  icon: string;
  title: string;
  subtitle: string;
  description?: string;
  link?: string;
}

export interface SkillTag {
  label: string;
  variant: 'blue' | 'gray';
}

export interface LanguageItem {
  name: string;
  level: string;
}



@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [CommonModule, SharedModule, EducationFormComponent, ExperienceFormComponent, CertificationFormComponent, ProjectFormComponent, LanguageFormComponent, FormsModule],
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent {
  //============================ My Code And variables============================
  profileImage: any;
  resume: any;


  candidate = this.authService.getLoggedInCandidate();
  candidateemail: string = localStorage.getItem('email') || '';
  usrId: number = localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : 0;

  // candidate: Candidate = {
  //        first_name: '',
  //         last_name:'',
  //         mobNo:'',
  //         email:'',
  //         education:'',
  //          resume: {
  //               id: 0,
  //               filePath: '',
  //               candidateId:0,
  //             },
  //         skills:'', 
  //     };

  ngOnInit() {
    // ✅ get ID from URL
    // const email = this.route.snapshot.paramMap.get('email');

    // console.log('User ID from URL:', email);

    // if (email) {
    //   this.getCandidate(email);
    // }
  }




  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private alertService: AlertService,
    private confirmDialogService: ConfirmDialogService
  ) { }
  //============================ My Code And variables END============================

  // ---- profile summary ----
  name = 'Ananya Kulkarni';
  role = 'Senior Product Designer';
  location = 'Pune, Maharashtra';
  experienceYears = 6;
  openToWork = true;
  profileStrength = 82;
  avatarInitials = 'AK';

  isEditingProfile = false;

  // ---- about ----
  aboutText = `Product designer with 6 years of experience building design systems and
  end-to-end product experiences for fintech and marketplace platforms. Currently leading design
  for checkout and onboarding flows, with a focus on accessibility and conversion impact.`;
  isEditingAbout = false;

  // ---- resume ----
  resumeFileName = 'Ananya_Kulkarni.pdf';
  resumeUpdatedLabel = 'Updated 5 days ago';

  // ---- skills ----
  skills: SkillTag[] = [
    { label: 'UI Design', variant: 'blue' },
    { label: 'Figma', variant: 'blue' },
    { label: 'Design Systems', variant: 'blue' },
    { label: 'User Research', variant: 'gray' },
    { label: 'Prototyping', variant: 'gray' },
    { label: 'HTML/CSS', variant: 'gray' }
  ];

  // ---- experience ----
  experience: TimelineItem[] = [
    {
      icon: 'Z',
      title: 'Senior Product Designer',
      subtitle: 'Zeta Finance · Bengaluru · Mar 2023 — Present'
    },
    {
      icon: 'M',
      title: 'Product Designer',
      subtitle: 'Meesho · Bengaluru · Jul 2020 — Feb 2023'
    },
    {
      icon: 'S',
      title: 'UI/UX Design Intern',
      subtitle: 'Swiggy · Bengaluru · Jan 2020 — Jun 2020'
    }
  ];

  // ---- education ----
  education: TimelineItem[] = [
    {
      icon: '🎓',
      title: 'B.Des, Communication Design',
      subtitle: 'National Institute of Design, Ahmedabad · 2016 — 2020'
    },
    {
      icon: '🎓',
      title: 'Higher Secondary, Science',
      subtitle: 'Fergusson College, Pune · 2014 — 2016'
    }
  ];

  // ---- projects ----
  projects: TimelineItem[] = [
    {
      icon: '📁',
      title: 'Checkout Redesign — Zeta Pay',
      subtitle: '',
      description: 'Redesigned the multi-step checkout flow, reducing cart abandonment by 17%.',
      link: '#'
    },
    {
      icon: '📁',
      title: 'Seller Onboarding — Meesho',
      subtitle: '',
      description: 'Simplified seller KYC and listing flow across web and mobile.',
      link: '#'
    }
  ];

  // ---- certifications ----
  certifications: TimelineItem[] = [
    {
      icon: '🏅',
      title: 'Certified UX Design Professional',
      subtitle: 'Google · via Coursera · 2023'
    },
    {
      icon: '🏅',
      title: 'Design Systems Certification',
      subtitle: 'Interaction Design Foundation · 2021'
    }
  ];

  // ---- languages ----
  languages: LanguageItem[] = [
    { name: 'English', level: 'Professional' },
    { name: 'Hindi', level: 'Native' },
    { name: 'Marathi', level: 'Native' }
  ];

  // ---- toast ----
  toastMessage = '';
  private toastTimer: ReturnType<typeof setTimeout> | null = null;

  showToast(message: string): void {
    this.toastMessage = message;
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => (this.toastMessage = ''), 2200);
  }

  // ---- profile edit ----
  toggleEditProfile(): void {
    if (this.isEditingProfile) {
      this.showToast('Profile updated successfully');
    }
    this.isEditingProfile = !this.isEditingProfile;
  }

  onNameInput(event: Event): void {
    this.name = (event.target as HTMLElement).innerText.trim();
  }

  onRoleInput(event: Event): void {
    this.role = (event.target as HTMLElement).innerText.trim();
  }

  // ---- about edit ----
  toggleEditAbout(): void {
    if (this.isEditingAbout) {
      this.showToast('About section saved');
    }
    this.isEditingAbout = !this.isEditingAbout;
  }

  onAboutInput(event: Event): void {
    this.aboutText = (event.target as HTMLElement).innerText.trim();
  }

  // ---- resume ----

  selectedFile!: File;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateResume(): void {
    // this.selectedFile = event.target.files[0];
    if (!this.selectedFile) {
      alert('Please select a file');
      // this.authService.getCandidate(this.candidate.email).subscribe(res => {
      // localStorage.setItem('candidate', JSON.stringify(res)); // update storage
      // });



      // this.authService.getLoggedInCandidate().subscribe(res => {
      // localStorage.setItem('candidate', JSON.stringify(res)); // update storage
      // });
      return;
    }

    this.authService.uploadResume(this.selectedFile, this.usrId).subscribe({
      next: (res) => {
        console.log(res);
        alert('Resume uploaded successfully ✅');
      },
      error: (err) => {
        console.error(err);

        if (err.error && err.error.message) {
          alert(err.error.message);
        } else {
          // alert('Something went wrong ❌');
          alert('Upload failed ❌');
        }

      }
    });
    //   }
    // this.resumeUpdatedLabel = 'Updated just now';
    // this.showToast('Resume updated successfully');
  }

  viewResume(): void {
    const resumeId = this.candidate.resumeId;
    console.error("Resume id is " + this.candidate.first_name);
    // ✅ MUST check
    if (!resumeId) {
      console.error('Resume ID is missing ❌');
      alert('Resume not available');
      return;
    }
    this.authService.getResume(resumeId).subscribe({
      next: (res: Blob) => {
        const fileURL = window.URL.createObjectURL(res);
        window.open(fileURL); // ✅ opens PDF
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load resume ❌');
      }
    });
  }

  uploadPhoto(): void {
    this.showToast('Upload a new photo');
  }

  // ---- skills ----
  removeSkill(skill: SkillTag): void {
    this.skills = this.skills.filter(s => s !== skill);
    this.showToast(`Removed "${skill.label}"`);
  }

  addSkill(): void {
    this.showToast('Skill added');
  }

  // ---- generic list section handlers ----
  addItem(section: string): void {
    this.showToast(`New ${section} entry added`);
  }

  editItem(section: string): void {
    this.showToast(`Editing ${section} entry`);
  }

  removeItem(list: TimelineItem[], item: TimelineItem, section: string): void {
    const index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
    }
    this.showToast(`${section} entry removed`);
  }

  addLanguage(): void {
    this.showToast('Language added');
  }



  // Backend API Calls
  // getCandidate(email: string) {
  //   this.authService.getCandidateProfile(email).subscribe({
  //     next: (res) => {
  //       this.candidate = res;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     }
  //   });
  // }























  //====================================================Eduaction Releted Code====================================================
  showEduForm = false;
  selectedEducation: EducationEntry | null = null;

  // 4) Open modal in "Add" mode
  openAddEducation(): void {
    this.selectedEducation = null;
    this.showEduForm = true;
  }

  // 5) Open modal in "Edit" mode — maps your existing TimelineItem (icon/title/subtitle)
  //    into the richer EducationEntry shape the form expects.
  openEditEducation(edu: TimelineItem): void {
    const parsed = this.parseEduSubtitle(edu.subtitle);
    this.selectedEducation = {
      id: (edu as any).id, // add an `id` field to TimelineItem if you don't have one yet
      school: parsed.school,
      degree: this.extractDegree(edu.title),
      fieldOfStudy: this.extractFieldOfStudy(edu.title),
      startMonth: '',
      startYear: parsed.startYear,
      endMonth: '',
      endYear: parsed.endYear,
      currentlyStudying: parsed.endYear.toLowerCase() === 'present',
      grade: '',
      description: ''
    };
    this.showEduForm = true;
  }

  // 6) Handle the form's (save) event — converts the EducationEntry back
  //    into your TimelineItem shape and pushes/updates the education array.
  onEducationSaved(entry: EducationEntry): void {
    const subtitle = `${entry.school} · ${entry.startYear} — ${entry.currentlyStudying ? 'Present' : entry.endYear}`;
    const title = entry.fieldOfStudy ? `${entry.degree}, ${entry.fieldOfStudy}` : entry.degree;

    const existingIndex = this.education.findIndex((e: any) => e.id === entry.id);

    if (existingIndex > -1) {
      this.education[existingIndex] = { ...this.education[existingIndex], title, subtitle };
    } else {
      this.education.push({
        icon: '🎓',
        title,
        subtitle,
        id: Date.now() // simple unique id for future edits
      } as TimelineItem);
    }

    this.showEduForm = false;
    this.showToast(existingIndex > -1 ? 'Education updated' : 'Education added');
  }


  removeEducation(applicationId: number): void {

    this.confirmDialogService.confirm({

      title: 'Delete Education',

      message: 'Are you sure you want to delete this education!',

      variant: 'danger',

      confirmLabel: 'Delete',

      cancelLabel: 'Cancel'

    }).subscribe(result => {

      if (!result) {
        return;
      }

      // this.authService.withdrawJobApplication(applicationId).subscribe({

      //   next: (response) => {

      //     this.alertService.success(
      //       'Application withdrawn successfully.'
      //     );

      //     // Remove the withdrawn application from the list
      //     this.appliedJobs = this.appliedJobs.filter(
      //       job => job.applyid !== applicationId
      //     );

      //     console.log(response);

      //   },

      //   error: (err) => {

      //     console.error(err);

      //     if (err.error) {

      //       this.alertService.error(err.error);

      //     } else {

      //       this.alertService.error(
      //         'Failed to withdraw application.'
      //       );

      //     }

      //   }

      // });

    });

  }

  // ---- small helpers used only to bridge TimelineItem <-> EducationEntry ----
  private extractDegree(title: string): string {
    return title.split(',')[0]?.trim() ?? title;
  }

  private extractFieldOfStudy(title: string): string {
    const parts = title.split(',');
    return parts.length > 1 ? parts[1].trim() : '';
  }

  private parseEduSubtitle(subtitle: string): { school: string; startYear: string; endYear: string } {
    const [school, range] = subtitle.split('·').map(s => s.trim());
    const [startYear, endYear] = (range ?? '').split('—').map(s => s.trim());
    return { school: school ?? '', startYear: startYear ?? '', endYear: endYear ?? '' };
  }









  //====================================================Experience Related Code====================================================

  // ... your existing fields (name, role, skills, education, etc.) stay unchanged ...

  // 3) New state for the Experience modal
  showExpForm = false;
  selectedExperience: ExperienceEntry | null = null;

  // 4) Open modal in "Add" mode
  openAddExperience(): void {
    this.selectedExperience = null;
    this.showExpForm = true;
  }

  // 5) Open modal in "Edit" mode — maps your existing TimelineItem (icon/title/subtitle)
  //    into the richer ExperienceEntry shape the form expects.
  openEditExperience(exp: TimelineItem): void {
    const parsed = this.parseExpSubtitle(exp.subtitle);
    this.selectedExperience = {
      id: (exp as any).id, // add an `id` field to TimelineItem if you don't have one yet
      title: exp.title,
      company: parsed.company,
      location: parsed.location,
      workMode: parsed.workMode,
      startMonth: parsed.startMonth,
      startYear: parsed.startYear,
      endMonth: parsed.endMonth,
      endYear: parsed.endYear,
      currentlyWorking: parsed.endYear.toLowerCase() === 'present',
      description: ''
    };
    this.showExpForm = true;
  }

  // 6) Handle the form's (save) event — converts the ExperienceEntry back
  //    into your TimelineItem shape and pushes/updates the experience array.
  onExperienceSaved(entry: ExperienceEntry): void {
    const datePart = `${entry.startMonth} ${entry.startYear} — ${entry.currentlyWorking ? 'Present' : entry.endMonth + ' ' + entry.endYear}`;
    const parts = [entry.company, entry.location, entry.workMode, datePart].filter(p => p && p.trim().length);
    const subtitle = parts.join(' · ');

    const existingIndex = this.experience.findIndex((e: any) => e.id === entry.id);

    if (existingIndex > -1) {
      this.experience[existingIndex] = { ...this.experience[existingIndex], title: entry.title, subtitle };
    } else {
      this.experience.unshift({
        icon: entry.company.charAt(0).toUpperCase(),
        title: entry.title,
        subtitle,
        id: Date.now() // simple unique id for future edits
      } as TimelineItem);
    }

    this.showExpForm = false;
    this.showToast(existingIndex > -1 ? 'Experience updated' : 'Experience added');
  }

  // ---- helper used only to bridge TimelineItem <-> ExperienceEntry when editing ----
  private parseExpSubtitle(subtitle: string): {
    company: string; location: string; workMode: string;
    startMonth: string; startYear: string; endMonth: string; endYear: string;
  } {
    // Expected shape: "Company · Location · [WorkMode ·] Month Year — Month Year"
    const segments = subtitle.split('·').map(s => s.trim());
    const datePart = segments[segments.length - 1] ?? '';
    const [startRaw, endRaw] = datePart.split('—').map(s => s.trim());

    const [startMonth, startYear] = (startRaw ?? '').split(' ');
    const [endMonth, endYear] = (endRaw ?? '').split(' ');

    return {
      company: segments[0] ?? '',
      location: segments[1] ?? '',
      workMode: segments.length > 3 ? segments[2] : '',
      startMonth: startMonth ?? '',
      startYear: startYear ?? '',
      endMonth: endRaw === 'Present' ? '' : (endMonth ?? ''),
      endYear: endRaw === 'Present' ? 'Present' : (endYear ?? '')
    };
  }

  removeExperience(applicationId: number): void {

    this.confirmDialogService.confirm({

      title: 'Delete Experience',

      message: 'Are you sure you want to delete this experience!',

      variant: 'danger',

      confirmLabel: 'Delete',

      cancelLabel: 'Cancel'

    }).subscribe(result => {

      if (!result) {
        return;
      }

      // this.authService.withdrawJobApplication(applicationId).subscribe({

      //   next: (response) => {

      //     this.alertService.success(
      //       'Application withdrawn successfully.'
      //     );

      //     // Remove the withdrawn application from the list
      //     this.appliedJobs = this.appliedJobs.filter(
      //       job => job.applyid !== applicationId
      //     );

      //     console.log(response);

      //   },

      //   error: (err) => {

      //     console.error(err);

      //     if (err.error) {

      //       this.alertService.error(err.error);

      //     } else {

      //       this.alertService.error(
      //         'Failed to withdraw application.'
      //       );

      //     }

      //   }

      // });

    });

  }





















  //====================================================Certifications Related Code====================================================

  // ... your existing fields stay unchanged ...

  // 3) New state for the Certification modal
  showCertForm = false;
  selectedCertification: CertificationEntry | null = null;

  // 4) Open modal in "Add" mode
  openAddCertification(): void {
    this.selectedCertification = null;
    this.showCertForm = true;
  }

  // 5) Open modal in "Edit" mode — maps your existing TimelineItem (icon/title/subtitle)
  //    into the richer CertificationEntry shape the form expects.
  openEditCertification(cert: TimelineItem): void {
    const parsed = this.parseCertSubtitle(cert.subtitle);
    this.selectedCertification = {
      id: (cert as any).id, // add an `id` field to TimelineItem if you don't have one yet
      name: cert.title,
      issuingOrg: parsed.issuingOrg,
      issueMonth: '',
      issueYear: parsed.issueYear,
      hasExpiry: false,
      expiryMonth: '',
      expiryYear: '',
      credentialId: '',
      credentialUrl: ''
    };
    this.showCertForm = true;
  }

  // 6) Handle the form's (save) event — converts the CertificationEntry back
  //    into your TimelineItem shape and pushes/updates the certifications array.
  onCertificationSaved(entry: CertificationEntry): void {
    const issueDate = [entry.issueMonth, entry.issueYear].filter(Boolean).join(' ');
    const expiryDate = entry.hasExpiry
      ? ` · Expires ${[entry.expiryMonth, entry.expiryYear].filter(Boolean).join(' ')}`
      : '';
    const subtitle = `${entry.issuingOrg} · ${issueDate}${expiryDate}`;

    const existingIndex = this.certifications.findIndex((c: any) => c.id === entry.id);

    if (existingIndex > -1) {
      this.certifications[existingIndex] = { ...this.certifications[existingIndex], title: entry.name, subtitle };
    } else {
      this.certifications.unshift({
        icon: '🏅',
        title: entry.name,
        subtitle,
        id: Date.now() // simple unique id for future edits
      } as TimelineItem);
    }

    this.showCertForm = false;
    this.showToast(existingIndex > -1 ? 'Certification updated' : 'Certification added');
  }

  // ---- helper used only to bridge TimelineItem <-> CertificationEntry when editing ----
  private parseCertSubtitle(subtitle: string): { issuingOrg: string; issueYear: string } {
    // Expected shape: "Issuing Org · 2023" (optionally " · Expires Month Year")
    const [org, rest] = subtitle.split('·').map(s => s.trim());
    const issueYear = (rest ?? '').split(' ').pop() ?? '';
    return { issuingOrg: org ?? '', issueYear };
  }

  removeCertification(applicationId: number): void {

    this.confirmDialogService.confirm({

      title: 'Delete Certification',

      message: 'Are you sure you want to delete this certification!',

      variant: 'danger',

      confirmLabel: 'Delete',

      cancelLabel: 'Cancel'

    }).subscribe(result => {

      if (!result) {
        return;
      }

      // this.authService.withdrawJobApplication(applicationId).subscribe({

      //   next: (response) => {

      //     this.alertService.success(
      //       'Application withdrawn successfully.'
      //     );

      //     // Remove the withdrawn application from the list
      //     this.appliedJobs = this.appliedJobs.filter(
      //       job => job.applyid !== applicationId
      //     );

      //     console.log(response);

      //   },

      //   error: (err) => {

      //     console.error(err);

      //     if (err.error) {

      //       this.alertService.error(err.error);

      //     } else {

      //       this.alertService.error(
      //         'Failed to withdraw application.'
      //       );

      //     }

      //   }

      // });

    });

  }

  //====================================================Project Related Code====================================================



  // ... your existing fields stay unchanged ...

  // 3) New state for the Project modal
  showProjectForm = false;
  selectedProject: ProjectEntry | null = null;

  // 4) Open modal in "Add" mode
  openAddProject(): void {
    this.selectedProject = null;
    this.showProjectForm = true;
  }

  // 5) Open modal in "Edit" mode — maps your existing TimelineItem (icon/title/description/link)
  //    into the richer ProjectEntry shape the form expects.
  openEditProject(proj: TimelineItem): void {
    this.selectedProject = {
      id: (proj as any).id, // add an `id` field to TimelineItem if you don't have one yet
      title: proj.title,
      role: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      ongoing: false,
      description: proj.description ?? '',
      projectUrl: proj.link ?? ''
    };
    this.showProjectForm = true;
  }

  // 6) Handle the form's (save) event — converts the ProjectEntry back
  //    into your TimelineItem shape and pushes/updates the projects array.
  onProjectSaved(entry: ProjectEntry): void {
    const existingIndex = this.projects.findIndex((p: any) => p.id === entry.id);

    const updated: TimelineItem = {
      icon: '📁',
      title: entry.title,
      subtitle: '',
      description: entry.description,
      link: entry.projectUrl || undefined
    };

    if (existingIndex > -1) {
      this.projects[existingIndex] = { ...this.projects[existingIndex], ...updated };
    } else {
      this.projects.unshift({ ...updated, id: Date.now() } as TimelineItem); // simple unique id
    }

    this.showProjectForm = false;
    this.showToast(existingIndex > -1 ? 'Project updated' : 'Project added');
  }

  removeProject(applicationId: number): void {

    this.confirmDialogService.confirm({

      title: 'Delete Project',

      message: 'Are you sure you want to delete this project!',

      variant: 'danger',

      confirmLabel: 'Delete',

      cancelLabel: 'Cancel'

    }).subscribe(result => {

      if (!result) {
        return;
      }

      // this.authService.withdrawJobApplication(applicationId).subscribe({

      //   next: (response) => {

      //     this.alertService.success(
      //       'Application withdrawn successfully.'
      //     );

      //     // Remove the withdrawn application from the list
      //     this.appliedJobs = this.appliedJobs.filter(
      //       job => job.applyid !== applicationId
      //     );

      //     console.log(response);

      //   },

      //   error: (err) => {

      //     console.error(err);

      //     if (err.error) {

      //       this.alertService.error(err.error);

      //     } else {

      //       this.alertService.error(
      //         'Failed to withdraw application.'
      //       );

      //     }

      //   }

      // });

    });

  }





  //====================================================Language Related Code====================================================

  // ... your existing fields (languages: LanguageItem[]) stay unchanged ...

  // 3) New state for the Language modal
  showLangForm = false;
  selectedLanguage: LanguageEntry | null = null;

  // 4) Open modal in "Add" mode
  openAddLanguage(): void {
    this.selectedLanguage = null;
    this.showLangForm = true;
  }

  // 5) Open modal in "Edit" mode — LanguageItem { name, level } maps almost
  //    directly onto LanguageEntry { name, level }, no parsing needed.
  openEditLanguage(lang: LanguageItem): void {
    this.selectedLanguage = {
      id: (lang as any).id, // add an `id` field to LanguageItem if you don't have one yet
      name: lang.name,
      level: lang.level as LanguageEntry['level']
    };
    this.showLangForm = true;
  }

  // 6) Handle the form's (save) event — updates or adds to the languages array.
  onLanguageSaved(entry: LanguageEntry): void {
    const existingIndex = this.languages.findIndex((l: any) => l.id === entry.id);

    if (existingIndex > -1) {
      this.languages[existingIndex] = { ...this.languages[existingIndex], name: entry.name, level: entry.level };
    } else {
      this.languages.push({ name: entry.name, level: entry.level, id: Date.now() } as LanguageItem);
    }

    this.showLangForm = false;
    this.showToast(existingIndex > -1 ? 'Language updated' : 'Language added');
  }

  // 7) Simple remove handler (Languages didn't use the generic removeItem() helper
  //    since lang-list isn't a TimelineItem[] array)
  removeLanguage(lang: LanguageItem): void {
    this.languages = this.languages.filter((l: any) => l !== lang);
    this.showToast('Language removed');
  }




}
