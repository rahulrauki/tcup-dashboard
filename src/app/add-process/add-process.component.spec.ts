import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcessComponent } from './add-process.component';

describe('AddProcessComponent', () => {
  let component: AddProcessComponent;
  let fixture: ComponentFixture<AddProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
