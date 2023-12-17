import { Component, Input } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() length: number = 0;

  constructor(private productsService: ProductsService) {}

  onPageChange(event: any) {
    this.productsService.pageChanged.next(event.pageIndex);
  }
}
