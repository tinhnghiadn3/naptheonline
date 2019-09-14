import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NewsModel} from '../../../share/view-model/news.model';
import {NewsService} from '../../../service/news.service';
import {NEWS} from '../../../share/mock-data';

@Component({
    selector: 'app-admin-news-list',
    templateUrl: './admin-news-list.component.html',
    styleUrls: ['./admin-news-list.component.scss']
})
export class AdminNewsListComponent implements OnInit {
    listNews: NewsModel[];
    pageIndex: 1;
    pageSize: 5;
    totalPage = [];

    constructor(private router: Router,
                private newsService: NewsService) {
    }

    ngOnInit() {
        this.refreshList();
    }

    refreshList() {
        // todo: this is for UI designer
        this.listNews = NEWS;
        this.getListPagination();
        // this.newsService.getNews(pageIndex).subscribe(res => {
        //     this.listNews = res;
        //     this.listNews = Utility.generateFriendlyName(this.listNews);
        // });
    }

    changePage() {
        // this.newsService.getNews(pageIndex).subscribe(res => {
        //     this.listNews = res;
        //     this.listNews = Utility.generateFriendlyName(this.listNews);
        // });
    }

    getListPagination() {
        if (this.listNews && this.listNews.length > 0) {
            const listPagination = [];
            const length = this.listNews.length;
            if (length <= 5) {
                listPagination.push(1);
            } else {
                const totalPage = Math.floor(length / 5);
                for (let i = 1; i <= totalPage; i++) {
                    listPagination.push(i);
                }
            }

            this.totalPage = listPagination;
        }

    }

    openForEdit(news: NewsModel) {
        this.newsService.adminNews = news;
        this.router.navigate([`admin/news/${news.friendlyName}`]);
    }

    createNews() {
        this.newsService.adminNews = new NewsModel();
        this.router.navigate([`admin/news/creating`]);
    }

    deleteNews(id: number) {
        if (confirm('Are you sure to delete this record?')) {
            this.newsService.deleteNews(id).subscribe(res => {
                    const index = this.listNews.findIndex(_ => _.id === id);
                    if (index > -1) {
                        this.listNews.splice(index, 1);
                    }
                    // this.refreshList();
                    alert('Deleted Successfully');
                },
                error => {
                    alert('Deleted Failed');
                }
            );
        }
    }
}
