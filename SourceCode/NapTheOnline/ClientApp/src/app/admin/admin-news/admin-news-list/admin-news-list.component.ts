import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsModel } from '../../../share/view-model/news.model';
import { NewsService } from '../../../service/news.service';
import { Utility } from '../../../share/utility';
import { GameModel } from '../../../share/view-model/game.model';
import * as lodash from 'lodash';
import { NEWS } from '../../../share/mock-data';
import { finalize } from 'rxjs/operators';
import { ShareService } from '../../../service/share.service';

@Component({
    selector: 'app-admin-news-list',
    templateUrl: './admin-news-list.component.html',
    styleUrls: ['./admin-news-list.component.scss']
})
export class AdminNewsListComponent implements OnInit {
    total: number;
    listNews: NewsModel[];
    listNewsClone: NewsModel[];
    searchExp: string;

    pageIndex = 1;
    maxPage: number;
    totalPage = [];

    constructor(private router: Router,
        private newsService: NewsService,
        private shareService: ShareService) {
    }

    ngOnInit() {
        this.refreshList();
    }

    refreshList() {
        this.changePage(1);
    }

    search() {
        if (this.searchExp && this.searchExp.trim().length > 0) {
            this.listNews = this.listNewsClone.filter(_ => _.name.includes(this.searchExp));
            this.pageIndex = 1;
            this.getListPagination();
        } else {
            this.listNews = this.listNewsClone;
        }
    }

    changePage(pageIndex) {
        if ((this.pageIndex === pageIndex && this.pageIndex > 1) || pageIndex <= 0 || pageIndex > this.maxPage) {
            return;
        }

        this.pageIndex = pageIndex;
        this.newsService.getNews(pageIndex, 0).pipe(
            finalize(() => this.shareService.setLoading(false))
        ).subscribe(res => {
            this.total = res.total;
            this.listNews = res.result;
            this.listNews = Utility.generateFriendlyName(this.listNews);
            this.listNewsClone = lodash.cloneDeep(this.listNews);
            this.getListPagination();
        });
    }

    getListPagination() {
        if (this.total > 0) {
            const listPagination = [];
            if (this.total <= 5) {
                this.maxPage = 1;
                listPagination.push(1);
            } else {
                this.maxPage = Math.floor(this.total / 5);
                if ((this.total % 5) >= 1) {
                    this.maxPage += 1;
                }

                for (let i = 1; i <= this.maxPage; i++) {
                    listPagination.push(i);
                }
            }

            this.totalPage = listPagination;
        }

    }

    openForEdit(news: NewsModel) {
        this.newsService.adminNews = news;
        this.router.navigate([`admin/news/${news.friendlyName}`]).then();
    }

    createNews() {
        this.newsService.adminNews = new NewsModel();
        this.router.navigate([`admin/news/creating`]).then();
    }

    deleteNews(id: string) {
        if (confirm('Are you sure to delete this record?')) {
            this.newsService.deleteNews(id).subscribe(() => {
                const index = this.listNews.findIndex(_ => _.id === id);
                if (index > -1) {
                    this.listNews.splice(index, 1);
                }
                // this.refreshList();
                alert('Deleted Successfully');
            },
                () => {
                    alert('Deleted Failed');
                }
            );
        }
    }
}
