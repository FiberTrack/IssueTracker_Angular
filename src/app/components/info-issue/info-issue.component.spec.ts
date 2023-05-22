import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoIssueComponent } from './info-issue.component';

describe('InfoIssueComponent', () => {
  let component: InfoIssueComponent;
  let fixture: ComponentFixture<InfoIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoIssueComponent]
    });
    fixture = TestBed.createComponent(InfoIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
