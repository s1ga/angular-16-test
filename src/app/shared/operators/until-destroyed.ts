import { DestroyRef, inject } from "@angular/core";
import { Subject, takeUntil } from "rxjs";

export function untilDestroyed() {
  const subject = new Subject();

  inject(DestroyRef).onDestroy(() => {
    subject.next(void 0);
    subject.complete();
  })

  return <T>() => takeUntil<T>(subject.asObservable());
}