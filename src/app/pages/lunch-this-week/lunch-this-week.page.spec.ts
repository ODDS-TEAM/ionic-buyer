import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LunchThisWeekPage } from './lunch-this-week.page';

describe('LunchThisWeekPage', () => {
  let component: LunchThisWeekPage;
  let fixture: ComponentFixture<LunchThisWeekPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LunchThisWeekPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LunchThisWeekPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
