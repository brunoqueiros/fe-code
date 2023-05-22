import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BASE_USER_URL, UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be create user', (done) => {
    const payload = {
      firstName: 'bruno',
      lastName: 'queiros',
      email: 'bruno@bruno.com',
      password: '1234567890'
    };
    const response = {
      _id: '12345',
      firstName: 'pipa',
      lastName: 'queiros',
      email: 'bruno@bruno.com',
      password: '1234567890'
    };

    service.createUser(payload).subscribe((data) => {
      expect(data).toEqual(response);
      done();
    });

    const request = httpTestingController.expectOne(BASE_USER_URL);
    request.flush(response);
    expect(request.request.method).toBe('POST');
  });
});
