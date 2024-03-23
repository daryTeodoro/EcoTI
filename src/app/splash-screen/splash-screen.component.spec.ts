import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashScreenComponent } from './splash-screen.component';
import { Router } from '@angular/router';

describe('SplashScreenComponent', () => {
  let component: SplashScreenComponent;
  let fixture: ComponentFixture<SplashScreenComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SplashScreenComponent],
      imports: [RouterTestingModule, SplashScreenComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashScreenComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate'); // Espiar el método navigate del router
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /home after 3 seconds', () => {
    // Avanzar el tiempo artificialmente
    jasmine.clock().install();
    component.ngOnInit();
    jasmine.clock().tick(3001); // Avanzar 3001 milisegundos

    // Verificar que se haya llamado al método navigate del router con el argumento '/home'
    expect(router.navigate).toHaveBeenCalledWith(['/home']);

    // Desinstalar el reloj de jasmine
    jasmine.clock().uninstall();
  });
});