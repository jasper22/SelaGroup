import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginStatus } from '../../services/auth/LoginStatus';


@Component({
  selector: 'sela-client-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  private redirectUrl = '';

  constructor(private auth: AuthService, 
    private route:Router, 
    private routeActive:ActivatedRoute,
    private snackBar: MatSnackBar) { 

      if (Object.keys(routeActive.snapshot.queryParams).length > 0) {
        this.redirectUrl = routeActive.snapshot.queryParams.redirectUrl;
      }
  }

  ngOnInit() {
  }

  onSubmit() {

    const currentUsername = this.loginForm.get('username').value;
    const currentPassword = this.loginForm.get('password').value;

    this.auth.loginUser(currentUsername, currentPassword)
    .pipe(
      catchError(err => {
          console.log(err);
          return of ( <LoginStatus> { success: false, errorMessage: err.message, token: null});
        })
    )
    .subscribe(
      data => {
        if (data.success === true) {
          // Success login
          this.route.navigateByUrl(this.redirectUrl || '');
        } else {
          this.showPopup(data.errorMessage);
        }
      },
      error => {
        this.showPopup(error);
      }
    );
  }

  showPopup(message: string) {
    this.snackBar.open(message, 'close', { duration: 6000});
  }
}
