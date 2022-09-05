import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import {Hero} from "../hero";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private router: ActivatedRoute, //Guarda información sobre el router a la instancia HeroDetailComponent
    private heroService: HeroService, //Obtiene info de hero desde el server remoto y este componente la muestra
    private location: Location //Es un servicio de Angular para interactuar con el navegador
  ) { }

  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if(this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }

  @Input() hero?: Hero;
}
