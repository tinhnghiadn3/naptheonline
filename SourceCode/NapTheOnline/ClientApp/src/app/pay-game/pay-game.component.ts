import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReCaptcha2Component} from 'ngx-captcha';

@Component({
  selector: 'app-pay-game',
  templateUrl: './pay-game.component.html',
  styleUrls: ['./pay-game.component.scss']
})
export class PayGameComponent implements OnInit {
  @ViewChild('captchaElem', {static: false}) captchaElem: ReCaptcha2Component;

  protected aFormGroup: FormGroup;

  // todo: use live siteKey
  // siteKey = '6Ld3bbEUAAAAANTQQXLu6kluxsOSXALOV-gwQ_5q';
  siteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
  isDisabled = true;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  handleSuccess() {
    this.isDisabled = false;
  }

  handleExpire() {
    this.captchaElem.reloadCaptcha();
    this.isDisabled = true;
  }

}
