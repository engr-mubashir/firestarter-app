import { GoogleSigninDirective } from './google-signin.directive';
import { AngularFireAuth } from '@angular/fire/auth';
import { TestBed } from '@angular/core/testing';

describe('GoogleSigninDirective', () => {
  let directive: GoogleSigninDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireAuth],
      declarations: [GoogleSigninDirective],
      providers: [],
    });
    directive = TestBed.inject(GoogleSigninDirective);
  });

  it('should create an instance', () => {
    // const directive = new GoogleSigninDirective();
    expect(directive).toBeTruthy();
  });
});
