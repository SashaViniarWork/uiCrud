import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLogin = false;
  users: any;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.createLoginFormGroup();
    this.authService.isAuthenticated();
  }

  ngOnInit() {
  }

  check() {
    this.authService.getUser().subscribe(users => {
      this.users = users;
      this.users.forEach(user => {
        if (user.username === this.loginForm.value.username && user.password === this.loginForm.value.password) {
          this.isLogin = true;
        }
      });
      return this.isLogin;
    });
  }

  login() {
    this.check();
    if (this.isLogin) {
      localStorage.setItem('token', this.loginForm.value.username);
      this.router.navigate(['dashboard/list']);
    } else {
      this.openSnackBar('Wrong username or password', 'close');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  createLoginFormGroup() {
    return new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

}
