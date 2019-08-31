import {Component, OnInit} from '@angular/core';
import {NEWS} from '../share/view-model/mock-data';
import {NewsModel} from '../share/view-model/news.model';
import {NewsService} from '../service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
