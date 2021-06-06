import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  customerId: string;
  customer: Observable<any>;
  collectionName = 'customers';

  constructor(
    private seo: SeoService,
    private angularFirestore: AngularFirestore,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');

    this.customer = this.angularFirestore
      .collection(this.collectionName)
      .doc(this.customerId)
      .valueChanges()
      .pipe(
        tap((data) =>
          this.seo.generateTags({
            title: data.title,
            description: data.bio,
            image: data.image,
          })
        )
      );
  }
}
