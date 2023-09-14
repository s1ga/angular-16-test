import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { GithubUsersService } from 'src/app/core/services';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf],
  template: `
    <input
      #input
      (input)="searchTerm.set(input.value)"
      class="border-white border-2 border-solid rounded-lg bg-slate-800 p-2 w-full outline-0" 
      type="text" 
    />

    <ul *ngIf="ghUsers()?.length; else emptyUsers">
      <li
        *ngFor="let user of ghUsers()" 
        class="border-white border-solid border-2 rounded-lg mt-5 flex items-center p-4 cursor-pointer"
        [routerLink]="['/user-details', user.login]"  
      >
        <img class="rounded-full w-12 h-12 object-cover mr-5" [src]="user.avatar_url" alt="avatar" />
        {{ user.login }}
      </li>
    </ul>

    <ng-template #emptyUsers>
      <div *ngIf="ghUsers() && searchTerm()" class="mt-5">There are no users containing "{{ searchTerm() }}" in their name</div>
    </ng-template>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSearchComponent {
  protected searchTerm = signal<string>('');
  private ghUsersService = inject(GithubUsersService);

  protected ghUsers = toSignal(toObservable(this.searchTerm).pipe(
    debounceTime(500),
    distinctUntilChanged(),
    filter((term: string) => term.length > 1),
    switchMap((term: string) => this.ghUsersService.searchUsers(term)),
  ), { initialValue: null });
}
