import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<any[]>;
  productsRef: AngularFireList<any>;

  constructor(
      private productService: ProductService,
      private db: AngularFireDatabase
    ) {
    this.productsRef = db.list('/products');
    // Use snapshotChanges().map() to store the key
  }

  ngOnInit(): void {
    this.products$ = this.productsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ); 
  }

}
