import { FornecedorService } from './../fornecedor.service';
import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../fornecedor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent  implements OnInit  {
  fornecedor: Fornecedor[] = [];
  isEditing : Boolean = false;
  formGroupFornecedor : FormGroup;
  Supplier: any;


  constructor(private FornecedorService: FornecedorService,
              private formBuilder: FormBuilder) {
    this.formGroupFornecedor = formBuilder.group({
      id : [''],
      name : [''],
      email : [''],
      rg : [''],
      telefone : ['']

    });
  }

  ngOnInit(): void {
    this.loadSupplier();

  }
  loadSupplier() {
    this.FornecedorService.getSupplier().subscribe(
      {
        next : data => this.Supplier = data
      }
    );

  }

 save(){
if(this.isEditing)

    {
      this.FornecedorService.update(this.formGroupFornecedor.value).subscribe(
        {
          next: data => {
            this.loadSupplier();
            this.formGroupFornecedor.reset();
            this.isEditing = false;

          }
        }
      )

    }
    else{
    this.FornecedorService.save(this.formGroupFornecedor.value).subscribe(
    {
        next: data => {
          this.Supplier.push(data);
          this.formGroupFornecedor.reset();
        }
    }

    );
  }



  }

  clean(){
    this.formGroupFornecedor.reset();
    this.isEditing = false;
  }

  edit(fornecedor: Fornecedor){
    this.formGroupFornecedor.setValue(fornecedor);
    this.isEditing = true;




  }

  delete(fornecedor: Fornecedor){
    this.FornecedorService.delete(fornecedor).subscribe({
      next: ()=> this.loadSupplier()
    })


  }



}
