import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptcha2Component } from 'ngx-captcha';
import { ChargeInfoModel } from '../share/view-model/charge-info.model';
import { GameModel } from '../share/view-model/game.model';
import { GamesService } from '../service/games.service';
import { Router } from '@angular/router';
import { CardChargeResponeModel } from '../share/view-model/card-charge-response.model';

@Component({
  selector: 'app-pay-game',
  templateUrl: './pay-game.component.html',
  styleUrls: ['./pay-game.component.scss']
})
export class PayGameComponent implements OnInit {
  @ViewChild('captchaElem', { static: false }) captchaElem: ReCaptcha2Component;

  protected aFormGroup: FormGroup;

  // todo: use live siteKey
  // siteKey = '6Ld3bbEUAAAAANTQQXLu6kluxsOSXALOV-gwQ_5q';
  siteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
  isDisabled = true;
  isValid: boolean;
  chargeInfo = new ChargeInfoModel();
  selectedGame: GameModel;
  chargeResult: CardChargeResponeModel;
  message1: string;
  message2: string;
  message3: string;
  message4: string;

  constructor(private formBuilder: FormBuilder,
    private gameService: GamesService,
    private router: Router) {
    if (this.gameService.selectedGame) {
      this.selectedGame = this.gameService.selectedGame;
    } else {
      this.router.navigate(['/games']);
    }
  }

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });

    this.chargeInfo.cardId = 0;
    this.chargeInfo.cardValue = 0;
  }

  handleSuccess() {
    this.isDisabled = false;
  }

  handleExpire() {
    this.captchaElem.reloadCaptcha();
    this.isDisabled = true;
  }

  validateForm() {
    this.reset();
    if (!this.chargeInfo.cardId || this.chargeInfo.cardId <= 0) {
      this.message1 = 'Vui lòng chọn loại thẻ';
      this.isValid = false;
    }
    if (!this.chargeInfo.cardValue || this.chargeInfo.cardValue <= 0) {
      this.message2 = 'Vui lòng chọn mệnh giá thẻ';
      this.isValid = false;
    }
    if (!this.chargeInfo.pinField || !this.chargeInfo.pinField.trim() || this.chargeInfo.pinField.trim().length <= 0) {
      this.message3 = 'Vui lòng nhập mã thẻ';
      this.isValid = false;
    }
    if (!this.chargeInfo.seriField || !this.chargeInfo.seriField.trim() || this.chargeInfo.seriField.trim().length <= 0) {
      this.message4 = 'Vui lòng nhập mã số seri';
      this.isValid = false;
    }
    return this.isValid;
  }

  onSubmit() {
    if(!this.validateForm()) return;

    this.gameService.charge(this.chargeInfo).subscribe(res => {
      res => this.chargeResult = res;
    });
  }

  reset() {
    this.isValid = true;
    this.message1 = "";
    this.message2 = "";
    this.message3 = "";
    this.message4 = "";
  }
}
