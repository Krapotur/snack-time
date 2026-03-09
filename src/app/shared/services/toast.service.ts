import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private renderer: Renderer2;
  private containerEl: HTMLElement | null = null;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  show(message: string): void {
    if (!message) {
      return;
    }

    const container = this.ensureContainer();

    const toast = this.renderer.createElement('div');
    this.renderer.addClass(toast, 'app-toast');

    const text = this.renderer.createText(message);
    this.renderer.appendChild(toast, text);

    this.renderer.appendChild(container, toast);

    // Авто-скрытие через 3 секунды с плавной анимацией
    const hideAfter = 3000;
    const animationDuration = 300; // должно совпадать с CSS

    setTimeout(() => {
      this.renderer.addClass(toast, 'app-toast--hide');

      setTimeout(() => {
        if (toast.parentNode) {
          this.renderer.removeChild(container, toast);
        }
      }, animationDuration);
    }, hideAfter);
  }

  private ensureContainer(): HTMLElement {
    if (this.containerEl && this.document.body.contains(this.containerEl)) {
      return this.containerEl;
    }

    const container = this.renderer.createElement('div');
    this.renderer.addClass(container, 'app-toast-container');

    this.renderer.appendChild(this.document.body, container);
    this.containerEl = container;

    return container;
  }
}

