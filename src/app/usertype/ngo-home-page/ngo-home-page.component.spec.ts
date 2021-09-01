import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoHomePageComponent } from './ngo-home-page.component';

describe('NgoHomePageComponent', () => {
  let component: NgoHomePageComponent;
  let fixture: ComponentFixture<NgoHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgoHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
