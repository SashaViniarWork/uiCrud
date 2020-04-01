import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {UserModel} from '../../models/user.model';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: UserModel;
  registrationForm: FormGroup;

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.registrationForm = this.createRegistrationFormGroup();
  }

  ngOnInit() {
  }

  registration() {
    const isPassword = this.registrationForm.value.password === this.registrationForm.value.re_password;
    if (isPassword) {
      this.user = {
        id: null,
        username: this.registrationForm.value.username,
        password: this.registrationForm.value.password,
      };
      this.authService.createUser(this.user).subscribe(data => {
        this.router.navigate(['auth/login']);
      });
    } else {
      this.openSnackBar('Passwords do not match', 'close');
    }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  createRegistrationFormGroup() {
    return new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      re_password: new FormControl(),
    });
  }
}
