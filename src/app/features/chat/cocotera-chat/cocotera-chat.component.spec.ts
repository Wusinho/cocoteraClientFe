import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocoteraChatComponent } from './cocotera-chat.component';

describe('CocoteraChatComponent', () => {
  let component: CocoteraChatComponent;
  let fixture: ComponentFixture<CocoteraChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocoteraChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CocoteraChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
