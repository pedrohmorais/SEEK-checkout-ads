import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[]

  constructor(
    private loginService:LoginService,
    private productService:ProductService
  ) { }

  ngOnInit() {
    this.getProducts()
  }

  sortByPrice(a,b) {
    if (a.price < b.price)
      return -1;
    if (a.price > b.price)
      return 1;
    return 0;
  }

  getProducts(){
    this.productService.getAll().subscribe(products => {
      this.products = products.sort(this.sortByPrice)
    })
  }

}
