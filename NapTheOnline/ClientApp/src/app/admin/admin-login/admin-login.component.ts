import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountLoginInputModel } from '../../share/view-model/account-login-input.model';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/service/share.service';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

    account: AccountLoginInputModel;
    loginForm = new FormGroup({
        emailAddress: new FormControl(''),
        password: new FormControl(''),
        isKeepSignedIn: new FormControl('false'),
    });

    constructor(private adminService: AdminService,
                private shareService: ShareService,
                private router: Router) {
    }

    ngOnInit() {
    }

    onLogin() {
        this.account = new AccountLoginInputModel({
            emailAddress: this.loginForm.value.emailAddress,
            password: this.loginForm.value.password,
            isKeepSignedIn: this.loginForm.value.isKeepSignedIn
        });


                this.shareService.setLogIn(true);
                this.router.navigate(['/admin/dashboard']);
        // this.adminService.login(this.account).subscribe(
        //     res => {
        //         // this.shareService.setLogIn(true);
        //         // this.router.navigate(['/admin/dashboard']);
        //     },
        //     error => {
        //         alert('Wrong email or password.');
        //     });
    }

    forgotPass() {
        this.router.navigate(['/admin/forgot']);
    }

}
