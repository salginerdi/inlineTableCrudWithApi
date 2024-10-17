import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineWithApiComponent } from './inline-with-api.component';

describe('InlineWithApiComponent', () => {
  let component: InlineWithApiComponent;
  let fixture: ComponentFixture<InlineWithApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineWithApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineWithApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
