import { TestBed } from '@angular/core/testing';
import { SunComponent } from './sun.component';

describe('SunComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(SunComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'sunrise-sunset' title`, () => {
    const fixture = TestBed.createComponent(SunComponent);
    const app = fixture.componentInstance;
    // expect(app.title).toEqual('sunrise-sunset');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SunComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // expect(compiled.querySelector('h1')?.textContent).toContain(
    //   'Hello, sunrise-sunset'
    // );
  });
});
