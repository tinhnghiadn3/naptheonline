import { Component, EventEmitter, OnInit, Output, AfterViewInit } from '@angular/core';
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
export class AdminLoginComponent implements OnInit, AfterViewInit {
    isLoading: boolean;
    account: AccountLoginInputModel;
    returnUrl: string;

    loginForm = new FormGroup({
        emailAddress: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        isKeepSignedIn: new FormControl('false'),
    });

    constructor(private adminService: AdminService,
                private route: ActivatedRoute,
                private shareService: ShareService,
                private router: Router) {

        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

        if (!this.adminService.isTokenExpired()) {
            if (this.returnUrl && this.returnUrl.length > 0) {
                this.router.navigateByUrl(this.returnUrl);
            } else {
                this.router.navigate(['/admin']).then();
            }
        }
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.shareService.setLoading(false);
    }

    onLogin() {
        this.account = new AccountLoginInputModel({
            userName: this.loginForm.value.emailAddress,
            password: this.loginForm.value.password,
            isKeepSignedIn: this.loginForm.value.isKeepSignedIn
        });

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.shareService.setLoading(true);
        this.adminService.login(this.account)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/admin/games']);
                },
                error => {
                    this.shareService.setLoading(false);
                });
    }
}
