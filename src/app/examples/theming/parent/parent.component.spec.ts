import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildComponent } from '../child/child.component';
import { ParentComponent } from './parent.component';

describe('ParentComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ParentComponent, ChildComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
