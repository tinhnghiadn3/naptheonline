import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountLoginInputModel } from '../../share/view-model/account-login-input.model';
import { AdminService } from '../../service/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService } from 'src/app/service/share.service';
import { map, finalize, first } from 'rxjs/operators';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
    isLoading: boolean;
    account: AccountLoginInputModel;
    error: string;
    loginForm = new FormGroup({
        emailAddress: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        isKeepSignedIn: new FormControl('false'),
    });

    constructor(private adminService: AdminService,
        private route: ActivatedRoute,
        private shareService: ShareService,
        private router: Router) {
        // if (this.adminService.currentUserValue) {
        //     this.router.navigate(['/admin']);
        // }
    }

    ngOnInit() {
    }

    onLogin() {
        this.account = new AccountLoginInputModel({
            userName: this.loginForm.value.emailAddress,
            password: this.loginForm.value.password,
            isKeepSignedIn: this.loginForm.value.isKeepSignedIn
        });

        // this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.router.navigate(['/admin/dashboard']);
        // this.isLoading = true;
        // this.adminService.login(this.account)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             if(data) {
        //                 this.router.navigate(['/admin/dashboard']);
        //             } else {
        //                 this.error = "Email or Password is wrong.";
        //                 alert("Email or Password is wrong.")
        //             }
        //         },
        //         error => {
        //             this.isLoading = false;
        //         });
    }
}
