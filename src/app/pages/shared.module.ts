// app/shared/shared.module.ts

import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';


import { HeaderComponent } from '../pages/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    RouterModule,   // re-export so any module using SharedModule gets routerLink too
  ]
})
export class SharedModule {}

/*
 * ── REGISTER in app.module.ts ───────────────────────────
 *
 *   import { SharedModule } from './shared/shared.module';
 *
 *   @NgModule({
 *     imports: [
 *       BrowserModule,
 *       RouterModule.forRoot(routes),
 *       SharedModule,
 *     ]
 *   })
 *   export class AppModule {}
 *
 *
 * ── USE in any page template ────────────────────────────
 *
 *  1. Home page (hero + stats both visible):
 *     <app-header></app-header>
 *
 *  2. Jobs page (no hero, no stats):
 *     <app-header [showHero]="false" [showStats]="false"></app-header>
 *
 *  3. Logged in as candidate:
 *     <app-header
 *       [isLoggedIn]="true"
 *       userName="Rahul"
 *       userRole="candidate">
 *     </app-header>
 *
 *  4. Custom hero text (e.g. employer page):
 *     <app-header
 *       heroTitle="Find Top Talent"
 *       heroSubtitle="Post a job and reach thousands of candidates."
 *       [popularTags]="[]"
 *       [showStats]="false">
 *     </app-header>
 *
 *  5. Listen to search event in parent:
 *     <app-header (searched)="onSearch($event)"></app-header>
 *
 *     onSearch(event: SearchEvent) {
 *       console.log(event.query, event.location);
 *     }
 */