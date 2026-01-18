import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cliente} from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly api = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  listar() {
    return this.http.get<Cliente[]>(`${this.api}/clientes`);
  }

  buscarPorId(id: number) {
    return this.http.get<Cliente>(`${this.api}/clientes/${id}`);
  }

  criarCliente(payload: Partial<Cliente>) {
    return this.http.post<Cliente>(`${this.api}/clientes`, payload);
  }

  atualizarCliente(id: number, payload: Partial<Cliente>) {
    return this.http.put<Cliente>(`${this.api}/clientes/{id}`, payload);
  }
}
