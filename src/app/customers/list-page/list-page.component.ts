import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  customers;
  collectionName = 'customers';

  constructor(
    private seo: SeoService,
    private angularFirestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.seo.generateTags({
      title: 'Customers List',
      description: 'A list containing all the customers',
    });

    this.customers = this.angularFirestore
      .collection(this.collectionName)
      .valueChanges({ idField: 'id' });
  }
}
