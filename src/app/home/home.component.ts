import { Component, OnInit } from '@angular/core';
import { IndexedDBService } from '../indexed-db.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  visitCount: number;

  constructor(private indexedDBService: IndexedDBService,){}

  async ngOnInit(): Promise<void> {
    this.visitCount = await this.indexedDBService.getVisitCount();
    await this.indexedDBService.incrementVisitCount();
  }
}
