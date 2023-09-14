import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import GithubUsersService from 'src/app/core/services/gh-users/gh-users.service';
import { GithubUserDetails } from 'src/app/shared/model';
import { UserCardComponent } from "./user-card/user-card.component";
import { untilDestroyed } from 'src/app/shared/operators';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  template: `
    <app-user-card [userDetails]="userDetails()" [workingText]="workingText()" />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  private untilDestroy = untilDestroyed();
  private ghUsersService = inject(GithubUsersService);
  protected userDetails = signal<GithubUserDetails | null>(null);
  protected workingText = computed<string>(() => {
    const company = this.userDetails()?.company;
    return company ? `Working in ${company}` : 'Not working anywhere';
  });

  @Input() set username(_username: string) {
    this.ghUsersService.searchUserDetails(_username)
      .pipe(this.untilDestroy())
      .subscribe((details: GithubUserDetails) => {
        this.userDetails.set(details);
      });
  }
}
