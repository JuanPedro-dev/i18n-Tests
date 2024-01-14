import { Component, OnInit, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  translocoService = inject(TranslocoService)

  ngOnInit(): void {
    // here we can get data and do more stuff
    this.translocoService.getAvailableLangs();
  }


  changeLanguage(lang: string): void{
    this.translocoService.setActiveLang(lang);
  }

}
