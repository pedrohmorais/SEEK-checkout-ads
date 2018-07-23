import { Component, OnInit } from '@angular/core';
import { CheckoutOrder } from '../../../model/checkout-order.model';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  checkoutOrder: CheckoutOrder = <CheckoutOrder>{skus:[]}
  constructor(
    private checkoutOrderService:OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location

  ) { }

  customerId = this.route.snapshot.params['id']
  
  ngOnInit() {
    this.getOrders()
  }

  sortByPrice(a,b) {
    if (a.price < b.price)
      return -1;
    if (a.price > b.price)
      return 1;
    return 0;
  }

  getOrders(){
    this.checkoutOrderService.getCheckoutOrder(this.customerId).subscribe(checkoutOrder => {
      this.checkoutOrder = checkoutOrder
    })
  }

  back(){
    this._location.back();
  }
}
