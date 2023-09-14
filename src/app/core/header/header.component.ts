import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div [routerLink]="['/']" class="h-12 bg-slate-900 flex items-center p-4 cursor-pointer">
      <h1>Github user search</h1>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
