import { Component } from '@angular/core';
import { SharedModule } from '../../pages/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service.service';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-setting',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './employer-setting.component.html',
  styleUrl: './employer-setting.component.css'
})
export class EmployerSettingComponent {

  // =====================================================
    // State
    // =====================================================
  
    // settings: EmployerSettings = {
    //   jobAlerts: true,
    //   profileVisible: true
    // };
  
    // passwordForm: ChangePasswordForm = this.emptyPasswordForm();
  
    // savingPassword = false;
  
    deleting = false;
  
  
    // =====================================================
    // Constructor
    // =====================================================
  
    constructor(
      private authService: AuthService,           // replace with your real AuthService type
      private alertService: AlertService,          // replace with your real AlertService type
      private confirmDialogService: ConfirmDialogService,  // replace with your real ConfirmDialogService type
      private router: Router
    ) {}
  
  
    // =====================================================
    // Lifecycle
    // =====================================================
  
    ngOnInit(): void {
  
      // this.loadSettings();
  
    }
  
  
    // =====================================================
    // Load saved preferences
    // =====================================================
  
    // loadSettings(): void {
  
    //   this.authService
    //     .getEmployerSettings()
    //     .subscribe({
  
    //       next: (response: EmployerSettings) => {
  
    //         this.settings = { ...this.settings, ...response };
  
    //       },
  
    //       error: (err: any) => {
  
    //         // Not critical — the page still works with defaults.
    //         console.error('Error loading settings:', err);
  
    //       }
  
    //     });
  
    // }
  
  
    // =====================================================
    // Preferences (saved as soon as a switch is toggled)
    // =====================================================
  
    // onSettingChange(key: keyof EmployerSettings, value: boolean): void {
  
    //   const previous = this.settings[key];
  
    //   this.settings[key] = value;
  
    //   this.authService
    //     .updateEmployerSettings(this.settings)
    //     .subscribe({
  
    //       next: () => {
  
    //         this.alertService.success(
    //           'Preferences updated.'
    //         );
  
    //       },
  
    //       error: (err: any) => {
  
    //         console.error('Error updating settings:', err);
  
    //         // Roll the switch back
    //         this.settings[key] = previous;
  
    //         this.alertService.error(
    //           err?.error?.message ||
    //           'Failed to update preferences.'
    //         );
  
    //       }
  
    //     });
  
    // }
  
  
    // =====================================================
    // Change password
    // =====================================================
  
    // emptyPasswordForm(): ChangePasswordForm {
  
    //   return {
  
    //     currentPassword: '',
  
    //     newPassword: '',
  
    //     confirmPassword: ''
  
    //   };
  
    // }
  
    // get passwordsMismatch(): boolean {
  
    //   return (
    //     !!this.passwordForm.confirmPassword &&
    //     this.passwordForm.confirmPassword !== this.passwordForm.newPassword
    //   );
  
    // }
  
    // changePassword(form: NgForm): void {
  
    //   if (form.invalid || this.passwordsMismatch) {
  
    //     return;
  
    //   }
  
    //   this.savingPassword = true;
  
    //   this.authService
    //     .changePassword({
    //       currentPassword: this.passwordForm.currentPassword,
    //       newPassword: this.passwordForm.newPassword
    //     })
    //     .subscribe({
  
    //       next: () => {
  
    //         this.savingPassword = false;
  
    //         this.passwordForm = this.emptyPasswordForm();
  
    //         form.resetForm(this.passwordForm);
  
    //         this.alertService.success(
    //           'Password updated successfully.'
    //         );
  
    //       },
  
    //       error: (err: any) => {
  
    //         console.error('Error changing password:', err);
  
    //         this.savingPassword = false;
  
    //         this.alertService.error(
    //           err?.error?.message ||
    //           'Failed to update password.'
    //         );
  
    //       }
  
    //     });
  
    // }
  
  
    // =====================================================
    // Delete account
    // =====================================================
  
    deleteAccount(): void {
  
      this.confirmDialogService.confirm({
  
        title: 'Delete my account',
  
        message:
          'Are you sure you want to delete your account? ' +
          'Your profile, resume and job applications will be permanently removed. ' +
          'This can\'t be undone.',
  
        variant: 'danger',
  
        confirmLabel: 'Delete',
  
        cancelLabel: 'Cancel'
  
      }).subscribe((result: boolean) => {
  
        if (!result) {
  
          return;
  
        }
  
        this.deleting = true;
  
        this.authService
          .deleteCandidateAccount(localStorage.getItem('userId') as unknown as number)
          .subscribe({
  
            next: () => {
  
              this.deleting = false;
  
              this.alertService.success(
                'Your account has been deleted.'
              );
  
              // Clear the session and send the user out
              this.authService.logout?.();
  
              this.router.navigate(['/login']);
  
            },
  
            error: (err: any) => {
  
              console.error('Error deleting account:', err);
  
              this.deleting = false;
  
              this.alertService.error(
                err?.error?.message ||
                err?.error ||
                'Failed to delete account.'
              );
  
            }
  
          });
  
      });
  
    }
  

}
