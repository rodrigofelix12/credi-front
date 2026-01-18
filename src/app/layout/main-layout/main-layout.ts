import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    MatSidenav,
    MatNavList,
    MatSidenavContainer,
    MatIcon,
    MatSidenavContent,
    MatToolbar,
    RouterOutlet
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  opened = true;
}
