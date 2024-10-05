import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankNavBarComponent } from './blank-nav-bar.component';

describe('BlankNavBarComponent', () => {
  let component: BlankNavBarComponent;
  let fixture: ComponentFixture<BlankNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlankNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
