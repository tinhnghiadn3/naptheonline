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

  @Output() backToList: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() game: GameModel;
  isValid = true;

  // logo
  selectedLogo: any;
  logoBase64 = null;

  // banner
  selectedBanner: any;
  bannerBase64 = null;

  // description
  descImages = [];

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
  }

  ngOnInit() {
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
    this.logoBase64 = await this.toBase64(this.selectedLogo);
  }

  async bannerSelected(event: any) {
    this.selectedBanner = event.target.files[0];
    this.bannerBase64 = await this.toBase64(this.selectedBanner);
  }

  getImageFromDescription(source) {
    const listBase64s = this.getBase64(source);
    this.descImages = this.base64ToImage(listBase64s);
  }

  getBase64(source) {
    const regexImg = /src="([^"]+)"/g;
    let imgBase64 = null;
    const listBase64 = [];
    do {
      imgBase64 = regexImg.exec(source);
      if (imgBase64) {
        listBase64.push(imgBase64[1]);
      }
    } while (imgBase64);

    const regex = /<img\ssrc="([^&]+)">/;
    const tmpDesc = this.game.description;
    listBase64.forEach((base64, index) => {
      this.game.description = tmpDesc.replace(regex, `{${index}}`);
    });

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
    this.isValid = true;
    return this.isValid;
  }

  onSubmit() {
    // if (this.validateForm()) {
    //
    // Get img from description
    this.getImageFromDescription(this.game.description);
    //
    // create FormData to post API
    const formData = new FormData();
    if (this.selectedLogo) {
      formData.append('logo', this.selectedLogo, this.selectedLogo.name);
    }
    if (this.selectedBanner) {
      formData.append('banner', this.selectedBanner, this.selectedBanner.name);
    }
    if (this.descImages && this.descImages.length > 0) {
      this.descImages.forEach(img => {
        formData.append('description', img, img.name);
      });
    }

    this.imageService.uploadGameImages(formData).subscribe(res => {
      const newGame = lodash.cloneDeep(this.game);
      newGame.logo = res.pathLogo;
      newGame.banner = res.pathBanner;
      res.pathDescription.forEach((path, index) => {
        newGame.description = newGame.description.replace(`{${index}}`, `<img src="${path}"/>`);
      });

      if (this.game.id) {
        this.gameService.updateGame(this.game).pipe(finalize(() => this.isUploading = false))
          .subscribe(() => {
            alert('Submitted Successfully');
            this.backToList.emit();
          });
      } else {
        this.gameService.addGame(this.game).pipe(finalize(() => this.isUploading = false))
          .subscribe(() => {
            alert('Submitted Successfully');
            this.backToList.emit();
          });
      }

    });
  }

  enablePriceAdding() {
    this.isPriceAdding = true;
    this.addingPrice = new PriceModel();
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
}
