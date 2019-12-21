import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../../service/news.service';
import { NewsModel } from '../../share/view-model/news.model';
import { NEWS } from '../../share/mock-data';
import { ShareService } from 'src/app/service/share.service';
import * as lodash from 'lodash';
import { Utility } from 'src/app/share/utility';
import { finalize } from 'rxjs/operators';
import { NEW_TYPES } from '../../share/constant';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

    newType: number = 1;
    listNews: NewsModel[] = [];
    listNewsClone: NewsModel[] = [];
    title: string;
    NEW_TYPES = NEW_TYPES;

    constructor(private router: Router,
        private newsService: NewsService,
        private shareService: ShareService) {

        this.shareService.subscribeNewType(value => {
            this.newType = value;
            const type = NEW_TYPES.find(_ => _.value === value);
            if(type) {
                this.title = type.text;
                this.getNews();
            }
        });
    }

    ngOnInit() {
        this.getNews();
    }

    getNews() {
        const that = this;
        const newType = this.newType || 0;
        this.newsService.getNews(-1, newType).pipe(
            finalize(() => {
                setTimeout(() => {
                    this.shareService.setLoading(false);
                }, 100);
            })
        ).subscribe(res => {
            this.listNews = res.result;
            this.listNewsClone = lodash.cloneDeep(this.listNews);
            this.listNews = Utility.generateFriendlyName(this.listNews);
            this.getBestViewed();
        });
    }

    getBestViewed() {
        if (!this.listNews || this.listNews.length <= 0) {
            return;
        }

        if (this.listNews.length <= 5) {
            this.shareService.setBestViewed(this.listNews);
            return;
        }

        let listBestViewed = [];
        for (let i = 0; i < 5; i++) {
            const randomObject = this.listNews[Math.floor(Math.random() * this.listNews.length)];
            listBestViewed.push(randomObject);
        }

        this.shareService.setBestViewed(listBestViewed);
    }

    showDetail(news: NewsModel) {
        this.newsService.selectedNews = news;
        this.router.navigate([`/news/${news.friendlyname}`]);
    }
}
