import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartWithFilterComponent } from './chart-with-filter.component';

describe('ChartWithFilterComponent', () => {
  let component: ChartWithFilterComponent;
  let fixture: ComponentFixture<ChartWithFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartWithFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
