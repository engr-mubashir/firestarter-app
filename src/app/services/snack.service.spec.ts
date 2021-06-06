import { TestBed } from '@angular/core/testing';

import { SnackService } from './snack.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

describe('SnackService', () => {
  let service: SnackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBar, Router],
      declarations: [SnackService],
    });
    service = TestBed.inject(SnackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
