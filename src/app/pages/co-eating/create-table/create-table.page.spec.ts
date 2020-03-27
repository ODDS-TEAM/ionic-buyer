import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateTablePage } from './create-table.page';

describe('CreateTablePage', () => {
  let component: CreateTablePage;
  let fixture: ComponentFixture<CreateTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
