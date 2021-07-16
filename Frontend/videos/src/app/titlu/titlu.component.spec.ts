import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitluComponent } from './titlu.component';

describe('TitluComponent', () => {
  let component: TitluComponent;
  let fixture: ComponentFixture<TitluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
