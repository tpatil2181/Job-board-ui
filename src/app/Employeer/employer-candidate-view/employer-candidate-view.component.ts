// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-employer-candidate-view',
//   standalone: true,
//   imports: [],
//   templateUrl: './employer-candidate-view.component.html',
//   styleUrl: './employer-candidate-view.component.css'
// })
// export class EmployerCandidateViewComponent {
// 
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

export interface RecruiterNote {
  author: string;
  timestamp: string;
  text: string;
}

export type PipelineStage = 'Applied' | 'In Review' | 'Interview' | 'Offer';

@Component({
  selector: 'app-employer-candidate-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employer-candidate-view.component.html',
  styleUrls: ['./employer-candidate-view.component.css']
})
export class EmployerCandidateViewComponent {

  // ---- candidate summary (read-only for employer) ----
  name = 'Ananya Kulkarni';
  role = 'Senior Product Designer';
  location = 'Pune, Maharashtra';
  experienceYears = 6;
  openToWork = true;
  avatarInitials = 'AK';
  matchScore = 92;

  // ---- application context (employer-specific) ----
  appliedForRole = 'Senior Product Designer';
  appliedCompany = 'Your Company';
  appliedDate = 'Applied 3 days ago';
  pipelineStages: PipelineStage[] = ['Applied', 'In Review', 'Interview', 'Offer'];
  currentStage: PipelineStage = 'Interview';

  isShortlisted = false;

  // ---- contact (revealed to employer only) ----
  email = 'ananya.k@email.com';
  phone = '+91 98765 43210';
  contactRevealed = false;

  // ---- about (read-only) ----
  aboutText = `Product designer with 6 years of experience building design systems and
  end-to-end product experiences for fintech and marketplace platforms. Currently leading design
  for checkout and onboarding flows, with a focus on accessibility and conversion impact.`;

  // ---- resume ----
  resumeFileName = 'Ananya_Kulkarni.pdf';
  resumeUpdatedLabel = 'Updated 5 days ago';

  // ---- skills (read-only) ----
  skills: SkillTag[] = [
    { label: 'UI Design', variant: 'blue' },
    { label: 'Figma', variant: 'blue' },
    { label: 'Design Systems', variant: 'blue' },
    { label: 'User Research', variant: 'gray' },
    { label: 'Prototyping', variant: 'gray' },
    { label: 'HTML/CSS', variant: 'gray' }
  ];

  // ---- experience (read-only) ----
  experience: TimelineItem[] = [
    { icon: 'Z', title: 'Senior Product Designer', subtitle: 'Zeta Finance · Bengaluru · Mar 2023 — Present' },
    { icon: 'M', title: 'Product Designer', subtitle: 'Meesho · Bengaluru · Jul 2020 — Feb 2023' },
    { icon: 'S', title: 'UI/UX Design Intern', subtitle: 'Swiggy · Bengaluru · Jan 2020 — Jun 2020' }
  ];

  // ---- education (read-only) ----
  education: TimelineItem[] = [
    { icon: '🎓', title: 'B.Des, Communication Design', subtitle: 'National Institute of Design, Ahmedabad · 2016 — 2020' },
    { icon: '🎓', title: 'Higher Secondary, Science', subtitle: 'Fergusson College, Pune · 2014 — 2016' }
  ];

  // ---- projects (read-only) ----
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

  // ---- certifications (read-only) ----
  certifications: TimelineItem[] = [
    { icon: '🏅', title: 'Certified UX Design Professional', subtitle: 'Google · via Coursera · 2023' },
    { icon: '🏅', title: 'Design Systems Certification', subtitle: 'Interaction Design Foundation · 2021' }
  ];

  // ---- languages (read-only) ----
  languages: LanguageItem[] = [
    { name: 'English', level: 'Professional' },
    { name: 'Hindi', level: 'Native' },
    { name: 'Marathi', level: 'Native' }
  ];

  // ---- recruiter notes (employer-only, private to their org) ----
  notes: RecruiterNote[] = [
    { author: 'Rohan Mehta', timestamp: '2 days ago', text: 'Strong portfolio, great fit for the checkout redesign project.' }
  ];
  newNote = '';

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

  // ---- employer actions ----
  toggleShortlist(): void {
    this.isShortlisted = !this.isShortlisted;
    this.showToast(this.isShortlisted ? 'Candidate shortlisted' : 'Removed from shortlist');
  }

  messageCandidate(): void {
    this.showToast('Opening message thread');
  }

  scheduleInterview(): void {
    this.showToast('Opening interview scheduler');
  }

  rejectCandidate(): void {
    this.showToast('Candidate marked as rejected');
  }

  downloadResume(): void {
    this.showToast('Downloading resume');
  }

  revealContact(): void {
    this.contactRevealed = true;
    this.showToast('Contact details revealed');
  }

  addNote(): void {
    const text = this.newNote.trim();
    if (!text) {
      return;
    }
    this.notes.unshift({ author: 'You', timestamp: 'Just now', text });
    this.newNote = '';
    this.showToast('Note added');
  }

  stageIndex(stage: PipelineStage): number {
    return this.pipelineStages.indexOf(stage);
  }

  isStageComplete(stage: PipelineStage): boolean {
    return this.stageIndex(stage) <= this.stageIndex(this.currentStage);
  }
}