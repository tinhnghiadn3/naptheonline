import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../../service/news.service';
import { NewsModel } from '../../share/view-model/news.model';
import { NEWS } from '../../share/mock-data';
import { ShareService } from 'src/app/service/share.service';
import * as lodash from 'lodash';
import { Utility } from 'src/app/share/utility';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

    searchExp: string;
    newType: number = null;
    listNews: NewsModel[] = [];
    listNewsClone: NewsModel[] = [];
    listBestViewed: NewsModel[] = [];

    constructor(private router: Router,
        private newsService: NewsService,
        private shareService: ShareService) {
        this.shareService.subscribeProject(searchExp => {
            this.searchExp = searchExp;
        });

        this.shareService.subscribeNewType(type => {
            this.newType = type;
        });
    }

    ngOnInit() {
        this.getNews();
    }

    filterList() {
        if (!this.searchExp || !this.searchExp.trim()) {
            return;
        }

        this.listNews = this.listNewsClone.filter(_ => _.name.includes(this.searchExp));
    }

    getNews() {
        // todo: this is for UI designer
        // this.listNews = NEWS;
        // this.getBestViewed();
        // this.filterList();

        const that = this;
        const newType = this.newType || 0;
        this.newsService.getNews(0, newType).pipe(
            finalize(() => that.filterList())
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
            this.listBestViewed = this.listNews;
            return;
        }

        for (let i = 0; i < 5; i++) {
            const randomObject = this.listNews[Math.floor(Math.random() * this.listNews.length)];
            this.listBestViewed.push(randomObject);
        }
    }

    showDetail(news: NewsModel) {
        this.newsService.selectedNews = news;
        this.router.navigate([`/news/${news.friendlyName}`]);
    }
}
