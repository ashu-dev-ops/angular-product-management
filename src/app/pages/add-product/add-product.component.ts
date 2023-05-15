import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  routeInfo: any = 'new';
  loading: boolean | null = false;
  addProductForm: FormGroup;
  currentProduct: any;
  stockOptions = ['in stock', 'out of stock', 'comming soon'];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productHttp: ProductService,
    private formBuilder: FormBuilder,
    private _catHttp: CategoryService
  ) {
    this.addProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      // categoryName: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
  options: any = [];
  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log(id); // Output: 66
      this.routeInfo = id;
    });

    if (this.routeInfo) {
      this._productHttp.getProduct(this.routeInfo).subscribe({
        next: (value: any) => {
          // this.currentProduct = value;
          const product = value.product;
          const cat = value.cat;
          const categoryName = product.categoryId.name;
          this.options = [...cat];
          const updatedProduct = {
            ...product,
            categoryId: categoryName,
            options: cat.name,
            optionsId: cat._id,
          };
          this.addProductForm.patchValue(updatedProduct);
        },
        error: (err) => console.log(err),
      });
    } else {
      this._catHttp.getAllCategory().subscribe({
        next: (value: any) => {
          console.log(value.categories);
          this.options = value.categories.map((i: any) => i);
          console.log(this.options);
        },
        error: (err) => console.log(err),
      });
    }
  }
  onSubmit() {
    console.log('onsubmit run');
    console.log(this.addProductForm.valid);
    console.log(this.addProductForm.value);
    if (this.addProductForm.valid) {
      if (this.routeInfo) {
        this._productHttp
          .updateProduct(this.routeInfo, this.addProductForm.value)
          .subscribe({
            next: (value: any) => {
              this._router.navigate(['/dashboard', 'product']);
            },
            error: (err) => console.log(err),
          });
        console.log(this.addProductForm.value);
      } else {
        this._productHttp.addProduct(this.addProductForm.value).subscribe({
          next: (vale: any) => {
            // console.log('run-1');
            console.log(vale);
            this._router.navigate(['/dashboard', 'product']);
          },
          error: (err) => console.log(err),
        });
      }
    }
  }
}
