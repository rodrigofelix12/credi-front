import {Component, OnInit} from '@angular/core';
import {ClienteService} from '../../../core/services/cliente.service';
import {Router} from '@angular/router';
import {Cliente} from '../../../core/models/cliente.model';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css',
})
export class ClientesList implements OnInit {

  displayedColumns = ['id', 'name', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>();
  loading = false;

  constructor(
    private service: ClienteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.service.listar().subscribe({
      next: res => this.dataSource.data = res,
      complete: () => this.loading = false,
    })
  }

  novo() {
    this.router.navigate(['clientes/novo']);
  }

  editar(cliente: Cliente) {
    this.router.navigate(['clientes', cliente.id, 'editar']);
  }
}
