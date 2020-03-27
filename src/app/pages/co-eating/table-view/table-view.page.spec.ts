import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TableViewPage } from './table-view.page';

describe('TableViewPage', () => {
  let component: TableViewPage;
  let fixture: ComponentFixture<TableViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TableViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
