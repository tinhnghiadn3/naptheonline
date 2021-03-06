import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit } from '@angular/core';
import { GamesService } from '../../../service/games.service';
import { GameModel } from '../../../share/view-model/game.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ImagesService } from '../../../service/images.service';
import { PriceModel } from '../../../share/view-model/price.model';
import { cloneDeep, isEqual } from 'lodash';
import { Utility } from '../../../share/utility';

@Component({
  selector: 'app-admin-game-detail',
  templateUrl: './admin-game-detail.component.html',
  styleUrls: ['./admin-game-detail.component.scss']
})
export class AdminGameDetailComponent implements OnInit {

  titleAction: string;
  game: GameModel;

  isValid = true;
  fieldError: string;
  message: string;

  // logo
  selectedLogo: any;
  logoBase64 = null;

  // banner
  selectedBanner: any;
  bannerBase64 = null;

  // description
  descImages = [];
  listBase64s: any[] = [];

  isImageChange = false;
  isUploading: boolean = false;
  isSaving: boolean = false;

  // editor
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '200',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '200',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: '',
    sanitize: true,
    toolbarPosition: 'top',
  };

  // price
  addingPrice: PriceModel;
  isPriceAdding = false;
  isPriceUpdating = false;
  updatingPrice: PriceModel;

  constructor(private gameService: GamesService,
    private imageService: ImagesService,
    private router: Router,
    private activedRoute: ActivatedRoute) {
    if (this.gameService.adminGame) {
      this.game = cloneDeep(this.gameService.adminGame);
    } else {
      const friendlyName = this.activedRoute.snapshot.paramMap.get('friendlyName');
      this.gameService.getGameByFriendlyName(friendlyName).subscribe(res => {
        this.gameService.adminGame = res;
        this.game = res;
      })
    }
  }

  ngOnInit() {
  }

  getPrices() {
    if (this.game && this.game.id) {
      this.gameService.getPricesGame(this.game.id).subscribe(res => {
        this.game.prices = res;
      },
        () => this.router.navigate(['admin/games']));
    }
  }

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  async logoSelected(event: any) {
    this.selectedLogo = event.target.files[0];

    if (!this.selectedLogo) {
      return;
    }

    if (!this.selectedLogo.type || this.selectedLogo.type.split('/')[0] !== 'image') {
      alert('Only accept image file!');
      return;
    }

    this.logoBase64 = await this.toBase64(this.selectedLogo);
  }

  async bannerSelected(event: any) {
    this.selectedBanner = event.target.files[0];

    if (!this.selectedBanner) {
      return;
    }

    if (!this.selectedBanner.type || this.selectedBanner.type.split('/')[0] !== 'image') {
      alert('Only accept image file!');
      return;
    }

    this.bannerBase64 = await this.toBase64(this.selectedBanner);
  }

  getImageFromDescription(source) {
    this.listBase64s = this.getBase64(source);
    this.descImages = this.base64ToImage(this.listBase64s);
  }

  getBase64(source) {
    const regexImg = /src="([^"]+)"/g;
    let imgBase64 = null;
    const listBase64 = [];
    do {
      imgBase64 = regexImg.exec(source);
      if (imgBase64
        && !(imgBase64[1] as string).includes('http')
        && !(imgBase64[1] as string).includes('images/Banner')
        && !(imgBase64[1] as string).includes('images/Logo')
        && !(imgBase64[1] as string).includes('images/Description')) {
        listBase64.push(imgBase64[1]);
      }
    } while (imgBase64);

    return listBase64;
  }

  base64ToImage(base64s: any[]) {
    const images = [];
    base64s.forEach((base64, index) => {
      // Base64 url of image trimmed one without data:image/png;base64
      const shortBase64 = base64.replace(/^data:image\/[a-z]+;base64,/, '');
      // Naming the image
      let text = '';
      const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
        text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
      }
      // Replace extension according to your media type
      const imageName = index + '.jpg';
      // call method that creates a blob from dataUri
      const imageBlob = this.dataURItoBlob(shortBase64);
      const imageFile = new File([imageBlob], imageName, { type: 'image/jpg' });
      images.push(imageFile);
    });

    return images;
  }

  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  validateForm() {
    this.isValid = true;
    if (!this.game.name || !this.game.name.trim() || this.game.name.trim().length <= 0) {
      this.message = 'Name is required';
      this.fieldError = 'name';
      this.isValid = false;
    }
    if (!this.game.currency || !this.game.currency.trim() || this.game.currency.trim().length <= 0) {
      this.message = 'Currency is required';
      this.fieldError = 'currency';
      this.isValid = false;
    }
    return this.isValid;
  }

  createFormData() {
    const formData = new FormData();
    if (this.selectedLogo) {
      this.isImageChange = true;
      formData.append('logo', this.selectedLogo, this.selectedLogo.name);
    }
    if (this.selectedBanner) {
      this.isImageChange = true;
      formData.append('banner', this.selectedBanner, this.selectedBanner.name);
    }
    if (this.descImages && this.descImages.length > 0) {
      this.isImageChange = true;
      this.descImages.forEach((img, index) => {
        formData.append(`description ${index}`, img, img.name);
      });
    }

    return formData;
  }

  replaceBase64FromDescription(game: GameModel) {
    // const regex = /<img\ssrc="([^&]+)">/;
    this.listBase64s.forEach((base64, index) => {
      game.description = game.description.replace(base64, `{${index}}`);
    });
  }

  onSubmit() {
    if (this.validateForm() && !this.isPriceAdding && !this.isPriceUpdating) {
      this.isUploading = true;
      this.isSaving = true;
      const newGame = cloneDeep(this.game);
      //
      // name
      newGame.name = Utility.replaceMoreSpace(newGame.name);
      let friendlyName = cloneDeep(newGame.name);
      friendlyName = Utility.removeSpace(friendlyName);
      newGame.friendlyName = friendlyName.removeVietnamese();
      //
      // Get img from description and return list base64 to replace
      this.getImageFromDescription(this.game.description);
      //
      // description
      this.replaceBase64FromDescription(newGame);
      //
      // create FormData to post API
      const formData = this.createFormData();

      if (this.game.id) {
        this.gameService.updateGame(newGame).pipe(finalize(() => {
          this.isUploading = false;
          this.isSaving = false;
        }))
          .subscribe(() => {
            if (this.isImageChange) {
              this.imageService.uploadGameImages(formData, newGame.id).then(() => {
                this.isImageChange = false;
                alert('Update Successfully');
                this.router.navigate(['admin/games']);
              });
            } else {
              alert('Update Successfully');
              this.router.navigate(['admin/games']);
            }
          });
      } else {
        this.gameService.addGame(newGame).pipe(finalize(() => {
          this.isUploading = false;
          this.isSaving = false;
        }))
          .subscribe(res => {
            this.gameService.adminGame.id = res.id;
            newGame.id = res.id;

            if (this.isImageChange) {
              this.imageService.uploadGameImages(formData, newGame.id).then(() => {
                this.isImageChange = false;
                alert('Add Successfully');
                this.router.navigate(['admin/games']);
              });
            } else {
              alert('Add Successfully');
              this.router.navigate(['admin/games']);
            }
          });
      }
    }
  }

  enablePriceAdding() {
    if (!this.isPriceAdding) {
      this.isPriceAdding = true;
      this.addingPrice = new PriceModel();
    }
  }

  addPrice() {
    this.isPriceAdding = false;

    if (this.game.prices && this.game.prices.length > 0) {
      this.game.prices.push(this.addingPrice);
    } else {
      this.game.prices = [];
      this.game.prices.push(this.addingPrice);
    }

    this.addingPrice = null;
  }

  cancelAddingPrice() {
    this.isPriceAdding = false;
    this.addingPrice = null;
  }

  enablePriceUpdating(price: PriceModel) {
    this.updatingPrice = cloneDeep(price);
    this.isPriceUpdating = true;
    price.isUpdating = true;
  }

  editPrice(price) {
    price.isUpdating = false;
    this.isPriceUpdating = false;
  }

  cancelUpdatingPrice(price: PriceModel) {
    price.name = this.updatingPrice.name;
    price.value = this.updatingPrice.value;
    price.isUpdating = false;
    this.isPriceUpdating = false;
  }

  deletePrice(index) {
    if (confirm('Are you sure to delete this record?')) {
      this.game.prices.splice(index, 1);
      alert('Deleted Successfully');
    }
  }

  backClick() {
    this.router.navigate(['admin/games']);
  }
}
