import {EventEmitter, Input, Output, Component} from '@angular/core';

@Component({
  selector: 'app-nav-item',
  template: `
    <a mat-list-item [routerLink]="rooterLink" (click)="activate.emit()">
      <mat-icon mat-list-icon>{{ icon }}</mat-icon>
      <span mat-line><ng-content></ng-content></span>
      <span mat-line class="secondary">{{ hint }}</span>
    </a>
  `,
  styles: [`
    .secondary {
      color: rgba(0, 0, 0, 0.54);
    }
  `]
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() rooterLink: string | any[] = '/';
  @Output() activate = new EventEmitter();
}
