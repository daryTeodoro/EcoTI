import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });
  
  /*
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'EcoTI' title`, () => {
    expect(app.title).toEqual('EcoTI');
  });
  */

  it('should render Online when isOnline is true', () => {
    app.isOnline = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.bg-success')?.textContent).toContain('Online');
    expect(compiled.querySelector('.bg-danger')).toBeNull(); // No debería existir el elemento de Offline
  });

  it('should render Offline when isOnline is false', () => {
    app.isOnline = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.bg-danger')?.textContent).toContain('Offline');
    expect(compiled.querySelector('.bg-success')).toBeNull(); // No debería existir el elemento de Online
  });
});

