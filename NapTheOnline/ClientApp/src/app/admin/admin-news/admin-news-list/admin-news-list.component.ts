import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Utility} from '../../../share/utility';
import {NewsModel} from '../../../share/view-model/news.model';
import {NewsService} from '../../../service/news.service';

@Component({
  selector: 'app-admin-news-list',
  templateUrl: './admin-news-list.component.html',
  styleUrls: ['./admin-news-list.component.scss']
})
export class AdminNewsListComponent implements OnInit {
  listNews: NewsModel[];

  constructor(private router: Router,
              private newsService: NewsService) {
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.newsService.getNews().subscribe(res => {
      this.listNews = res;
      this.listNews = Utility.generateFriendlyName(this.listNews);
    });
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
          this.refreshList();
          alert('Deleted Successfully');
        },
        error => {
          alert('Deleted Failed');
        }
      );
    }
  }
}
