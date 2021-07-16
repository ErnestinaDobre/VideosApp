import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompbutonComponent } from './compbuton.component';

describe('CompbutonComponent', () => {
  let component: CompbutonComponent;
  let fixture: ComponentFixture<CompbutonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompbutonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompbutonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
