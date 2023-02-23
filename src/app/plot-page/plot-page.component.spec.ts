import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotPageComponent } from './plot-page.component';

describe('PlotPageComponent', () => {
  let component: PlotPageComponent;
  let fixture: ComponentFixture<PlotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
