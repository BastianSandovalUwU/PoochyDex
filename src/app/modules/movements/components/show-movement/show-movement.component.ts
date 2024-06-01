import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from 'app/modules/shared/services/pokeApi.service';
import { DetailMove } from '../../../../../../entities/moves.entity';

@Component({
  selector: 'app-show-movement',
  templateUrl: './show-movement.component.html',
  styleUrls: ['./show-movement.component.scss']
})
export class ShowMovementComponent implements OnInit {

  pokemonMove: string;
  move: DetailMove;

  constructor(private activatedRoute: ActivatedRoute,
              private pokeApiService: PokeApiService) {
    this.activatedRoute.params.subscribe(({ id }) => this.pokemonMove = id);
  }

  ngOnInit(): void {
  this.getMove();
  }

  getMove() {
    this.pokeApiService.getMoveByName(this.pokemonMove, 'scarlet-violet').subscribe((movement) => {
      console.log(movement);
      this.move = movement;
    });
  }

}
