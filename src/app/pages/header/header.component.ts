import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface StatItem {
  value:   number;
  suffix:  string;
  label:   string;
  display: string;
}

export interface SearchEvent {
  query:    string;
  location: string;
}

@Component({
  selector: 'app-header',
    templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  // ── NAVBAR inputs ──────────────────────────────────────
  /** Pass true once user logs in */
  @Input() isLoggedIn: boolean = false;

  /** Display name shown in navbar e.g. "Hi, Rahul" */
  @Input() userName: string = '';

  /** Controls which dashboard link to show */
  @Input() userRole: 'candidate' | 'employer' | '' = '';

  // ── HERO inputs ────────────────────────────────────────
  /** Set false to hide the hero section (e.g. on inner pages) */
  @Input() showHero: boolean = true;

  @Input() heroTitle: string = 'Find Your Next Job';

  @Input() heroSubtitle: string =
    'Search thousands of jobs from top companies across India and worldwide.';

  @Input() popularTags: string[] = [
    'Software Engineer',
    'Product Manager',
    'Data Analyst',
    'UI/UX Designer',
    'Remote Jobs',
  ];

  // ── STATS inputs ───────────────────────────────────────
  /** Set false to hide the stats bar */
  @Input() showStats: boolean = true;

  @Input() stats: StatItem[] = [
    { value: 48000, suffix: '+', label: 'Active Jobs',       display: '0' },
    { value: 12000, suffix: '+', label: 'Companies Hiring',  display: '0' },
    { value: 95000, suffix: '+', label: 'Candidates Placed', display: '0' },
    { value: 50,    suffix: '+', label: 'Cities Covered',    display: '0' },
  ];

  // ── Output ─────────────────────────────────────────────
  /** Emits search query to parent if parent wants to handle it */
  @Output() searched = new EventEmitter<SearchEvent>();

  // ── Internal state ─────────────────────────────────────
  searchQuery   = '';
  locationQuery = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.showStats) {
      setTimeout(() => this.animateStats(), 300);
    }
  }

  // ── Computed ───────────────────────────────────────────
  get dashboardRoute(): string {
    return this.userRole === 'employer'
      ? '/employer/dashboard'
      : '/candidate/dashboard';
  }

  // ── Navbar methods ─────────────────────────────────────
  onLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['/']);
  }

  // ── Hero methods ───────────────────────────────────────
  onSearch(): void {
    const payload: SearchEvent = {
      query:    this.searchQuery.trim(),
      location: this.locationQuery.trim(),
    };
    this.searched.emit(payload);
    this.router.navigate(['/jobs'], {
      queryParams: {
        q:        payload.query    || null,
        location: payload.location || null,
      }
    });
  }

  onTagClick(tag: string, event: Event): void {
    event.preventDefault();
    this.searchQuery = tag;
    this.onSearch();
  }

  // ── Stats animation ────────────────────────────────────
  private animateStats(): void {
    this.stats.forEach(stat => {
      const duration  = 1500;
      const steps     = 60;
      const interval  = duration / steps;
      const increment = stat.value / steps;
      let current = 0;
      let step    = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(current + increment, stat.value);
        stat.display = Math.floor(current).toLocaleString('en-IN') + stat.suffix;
        if (step >= steps) {
          stat.display = stat.value.toLocaleString('en-IN') + stat.suffix;
          clearInterval(timer);
        }
      }, interval);
    });
  }
}