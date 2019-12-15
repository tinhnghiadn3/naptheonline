import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ImagesService } from '../../../service/images.service';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { NewsService } from '../../../service/news.service';
import { NewsModel } from '../../../share/view-model/news.model';
import { formatDate } from '@angular/common';
import { NEW_TYPES } from 'src/app/share/constant';
import { Utility } from '../../../share/utility';

@Component({
    selector: 'app-admin-news-detail',
    templateUrl: './admin-news-detail.component.html',
    styleUrls: ['./admin-news-detail.component.scss']
})
export class AdminNewsDetailComponent implements OnInit {

    selectedNews: NewsModel;
    isValid: boolean = true;
    isSaving: boolean = false;
    message: string;

    // type
    newTypes = NEW_TYPES;
    typeName = 'Tin tức game';
    typeId = 1;

    // logo
    selectedLogo: any;
    logoBase64 = null;

    // description
    descImages = [];
    listBase64s: any[] = [];

    isUploading: boolean;
    isImageChange = false;

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

    constructor(private newsService: NewsService,
        private imageService: ImagesService,
        private router: Router,
        private activedRoute: ActivatedRoute) {
        if (this.newsService.adminNews) {
            this.selectedNews = this.newsService.adminNews;
        } else {
            const friendlyName = this.activedRoute.snapshot.paramMap.get('friendlyName');
            this.newsService.getNewsByFriendlyName(friendlyName).subscribe(res => {
                this.newsService.adminNews = res;
                this.selectedNews = res;
            })
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

        if (!this.selectedLogo) {
            return;
        }

        if (!this.selectedLogo.type || this.selectedLogo.type.split('/')[0] !== 'image') {
            alert('Only accept image file!');
            return;
        }

        this.logoBase64 = await this.toBase64(this.selectedLogo);
    }

    getImageFromDescription(source) {
        this.listBase64s = this.getBase64(source);
        this.descImages = this.base64ToImage(this.listBase64s);
    }

    getBase64(source) {
        const regexImg = /src="([^"]+)"/g;
        let imgBase64 = null;
        let listBase64 = [];
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

        listBase64 = listBase64.filter(_ => _.match(/^data:image\/[a-z]+;base64,/));
        return listBase64;
    }

    base64ToImage(base64s: any[]) {
        const images = [];
        base64s.forEach((base64, index) => {
            //
            // Base64 url of image trimmed one without data:image/png;base64
            const shortBase64 = base64.replace(/^data:image\/[a-z]+;base64,/, '');
            //
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
        return new Blob([int8Array], { type: 'image/jpeg' });
    }

    validateForm() {
        this.isValid = true;
        if (!this.selectedNews.name || !this.selectedNews.name.trim() || this.selectedNews.name.trim().length <= 0) {
            this.message = 'Name is required';
            return this.isValid = false;
        }
        return this.isValid = true;
    }

    createFormData() {
        const formData = new FormData();
        if (this.selectedLogo) {
            this.isImageChange = true;
            formData.append('logo', this.selectedLogo, this.selectedLogo.name);
        }

        if (this.descImages && this.descImages.length > 0) {
            this.isImageChange = true;
            this.descImages.forEach((img, index) => {
                formData.append(`description ${index}`, img, img.name);
            });
        }

        return formData;
    }

    replaceBase64FromDescription(news: NewsModel) {
        // const regex = /<img\ssrc="([^&]+)">/;
        this.listBase64s.forEach((base64, index) => {
            news.description = news.description.replace(base64, `{${index}}`);
        });
    }

    onSubmit() {
        if (this.validateForm() && !this.isSaving) {
            this.isSaving = true;
            this.isUploading = true;
            const news = cloneDeep(this.selectedNews);
            //
            // name
            news.name = Utility.replaceMoreSpace(news.name);
            let friendlyName = cloneDeep(news.name);
            friendlyName = Utility.removeSpace(friendlyName);
            news.friendlyName = friendlyName.removeVietnamese();
            //
            // date created
            news.dateCreated = formatDate(new Date(), 'HH:MM MMM, dd yyyy', 'en');
            //
            // Get img from description and return list base64 to replace
            this.getImageFromDescription(this.selectedNews.description);
            //
            // description
            this.replaceBase64FromDescription(news);
            //
            // create FormData to post API
            const formData = this.createFormData();

            if (this.selectedNews.id) {
                this.newsService.updateNews(news).pipe(finalize(() => {
                    this.isUploading = false;
                    this.isSaving = false;
                })).subscribe(() => {
                    if (this.isImageChange) {
                        this.imageService.uploadNewsImages(formData, news.id).then(() => {
                            this.isImageChange = false;
                            alert('Update Successfully');
                            this.router.navigate(['admin/news']);
                        });
                    } else {
                        alert('Update Successfully');
                        this.router.navigate(['admin/news']);
                    }
                });
            } else {
                this.newsService.addNews(news).pipe(finalize(() => {
                    this.isUploading = false;
                    this.isSaving = false;
                })).subscribe(res => {
                    this.newsService.adminNews.id = res.id;
                    news.id = res.id;

                    if (this.isImageChange) {
                        this.imageService.uploadNewsImages(formData, news.id).then(() => {
                            this.isImageChange = false;
                            alert('Add Successfully');
                            this.router.navigate(['admin/news']);
                        });
                    } else {
                        alert('Add Successfully');
                        this.router.navigate(['admin/news']);
                    }
                });
            }
        }
    }

    backClick() {
        // this.newsService.adminNews = null;
        this.router.navigate(['admin/news']);
    }

    typeChange(value: number) {
        this.selectedNews.typeId = value;
        this.typeName = this.newTypes.find(_ => _.value === value).text;
    }
}
