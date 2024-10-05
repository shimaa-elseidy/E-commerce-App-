import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MytranslationService {
  private _TranslateService = inject(TranslateService);
  private _PLATFORM_ID = inject(PLATFORM_ID);
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    if (isPlatformBrowser(this._PLATFORM_ID)) { // Browser
      this._TranslateService.setDefaultLang('en');

      const savedLang = localStorage.getItem('lang');

      if (savedLang !== null) {
        this._TranslateService.use(savedLang);
      }

      this.changeDirection();
    }
  }

  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      this.renderer.setAttribute(document.documentElement, 'dir', 'ltr'); // Left to right
    } else if (localStorage.getItem('lang') === 'ar') {
      this.renderer.setAttribute(document.documentElement, 'dir', 'rtl'); // Right to left
    }
  }

  changeLang(lang: string): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.setItem('lang', lang);

      this._TranslateService.use(lang);
      this.changeDirection();
    }
  }
}
