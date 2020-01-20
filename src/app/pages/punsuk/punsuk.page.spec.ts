import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PunsukPage } from './punsuk.page';

describe('PunsukPage', () => {
  let component: PunsukPage;
  let fixture: ComponentFixture<PunsukPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunsukPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PunsukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
