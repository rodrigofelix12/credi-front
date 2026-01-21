import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {ClienteService} from '../../../core/services/cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Cliente} from '../../../core/models/cliente.model';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css',
})
export class ClientesList implements OnInit {

  displayedColumns = ['id', 'name', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>();
  loading = false;
  error: string | null = null;

  constructor(
    private service: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Obter dados do resolver
    this.route.data.subscribe(data => {
      if (data['clientes']) {
        console.log('Clientes do resolver:', data['clientes']);
        this.dataSource.data = data['clientes'];
        this.loading = false;
        this.error = null;
      }
    });

    // Carregamento manual se necessário
    if (!this.dataSource.data || this.dataSource.data.length === 0) {
      this.load();
    }
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.cdr.markForCheck();
    
    this.service.listar().subscribe({
      next: (res) => {
        console.log('Clientes recebidos:', res);
        this.dataSource.data = res;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        this.error = 'Erro ao carregar clientes. Verifique a conexão com o servidor.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  novo() {
    this.router.navigate(['clientes/novo']);
  }

  editar(cliente: Cliente) {
    this.router.navigate(['clientes', cliente.id, 'editar']);
  }
}
