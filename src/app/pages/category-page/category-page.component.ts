import { Component, ViewChild, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditCategoryComponent } from 'src/app/helper/edit-category/edit-category.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator; //manipulate matpaginator jo phir page ko change kar ta hai
  @ViewChild(MatSort) sort!: MatSort; //manipulate matsort jo phir sort ko change kar ta hai
  displayedColumns: string[] = ['name', 'image', 'actions'];
  dataSource!: MatTableDataSource<any>;
  constructor(private _catHttp: CategoryService, private _mat: MatDialog) {}
  getAllProducts() {
    this._catHttp.getAllCategory().subscribe({
      next: (resp) => {
        console.log(resp);
        this.dataSource = new MatTableDataSource(resp.categories);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
    });
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteProduct(value: any) {
    // this._productService.deleteProduct(id).subscribe({
    //   next: (resp) => {
    //     // alert('product deleted');
    //     this._snackBar.open(`${product} got deleted `, '', {
    //       panelClass: 'center',
    //       duration: 5000,
    //     });
    //     // this.getAllProducts(); //this also refreash the component
    //     this.ngOnInit(); //it also refreash this component
    //   },
    //   error: (err) => console.log(err),
    // });
    console.log(value);
    this._catHttp.deleteCategory(value).subscribe({
      next: (value: any) => {
        console.log(value);
        this.getAllProducts();
      },
      error: (error) => console.log(error),
    });
  }
  openEditForm(data: any) {
    console.log(data);
    const dialogRef = this._mat.open(EditCategoryComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllProducts();
        }
      },
    });
  }
  openAddForm() {
    const dialogRef = this._mat.open(EditCategoryComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllProducts();
        }
      },
    });
  }
}
