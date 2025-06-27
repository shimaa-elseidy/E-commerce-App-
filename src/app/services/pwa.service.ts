import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  constructor(
    private swUpdate: SwUpdate,
    private toastr: ToastrService
  ) {
    if (swUpdate.isEnabled) {
      this.checkForUpdates();
    }
  }

  private checkForUpdates() {
    this.swUpdate.versionUpdates.subscribe(event => {
      if (event.type === 'VERSION_READY') {
        this.toastr.info('New version available! Click to update.', 'Update Available', {
          timeOut: 0,
          extendedTimeOut: 0,
          closeButton: true,
          tapToDismiss: false
        }).onTap.subscribe(() => {
          this.updateApp();
        });
      }
    });
  }

  private updateApp() {
    this.swUpdate.activateUpdate().then(() => {
      window.location.reload();
    });
  }

  installPrompt: any;

  initPwaPrompt() {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.installPrompt = event;
        this.showInstallBanner();
      });
    }
  }

  private showInstallBanner() {
    this.toastr.info('Install FreshCart app for better experience!', 'Install App', {
      timeOut: 8000,
      closeButton: true
    }).onTap.subscribe(() => {
      this.installApp();
    });
  }

  installApp() {
    if (this.installPrompt) {
      this.installPrompt.prompt();
      this.installPrompt.userChoice.then((result: any) => {
        if (result.outcome === 'accepted') {
          this.toastr.success('App installed successfully!', 'Success');
        }
        this.installPrompt = null;
      });
    }
  }
}