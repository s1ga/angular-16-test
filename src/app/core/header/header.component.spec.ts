import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading', () => {
    const text = 'Github user search'
    const heading: HTMLElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(heading.textContent).toContain(text);
  });

  it('should have clickable heading', () => {
    const className = 'cursor-pointer';
    const heading: HTMLElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(heading.classList.contains(className)).toBeTruthy();
  });
});
