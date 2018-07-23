import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { LoginService } from '../../services/login.service';
import { ProductService } from '../../services/product.service';
import { CustomerService } from '../../services/customers.service';
import { Customer } from '../../model/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  products: Product[]
  customers: Customer[]

  constructor(
    private productService:ProductService,
    private customerService:CustomerService
  ) { }

  ngOnInit() {
    this.getCustomers()
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

  getCustomers(){
    this.customerService.getAll().subscribe(customers => {
      this.customers = customers
    })
  }

  getProductById(id):Product{
    let products = this.products
    let product = <Product>{name:"Not loaded",price:0}
    if(products===undefined){
      return product
    }
    return products.find(p=>p._id==id) || product
  }


}
