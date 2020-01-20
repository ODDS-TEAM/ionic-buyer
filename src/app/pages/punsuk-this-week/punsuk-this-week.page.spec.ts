import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PunsukThisWeekPage } from './punsuk-this-week.page';

describe('PunsukThisWeekPage', () => {
  let component: PunsukThisWeekPage;
  let fixture: ComponentFixture<PunsukThisWeekPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunsukThisWeekPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PunsukThisWeekPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
