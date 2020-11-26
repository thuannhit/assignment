import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service'
import { Router } from '@angular/router';
import { UserRegisterRequestDTO } from '../../auth/dtos'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      user_name: [null, Validators.required],
      name: [null, Validators.required],
      password: [null, Validators.required],
      repeatPassword: [null, Validators.required],
      email: [null, Validators.email]
    });
  }

  get f() { return this.loginForm.controls; }

  doLogin() {
    this.authService.login(
      {
        username: this.f.username.value,
        password: this.f.password.value
      }
    )
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/admin-dashboard']);
        }
      });
  }

  doRegister() {
    if (this.registerForm.invalid) {
      return
    }
    this.authService.register(this.registerForm.value)
      .subscribe((res: any) => {
        // this.isLoadingResults = false;
        this.router.navigate(['/login']).then(_ => console.log('You are registered now!'));
      }, (err: any) => {
        console.log(err);
        // this.isLoadingResults = false;
      });
  }

  onClickSignupBtn() {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });
  }
}
