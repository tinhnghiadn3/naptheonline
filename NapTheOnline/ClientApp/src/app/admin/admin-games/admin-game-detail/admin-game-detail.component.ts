import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GamesService} from '../../../service/games.service';
import {GameModel} from '../../../share/view-model/game.model';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {ImagesService} from '../../../service/images.service';
import {PriceModel} from '../../../share/view-model/price.model';
import * as lodash from 'lodash';

@Component({
  selector: 'app-admin-game-detail',
  templateUrl: './admin-game-detail.component.html',
  styleUrls: ['./admin-game-detail.component.scss']
})
export class AdminGameDetailComponent implements OnInit {

  titleAction: string;
  game: GameModel;

  isValid = true;
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
  isUploading: boolean;

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
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
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
  updatingPrice: PriceModel;

  constructor(private gameService: GamesService,
              private imageService: ImagesService,
              private router: Router) {
    if (this.gameService.adminGame) {
      this.game = this.gameService.adminGame;
    } else {
      this.router.navigate(['/admin/games']);
    }
  }

  ngOnInit() {
    // this.getPrices();
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
      if (imgBase64 && !(imgBase64[1] as string).includes('../../assets/upload')) {
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
      const imageFile = new File([imageBlob], imageName, {type: 'image/jpg'});
      images.push(imageFile);
    });

    return images;
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], {type: 'image/jpeg'});
    return blob;
  }

  validateForm() {
    if (!this.game.name || !this.game.name.trim() || this.game.name.trim().length <= 0) {
      this.message = 'Name is required';
      this.isValid = false;
    }
    return this.isValid;
  }

  replaceMoreSpace(str) {
    while (str.indexOf('  ') !== -1) {
      str = str.replace(/ {2}/g, ' ');
    }

    return str.trim();
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
    const regex = /<img\ssrc="([^&]+)">/;
    this.listBase64s.forEach((base64, index) => {
      game.description = game.description.replace(regex, `{${index}}`);
    });
  }

  onSubmit() {
    if (this.validateForm()) {
      this.isUploading = true;

      const newGame = lodash.cloneDeep(this.game);
      //
      // name
      newGame.name = this.replaceMoreSpace(newGame.name);
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
        this.gameService.updateGame(newGame).pipe(finalize(() => this.isUploading = false))
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
        this.gameService.addGame(newGame).pipe(finalize(() => this.isUploading = false))
          .subscribe(id => {
            this.gameService.adminGame.id = id;
            newGame.id = id;

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
    this.updatingPrice = lodash.cloneDeep(price);
    price.isUpdating = true;
  }

  editPrice(price) {
    price.isUpdating = false;
  }

  cancelUpdatingPrice(price: PriceModel) {
    price.name = this.updatingPrice.name;
    price.value = this.updatingPrice.value;
    price.isUpdating = false;
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
