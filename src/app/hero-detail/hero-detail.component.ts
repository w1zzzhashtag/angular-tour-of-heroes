import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {Location} from '@angular/common'

import { Hero } from './../hero'
import {HeroService} from './../hero.service'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | null = null;

  constructor(
    private route: ActivatedRoute,
    private HeroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.HeroService.getHero(+id)
        .subscribe(hero => this.hero = hero)
    }
  }

  goBack():void {
    this.location.back()
  }

  save(): void {
    if(this.hero) {
      this.HeroService.updateHero(this.hero)
      .subscribe(() => this.goBack())
    }
  }
}
