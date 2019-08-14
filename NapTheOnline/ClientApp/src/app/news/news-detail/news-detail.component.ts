import {Component, Input, OnInit} from '@angular/core';
import {NewsModel} from '../../view-model/news.model';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  @Input() selectedNew: NewsModel;

  constructor() {
  }

  ngOnInit() {
  }

}
