import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private loginService:LoginService,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    if(this.route.snapshot.params['loggout']) {
      this.logout()
    }
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required,Validators.email]),
      password: this.fb.control('',[Validators.required])
    })
  }

  logout(){
    this.loginService.logout()
    this.router.navigate(['/login'])
  }
  login(){
    this.loginService.loginAPI(this.loginForm.value.email,this.loginForm.value.password).subscribe(r=>{
      this.router.navigate(['/products'])
    })
  }

}
