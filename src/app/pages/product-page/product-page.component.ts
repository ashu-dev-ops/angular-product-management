// import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditCategoryComponent } from 'src/app/helper/edit-category/edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator; //manipulate matpaginator jo phir page ko change kar ta hai
  @ViewChild(MatSort) sort!: MatSort; //manipulate matsort jo phir sort ko change kar ta hai
  displayedColumns = [
    'title',
    'price',
    // 'description',
    'category',
    'status',
    'actions',
  ];

  dataSource!: MatTableDataSource<any>;
  constructor(private _productHttp: ProductService, private _router: Router) {}
  getAllProducts() {
    this._productHttp.getAllProducts().subscribe({
      next: (resp) => {
        console.log(resp);
        const products = resp.products.map((product: any) => {
          return {
            ...product,
            category: product.categoryId.name,
            status: product.status,
          };
        });
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
  applyFilter(event: Event) {
    // console.log(event.target);
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteProduct(value: any) {
    this._productHttp.deleteProduct(value._id).subscribe({
      next: (value: any) => {
        console.log(value);
        this.getAllProducts();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  openEditForm(data: any) {
    // console.log(data);
    this._router.navigate(['/dashboard', 'product', `${data._id}`]);
  }
  openAddForm() {
    this._router.navigate(['/dashboard', 'add-new-product']);
  }
}
