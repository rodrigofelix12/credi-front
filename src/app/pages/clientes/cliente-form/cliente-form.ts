import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClienteService} from '../../../core/services/cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
export class ClienteForm implements OnInit {
  form!: FormGroup;
  id?: number;

  constructor(
    private formBuilder: FormBuilder,
    private service: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required]
    })

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.service.buscarPorId(this.id).subscribe(c => {
        this.form.patchValue(c);
      });
    }
  }

  salvar() {
    if (this.form.invalid) return;

    const action = this.id
      ? this.service.atualizarCliente(this.id, this.form.value)
      : this.service.criarCliente(this.form.value);

    action.subscribe(() => this.router.navigate(['/clientes']));
  }

  voltar() {
    this.router.navigate(['/clientes']);
  }
}