import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { SnackService } from '../services/snack.service';
import { AngularFireAuth } from '@angular/fire/auth';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireAuth, SnackService],
      declarations: [AuthGuard],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
