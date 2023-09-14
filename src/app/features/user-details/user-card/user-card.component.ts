import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubUserDetails } from 'src/app/shared/model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="userDetails" class="bg-slate-600 rounded-lg shadow-2xl p-4 flex flex-col items-center">
      <img class="rounded-full w-32 h-32 object-cover mx-auto" [src]="userDetails.avatar_url" />
      <h1>{{ userDetails.login }}</h1>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input({ required: true }) public userDetails!: GithubUserDetails | null;
}
