import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, takeUntil } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../repository/product.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.css']
})
export class ModalHeaderComponent implements OnInit {
  service = inject(ProductService);
  route = inject(ActivatedRoute);
  destroy$$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  product$!: Observable<Product | null>;
  ngOnInit() {
    this.product$ = this.service.productDetails$;

    this.service.getProductById(
      parseInt(this.route.snapshot.paramMap.get('id') ?? '0'))
      .pipe(takeUntil(this.destroy$$))
      .subscribe()
  }
}
