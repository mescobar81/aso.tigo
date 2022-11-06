import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InscripcionMedicaRechazoPage } from './inscripcion-medica-rechazo.page';

describe('InscripcionMedicaRechazoPage', () => {
  let component: InscripcionMedicaRechazoPage;
  let fixture: ComponentFixture<InscripcionMedicaRechazoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionMedicaRechazoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InscripcionMedicaRechazoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
