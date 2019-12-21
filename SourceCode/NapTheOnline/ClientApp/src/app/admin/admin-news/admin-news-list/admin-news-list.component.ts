import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewsModel } from '../../../share/view-model/news.model';
import { NewsService } from '../../../service/news.service';
import { Utility } from '../../../share/utility';
import { GameModel } from '../../../share/view-model/game.model';
import * as lodash from 'lodash';
import { NEWS } from '../../../share/mock-data';
import { finalize } from 'rxjs/operators';
import { ShareService } from '../../../service/share.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-admin-news-list',
    templateUrl: './admin-news-list.component.html',
    styleUrls: ['./admin-news-list.component.scss']
})
export class AdminNewsListComponent implements OnInit {
    @ViewChild('paginator', { static: true }) paginator: MatPaginator;

    total: number;
    listNews: any;
    searchExp: string;
    pageSize: number = 20;

    displayedColumns: string[] = ['logo', 'name', 'datecreated', 'actions'];
    maxPage: number;
    totalPage = [];
    pageEvent: PageEvent;

    constructor(private router: Router,
        private newsService: NewsService,
        private shareService: ShareService) {
    }

    ngOnInit() {
        this.refreshList();
    }

    refreshList(index: number = null) {
        this.changePage(index || 0);
    }

    applyFilter() {
        this.listNews.filter = this.searchExp.trim().toLowerCase();
    }

    changePage(pageIndex) {
        if (pageIndex === null || pageIndex < 0) {
            return;
        }
        this.shareService.setLoading(true);
        this.newsService.getNews(pageIndex, 0).pipe(
            finalize(() => {
                setTimeout(() => {
                    this.shareService.setLoading(false);
                }, 100);
            })
        ).subscribe(res => {
            this.total = res.total;
            this.listNews = new MatTableDataSource(res.result);
        });
    }

    openForEdit(news: NewsModel) {
        this.newsService.adminNews = news;
        this.router.navigate([`admin/news/${news.friendlyname}`]).then();
    }

    createNews() {
        this.newsService.adminNews = new NewsModel();
        this.router.navigate([`admin/news/creating`]).then();
    }

    deleteNews(id: string) {
        if (confirm('Are you sure to delete this record?')) {
            this.shareService.setLoading(true);
            this.newsService.deleteNews(id).pipe(
                finalize(() => {
                    setTimeout(() => {
                        this.shareService.setLoading(false);
                    }, 100);
                })
            ).subscribe(() => {
                this.refreshList(this.pageEvent.pageIndex);
                alert('Deleted Successfully');
            },
                () => { alert('Deleted Failed') }
            );
        }
    }
}
