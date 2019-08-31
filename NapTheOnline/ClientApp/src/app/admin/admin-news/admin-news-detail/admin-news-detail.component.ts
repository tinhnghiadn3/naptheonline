import {Component, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {ImagesService} from '../../../service/images.service';
import {Router} from '@angular/router';
import {ImagePathsModel} from '../../../share/view-model/image-paths.model';
import {finalize} from 'rxjs/operators';
import * as lodash from 'lodash';
import {NewsService} from '../../../service/news.service';
import {NewsModel} from '../../../share/view-model/news.model';

@Component({
  selector: 'app-admin-news-detail',
  templateUrl: './admin-news-detail.component.html',
  styleUrls: ['./admin-news-detail.component.scss']
})
export class AdminNewsDetailComponent implements OnInit {

  selectedNews: NewsModel;

  isValid = true;
  message: string;

  // logo
  selectedLogo: any;
  logoBase64 = null;

  // description
  descImages = [];
  listBase64s: any[] = [];

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

  constructor(private newsService: NewsService,
              private imageService: ImagesService,
              private router: Router) {
    if (this.newsService.adminNews) {
      this.selectedNews = this.newsService.adminNews;
    } else {
      this.router.navigate(['/admin/news']);
    }
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
      if (imgBase64) {
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
    return new Blob([int8Array], {type: 'image/jpeg'});
  }

  validateForm() {
    if (!this.selectedNews.name || !this.selectedNews.name.trim() || this.selectedNews.name.length <= 0) {
      this.message = 'Name is required';
      this.isValid = false;
    }
    return this.isValid;
  }

  replaceMoreSpace(str) {
    while (str.indexOf('  ') !== -1) {
      str = str.replace(/ {2}/g, ' ');
    }
  }

  createFormData() {
    const formData = new FormData();
    if (this.selectedLogo) {
      formData.append('logo', this.selectedLogo, this.selectedLogo.name);
    }

    if (this.descImages && this.descImages.length > 0) {
      this.descImages.forEach(img => {
        formData.append('description', img, img.name);
      });
    }

    return formData;
  }

  replaceImageUrl(news: NewsModel, data: ImagePathsModel) {
    news.logo = data.pathLogo;

    const regex = /<img\ssrc="([^&]+)">/;
    this.listBase64s.forEach((base64, index) => {
      news.description = this.selectedNews.description.replace(regex, `{${index}}`);
    });

    data.pathDescription.forEach((path, index) => {
      news.description = news.description.replace(`{${index}}`, `<img src="${path}"/>`);
    });
  }

  onSubmit() {
    if (this.validateForm()) {
      //
      // Get img from description
      this.getImageFromDescription(this.selectedNews.description);
      //
      // create FormData to post API
      const formData = this.createFormData();

      this.imageService.uploadNewsImages(formData).subscribe(res => {
        const news = lodash.cloneDeep(this.selectedNews);

        this.replaceImageUrl(news, res);

        this.replaceMoreSpace(news.name);

        news.dateCreated = Date.now();

        if (this.selectedNews.id) {
          this.newsService.updateNews(news).pipe(finalize(() => this.isUploading = false))
            .subscribe(() => {
              alert('Updating Successfully');
              this.router.navigate(['admin/news']);
            });
        } else {
          this.newsService.addNews(news).pipe(finalize(() => this.isUploading = false))
            .subscribe(id => {
              this.newsService.adminNews.id = id;
              alert('Adding Successfully');
              this.router.navigate(['admin/news']);
            });
        }
      });
    }
  }

  backClick() {
    this.router.navigate(['admin/news']);
  }
}
