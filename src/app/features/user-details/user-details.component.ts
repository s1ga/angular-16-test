import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import GithubUsersService from 'src/app/core/services/gh-users/gh-users.service';
import { GithubUserDetails } from 'src/app/shared/model';
import { UserCardComponent } from "./user-card/user-card.component";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  template: `
    <app-user-card [userDetails]="userDetails()" />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  private ghUsersService = inject(GithubUsersService);
  protected userDetails = signal<GithubUserDetails | null>(null);

  @Input() set username(_username: string) {
    this.ghUsersService.searchUserDetails(_username).subscribe((details: GithubUserDetails) => {
      this.userDetails.set(details);
    });
  }
}
