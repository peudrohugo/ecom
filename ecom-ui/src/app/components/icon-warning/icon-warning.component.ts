import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-warning',
  templateUrl: './icon-warning.component.html',
  styleUrls: ['./icon-warning.component.scss'],
})
export class IconWarningComponent {
  @Input() icon: string = '';
  @Input() message: string = '';
  @Input() show: boolean = false;
}
