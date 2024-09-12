import { CreatePokemon } from "app/modules/poochyDexApi/services/poochyDexApi.service";

export const ALL_POKEMON_KANTO: any[] = [
  {
    name: 'bulbasaur',
    imageURL: 'https://i.imgur.com/k5AzQ30.png',
    number: 1,
    type: 'grass',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'ivysaur',
    imageURL: 'https://i.imgur.com/jvAy4Kq.png',
    number: 2,
    type: 'grass',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'venusaur',
    imageURL: 'https://i.imgur.com/xex1KYF.png',
    number: 3,
    type: 'grass',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'charmander',
    imageURL: 'https://i.imgur.com/BlFwHrn.png',
    number: 4,
    type: 'fire',
    generationId: 1,
  },
  {
    name: 'charmeleon',
    imageURL: 'https://i.imgur.com/f4i7yQy.png',
    number: 5,
    type: 'fire',
    generationId: 1,
  },
  {
    name: 'charizard',
    imageURL: 'https://i.imgur.com/OwWcj8M.png',
    number: 6,
    type: 'fire',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'squirtle',
    imageURL: 'https://i.imgur.com/VvwhuYZ.png',
    number: 7,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'wartortle',
    imageURL: 'https://i.imgur.com/dfW847l.png',
    number: 8,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'blastoise',
    imageURL: 'https://i.imgur.com/4w6PdQr.png',
    number: 9,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'caterpie',
    imageURL: 'https://i.imgur.com/Y4bfBhJ.png',
    number: 10,
    type: 'bug',
    generationId: 1,
  },
  {
    name: 'metapod',
    imageURL: 'https://i.imgur.com/3uVfOiX.png',
    number: 11,
    type: 'bug',
    generationId: 1,
  },
  {
    name: 'butterfree',
    imageURL: 'https://i.imgur.com/Ws5EuYS.png',
    number: 12,
    type: 'bug',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'weedle',
    imageURL: 'https://i.imgur.com/cXgeH5E.png',
    number: 13,
    type: 'bug',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'kakuna',
    imageURL: 'https://i.imgur.com/VIJyA7f.png',
    number: 14,
    type: 'bug',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'beedrill',
    imageURL: 'https://i.imgur.com/SvMxmlz.png',
    number: 15,
    type: 'bug',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'pidgey',
    imageURL: 'https://i.imgur.com/YnhKb9v.png',
    number: 16,
    type: 'normal',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'pidgeotto',
    imageURL: 'https://i.imgur.com/pILvbux.png',
    number: 17,
    type: 'normal',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'pidgeot',
    imageURL: 'https://i.imgur.com/XjqODkQ.png',
    number: 18,
    type: 'normal',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'rattata',
    imageURL: 'https://i.imgur.com/t8aZn7E.png',
    number: 19,
    type: 'normal',
    generationId: 1,
  },
  {
    name: 'raticate',
    imageURL: 'https://i.imgur.com/S6fmNZG.png',
    number: 20,
    type: 'normal',
    generationId: 1,
  },
  {
    name: 'spearow',
    imageURL: 'https://i.imgur.com/nv84RoT.png',
    number: 21,
    type: 'normal',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'fearow',
    imageURL: 'https://i.imgur.com/0ewqYRj.png',
    number: 22,
    type: 'normal',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'ekans',
    imageURL: 'https://i.imgur.com/CP0GFL0.png',
    number: 23,
    type: 'poison',
    generationId: 1,
  },
  {
    name: 'arbok',
    imageURL: 'https://i.imgur.com/0qFUyhC.png',
    number: 24,
    type: 'poison',
    generationId: 1,
  },
  {
    name: 'pikachu',
    imageURL: 'https://i.imgur.com/n1I3byY.png',
    number: 25,
    type: 'electric',
    generationId: 1,
  },
  {
    name: 'raichu',
    imageURL: 'https://i.imgur.com/HWIUqRq.png',
    number: 26,
    type: 'electric',
    generationId: 1,
  },
  {
    name: 'sandshrew',
    imageURL: 'https://i.imgur.com/IbeGiVR.png',
    number: 27,
    type: 'ground',
    generationId: 1,
  },
  {
    name: 'sandslash',
    imageURL: 'https://i.imgur.com/R1kzXvZ.png',
    number: 28,
    type: 'ground',
    generationId: 1,
  },
  {
    name: 'nidoran-f',
    imageURL: 'https://i.imgur.com/lIHwDWc.png',
    number: 29,
    type: 'poison',
    generationId: 1,
  },
  {
    name: 'nidorina',
    imageURL: 'https://i.imgur.com/zLFGnzv.png',
    number: 30,
    type: 'poison',
    generationId: 1,
  },
  {
    name: 'nidoqueen',
    imageURL: 'https://i.imgur.com/VVAY3nQ.png',
    number: 31,
    type: 'poison',
    generationId: 1,
  },
  {
    name: 'nidoran-m',
    imageURL: 'https://i.imgur.com/v9V9hmi.png',
    number: 32,
    type: 'poison',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'nidorino',
    imageURL: 'https://i.imgur.com/giSj8mU.png',
    number: 33,
    type: 'poison',
    generationId: 1,
  },
  {
    name: 'nidoking',
    imageURL: 'https://i.imgur.com/CIJdMpX.png',
    number: 34,
    type: 'poison',
    generationId: 1,
  },
  {
    name: 'clefairy',
    imageURL: 'https://i.imgur.com/EU0wGr0.png',
    number: 35,
    type: 'fairy',
    generationId: 1,
  },
  {
    name: 'clefable',
    imageURL: 'https://i.imgur.com/A9NuuUH.png',
    number: 36,
    type: 'fairy',
    generationId: 1,
  },
  {
    name: 'vulpix',
    imageURL: 'https://i.imgur.com/dKes538.png',
    number: 37,
    type: 'fire',
    generationId: 1,
  },
  {
    name: 'ninetales',
    imageURL: 'https://i.imgur.com/XHrq9Ja.png',
    number: 38,
    type: 'fire',
    generationId: 1,
  },
  {
    name: 'jigglypuff',
    imageURL: 'https://i.imgur.com/V1gV7mS.png',
    number: 39,
    type: 'fairy',
    generationId: 1,
  },
  {
    name: 'wigglytuff',
    imageURL: 'https://i.imgur.com/B9Djjc2.png',
    number: 40,
    type: 'fairy',
    generationId: 1,
  },
  {
    name: 'zubat',
    imageURL: 'https://i.imgur.com/Y6u8jHD.png',
    number: 41,
    type: 'poison',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'golbat',
    imageURL: 'https://i.imgur.com/WlCWmLh.png',
    number: 42,
    type: 'poison',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'oddish',
    imageURL: 'https://i.imgur.com/RALcgmw.png',
    number: 43,
    type: 'grass',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'gloom',
    imageURL: 'https://i.imgur.com/zEvzExE.png',
    number: 44,
    type: 'grass',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'vileplume',
    imageURL: 'https://i.imgur.com/8rLA2sz.png',
    number: 45,
    type: 'grass',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'paras',
    imageURL: 'https://i.imgur.com/RFbAZEF.png',
    number: 46,
    type: 'bug',
    Type2: 'grass',
    generationId: 1,
  },
  {
    name: 'parasect',
    imageURL: 'https://i.imgur.com/oADYRJT.png',
    number: 47,
    type: 'bug',
    Type2: 'grass',
    generationId: 1,
  },
  {
    name: 'venonat',
    imageURL: 'https://i.imgur.com/peBatEa.png',
    number: 48,
    type: 'bug',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'venomoth',
    imageURL: 'https://i.imgur.com/BAawjfG.png',
    number: 49,
    type: 'bug',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'diglett',
    imageURL: 'https://i.imgur.com/pVYUlCq.png',
    number: 50,
    type: 'ground',
    generationId: 1,
  },
  {
    name: 'dugtrio',
    imageURL: 'https://i.imgur.com/co2YYAO.png',
    number: 51,
    type: 'ground',
    generationId: 1,
  },
  {
    name: 'meowth',
    imageURL: 'https://i.imgur.com/B0GlTVb.png',
    number: 52,
    type: 'normal',
    generationId: 1,
  },
  {
    name: 'persian',
    imageURL: 'https://i.imgur.com/AG61daq.png',
    number: 53,
    type: 'normal',
    generationId: 1,
  },
  {
    name: 'psyduck',
    imageURL: 'https://i.imgur.com/Suc0nSm.png',
    number: 54,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'golduck',
    imageURL: 'https://i.imgur.com/l2giWeP.png',
    number: 55,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'mankey',
    imageURL: 'https://i.imgur.com/U5oUYFZ.png',
    number: 56,
    type: 'fighting',
    generationId: 1,
  },
  {
    name: 'primeape',
    imageURL: 'https://i.imgur.com/RzUXj8G.png',
    number: 57,
    type: 'fighting',
    generationId: 1,
  },
  {
    name: 'growlithe',
    imageURL: 'https://i.imgur.com/ZVcEMNm.png',
    number: 58,
    type: 'fire',
    generationId: 1,
  },
  {
    name: 'arcanine',
    imageURL: 'https://i.imgur.com/RQdWmCf.png',
    number: 59,
    type: 'fire',
    generationId: 1,
  },
  {
    name: 'poliwag',
    imageURL: 'https://i.imgur.com/TBUdMU0.png',
    number: 60,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'poliwhirl',
    imageURL: 'https://i.imgur.com/J9eUoaN.png',
    number: 61,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'poliwrath',
    imageURL: 'https://i.imgur.com/mChBxCC.png',
    number: 62,
    type: 'water',
    Type2: 'fighting',
    generationId: 1,
  },
  {
    name: 'abra',
    imageURL: 'https://i.imgur.com/zdDE4qI.png',
    number: 63,
    type: 'psychic',
    generationId: 1,
  },
  {
    name: 'kadabra',
    imageURL: 'https://i.imgur.com/QJ9oDWv.png',
    number: 64,
    type: 'psychic',
    generationId: 1,
  },
  {
    name: 'alakazam',
    imageURL: 'https://i.imgur.com/1Xgb52Y.png',
    number: 65,
    type: 'psychic',
    generationId: 1,
  },
  {
    name: 'machop',
    imageURL: 'https://i.imgur.com/KlazZXh.png',
    number: 66,
    type: 'fighting',
    generationId: 1,
  },
  {
    name: 'machoke',
    imageURL: 'https://i.imgur.com/mGuYgHt.png',
    number: 67,
    type: 'fighting',
    generationId: 1,
  },
  {
    name: 'machamp',
    imageURL: 'https://i.imgur.com/q5MY8W1.png',
    number: 68,
    type: 'fighting',
    generationId: 1,
  },
  {
    name: 'bellsprout',
    imageURL: 'https://i.imgur.com/MNjV8EL.png',
    number: 69,
    type: 'grass',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'weepinbell',
    imageURL: 'https://i.imgur.com/eaMimPh.png',
    number: 70,
    type: 'grass',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'victreebel',
    imageURL: 'https://i.imgur.com/xngP5oA.png',
    number: 71,
    type: 'grass',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'tentacool',
    imageURL: 'https://i.imgur.com/bNHVYVV.png',
    number: 72,
    type: 'water',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'tentacruel',
    imageURL: 'https://i.imgur.com/liL0Z57.png',
    number: 73,
    type: 'water',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'geodude',
    imageURL: 'https://i.imgur.com/fLcDxSX.png',
    number: 74,
    type: 'rock',
    Type2: 'ground',
    generationId: 1,
  },
  {
    name: 'graveler',
    imageURL: 'https://i.imgur.com/ViYlQqI.png',
    number: 75,
    type: 'rock',
    Type2: 'ground',
    generationId: 1,
  },
  {
    name: 'golem',
    imageURL: 'https://i.imgur.com/Oa3CQ09.png',
    number: 76,
    type: 'rock',
    Type2: 'ground',
    generationId: 1,
  },
  {
    name: 'ponyta',
    imageURL: 'https://i.imgur.com/K0Prm9P.png',
    number: 77,
    type: 'fire',
    generationId: 1,
  },
  {
    name: 'rapidash',
    imageURL: 'https://i.imgur.com/zEy8Ft0.png',
    number: 78,
    type: 'fire',
    generationId: 1,
  },
  {
    name: 'slowpoke',
    imageURL: 'https://i.imgur.com/P4iKca3.png',
    number: 79,
    type: 'water',
    Type2: 'psychic',
    generationId: 1,
  },
  {
    name: 'slowbro',
    imageURL: 'https://i.imgur.com/eQ6ODuC.png',
    number: 80,
    type: 'water',
    Type2: 'psychic',
    generationId: 1,
  },
  {
    name: 'magnemite',
    imageURL: 'https://i.imgur.com/hEd3ca2.png',
    number: 81,
    type: 'electric',
    Type2: 'steel',
    generationId: 1,
  },
  {
    name: 'magneton',
    imageURL: 'https://i.imgur.com/eXyY0Uh.png',
    number: 82,
    type: 'electric',
    Type2: 'steel',
    generationId: 1,
  },
  {
    name: 'farfetchd',
    imageURL: 'https://i.imgur.com/MsUWfdJ.png',
    number: 83,
    type: 'normal',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'doduo',
    imageURL: 'https://i.imgur.com/zOf10Xe.png',
    number: 84,
    type: 'normal',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'dodrio',
    imageURL: 'https://i.imgur.com/5NCQMwI.png',
    number: 85,
    type: 'normal',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'seel',
    imageURL: 'https://i.imgur.com/q2mqJRC.png',
    number: 86,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'dewgong',
    imageURL: 'https://i.imgur.com/MDjz7Kd.png',
    number: 87,
    type: 'water',
    Type2: 'ice',
    generationId: 1,
  },
  {
    name: 'grimer',
    imageURL: 'https://i.imgur.com/w43428Q.png',
    number: 88,
    type: 'poison',
    generationId: 1,
  },
  {
    name: 'muk',
    imageURL: 'https://i.imgur.com/BMLHNVR.png',
    number: 89,
    type: 'poison',
    generationId: 1,
  },
  {
    name: 'shellder',
    imageURL: 'https://i.imgur.com/a6HkAGe.png',
    number: 90,
    type: 'water',
    Type2: 'ice',
    generationId: 1,
  },
  {
    name: 'cloyster',
    imageURL: 'https://i.imgur.com/kI4PPgk.png',
    number: 91,
    type: 'water',
    Type2: 'ice',
    generationId: 1,
  },
  {
    name: 'gastly',
    imageURL: 'https://i.imgur.com/WqHYtpo.png',
    number: 92,
    type: 'ghost',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'haunter',
    imageURL: 'https://i.imgur.com/qNpVpgF.png',
    number: 93,
    type: 'ghost',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'gengar',
    imageURL: 'https://i.imgur.com/4xa5Bpi.png',
    number: 94,
    type: 'ghost',
    Type2: 'poison',
    generationId: 1,
  },
  {
    name: 'onix',
    imageURL: 'https://i.imgur.com/CepZLTu.png',
    number: 95,
    type: 'rock',
    Type2: 'ground',
    generationId: 1,
  },
  {
    name: 'drowzee',
    imageURL: 'https://i.imgur.com/eHeO0P3.png',
    number: 96,
    type: 'psychic',
    generationId: 1,
  },
  {
    name: 'hypno',
    imageURL: 'https://i.imgur.com/9JYOR97.png',
    number: 97,
    type: 'psychic',
    generationId: 1,
  },
  {
    name: 'krabby',
    imageURL: 'https://i.imgur.com/4QU5SlH.png',
    number: 98,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'kingler',
    imageURL: 'https://i.imgur.com/4gBky3b.png',
    number: 99,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'voltorb',
    imageURL: 'https://i.imgur.com/ibULwX9.png',
    number: 100,
    type: 'electric',
    generationId: 1,
  },
  {
    name: 'electrode',
    imageURL: 'https://i.imgur.com/pTpzbKR.png',
    number: 101,
    type: 'electric',
    generationId: 1,
  },
  {
    name: 'exeggcute',
    imageURL: 'https://i.imgur.com/a3ndwHG.png',
    number: 102,
    type: 'grass',
    Type2: 'psychic',
    generationId: 1,
  },
  {
    name: 'exeggutor',
    imageURL: 'https://i.imgur.com/So39q3D.png',
    number: 103,
    type: 'grass',
    Type2: 'psychic',
    generationId: 1,
  },
  {
    name: 'cubone',
    imageURL: 'https://i.imgur.com/OCdUoVz.png',
    number: 104,
    type: 'ground',
    generationId: 1,
  },
  {
    name: 'marowak',
    imageURL: 'https://i.imgur.com/ebN1NVL.png',
    number: 105,
    type: 'ground',
    generationId: 1,
  },
  {
    name: 'hitmonlee',
    imageURL: 'https://i.imgur.com/jekXp2x.png',
    number: 106,
    type: 'fighting',
    generationId: 1,
  },
  {
    name: 'hitmonchan',
    imageURL: 'https://i.imgur.com/4QPpfm6.png',
    number: 107,
    type: 'fighting',
    generationId: 1,
  },
  {
    name: 'lickitung',
    imageURL: 'https://i.imgur.com/HvSpRiG.png',
    number: 108,
    type: 'normal',
    generationId: 1,
  },
  {
    name: 'koffing',
    imageURL: 'https://i.imgur.com/0S3tkco.png',
    number: 109,
    type: 'poison',
    generationId: 1,
  },
  {
    name: 'weezing',
    imageURL: 'https://i.imgur.com/Oh87Byq.png',
    number: 110,
    type: 'poison',
    generationId: 1,
  },
  {
    name: 'rhyhorn',
    imageURL: 'https://i.imgur.com/PHUhaZR.png',
    number: 111,
    type: 'ground',
    generationId: 1,
  },
  {
    name: 'rhydon',
    imageURL: 'https://i.imgur.com/fVCUgUX.png',
    number: 112,
    type: 'ground',
    generationId: 1,
  },
  {
    name: 'chansey',
    imageURL: 'https://i.imgur.com/gvDrj7n.png',
    number: 113,
    type: 'normal',
    generationId: 1,
  },
  {
    name: 'tangela',
    imageURL: 'https://i.imgur.com/bKe5rct.png',
    number: 114,
    type: 'grass',
    generationId: 1,
  },
  {
    name: 'kangaskhan',
    imageURL: 'https://i.imgur.com/77JzsvI.png',
    number: 115,
    type: 'normal',
    generationId: 1,
  },
  {
    name: 'horsea',
    imageURL: 'https://i.imgur.com/5xamDHg.png',
    number: 116,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'seadra',
    imageURL: 'https://i.imgur.com/nfW19OC.png',
    number: 117,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'goldeen',
    imageURL: 'https://i.imgur.com/UvocQn1.png',
    number: 118,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'seaking',
    imageURL: 'https://i.imgur.com/ZsH4ovC.png',
    number: 119,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'staryu',
    imageURL: 'https://i.imgur.com/BnEV7KJ.png',
    number: 120,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'starmie',
    imageURL: 'https://i.imgur.com/ek9kZ7j.png',
    number: 121,
    type: 'water',
    Type2: 'psychic',
    generationId: 1,
  },
  {
    name: 'mr-mime',
    imageURL: 'https://i.imgur.com/aQgnllt.png',
    number: 122,
    type: 'psychic',
    Type2: 'fairy',
    generationId: 1,
  },
  {
    name: 'scyther',
    imageURL: 'https://i.imgur.com/2l3pBe2.png',
    number: 123,
    type: 'bug',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'jynx',
    imageURL: 'https://i.imgur.com/0uopWyv.png',
    number: 124,
    type: 'ice',
    Type2: 'psychic',
    generationId: 1,
  },
  {
    name: 'electabuzz',
    imageURL: 'https://i.imgur.com/bi5XYc9.png',
    number: 125,
    type: 'electric',
    generationId: 1,
  },
  {
    name: 'magmar',
    imageURL: 'https://i.imgur.com/IW0JpPL.png',
    number: 126,
    type: 'fire',
    generationId: 1,
  },
  {
    name: 'pinsir',
    imageURL: 'https://i.imgur.com/r4WjKXp.png',
    number: 127,
    type: 'bug',
    generationId: 1,
  },
  {
    name: 'tauros',
    imageURL: 'https://i.imgur.com/gGOwzjq.png',
    number: 128,
    type: 'normal',
    generationId: 1,
  },
  {
    name: 'magikarp',
    imageURL: 'https://i.imgur.com/I4nD26q.png',
    number: 129,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'gyarados',
    imageURL: 'https://i.imgur.com/PxzextX.png',
    number: 130,
    type: 'water',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'lapras',
    imageURL: 'https://i.imgur.com/xRFwQXQ.png',
    number: 131,
    type: 'water',
    Type2: 'ice',
    generationId: 1,
  },
  {
    name: 'ditto',
    imageURL: 'https://i.imgur.com/162ymEu.png',
    number: 132,
    type: 'normal',
    generationId: 1,
  },
  {
    name: 'eevee',
    imageURL: 'https://i.imgur.com/GJwoZqm.png',
    number: 133,
    type: 'normal',
    generationId: 1,
  },
  {
    name: 'vaporeon',
    imageURL: 'https://i.imgur.com/mSdkHme.png',
    number: 134,
    type: 'water',
    generationId: 1,
  },
  {
    name: 'jolteon',
    imageURL: 'https://i.imgur.com/Fx8WQeS.png',
    number: 135,
    type: 'electric',
    generationId: 1,
  },
  {
    name: 'flareon',
    imageURL: 'https://i.imgur.com/0qfid5a.png',
    number: 136,
    type: 'fire',
    generationId: 1,
  },
  {
    name: 'porygon',
    imageURL: 'https://i.imgur.com/1Yo6cex.png',
    number: 137,
    type: 'normal',
    generationId: 1,
  },
  {
    name: 'omanyte',
    imageURL: 'https://i.imgur.com/7KteIdr.png',
    number: 138,
    type: 'rock',
    Type2: 'water',
    generationId: 1,
  },
  {
    name: 'omastar',
    imageURL: 'https://i.imgur.com/vBxkfiq.png',
    number: 139,
    type: 'rock',
    Type2: 'water',
    generationId: 1,
  },
  {
    name: 'kabuto',
    imageURL: 'https://i.imgur.com/UYn0m0B.png',
    number: 140,
    type: 'rock',
    Type2: 'water',
    generationId: 1,
  },
  {
    name: 'kabutops',
    imageURL: 'https://i.imgur.com/7OkOFYd.png',
    number: 141,
    type: 'rock',
    Type2: 'water',
    generationId: 1,
  },
  {
    name: 'aerodactyl',
    imageURL: 'https://i.imgur.com/Px1TTov.png',
    number: 142,
    type: 'rock',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'snorlax',
    imageURL: 'https://i.imgur.com/M8ZdxTU.png',
    number: 143,
    type: 'normal',
    generationId: 1,
  },
  {
    name: 'articuno',
    imageURL: 'https://i.imgur.com/gOqvA8R.png',
    number: 144,
    type: 'ice',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'zapdos',
    imageURL: 'https://i.imgur.com/XjO0Xf3.png',
    number: 145,
    type: 'electric',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'moltres',
    imageURL: 'https://i.imgur.com/Viqizia.png',
    number: 146,
    type: 'fire',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'dratini',
    imageURL: 'https://i.imgur.com/aRc2FlC.png',
    number: 147,
    type: 'dragon',
    generationId: 1,
  },
  {
    name: 'dragonair',
    imageURL: 'https://i.imgur.com/zJBLEhN.png',
    number: 148,
    type: 'dragon',
    generationId: 1,
  },
  {
    name: 'dragonite',
    imageURL: 'https://i.imgur.com/ToWiAy7.png',
    number: 149,
    type: 'dragon',
    Type2: 'flying',
    generationId: 1,
  },
  {
    name: 'mewtwo',
    imageURL: 'https://i.imgur.com/Ibaa0O0.png',
    number: 150,
    type: 'psychic',
    generationId: 1,
  },
  {
    name: 'mew',
    imageURL: 'https://i.imgur.com/Xvwm1bG.png',
    number: 151,
    type: 'psychic',
    generationId: 1,
  },
];

export const ALL_POKEMON_JOTHO: any[] = [
  {
    id: 152,
    name: 'chikorita',
    imageURL: 'https://i.imgur.com/ZBuRdUS.png',
    number: 152,
    type: 'Grass',
    generationId: 2,
  },
  {
    id: 153,
    name: 'bayleef',
    imageURL: 'https://i.imgur.com/wEssu3G.png',
    number: 153,
    type: 'Grass',
    generationId: 2,
  },
  {
    id: 154,
    name: 'meganium',
    imageURL: 'https://i.imgur.com/cIHk6OM.png',
    number: 154,
    type: 'Grass',
    generationId: 2,
  },
  {
    id: 155,
    name: 'cyndaquil',
    imageURL: 'https://i.imgur.com/yOEisQo.png',
    number: 155,
    type: 'Fire',
    generationId: 2,
  },
  {
    id: 156,
    name: 'quilava',
    imageURL: 'https://i.imgur.com/GMF4lb4.png',
    number: 156,
    type: 'Fire',
    generationId: 2,
  },
  {
    id: 157,
    name: 'typhlosion',
    imageURL: 'https://i.imgur.com/RFYaXRF.png',
    number: 157,
    type: 'Fire',
    generationId: 2,
  },
  {
    id: 158,
    name: 'totodile',
    imageURL: 'https://i.imgur.com/MAxx6JI.png',
    number: 158,
    type: 'Water',
    generationId: 2,
  },
  {
    id: 159,
    name: 'croconaw',
    imageURL: 'https://i.imgur.com/ycQCHMv.png',
    number: 159,
    type: 'Water',
    generationId: 2,
  },
  {
    id: 160,
    name: 'feraligatr',
    imageURL: 'https://i.imgur.com/BSJbtJt.png',
    number: 160,
    type: 'Water',
    generationId: 2,
  },
  {
    id: 161,
    name: 'sentret',
    imageURL: 'https://i.imgur.com/xudn5jP.png',
    number: 161,
    type: 'Normal',
    generationId: 2,
  },
  {
    id: 162,
    name: 'furret',
    imageURL: 'https://i.imgur.com/CfTyYBd.png',
    number: 162,
    type: 'Normal',
    generationId: 2,
  },
  {
    id: 163,
    name: 'hoothoot',
    imageURL: 'https://i.imgur.com/k0Upumi.png',
    number: 163,
    type: 'Flying',
    type2: 'Normal',
    generationId: 2,
  },
  {
    id: 164,
    name: 'noctowl',
    imageURL: 'https://i.imgur.com/2RNtXcW.png',
    number: 164,
    type: 'Flying',
    type2: 'Normal',
    generationId: 2,
  },
  {
    id: 165,
    name: 'ledyba',
    imageURL: 'https://i.imgur.com/RKcHuxr.png',
    number: 165,
    type: 'Bug',
    type2: 'Flying',
    generationId: 2,
  },
  {
    id: 166,
    name: 'ledian',
    imageURL: 'https://i.imgur.com/bmQPUyb.png',
    number: 166,
    type: 'Bug',
    type2: 'Flying',
    generationId: 2,
  },
  {
    id: 167,
    name: 'spinarak',
    imageURL: 'https://i.imgur.com/qvZsOMh.png',
    number: 167,
    type: 'Bug',
    type2: 'Poison',
    generationId: 2,
  },
  {
    id: 168,
    name: 'ariados',
    imageURL: 'https://i.imgur.com/J4lHTzb.png',
    number: 168,
    type: 'Bug',
    type2: 'Poison',
    generationId: 2,
  },
  {
    id: 169,
    name: 'crobat',
    imageURL: 'https://i.imgur.com/PMTOLQw.png',
    number: 169,
    type: 'Poison',
    type2: 'Flying',
    generationId: 2,
  },
  {
    id: 170,
    name: 'chinchou',
    imageURL: 'https://i.imgur.com/XEdOK9z.png',
    number: 170,
    type: 'Water',
    type2: 'Electric',
    generationId: 2,
  },
  {
    id: 171,
    name: 'lanturn',
    imageURL: 'https://i.imgur.com/ZosVswx.png',
    number: 171,
    type: 'Water',
    type2: 'Electric',
    generationId: 2,
  },
  {
    id: 172,
    name: 'pichu',
    imageURL: 'https://i.imgur.com/vFgObH0.png',
    number: 172,
    type: 'Electric',
    generationId: 2,
  },
  {
    name: 'cleffa',
    imageURL: 'https://i.imgur.com/9yeVPPJ.png',
    type: 'Fairy',
    number: 173,
    generationId: 2,
  },
  {
    name: 'igglybuff',
    imageURL: 'https://i.imgur.com/ZIrV48l.png',
    type: 'Normal',
    type2: 'Fairy',
    number: 174,
    generationId: 2,
  },
  {
    name: 'togepi',
    imageURL: 'https://i.imgur.com/TZdG57x.png',
    type: 'Fairy',
    number: 175,
    generationId: 2,
  },
  {
    name: 'togetic',
    imageURL: 'https://i.imgur.com/UjVYmHI.png',
    type: 'Fairy',
    type2: 'Flying',
    number: 176,
    generationId: 2,
  },
  {
    name: 'natu',
    imageURL: 'https://i.imgur.com/r3gXjQ0.png',
    type: 'Psychic',
    type2: 'Flying',
    number: 177,
    generationId: 2,
  },
  {
    name: 'xatu',
    imageURL: 'https://i.imgur.com/KzJ3ZJN.png',
    type: 'Psychic',
    type2: 'Flying',
    number: 178,
    generationId: 2,
  },
  {
    name: 'mareep',
    imageURL: 'https://i.imgur.com/riOgNFA.png',
    type: 'Electric',
    number: 179,
    generationId: 2,
  },
  {
    name: 'flaaffy',
    imageURL: 'https://i.imgur.com/QH1gHoc.png',
    type: 'Electric',
    number: 180,
    generationId: 2,
  },
  {
    name: 'ampharos',
    imageURL: 'https://i.imgur.com/5AonsM5.png',
    type: 'Electric',
    number: 181,
    generationId: 2,
  },
  {
    name: 'bellossom',
    imageURL: 'https://i.imgur.com/mdUqveJ.png',
    type: 'Grass',
    number: 182,
    generationId: 2,
  },
  {
    name: 'marill',
    imageURL: 'https://i.imgur.com/k9BnGV3.png',
    type: 'Water',
    type2: 'Fairy',
    number: 183,
    generationId: 2,
  },
  {
    name: 'azumarill',
    imageURL: 'https://i.imgur.com/SeKOPe6.png',
    type: 'Water',
    type2: 'Fairy',
    number: 184,
    generationId: 2,
  },
  {
    name: 'sudowoodo',
    imageURL: 'https://i.imgur.com/B4iKdN9.png',
    type: 'Rock',
    number: 185,
    generationId: 2,
  },
  {
    name: 'politoed',
    imageURL: 'https://i.imgur.com/l7teYts.png',
    type: 'Water',
    number: 186,
    generationId: 2,
  },
  {
    name: 'hoppip',
    imageURL: 'https://i.imgur.com/3W7WUJN.png',
    type: 'Grass',
    type2: 'Flying',
    number: 187,
    generationId: 2,
  },
  {
    name: 'skiploom',
    imageURL: 'https://i.imgur.com/4ITldS9.png',
    type: 'Grass',
    type2: 'Flying',
    number: 188,
    generationId: 2,
  },
  {
    name: 'jumpluff',
    imageURL: 'https://i.imgur.com/30TcjUT.png',
    type: 'Grass',
    type2: 'Flying',
    number: 189,
    generationId: 2,
  },
  {
    name: 'aipom',
    imageURL: 'https://i.imgur.com/9hfiBjL.png',
    type: 'Normal',
    number: 190,
    generationId: 2,
  },
  {
    name: 'sunkern',
    imageURL: 'https://i.imgur.com/AMvuqIm.png',
    type: 'Grass',
    number: 191,
    generationId: 2,
  },
  {
    name: 'sunflora',
    imageURL: 'https://i.imgur.com/lPAvHeg.png',
    type: 'Grass',
    number: 192,
    generationId: 2,
  },
  {
    name: 'yanma',
    imageURL: 'https://i.imgur.com/Od7B2po.png',
    type: 'Bug',
    type2: 'Flying',
    number: 193,
    generationId: 2,
  },
  {
    name: 'wooper',
    imageURL: 'https://i.imgur.com/NBvp8Cc.png',
    type: 'Water',
    type2: 'Ground',
    number: 194,
    generationId: 2,
  },
  {
    name: 'quagsire',
    imageURL: 'https://i.imgur.com/TrIGDJy.png',
    type: 'Water',
    type2: 'Ground',
    number: 195,
    generationId: 2,
  },
  {
    name: 'espeon',
    imageURL: 'https://i.imgur.com/X1BDJFk.png',
    type: 'Psychic',
    number: 196,
    generationId: 2,
  },
  {
    name: 'umbreon',
    imageURL: 'https://i.imgur.com/Pzrbnzp.png',
    type: 'Dark',
    number: 197,
    generationId: 2,
  },
  {
    name: 'murkrow',
    imageURL: 'https://i.imgur.com/3iwGYQn.png',
    type: 'Dark',
    type2: 'Flying',
    number: 198,
    generationId: 2,
  },
  {
    name: 'slowking',
    imageURL: 'https://i.imgur.com/R4dShq1.png',
    type: 'Water',
    type2: 'Psychic',
    number: 199,
    generationId: 2,
  },
  {
    name: 'misdreavus',
    imageURL: 'https://i.imgur.com/xHDhGIb.png',
    type: 'Ghost',
    number: 200,
    generationId: 2,
  },
  {
    name: 'unown',
    imageURL: 'https://i.imgur.com/IEOiKsD.png',
    type: 'Psychic',
    number: 201,
    generationId: 2,
  },
  {
    name: 'wobbuffet',
    imageURL: 'https://i.imgur.com/8ly3CP0.png',
    type: 'Psychic',
    number: 202,
    generationId: 2,
  },
  {
    name: 'girafarig',
    imageURL: 'https://i.imgur.com/9XeQw4L.png',
    type: 'Psychic',
    type2: 'Normal',
    number: 203,
    generationId: 2,
  },
  {
    name: 'pineco',
    imageURL: 'https://i.imgur.com/sgBnft5.png',
    type: 'Bug',
    number: 204,
    generationId: 2,
  },
  {
    name: 'forretress',
    imageURL: 'https://i.imgur.com/8CUGeDd.png',
    type: 'Bug',
    type2: 'Steel',
    number: 205,
    generationId: 2,
  },
  {
    name: 'dunsparce',
    imageURL: 'https://i.imgur.com/mw48BQr.png',
    type: 'Normal',
    number: 206,
    generationId: 2,
  },
  {
    name: 'gligar',
    imageURL: 'https://i.imgur.com/i7oBjhA.png',
    type: 'Ground',
    type2: 'Flying',
    number: 207,
    generationId: 2,
  },
  {
    name: 'steelix',
    imageURL: 'https://i.imgur.com/CWFMSCe.png',
    type: 'Steel',
    type2: 'Ground',
    number: 208,
    generationId: 2,
  },
  {
    name: 'snubbull',
    imageURL: 'https://i.imgur.com/XFFG0n1.png',
    type: 'Fairy',
    number: 209,
    generationId: 2,
  },
  {
    name: 'granbull',
    imageURL: 'https://i.imgur.com/aNCNSD5.png',
    type: 'Fairy',
    number: 210,
    generationId: 2,
  },
  {
    name: 'qwilfish',
    imageURL: 'https://i.imgur.com/SIQSBjz.png',
    type: 'Water',
    type2: 'Poison',
    number: 211,
    generationId: 2,
  },
  {
    name: 'scizor',
    imageURL: 'https://i.imgur.com/4hTeNFw.png',
    type: 'Bug',
    type2: 'Steel',
    number: 212,
    generationId: 2,
  },
  {
    name: 'shuckle',
    imageURL: 'https://i.imgur.com/cdObIDd.png',
    type: 'Bug',
    type2: 'Rock',
    number: 213,
    generationId: 2,
  },
  {
    name: 'heracross',
    imageURL: 'https://i.imgur.com/0nSRjAl.png',
    type: 'Bug',
    type2: 'Fighting',
    number: 214,
    generationId: 2,
  },
  {
    name: 'sneasel',
    imageURL: 'https://i.imgur.com/H1i5gey.png',
    type: 'Dark',
    type2: 'Ice',
    number: 215,
    generationId: 2,
  },
  {
    name: 'teddiursa',
    imageURL: 'https://i.imgur.com/GZ5aAi1.png',
    type: 'Normal',
    number: 216,
    generationId: 2,
  },
  {
    name: 'ursaring',
    imageURL: 'https://i.imgur.com/hvtv3z4.png',
    type: 'Normal',
    number: 217,
    generationId: 2,
  },
  {
    name: 'slugma',
    imageURL: 'https://i.imgur.com/ObhHlI7.png',
    type: 'Fire',
    number: 218,
    generationId: 2,
  },
  {
    name: 'magcargo',
    imageURL: 'https://i.imgur.com/6hICxQ4.png',
    type: 'Fire',
    type2: 'Rock',
    number: 219,
    generationId: 2,
  },
  {
    name: 'swinub',
    imageURL: 'https://i.imgur.com/giWSATv.png',
    type: 'Ice',
    type2: 'Ground',
    number: 220,
    generationId: 2,
  },
  {
    name: 'piloswine',
    imageURL: 'https://i.imgur.com/zWEuBtT.png',
    type: 'Ice',
    type2: 'Ground',
    number: 221,
    generationId: 2,
  },
  {
    name: 'corsola',
    imageURL: 'https://i.imgur.com/KustYs2.png',
    type: 'Water',
    type2: 'Rock',
    number: 222,
    generationId: 2,
  },
  {
    name: 'remoraid',
    imageURL: 'https://i.imgur.com/d8NJG6p.png',
    type: 'Water',
    number: 223,
    generationId: 2,
  },
  {
    name: 'octillery',
    imageURL: 'https://i.imgur.com/mKakvj8.png',
    type: 'Water',
    number: 224,
    generationId: 2,
  },
  {
    name: 'delibird',
    imageURL: 'https://i.imgur.com/XYiB0E0.png',
    type: 'Ice',
    type2: 'Flying',
    number: 225,
    generationId: 2,
  },
  {
    name: 'mantine',
    imageURL: 'https://i.imgur.com/tNATm9s.png',
    type: 'Water',
    type2: 'Flying',
    number: 226,
    generationId: 2,
  },
  {
    name: 'skarmory',
    imageURL: 'https://i.imgur.com/Ih807mN.png',
    type: 'Steel',
    type2: 'Flying',
    number: 227,
    generationId: 2,
  },
  {
    name: 'houndour',
    imageURL: 'https://i.imgur.com/dkd0jhG.png',
    type: 'Dark',
    type2: 'Fire',
    number: 228,
    generationId: 2,
  },
  {
    name: 'houndoom',
    imageURL: 'https://i.imgur.com/fA5znh4.png',
    type: 'Dark',
    type2: 'Fire',
    number: 229,
    generationId: 2,
  },
  {
    name: 'kingdra',
    imageURL: 'https://i.imgur.com/6JHBBuI.png',
    type: 'Water',
    type2: 'Dragon',
    number: 230,
    generationId: 2,
  },
  {
    name: 'phanpy',
    imageURL: 'https://i.imgur.com/ok3fhGC.png',
    type: 'Ground',
    number: 231,
    generationId: 2,
  },
  {
    name: 'donphan',
    imageURL: 'https://i.imgur.com/vA0AClS.png',
    type: 'Ground',
    number: 232,
    generationId: 2,
  },
  {
    name: 'porygon2',
    imageURL: 'https://i.imgur.com/4clmqMG.png',
    type: 'Normal',
    number: 233,
    generationId: 2,
  },
  {
    name: 'stantler',
    imageURL: 'https://i.imgur.com/lkQVGU5.png',
    type: 'Normal',
    number: 234,
    generationId: 2,
  },
  {
    name: 'smeargle',
    imageURL: 'https://i.imgur.com/7ccLziP.png',
    type: 'Normal',
    number: 235,
    generationId: 2,
  },
  {
    name: 'tyrogue',
    imageURL: 'https://i.imgur.com/lWekfIc.png',
    type: 'Fighting',
    number: 236,
    generationId: 2,
  },
  {
    name: 'hitmontop',
    imageURL: 'https://i.imgur.com/iOnTbGG.png',
    type: 'Fighting',
    number: 237,
    generationId: 2,
  },
  {
    name: 'smoochum',
    imageURL: 'https://i.imgur.com/X5ecMBF.png',
    type: 'Ice',
    type2: 'Psychic',
    number: 238,
    generationId: 2,
  },
  {
    name: 'elekid',
    imageURL: 'https://i.imgur.com/qnskffA.png',
    type: 'Electric',
    number: 239,
    generationId: 2,
  },
  {
    name: 'magby',
    imageURL: 'https://i.imgur.com/CJURutW.png',
    type: 'Fire',
    number: 240,
    generationId: 2,
  },
  {
    name: 'miltank',
    imageURL: 'https://i.imgur.com/UVbk3BX.png',
    type: 'Normal',
    number: 241,
    generationId: 2,
  },
  {
    name: 'blissey',
    imageURL: 'https://i.imgur.com/8l5hbxb.png',
    type: 'Normal',
    number: 242,
    generationId: 2,
  },
  {
    name: 'raikou',
    imageURL: 'https://i.imgur.com/uEUmbHz.png',
    type: 'Electric',
    number: 243,
    generationId: 2,
  },
  {
    name: 'entei',
    imageURL: 'https://i.imgur.com/63V65hh.png',
    type: 'Fire',
    number: 244,
    generationId: 2,
  },
  {
    name: 'suicune',
    imageURL: 'https://i.imgur.com/Uljbrv2.png',
    type: 'Water',
    number: 245,
    generationId: 2,
  },
  {
    name: 'larvitar',
    imageURL: 'https://i.imgur.com/QKsnCm4.png',
    type: 'Rock',
    type2: 'Ground',
    number: 246,
    generationId: 2,
  },
  {
    name: 'pupitar',
    imageURL: 'https://i.imgur.com/M2r1JBX.png',
    type: 'Rock',
    type2: 'Ground',
    number: 247,
    generationId: 2,
  },
  {
    name: 'tyranitar',
    imageURL: 'https://i.imgur.com/VcnZD2A.png',
    type: 'Rock',
    type2: 'Dark',
    number: 248,
    generationId: 2,
  },
  {
    name: 'lugia',
    imageURL: 'https://i.imgur.com/v26upq4.png',
    type: 'Psychic',
    type2: 'Flying',
    number: 249,
    generationId: 2,
  },
  {
    name: 'ho-oh',
    imageURL: 'https://i.imgur.com/bxRBlLu.png',
    type: 'Fire',
    type2: 'Flying',
    number: 250,
    generationId: 2,
  },
  {
    name: 'celebi',
    imageURL: 'https://i.imgur.com/KwGwTnL.png',
    type: 'Psychic',
    type2: 'Grass',
    number: 251,
    generationId: 2,
  },
];

export const ALL_POKEMON_HOENN: any = [
  {
    name: "treecko",
    imageURL: "https://i.imgur.com/s19zc4Q.png",
    number: 252,
    type: "Grass",
    generationId: 3
  },
  {
    name: "grovyle",
    imageURL: "https://i.imgur.com/7vpznTw.png",
    number: 253,
    type: "Grass",
    generationId: 3
  },
  {
    name: "sceptile",
    imageURL: "https://i.imgur.com/wBJcRaL.png",
    number: 254,
    type: "Grass",
    generationId: 3
  },
  {
    name: "torchic",
    imageURL: "https://i.imgur.com/v3cHHdi.png",
    number: 255,
    type: "Fire",
    generationId: 3
  },
  {
    name: "combusken",
    imageURL: "https://i.imgur.com/mBs5dUh.png",
    number: 256,
    type: "Fire",
    type2: "Fighting",
    generationId: 3
  },
  {
    name: "blaziken",
    imageURL: "https://i.imgur.com/2ZreP7i.png",
    number: 257,
    type: "Fire",
    type2: "Fighting",
    generationId: 3
  },
  {
    name: "mudkip",
    imageURL: "https://i.imgur.com/06jDjto.png",
    number: 258,
    type: "Water",
    generationId: 3
  },
  {
    name: "marshtomp",
    imageURL: "https://i.imgur.com/V1zWOdZ.png",
    number: 259,
    type: "Water",
    type2: "Ground",
    generationId: 3
  },
  {
    name: "swampert",
    imageURL: "https://i.imgur.com/SeJXdpj.png",
    number: 260,
    type: "Water",
    type2: "Ground",
    generationId: 3
  },
  {
    name: "poochyena",
    imageURL: "https://i.imgur.com/odXgqVZ.png",
    number: 261,
    type: "Dark",
    generationId: 3
  },
  {
    name: "mightyena",
    imageURL: "https://i.imgur.com/MXPLJoj.png",
    number: 262,
    type: "Dark",
    generationId: 3
  },
  {
    name: "zigzagoon",
    imageURL: "https://i.imgur.com/RPVX3g4.png",
    number: 263,
    type: "Normal",
    generationId: 3
  },
  {
    name: "linoone",
    imageURL: "https://i.imgur.com/o4DKfBh.png",
    number: 264,
    type: "Normal",
    generationId: 3
  },
  {
    name: "wurmple",
    imageURL: "https://i.imgur.com/RW77EOE.png",
    number: 265,
    type: "Bug",
    generationId: 3
  },
  {
    name: "silcoon",
    imageURL: "https://i.imgur.com/OsFJNav.png",
    number: 266,
    type: "Bug",
    generationId: 3
  },
  {
    name: "beautifly",
    imageURL: "https://i.imgur.com/dH383Cn.png",
    number: 267,
    type: "Bug",
    type2: "Flying",
    generationId: 3
  },
  {
    name: "cascoon",
    imageURL: "https://i.imgur.com/VIq0Hja.png",
    number: 268,
    type: "Bug",
    generationId: 3
  },
  {
    name: "dustox",
    imageURL: "https://i.imgur.com/7T68xPL.png",
    number: 269,
    type: "Bug",
    type2: "Poison",
    generationId: 3
  },
  {
    name: "lotad",
    imageURL: "https://i.imgur.com/EN0vfpz.png",
    number: 270,
    type: "Water",
    type2: "Grass",
    generationId: 3
  },
  {
    name: "lombre",
    imageURL: "https://i.imgur.com/o8XvbmM.png",
    number: 271,
    type: "Water",
    type2: "Grass",
    generationId: 3
  },
  {
    name: "ludicolo",
    imageURL: "https://i.imgur.com/GWpx2H0.png",
    number: 272,
    type: "Water",
    type2: "Grass",
    generationId: 3
  },
  {
    name: "seedot",
    imageURL: "https://i.imgur.com/f2Om5cy.png",
    number: 273,
    type: "Grass",
    generationId: 3
  },
  {
    name: "nuzleaf",
    imageURL: "https://i.imgur.com/tJ3ag56.png",
    number: 274,
    type: "Grass",
    type2: "Dark",
    generationId: 3
  },
  {
    name: "shiftry",
    imageURL: "https://i.imgur.com/SbFabPj.png",
    number: 275,
    type: "Grass",
    type2: "Dark",
    generationId: 3
  },
  {
    name: "taillow",
    imageURL: "https://i.imgur.com/X1Sv13A.png",
    number: 276,
    type: "Normal",
    type2: "Flying",
    generationId: 3
  },
  {
    name: "swellow",
    imageURL: "https://i.imgur.com/XbdnafH.png",
    number: 277,
    type: "Normal",
    type2: "Flying",
    generationId: 3
  },
  {
    name: "wingull",
    imageURL: "https://i.imgur.com/sNZlUa4.png",
    number: 278,
    type: "Water",
    type2: "Flying",
    generationId: 3
  },
  {
    name: "pelipper",
    imageURL: "https://i.imgur.com/ZLkNAv9.png",
    number: 279,
    type: "Water",
    type2: "Flying",
    generationId: 3
  },
  {
    name: "ralts",
    imageURL: "https://i.imgur.com/UDjz7OS.png",
    number: 280,
    type: "Psychic",
    type2: "Fairy",
    generationId: 3
  },
  {
    name: "kirlia",
    imageURL: "https://i.imgur.com/Jb0l1bp.png",
    number: 281,
    type: "Psychic",
    type2: "Fairy",
    generationId: 3
  },
  {
    name: "gardevoir",
    imageURL: "https://i.imgur.com/zP0k3As.png",
    number: 282,
    type: "Psychic",
    type2: "Fairy",
    generationId: 3
  },
  {
    name: "surskit",
    imageURL: "https://i.imgur.com/AED6s32.png",
    number: 283,
    type: "Bug",
    type2: "Water",
    generationId: 3
  },
  {
    name: "masquerain",
    imageURL: "https://i.imgur.com/HxTAnYV.png",
    number: 284,
    type: "Bug",
    type2: "Flying",
    generationId: 3
  },
  {
    name: "shroomish",
    imageURL: "https://i.imgur.com/jldlvBc.png",
    number: 285,
    type: "Grass",
    generationId: 3
  },
  {
    name: "breloom",
    imageURL: "https://i.imgur.com/yvXP93Z.png",
    number: 286,
    type: "Grass",
    type2: "Fighting",
    generationId: 3
  },
  {
    name: "slakoth",
    imageURL: "https://i.imgur.com/arS5EcQ.png",
    number: 287,
    type: "Normal",
    generationId: 3
  },
  {
    name: "vigoroth",
    imageURL: "https://i.imgur.com/pathuQj.png",
    number: 288,
    type: "Normal",
    generationId: 3
  },
  {
    name: "slaking",
    imageURL: "https://i.imgur.com/evgEVac.png",
    number: 289,
    type: "Normal",
    generationId: 3
  },
  {
    name: "nincada",
    imageURL: "https://i.imgur.com/qBru1KC.png",
    number: 290,
    type: "Bug",
    type2: "Ground",
    generationId: 3
  },
  {
    name: "ninjask",
    imageURL: "https://i.imgur.com/NQx0A3y.png",
    number: 291,
    type: "Bug",
    type2: "Flying",
    generationId: 3
  },
  {
    name: "shedinja",
    imageURL: "https://i.imgur.com/Ex51vMe.png",
    number: 292,
    type: "Bug",
    type2: "Ghost",
    generationId: 3
  },
  {
    name: "whismur",
    imageURL: "https://i.imgur.com/AqfBfeI.png",
    number: 293,
    type: "Normal",
    generationId: 3
  },
  {
    name: "loudred",
    imageURL: "https://i.imgur.com/k8KaUNU.png",
    number: 294,
    type: "Normal",
    generationId: 3
  },
  {
    name: "exploud",
    imageURL: "https://i.imgur.com/QqU5WPG.png",
    number: 295,
    type: "Normal",
    generationId: 3
  },
  {
    name: "makuhita",
    imageURL: "https://i.imgur.com/Icq3Gk7.png",
    number: 296,
    type: "Fighting",
    generationId: 3
  },
  {
    name: "hariyama",
    imageURL: "https://i.imgur.com/gxfzdtD.png",
    number: 297,
    type: "Fighting",
    generationId: 3
  },
  {
    name: "azurill",
    imageURL: "https://i.imgur.com/1Trbv8n.png",
    number: 298,
    type: "Normal",
    type2: "Fairy",
    generationId: 3
  },
  {
    name: "nosepass",
    imageURL: "https://i.imgur.com/wUxKqRg.png",
    number: 299,
    type: "Rock",
    generationId: 3
  },
  {
    name: "skitty",
    imageURL: "https://i.imgur.com/dA17M7Y.png",
    number: 300,
    type: "Normal",
    generationId: 3
  },
  {
    name: "delcatty",
    imageURL: "https://i.imgur.com/npgoVDd.png",
    number: 301,
    type: "Normal",
    generationId: 3
  },
  {
    name: "sableye",
    imageURL: "https://i.imgur.com/Rb0U2vS.png",
    number: 302,
    type: "Dark",
    type2: "Ghost",
    generationId: 3
  },
  {
    name: "mawile",
    imageURL: "https://i.imgur.com/HmBnfJy.png",
    number: 303,
    type: "Steel",
    type2: "Fairy",
    generationId: 3
  },
  {
    name: "aron",
    imageURL: "https://i.imgur.com/5nRRzSf.png",
    number: 304,
    type: "Steel",
    type2: "Rock",
    generationId: 3
  },
  {
    name: "lairon",
    imageURL: "https://i.imgur.com/uofpQEp.png",
    number: 305,
    type: "Steel",
    type2: "Rock",
    generationId: 3
  },
  {
    name: "aggron",
    imageURL: "https://i.imgur.com/29iPrQn.png",
    number: 306,
    type: "Steel",
    type2: "Rock",
    generationId: 3
  },
  {
    name: "meditite",
    imageURL: "https://i.imgur.com/qPnhMBM.png",
    number: 307,
    type: "Fighting",
    type2: "Psychic",
    generationId: 3
  },
  {
    name: "medicham",
    imageURL: "https://i.imgur.com/RlBvqCr.png",
    number: 308,
    type: "Fighting",
    type2: "Psychic",
    generationId: 3
  },
  {
    name: "electrike",
    imageURL: "https://i.imgur.com/NIfpfEV.png",
    number: 309,
    type: "Electric",
    generationId: 3
  },
  {
    name: "manectric",
    imageURL: "https://i.imgur.com/UzZg8Lt.png",
    number: 310,
    type: "Electric",
    generationId: 3
  },
  {
    name: "plusle",
    imageURL: "https://i.imgur.com/fRlX5bv.png",
    number: 311,
    type: "Electric",
    generationId: 3
  },
  {
    name: "minun",
    imageURL: "https://i.imgur.com/OVyxHJP.png",
    number: 312,
    type: "Electric",
    generationId: 3
  },
  {
    name: "volbeat",
    imageURL: "https://i.imgur.com/OYJoDku.png",
    number: 313,
    type: "Bug",
    generationId: 3
  },
  {
    name: "illumise",
    imageURL: "https://i.imgur.com/QhH2yun.png",
    number: 314,
    type: "Bug",
    generationId: 3
  },
  {
    name: "roselia",
    imageURL: "https://i.imgur.com/uSGn14a.png",
    number: 315,
    type: "Grass",
    type2: "Poison",
    generationId: 3
  },
  {
    name: "gulpin",
    imageURL: "https://i.imgur.com/OFdSJPH.png",
    number: 316,
    type: "Poison",
    generationId: 3
  },
  {
    name: "swalot",
    imageURL: "https://i.imgur.com/bwOypvz.png",
    number: 317,
    type: "Poison",
    generationId: 3
  },
  {
    name: "carvanha",
    imageURL: "https://i.imgur.com/FWMvGrb.png",
    number: 318,
    type: "Water",
    type2: "Dark",
    generationId: 3
  },
  {
    name: "sharpedo",
    imageURL: "https://i.imgur.com/oywpVl0.png",
    number: 319,
    type: "Water",
    type2: "Dark",
    generationId: 3
  },
  {
    name: "wailmer",
    imageURL: "https://i.imgur.com/XrUKBlw.png",
    number: 320,
    type: "Water",
    generationId: 3
  },
  {
    name: "wailord",
    imageURL: "https://i.imgur.com/czRjaAc.png",
    number: 321,
    type: "Water",
    generationId: 3
  },
  {
    name: "numel",
    imageURL: "https://i.imgur.com/mOZBYPa.png",
    number: 322,
    type: "Fire",
    type2: "Ground",
    generationId: 3
  },
  {
    name: "camerupt",
    imageURL: "https://i.imgur.com/iVpigWa.png",
    number: 323,
    type: "Fire",
    type2: "Ground",
    generationId: 3
  },
  {
    name: "torkoal",
    imageURL: "https://i.imgur.com/t318U3p.png",
    number: 324,
    type: "Fire",
    generationId: 3
  },
  {
    name: "spoink",
    imageURL: "https://i.imgur.com/iUsRBrg.png",
    number: 325,
    type: "Psychic",
    generationId: 3
  },
  {
    name: "grumpig",
    imageURL: "https://i.imgur.com/uYDoIwp.png",
    number: 326,
    type: "Psychic",
    generationId: 3
  },
  {
    name: "spinda",
    imageURL: "https://i.imgur.com/f4rbOIk.png",
    number: 327,
    type: "Normal",
    generationId: 3
  },
  {
    name: "trapinch",
    imageURL: "https://i.imgur.com/zrOInzG.png",
    number: 328,
    type: "Ground",
    generationId: 3
  },
  {
    name: "vibrava",
    imageURL: "https://i.imgur.com/4vG65Po.png",
    number: 329,
    type: "Ground",
    type2: "Dragon",
    generationId: 3
  },
  {
    name: "flygon",
    imageURL: "https://i.imgur.com/jN7SL2e.png",
    number: 330,
    type: "Ground",
    type2: "Dragon",
    generationId: 3
  },
  {
    name: "cacnea",
    imageURL: "https://i.imgur.com/1eOzC8a.png",
    number: 331,
    type: "Grass",
    generationId: 3
  },
  {
    name: "cacturne",
    imageURL: "https://i.imgur.com/e8SP18V.png",
    number: 332,
    type: "Grass",
    type2: "Dark",
    generationId: 3
  },
  {
    name: "swablu",
    imageURL: "https://i.imgur.com/2PcGGkd.png",
    number: 333,
    type: "Normal",
    type2: "Flying",
    generationId: 3
  },
  {
    name: "altaria",
    imageURL: "https://i.imgur.com/vUbIBCd.png",
    number: 334,
    type: "Dragon",
    type2: "Flying",
    generationId: 3
  },
  {
    name: "zangoose",
    imageURL: "https://i.imgur.com/pdsv4LH.png",
    number: 335,
    type: "Normal",
    generationId: 3
  },
  {
    name: "seviper",
    imageURL: "https://i.imgur.com/8CwhYXk.png",
    number: 336,
    type: "Poison",
    generationId: 3
  },
  {
    name: "lunatone",
    imageURL: "https://i.imgur.com/qYf07bM.png",
    number: 337,
    type: "Rock",
    type2: "Psychic",
    generationId: 3
  },
  {
    name: "solrock",
    imageURL: "https://i.imgur.com/DqMMnip.png",
    number: 338,
    type: "Rock",
    type2: "Psychic",
    generationId: 3
  },
  {
    name: "barboach",
    imageURL: "https://i.imgur.com/pUtekzU.png",
    number: 339,
    type: "Water",
    type2: "Ground",
    generationId: 3
  },
  {
    name: "whiscash",
    imageURL: "https://i.imgur.com/nqypdym.png",
    number: 340,
    type: "Water",
    type2: "Ground",
    generationId: 3
  },
  {
    name: "corphish",
    imageURL: "https://i.imgur.com/BcnjwM3.png",
    number: 341,
    type: "Water",
    generationId: 3
  },
  {
    name: "crawdaunt",
    imageURL: "https://i.imgur.com/biKUIJK.png",
    number: 342,
    type: "Water",
    type2: "Dark",
    generationId: 3
  },
  {
    name: "baltoy",
    imageURL: "https://i.imgur.com/c5CIpcD.png",
    number: 343,
    type: "Ground",
    type2: "Psychic",
    generationId: 3
  },
  {
    name: "claydol",
    imageURL: "https://i.imgur.com/M1L0Rvq.png",
    number: 344,
    type: "Ground",
    type2: "Psychic",
    generationId: 3
  },
  {
    name: "lileep",
    imageURL: "https://i.imgur.com/ZqJY6Da.png",
    number: 345,
    type: "Rock",
    type2: "Grass",
    generationId: 3
  },
  {
    name: "cradily",
    imageURL: "https://i.imgur.com/4qAzw68.png",
    number: 346,
    type: "Rock",
    type2: "Grass",
    generationId: 3
  },
  {
    name: "anorith",
    imageURL: "https://i.imgur.com/qW3S0Nv.png",
    number: 347,
    type: "Rock",
    type2: "Bug",
    generationId: 3
  },
  {
    name: "armaldo",
    imageURL: "https://i.imgur.com/lr7UOSs.png",
    number: 348,
    type: "Rock",
    type2: "Bug",
    generationId: 3
  },
  {
    name: "feebas",
    imageURL: "https://i.imgur.com/fC9G7rH.png",
    number: 349,
    type: "Water",
    generationId: 3
  },
  {
    name: "milotic",
    imageURL: "https://i.imgur.com/jZtDYY1.png",
    number: 350,
    type: "Water",
    generationId: 3
  },
  {
    name: "castform",
    imageURL: "https://i.imgur.com/MsXqImB.png",
    number: 351,
    type: "Normal",
    generationId: 3
  },
  {
    name: "kecleon",
    imageURL: "https://i.imgur.com/5yHrB1J.png",
    number: 352,
    type: "Normal",
    generationId: 3
  },
  {
    name: "shuppet",
    imageURL: "https://i.imgur.com/2WxBknG.png",
    number: 353,
    type: "Ghost",
    generationId: 3
  },
  {
    name: "banette",
    imageURL: "https://i.imgur.com/v4Q4SNO.png",
    number: 354,
    type: "Ghost",
    generationId: 3
  },
  {
    name: "duskull",
    imageURL: "https://i.imgur.com/1brmjdL.png",
    number: 355,
    type: "Ghost",
    generationId: 3
  },
  {
    name: "dusclops",
    imageURL: "https://i.imgur.com/NSBzEvE.png",
    number: 356,
    type: "Ghost",
    generationId: 3
  },
  {
    name: "tropius",
    imageURL: "https://i.imgur.com/NEUbZjX.png",
    number: 357,
    type: "Grass",
    type2: "Flying",
    generationId: 3
  },
  {
    name: "chimecho",
    imageURL: "https://i.imgur.com/7isRDZH.png",
    number: 358,
    type: "Psychic",
    generationId: 3
  },
  {
    name: "absol",
    imageURL: "https://i.imgur.com/CPw4Wlt.png",
    number: 359,
    type: "Dark",
    generationId: 3
  },
  {
    name: "wynaut",
    imageURL: "https://i.imgur.com/5ndxNDG.png",
    number: 360,
    type: "Psychic",
    generationId: 3
  },
  {
    name: "snorunt",
    imageURL: "https://i.imgur.com/N20YlmU.png",
    number: 361,
    type: "Ice",
    generationId: 3
  },
  {
    name: "glalie",
    imageURL: "https://i.imgur.com/DC7Yhbh.png",
    number: 362,
    type: "Ice",
    generationId: 3
  },
  {
    name: "spheal",
    imageURL: "https://i.imgur.com/l5sqX2h.png",
    number: 363,
    type: "Ice",
    type2: "Water",
    generationId: 3
  },
  {
    name: "sealeo",
    imageURL: "https://i.imgur.com/NfjtYOJ.png",
    number: 364,
    type: "Ice",
    type2: "Water",
    generationId: 3
  },
  {
    name: "walrein",
    imageURL: "https://i.imgur.com/qdauw8G.png",
    number: 365,
    type: "Ice",
    type2: "Water",
    generationId: 3
  },
  {
    name: "clamperl",
    imageURL: "https://i.imgur.com/Oc6k7zY.png",
    number: 366,
    type: "Water",
    generationId: 3
  },
  {
    name: "huntail",
    imageURL: "https://i.imgur.com/elqNnLT.png",
    number: 367,
    type: "Water",
    generationId: 3
  },
  {
    name: "gorebyss",
    imageURL: "https://i.imgur.com/TU50HtT.png",
    number: 368,
    type: "Water",
    generationId: 3
  },
  {
    name: "relicanth",
    imageURL: "https://i.imgur.com/ysiMToR.png",
    number: 369,
    type: "Water",
    type2: "Rock",
    generationId: 3
  },
  {
    name: "luvdisc",
    imageURL: "https://i.imgur.com/nZYZuP5.png",
    number: 370,
    type: "Water",
    generationId: 3
  },
  {
    name: "bagon",
    imageURL: "https://i.imgur.com/ACQ6eVw.png",
    number: 371,
    type: "Dragon",
    generationId: 3
  },
  {
    name: "shelgon",
    imageURL: "https://i.imgur.com/n55FPQ1.png",
    number: 372,
    type: "Dragon",
    generationId: 3
  },
  {
    name: "salamence",
    imageURL: "https://i.imgur.com/fVkxUG0.png",
    number: 373,
    type: "Dragon",
    type2: "Flying",
    generationId: 3
  },
  {
    name: "beldum",
    imageURL: "https://i.imgur.com/XQppKKI.png",
    number: 374,
    type: "Steel",
    type2: "Psychic",
    generationId: 3
  },
  {
    name: "metang",
    imageURL: "https://i.imgur.com/VD4Doxq.png",
    number: 375,
    type: "Steel",
    type2: "Psychic",
    generationId: 3
  },
  {
    name: "metagross",
    imageURL: "https://i.imgur.com/NwzRRTa.png",
    number: 376,
    type: "Steel",
    type2: "Psychic",
    generationId: 3
  },
  {
    name: "regirock",
    imageURL: "https://i.imgur.com/ieM5rDT.png",
    number: 377,
    type: "Rock",
    generationId: 3
  },
  {
    name: "regice",
    imageURL: "https://i.imgur.com/DE3EhG6.png",
    number: 378,
    type: "Ice",
    generationId: 3
  },
  {
    name: "registeel",
    imageURL: "https://i.imgur.com/zf2d9fW.png",
    number: 379,
    type: "Steel",
    generationId: 3
  },
  {
    name: "latias",
    imageURL: "https://i.imgur.com/u40ePhX.png",
    number: 380,
    type: "Dragon",
    type2: "Psychic",
    generationId: 3
  },
  {
    name: "latios",
    imageURL: "https://i.imgur.com/fVYx2xd.png",
    number: 381,
    type: "Dragon",
    type2: "Psychic",
    generationId: 3
  },
  {
    name: "kyogre",
    imageURL: "https://i.imgur.com/AdUzokP.png",
    number: 382,
    type: "Water",
    generationId: 3
  },
  {
    name: "groudon",
    imageURL: "https://i.imgur.com/jzbCLqO.png",
    number: 383,
    type: "Ground",
    generationId: 3
  },
  {
    name: "rayquaza",
    imageURL: "https://i.imgur.com/Jn8kOqD.png",
    number: 384,
    type: "Dragon",
    type2: "Flying",
    generationId: 3
  },
  {
    name: "jirachi",
    imageURL: "https://i.imgur.com/cplMbD2.png",
    number: 385,
    type: "Steel",
    type2: "Psychic",
    generationId: 3
  },
  {
    name: "deoxys-normal",
    imageURL: "https://i.imgur.com/KSPjQ3N.png",
    number: 386,
    type: "Psychic",
    generationId: 3
  }
];

export const ALL_POKEMON_SINNOH: any = [
  {
    name: "turtwig",
    imageURL: "https://i.imgur.com/vORBqTm.png",
    number: 387,
    generationId: 4,
    type: "Grass",
  },
  {
    name: "grotle",
    imageURL: "https://i.imgur.com/RR0FIek.png",
    number: 388,
    generationId: 4,
    type: "Grass",
  },
  {
    name: "torterra",
    imageURL: "https://i.imgur.com/C8SfdqC.png",
    number: 389,
    generationId: 4,
    type: "Grass",
    type2: "Ground"
  },
  {
    name: "chimchar",
    imageURL: "https://i.imgur.com/OEEC7h0.png",
    number: 390,
    generationId: 4,
    type: "Fire",
  },
  {
    name: "monferno",
    imageURL: "https://i.imgur.com/wYOBimZ.png",
    number: 391,
    generationId: 4,
    type: "Fire",
    type2: "Fighting"
  },
  {
    name: "infernape",
    imageURL: "https://i.imgur.com/g1XY1AS.png",
    number: 392,
    generationId: 4,
    type: "Fire",
    type2: "Fighting"
  },
  {
    name: "piplup",
    imageURL: "https://i.imgur.com/5xlZVu5.png",
    number: 393,
    generationId: 4,
    type: "Water",
  },
  {
    name: "prinplup",
    imageURL: "https://i.imgur.com/rWTq0JN.png",
    number: 394,
    generationId: 4,
    type: "Water",
  },
  {
    name: "empoleon",
    imageURL: "https://i.imgur.com/Ujqxfrp.png",
    number: 395,
    generationId: 4,
    type: "Water",
    type2: "Steel"
  },
  {
    name: "starly",
    imageURL: "https://i.imgur.com/KiMxZbR.png",
    number: 396,
    generationId: 4,
    type: "Normal",
    type2: "Flying"
  },
  {
    name: "staravia",
    imageURL: "https://i.imgur.com/83TfPto.png",
    number: 397,
    generationId: 4,
    type: "Normal",
    type2: "Flying"
  },
  {
    name: "staraptor",
    imageURL: "https://i.imgur.com/iIbnGiF.png",
    number: 398,
    generationId: 4,
    type: "Normal",
    type2: "Flying"
  },
  {
    name: "bidoof",
    imageURL: "https://i.imgur.com/tcCACD2.png",
    number: 399,
    generationId: 4,
    type: "Normal",
  },
  {
    name: "bibarel",
    imageURL: "https://i.imgur.com/75QDorG.png",
    number: 400,
    generationId: 4,
    type: "Normal",
    type2: "Water"
  },
  {
    name: "kricketot",
    imageURL: "https://i.imgur.com/FjLubag.png",
    number: 401,
    generationId: 4,
    type: "Bug",
  },
  {
    name: "kricketune",
    imageURL: "https://i.imgur.com/SY9FTGn.png",
    number: 402,
    generationId: 4,
    type: "Bug",
  },
  {
    name: "shinx",
    imageURL: "https://i.imgur.com/nTMMLwv.png",
    number: 403,
    generationId: 4,
    type: "Electric",
  },
  {
    name: "luxio",
    imageURL: "https://i.imgur.com/4j7ZLYA.png",
    number: 404,
    generationId: 4,
    type: "Electric",
  },
  {
    name: "luxray",
    imageURL: "https://i.imgur.com/1DSvoFZ.png",
    number: 405,
    generationId: 4,
    type: "Electric",
  },
  {
    name: "budew",
    imageURL: "https://i.imgur.com/vQh1mq3.png",
    number: 406,
    generationId: 4,
    type: "Grass",
    type2: "Poison"
  },
  {
    name: "roserade",
    imageURL: "https://i.imgur.com/1L7t6l4.png",
    number: 407,
    generationId: 4,
    type: "Grass",
    type2: "Poison"
  },
  {
    name: "cranidos",
    imageURL: "https://i.imgur.com/2yj0iJg.png",
    number: 408,
    generationId: 4,
    type: "Rock",
  },
  {
    name: "rampardos",
    imageURL: "https://i.imgur.com/CnISnAg.png",
    number: 409,
    generationId: 4,
    type: "Rock",
  },
  {
    name: "shieldon",
    imageURL: "https://i.imgur.com/nnKVh5d.png",
    number: 410,
    generationId: 4,
    type: "Rock",
    type2: "Steel"
  },
  {
    name: "bastiodon",
    imageURL: "https://i.imgur.com/yNfqvLH.png",
    number: 411,
    generationId: 4,
    type: "Rock",
    type2: "Steel"
  },
  {
    name: "burmy",
    imageURL: "https://i.imgur.com/OI2sG58.png",
    number: 412,
    generationId: 4,
    type: "Bug",
  },
  {
    name: "wormadam-plant",
    imageURL: "https://i.imgur.com/N2qqQoS.png",
    number: 413,
    generationId: 4,
    type: "Bug",
    type2: "Grass"
  },
  {
    name: "mothim",
    imageURL: "https://i.imgur.com/uRluJA0.png",
    number: 414,
    generationId: 4,
    type: "Bug",
    type2: "Flying"
  },
  {
    name: "combee",
    imageURL: "https://i.imgur.com/KtPtk9P.png",
    number: 415,
    generationId: 4,
    type: "Bug",
    type2: "Flying"
  },
  {
    name: "vespiquen",
    imageURL: "https://i.imgur.com/Vt2qFlw.png",
    number: 416,
    generationId: 4,
    type: "Bug",
    type2: "Flying"
  },
  {
    name: "pachirisu",
    imageURL: "https://i.imgur.com/Fo3xHLG.png",
    number: 417,
    generationId: 4,
    type: "Electric",
  },
  {
    name: "buizel",
    imageURL: "https://i.imgur.com/Xzwr89n.png",
    number: 418,
    generationId: 4,
    type: "Water",
  },
  {
    name: "floatzel",
    imageURL: "https://i.imgur.com/zJuv8Yz.png",
    number: 419,
    generationId: 4,
    type: "Water",
  },
  {
    name: "cherubi",
    imageURL: "https://i.imgur.com/4agvqWL.png",
    number: 420,
    generationId: 4,
    type: "Grass",
  },
  {
    name: "cherrim",
    imageURL: "https://i.imgur.com/stzWjKE.png",
    number: 421,
    generationId: 4,
    type: "Grass",
  },
  {
    name: "shellos",
    imageURL: "https://i.imgur.com/RVxIKCS.png",
    number: 422,
    generationId: 4,
    type: "Water",
  },
  {
    name: "gastrodon",
    imageURL: "https://i.imgur.com/QgS6zRm.png",
    number: 423,
    generationId: 4,
    type: "Water",
    type2: "Ground"
  },
  {
    name: "ambipom",
    imageURL: "https://i.imgur.com/Pwpq7jf.png",
    number: 424,
    generationId: 4,
    type: "Normal",
  },
  {
    name: "drifloon",
    imageURL: "https://i.imgur.com/cKEFnEN.png",
    number: 425,
    generationId: 4,
    type: "Ghost",
    type2: "Flying"
  },
  {
    name: "drifblim",
    imageURL: "https://i.imgur.com/GI8RL79.png",
    number: 426,
    generationId: 4,
    type: "Ghost",
    type2: "Flying"
  },
  {
    name: "buneary",
    imageURL: "https://i.imgur.com/MOFDvN1.png",
    number: 427,
    generationId: 4,
    type: "Normal",
  },
  {
    name: "lopunny",
    imageURL: "https://i.imgur.com/XR7U6Zx.png",
    number: 428,
    generationId: 4,
    type: "Normal",
  },
  {
    name: "mismagius",
    imageURL: "https://i.imgur.com/1MtGRXW.png",
    number: 429,
    generationId: 4,
    type: "Ghost",
  },
  {
    name: "honchkrow",
    imageURL: "https://i.imgur.com/9jAMvOh.png",
    number: 430,
    generationId: 4,
    type: "Dark",
    type2: "Flying"
  },
  {
    name: "glameow",
    imageURL: "https://i.imgur.com/MQhHKF5.png",
    number: 431,
    generationId: 4,
    type: "Normal",
  },
  {
    name: "purugly",
    imageURL: "https://i.imgur.com/X56OGo3.png",
    number: 432,
    generationId: 4,
    type: "Normal",
  },
  {
    name: "chingling",
    imageURL: "https://i.imgur.com/DtEWGwE.png",
    number: 433,
    generationId: 4,
    type: "Ghost",
  },
  {
    name: "stunky",
    imageURL: "https://i.imgur.com/KwCzsYD.png",
    number: 434,
    generationId: 4,
    type: "Poison",
    type2: "Dark"
  },
  {
    name: "skuntank",
    imageURL: "https://i.imgur.com/2gXV0FG.png",
    number: 435,
    generationId: 4,
    type: "Poison",
    type2: "Dark"
  },
  {
    name: "bronzor",
    imageURL: "https://i.imgur.com/bqhhfLY.png",
    number: 436,
    generationId: 4,
    type: "Steel",
    type2: "Psychic"
  },
  {
    name: "bronzong",
    imageURL: "https://i.imgur.com/VS9p91m.png",
    number: 437,
    generationId: 4,
    type: "Steel",
    type2: "Psychic"
  },
  {
    name: "bonsly",
    imageURL: "https://i.imgur.com/vAfDDDf.png",
    number: 438,
    generationId: 4,
    type: "Rock",
  },
  {
    name: "mime-jr",
    imageURL: "https://i.imgur.com/JCYNYcy.png",
    number: 439,
    generationId: 4,
    type: "Psychic",
    type2: "Fairy"
  },
  {
    name: "happiny",
    imageURL: "https://i.imgur.com/fQNO0eu.png",
    number: 440,
    generationId: 4,
    type: "Normal",
  },
  {
    name: "chatot",
    imageURL: "https://i.imgur.com/SkGMgBJ.png",
    number: 441,
    generationId: 4,
    type: "Normal",
    type2: "Flying"
  },
  {
    name: "spiritomb",
    imageURL: "https://i.imgur.com/oRku7xS.png",
    number: 442,
    generationId: 4,
    type: "Ghost",
    type2: "Dark"
  },
  {
    name: "gible",
    imageURL: "https://i.imgur.com/ERpBcY1.png",
    number: 443,
    generationId: 4,
    type: "Dragon",
    type2: "Ground"
  },
  {
    name: "gabite",
    imageURL: "https://i.imgur.com/tAIq4rY.png",
    number: 444,
    generationId: 4,
    type: "Dragon",
    type2: "Ground"
  },
  {
    name: "garchomp",
    imageURL: "https://i.imgur.com/uuZqCSo.png",
    number: 445,
    generationId: 4,
    type: "Dragon",
    type2: "Ground"
  },
  {
    name: "munchlax",
    imageURL: "https://i.imgur.com/1T0E4ZU.png",
    number: 446,
    generationId: 4,
    type: "Normal",
  },
  {
    name: "riolu",
    imageURL: "https://i.imgur.com/ZHHFnWB.png",
    number: 447,
    generationId: 4,
    type: "Fighting",
  },
  {
    name: "lucario",
    imageURL: "https://i.imgur.com/9jpyfUy.png",
    number: 448,
    generationId: 4,
    type: "Fighting",
    type2: "Steel"
  },
  {
    name: "hippopotas",
    imageURL: "https://i.imgur.com/onhKDEH.png",
    number: 449,
    generationId: 4,
    type: "Ground",
  },
  {
    name: "hippowdon",
    imageURL: "https://i.imgur.com/sQwPLHK.png",
    number: 450,
    generationId: 4,
    type: "Ground",
  },
  {
    name: "skorupi",
    imageURL: "https://i.imgur.com/nQosYWi.png",
    number: 451,
    generationId: 4,
    type: "Poison",
    type2: "Bug"
  },
  {
    name: "drapion",
    imageURL: "https://i.imgur.com/GsKZmlh.png",
    number: 452,
    generationId: 4,
    type: "Poison",
    type2: "Dark"
  },
  {
    name: "croagunk",
    imageURL: "https://i.imgur.com/Qt5RRus.png",
    number: 453,
    generationId: 4,
    type: "Poison",
    type2: "Fighting"
  },
  {
    name: "toxicroak",
    imageURL: "https://i.imgur.com/kuUg4eM.png",
    number: 454,
    generationId: 4,
    type: "Poison",
    type2: "Fighting"
  },
  {
    name: "carnivine",
    imageURL: "https://i.imgur.com/0u4CFxH.png",
    number: 455,
    generationId: 4,
    type: "Grass",
  },
  {
    name: "finneon",
    imageURL: "https://i.imgur.com/J9xmGrn.png",
    number: 456,
    generationId: 4,
    type: "Water",
  },
  {
    name: "lumineon",
    imageURL: "https://i.imgur.com/ro80CgX.png",
    number: 457,
    generationId: 4,
    type: "Water",
  },
  {
    name: "mantyke",
    imageURL: "https://i.imgur.com/pH3FWw1.png",
    number: 458,
    generationId: 4,
    type: "Water",
    type2: "Flying"
  },
  {
    name: "snover",
    imageURL: "https://i.imgur.com/Iv20s4s.png",
    number: 459,
    generationId: 4,
    type: "Grass",
    type2: "Ice"
  },
  {
    name: "abomasnow",
    imageURL: "https://i.imgur.com/QAPFCku.png",
    number: 460,
    generationId: 4,
    type: "Grass",
    type2: "Ice"
  },
  {
    name: "weavile",
    imageURL: "https://i.imgur.com/14RdVaw.png",
    number: 461,
    generationId: 4,
    type: "Dark",
    type2: "Ice"
  },
  {
    name: "magnezone",
    imageURL: "https://i.imgur.com/NfjdQMc.png",
    number: 462,
    generationId: 4,
    type: "Electric",
    type2: "Steel"
  },
  {
    name: "lickilicky",
    imageURL: "https://i.imgur.com/ZekByL2.png",
    number: 463,
    generationId: 4,
    type: "Normal",
  },
  {
    name: "rhyperior",
    imageURL: "https://i.imgur.com/bvOOKFF.png",
    number: 464,
    generationId: 4,
    type: "Rock",
    type2: "Ground"
  },
  {
    name: "tangrowth",
    imageURL: "https://i.imgur.com/W9AFBU7.png",
    number: 465,
    generationId: 4,
    type: "Grass",
  },
  {
    name: "electivire",
    imageURL: "https://i.imgur.com/aLG8Esu.png",
    number: 466,
    generationId: 4,
    type: "Electric",
  },
  {
    name: "magmortar",
    imageURL: "https://i.imgur.com/19btFMp.png",
    number: 467,
    generationId: 4,
    type: "Fire",
  },
  {
    name: "togekiss",
    imageURL: "https://i.imgur.com/scpJLeH.png",
    number: 468,
    generationId: 4,
    type: "Fairy",
    type2: "Flying"
  },
  {
    name: "yanmega",
    imageURL: "https://i.imgur.com/1XQPOpb.png",
    number: 469,
    generationId: 4,
    type: "Bug",
    type2: "Flying"
  },
  {
    name: "leafeon",
    imageURL: "https://i.imgur.com/21OG7rd.png",
    number: 470,
    generationId: 4,
    type: "Grass",
  },
  {
    name: "glaceon",
    imageURL: "https://i.imgur.com/ubMy2EU.png",
    number: 471,
    generationId: 4,
    type: "Ice",
  },
  {
    name: "gliscor",
    imageURL: "https://i.imgur.com/cV6iwwd.png",
    number: 472,
    generationId: 4,
    type: "Ground",
    type2: "Flying"
  },
  {
    name: "mamoswine",
    imageURL: "https://i.imgur.com/OblPnpZ.png",
    number: 473,
    generationId: 4,
    type: "Ice",
    type2: "Ground"
  },
  {
    name: "porygon-z",
    imageURL: "https://i.imgur.com/KfdsuFh.png",
    number: 474,
    generationId: 4,
    type: "Normal",
  },
  {
    name: "gallade",
    imageURL: "https://i.imgur.com/3h191cV.png",
    number: 475,
    generationId: 4,
    type: "Psychic",
    type2: "Fighting"
  },
  {
    name: "probopass",
    imageURL: "https://i.imgur.com/LbbZeZv.png",
    number: 476,
    generationId: 4,
    type: "Rock",
    type2: "Steel"
  },
  {
    name: "dusknoir",
    imageURL: "https://i.imgur.com/ZtBYvmK.png",
    number: 477,
    generationId: 4,
    type: "Ghost",
  },
  {
    name: "froslass",
    imageURL: "https://i.imgur.com/kLJ9NNY.png",
    number: 478,
    generationId: 4,
    type: "Ice",
    type2: "Ghost"
  },
  {
    name: "rotom",
    imageURL: "https://i.imgur.com/ZCHEoVN.png",
    number: 479,
    generationId: 4,
    type: "Electric",
    type2: "Ghost"
  },
  {
    name: "uxie",
    imageURL: "https://i.imgur.com/czvSu5X.png",
    number: 480,
    generationId: 4,
    type: "Psychic",
  },
  {
    name: "mesprit",
    imageURL: "https://i.imgur.com/dppOHtM.png",
    number: 481,
    generationId: 4,
    type: "Psychic",
  },
  {
    name: "azelf",
    imageURL: "https://i.imgur.com/vf0tWfC.png",
    number: 482,
    generationId: 4,
    type: "Psychic",
  },
  {
    name: "dialga",
    imageURL: "https://i.imgur.com/mhjd6KD.png",
    number: 483,
    generationId: 4,
    type: "Steel",
    type2: "Dragon"
  },
  {
    name: "palkia",
    imageURL: "https://i.imgur.com/AkR0IDh.png",
    number: 484,
    generationId: 4,
    type: "Water",
    type2: "Dragon"
  },
  {
    name: "heatran",
    imageURL: "https://i.imgur.com/iy6vlEH.png",
    number: 485,
    generationId: 4,
    type: "Fire",
    type2: "Steel"
  },
  {
    name: "regigigas",
    imageURL: "https://i.imgur.com/jWbond7.png",
    number: 486,
    generationId: 4,
    type: "Normal",
  },
  {
    name: "giratina-altered",
    imageURL: "https://i.imgur.com/JJUrsg5.png",
    number: 487,
    generationId: 4,
    type: "Ghost",
    type2: "Dragon"
  },
  {
    name: "cresselia",
    imageURL: "https://i.imgur.com/iGSXFHy.png",
    number: 488,
    generationId: 4,
    type: "Psychic",
  },
  {
    name: "phione",
    imageURL: "https://i.imgur.com/Awxw0LV.png",
    number: 489,
    generationId: 4,
    type: "Water",
  },
  {
    name: "manaphy",
    imageURL: "https://i.imgur.com/VaLuNVH.png",
    number: 490,
    generationId: 4,
    type: "Water",
  },
  {
    name: "darkrai",
    imageURL: "https://i.imgur.com/A5xCi4K.png",
    number: 491,
    generationId: 4,
    type: "Dark",
  },
  {
    name: "shaymin-land",
    imageURL: "https://i.imgur.com/RSXnNyn.png",
    number: 492,
    generationId: 4,
    type: "Grass",
  },
  {
    name: "arceus",
    imageURL: "https://i.imgur.com/IYiOSoH.png",
    number: 493,
    generationId: 4,
    type: "Normal",
  }
];

export const ALL_POKEMON_UNOVA: any = [
  {
    name: "victini",
    imageURL: "https://i.imgur.com/Z1ssO8J.png",
    number: 494,
    type: "Psychic",
    type2: "Fire",
    generationId: 5
  },
  {
    name: "snivy",
    imageURL: "https://i.imgur.com/Ycsner9.png",
    number: 495,
    type: "Grass",
    generationId: 5
  },
  {
    name: "servine",
    imageURL: "https://i.imgur.com/XUEyCqw.png",
    number: 496,
    type: "Grass",
    generationId: 5
  },
  {
    name: "serperior",
    imageURL: "https://i.imgur.com/6og8pfN.png",
    number: 497,
    type: "Grass",
    generationId: 5
  },
  {
    name: "tepig",
    imageURL: "https://i.imgur.com/cbCy0oR.png",
    number: 498,
    type: "Fire",
    generationId: 5
  },
  {
    name: "pignite",
    imageURL: "https://i.imgur.com/uZvNs7M.png",
    number: 499,
    type: "Fire",
    type2: "Fighting",
    generationId: 5
  },
  {
    name: "emboar",
    imageURL: "https://i.imgur.com/E5LGj0v.png",
    number: 500,
    type: "Fire",
    type2: "Fighting",
    generationId: 5
  },
  {
    name: "oshawott",
    imageURL: "https://i.imgur.com/mAC0Nnc.png",
    number: 501,
    type: "Water",
    generationId: 5
  },
  {
    name: "dewott",
    imageURL: "https://i.imgur.com/oZQa0Es.png",
    number: 502,
    type: "Water",
    generationId: 5
  },
  {
    name: "samurott",
    imageURL: "https://i.imgur.com/cOmorXQ.png",
    number: 503,
    type: "Water",
    generationId: 5
  },
  {
    name: "patrat",
    imageURL: "https://i.imgur.com/7aLx2JS.png",
    number: 504,
    type: "Normal",
    generationId: 5
  },
  {
    name: "watchog",
    imageURL: "https://i.imgur.com/ZE8pSuP.png",
    number: 505,
    type: "Normal",
    generationId: 5
  },
  {
    name: "lillipup",
    imageURL: "https://i.imgur.com/A9cfxvo.png",
    number: 506,
    type: "Normal",
    generationId: 5
  },
  {
    name: "herdier",
    imageURL: "https://i.imgur.com/KRZvU4Z.png",
    number: 507,
    type: "Normal",
    generationId: 5
  },
  {
    name: "stoutland",
    imageURL: "https://i.imgur.com/Kgz0NtX.png",
    number: 508,
    type: "Normal",
    generationId: 5
  },
  {
    name: "purrloin",
    imageURL: "https://i.imgur.com/rb8B6zZ.png",
    number: 509,
    type: "Dark",
    generationId: 5
  },
  {
    name: "liepard",
    imageURL: "https://i.imgur.com/FyJUZhR.png",
    number: 510,
    type: "Dark",
    generationId: 5
  },
  {
    name: "pansage",
    imageURL: "https://i.imgur.com/WekhdJf.png",
    number: 511,
    type: "Grass",
    generationId: 5
  },
  {
    name: "simisage",
    imageURL: "https://i.imgur.com/aaA6vpA.png",
    number: 512,
    type: "Grass",
    generationId: 5
  },
  {
    name: "pansear",
    imageURL: "https://i.imgur.com/emBDhGa.png",
    number: 513,
    type: "Fire",
    generationId: 5
  },
  {
    name: "simisear",
    imageURL: "https://i.imgur.com/t19Wxpm.png",
    number: 514,
    type: "Fire",
    generationId: 5
  },
  {
    name: "panpour",
    imageURL: "https://i.imgur.com/puIOAAt.png",
    number: 515,
    type: "Water",
    generationId: 5
  },
  {
    name: "simipour",
    imageURL: "https://i.imgur.com/9UBUrHz.png",
    number: 516,
    type: "Water",
    generationId: 5
  },
  {
    name: "munna",
    imageURL: "https://i.imgur.com/CGU3Kr0.png",
    number: 517,
    type: "Psychic",
    generationId: 5
  },
  {
    name: "musharna",
    imageURL: "https://i.imgur.com/7wqjrkA.png",
    number: 518,
    type: "Psychic",
    generationId: 5
  },
  {
    name: "pidove",
    imageURL: "https://i.imgur.com/2eNawuP.png",
    number: 519,
    type: "Normal",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "tranquill",
    imageURL: "https://i.imgur.com/RzWcD9B.png",
    number: 520,
    type: "Normal",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "unfezant",
    imageURL: "https://i.imgur.com/NBYuXFD.png",
    number: 521,
    type: "Normal",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "blitzle",
    imageURL: "https://i.imgur.com/Pr4SCNc.png",
    number: 522,
    type: "Electric",
    generationId: 5
  },
  {
    name: "zebstrika",
    imageURL: "https://i.imgur.com/hQedW8Q.png",
    number: 523,
    type: "Electric",
    generationId: 5
  },
  {
    name: "roggenrola",
    imageURL: "https://i.imgur.com/2hGiEhD.png",
    number: 524,
    type: "Rock",
    generationId: 5
  },
  {
    name: "boldore",
    imageURL: "https://i.imgur.com/kElLE7V.png",
    number: 525,
    type: "Rock",
    generationId: 5
  },
  {
    name: "gigalith",
    imageURL: "https://i.imgur.com/f39Rzyl.png",
    number: 526,
    type: "Rock",
    generationId: 5
  },
  {
    name: "woobat",
    imageURL: "https://i.imgur.com/2oiYaEz.png",
    number: 527,
    type: "Psychic",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "swoobat",
    imageURL: "https://i.imgur.com/ZkvqQ0K.png",
    number: 528,
    type: "Psychic",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "drilbur",
    imageURL: "https://i.imgur.com/Lxvszjw.png",
    number: 529,
    type: "Ground",
    generationId: 5
  },
  {
    name: "excadrill",
    imageURL: "https://i.imgur.com/0xriRPv.png",
    number: 530,
    type: "Ground",
    type2: "Steel",
    generationId: 5
  },
  {
    name: "audino",
    imageURL: "https://i.imgur.com/mhEwLU2.png",
    number: 531,
    type: "Normal",
    generationId: 5
  },
  {
    name: "timburr",
    imageURL: "https://i.imgur.com/gsaTRKG.png",
    number: 532,
    type: "Fighting",
    generationId: 5
  },
  {
    name: "gurdurr",
    imageURL: "https://i.imgur.com/H9P8pBv.png",
    number: 533,
    type: "Fighting",
    generationId: 5
  },
  {
    name: "conkeldurr",
    imageURL: "https://i.imgur.com/ZKnuZWC.png",
    number: 534,
    type: "Fighting",
    generationId: 5
  },
  {
    name: "tympole",
    imageURL: "https://i.imgur.com/w04y7wS.png",
    number: 535,
    type: "Water",
    generationId: 5
  },
  {
    name: "palpitoad",
    imageURL: "https://i.imgur.com/Nk8ZrXG.png",
    number: 536,
    type: "Water",
    type2: "Ground",
    generationId: 5
  },
  {
    name: "seismitoad",
    imageURL: "https://i.imgur.com/TEBDXbL.png",
    number: 537,
    type: "Water",
    type2: "Ground",
    generationId: 5
  },
  {
    name: "throh",
    imageURL: "https://i.imgur.com/vc3eMy0.png",
    number: 538,
    type: "Fighting",
    generationId: 5
  },
  {
    name: "sawk",
    imageURL: "https://i.imgur.com/0CcenAH.png",
    number: 539,
    type: "Fighting",
    generationId: 5
  },
  {
    name: "sewaddle",
    imageURL: "https://i.imgur.com/V2T71uW.png",
    number: 540,
    type: "Bug",
    type2: "Grass",
    generationId: 5
  },
  {
    name: "swadloon",
    imageURL: "https://i.imgur.com/aSYfLmG.png",
    number: 541,
    type: "Bug",
    type2: "Grass",
    generationId: 5
  },
  {
    name: "leavanny",
    imageURL: "https://i.imgur.com/mlvj2IY.png",
    number: 542,
    type: "Bug",
    type2: "Grass",
    generationId: 5
  },
  {
    name: "venipede",
    imageURL: "https://i.imgur.com/7HmD6Mr.png",
    number: 543,
    type: "Bug",
    type2: "Poison",
    generationId: 5
  },
  {
    name: "whirlipede",
    imageURL: "https://i.imgur.com/Iuqxm4X.png",
    number: 544,
    type: "Bug",
    type2: "Poison",
    generationId: 5
  },
  {
    name: "scolipede",
    imageURL: "https://i.imgur.com/EyUmsuX.png",
    number: 545,
    type: "Bug",
    type2: "Poison",
    generationId: 5
  },
  {
    name: "cottonee",
    imageURL: "https://i.imgur.com/kR5nGUP.png",
    number: 546,
    type: "Grass",
    type2: "Fairy",
    generationId: 5
  },
  {
    name: "whimsicott",
    imageURL: "https://i.imgur.com/kAhVLWE.png",
    number: 547,
    type: "Grass",
    type2: "Fairy",
    generationId: 5
  },
  {
    name: "petilil",
    imageURL: "https://i.imgur.com/4Ijv1Qr.png",
    number: 548,
    type: "Grass",
    generationId: 5
  },
  {
    name: "lilligant",
    imageURL: "https://i.imgur.com/3dUv14n.png",
    number: 549,
    type: "Grass",
    generationId: 5
  },
  {
    name: "basculin-red-striped",
    imageURL: "https://i.imgur.com/ttVSN3q.png",
    number: 550,
    type: "Water",
    generationId: 5
  },
  {
    name: "sandile",
    imageURL: "https://i.imgur.com/k3i6rEq.png",
    number: 551,
    type: "Ground",
    type2: "Dark",
    generationId: 5
  },
  {
    name: "krokorok",
    imageURL: "https://i.imgur.com/r9tTu0u.png",
    number: 552,
    type: "Ground",
    type2: "Dark",
    generationId: 5
  },
  {
    name: "krookodile",
    imageURL: "https://i.imgur.com/aOHTFhL.png",
    number: 553,
    type: "Ground",
    type2: "Dark",
    generationId: 5
  },
  {
    name: "darumaka",
    imageURL: "https://i.imgur.com/2Eitofs.png",
    number: 554,
    type: "Fire",
    generationId: 5
  },
  {
    name: "darmanitan-standard",
    imageURL: "https://i.imgur.com/cj6cmFR.png",
    number: 555,
    type: "Fire",
    generationId: 5
  },
  {
    name: "maractus",
    imageURL: "https://i.imgur.com/MK7x78n.png",
    number: 556,
    type: "Grass",
    generationId: 5
  },
  {
    name: "dwebble",
    imageURL: "https://i.imgur.com/QJDjh5P.png",
    number: 557,
    type: "Bug",
    type2: "Rock",
    generationId: 5
  },
  {
    name: "crustle",
    imageURL: "https://i.imgur.com/6ETPc6e.png",
    number: 558,
    type: "Bug",
    type2: "Rock",
    generationId: 5
  },
  {
    name: "scraggy",
    imageURL: "https://i.imgur.com/rEIvvhx.png",
    number: 559,
    type: "Dark",
    type2: "Fighting",
    generationId: 5
  },
  {
    name: "scrafty",
    imageURL: "https://i.imgur.com/zjwIic4.png",
    number: 560,
    type: "Dark",
    type2: "Fighting",
    generationId: 5
  },
  {
    name: "sigilyph",
    imageURL: "https://i.imgur.com/T7B5a79.png",
    number: 561,
    type: "Psychic",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "yamask",
    imageURL: "https://i.imgur.com/aDUGIxo.png",
    number: 562,
    type: "Ghost",
    generationId: 5
  },
  {
    name: "cofagrigus",
    imageURL: "https://i.imgur.com/uZ6U4su.png",
    number: 563,
    type: "Ghost",
    generationId: 5
  },
  {
    name: "tirtouga",
    imageURL: "https://i.imgur.com/xmjdfGv.png",
    number: 564,
    type: "Water",
    type2: "Rock",
    generationId: 5
  },
  {
    name: "carracosta",
    imageURL: "https://i.imgur.com/o25lmTh.png",
    number: 565,
    type: "Water",
    type2: "Rock",
    generationId: 5
  },
  {
    name: "archen",
    imageURL: "https://i.imgur.com/nJrELCj.png",
    number: 566,
    type: "Rock",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "archeops",
    imageURL: "https://i.imgur.com/NzIvTur.png",
    number: 567,
    type: "Rock",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "trubbish",
    imageURL: "https://i.imgur.com/oWswyfc.png",
    number: 568,
    type: "Poison",
    generationId: 5
  },
  {
    name: "garbodor",
    imageURL: "https://i.imgur.com/VQZocBT.png",
    number: 569,
    type: "Poison",
    generationId: 5
  },
  {
    name: "zorua",
    imageURL: "https://i.imgur.com/Dy1Miwz.png",
    number: 570,
    type: "Dark",
    generationId: 5
  },
  {
    name: "zoroark",
    imageURL: "https://i.imgur.com/1Nh0Dqt.png",
    number: 571,
    type: "Dark",
    generationId: 5
  },
  {
    name: "minccino",
    imageURL: "https://i.imgur.com/h8EisCB.png",
    number: 572,
    type: "Normal",
    generationId: 5
  },
  {
    name: "cinccino",
    imageURL: "https://i.imgur.com/cEVgA5Z.png",
    number: 573,
    type: "Normal",
    generationId: 5
  },
  {
    name: "gothita",
    imageURL: "https://i.imgur.com/Q7QNteg.png",
    number: 574,
    type: "Psychic",
    generationId: 5
  },
  {
    name: "gothorita",
    imageURL: "https://i.imgur.com/T3xMT9D.png",
    number: 575,
    type: "Psychic",
    generationId: 5
  },
  {
    name: "gothitelle",
    imageURL: "https://i.imgur.com/xymBthb.png",
    number: 576,
    type: "Psychic",
    generationId: 5
  },
  {
    name: "solosis",
    imageURL: "https://i.imgur.com/Of8jXdf.png",
    number: 577,
    type: "Psychic",
    generationId: 5
  },
  {
    name: "duosion",
    imageURL: "https://i.imgur.com/zUkj0zM.png",
    number: 578,
    type: "Psychic",
    generationId: 5
  },
  {
    name: "reuniclus",
    imageURL: "https://i.imgur.com/EJXAJgP.png",
    number: 579,
    type: "Psychic",
    generationId: 5
  },
  {
    name: "ducklett",
    imageURL: "https://i.imgur.com/rggd2Sm.png",
    number: 580,
    type: "Water",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "swanna",
    imageURL: "https://i.imgur.com/ZAqJh05.png",
    number: 581,
    type: "Water",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "vanillite",
    imageURL: "https://i.imgur.com/l8fmv03.png",
    number: 582,
    type: "Ice",
    generationId: 5
  },
  {
    name: "vanillish",
    imageURL: "https://i.imgur.com/jDrQJoP.png",
    number: 583,
    type: "Ice",
    generationId: 5
  },
  {
    name: "vanilluxe",
    imageURL: "https://i.imgur.com/6s8amzo.png",
    number: 584,
    type: "Ice",
    generationId: 5
  },
  {
    name: "deerling",
    imageURL: "https://i.imgur.com/EwoPA2s.png",
    number: 585,
    type: "Normal",
    type2: "Grass",
    generationId: 5
  },
  {
    name: "sawsbuck",
    imageURL: "https://i.imgur.com/1fsexdh.png",
    number: 586,
    type: "Normal",
    type2: "Grass",
    generationId: 5
  },
  {
    name: "emolga",
    imageURL: "https://i.imgur.com/5XQy3IQ.png",
    number: 587,
    type: "Electric",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "karrablast",
    imageURL: "https://i.imgur.com/KpMzl9I.png",
    number: 588,
    type: "Bug",
    generationId: 5
  },
  {
    name: "escavalier",
    imageURL: "https://i.imgur.com/zX89jsM.png",
    number: 589,
    type: "Bug",
    type2: "Steel",
    generationId: 5
  },
  {
    name: "foongus",
    imageURL: "https://i.imgur.com/Pw1HY0s.png",
    number: 590,
    type: "Grass",
    type2: "Poison",
    generationId: 5
  },
  {
    name: "amoonguss",
    imageURL: "https://i.imgur.com/cGiyka7.png",
    number: 591,
    type: "Grass",
    type2: "Poison",
    generationId: 5
  },
  {
    name: "frillish",
    imageURL: "https://i.imgur.com/K3q9vyX.png",
    number: 592,
    type: "Water",
    type2: "Ghost",
    generationId: 5
  },
  {
    name: "jellicent",
    imageURL: "https://i.imgur.com/fWgoPEs.png",
    number: 593,
    type: "Water",
    type2: "Ghost",
    generationId: 5
  },
  {
    name: "alomomola",
    imageURL: "https://i.imgur.com/FrYF1y8.png",
    number: 594,
    type: "Water",
    generationId: 5
  },
  {
    name: "joltik",
    imageURL: "https://i.imgur.com/khUKHBF.png",
    number: 595,
    type: "Bug",
    type2: "Electric",
    generationId: 5
  },
  {
    name: "galvantula",
    imageURL: "https://i.imgur.com/EjR8S3k.png",
    number: 596,
    type: "Bug",
    type2: "Electric",
    generationId: 5
  },
  {
    name: "ferroseed",
    imageURL: "https://i.imgur.com/EIywH3N.png",
    number: 597,
    type: "Grass",
    type2: "Steel",
    generationId: 5
  },
  {
    name: "ferrothorn",
    imageURL: "https://i.imgur.com/6ms8hE4.png",
    number: 598,
    type: "Grass",
    type2: "Steel",
    generationId: 5
  },
  {
    name: "klink",
    imageURL: "https://i.imgur.com/Cn5fb2H.png",
    number: 599,
    type: "Steel",
    generationId: 5
  },
  {
    name: "klang",
    imageURL: "https://i.imgur.com/iJSD9iP.png",
    number: 600,
    type: "Steel",
    generationId: 5
  },
  {
    name: "klinklang",
    imageURL: "https://i.imgur.com/zOHN8yV.png",
    number: 601,
    type: "Steel",
    generationId: 5
  },
  {
    name: "tynamo",
    imageURL: "https://i.imgur.com/vd8R04o.png",
    number: 602,
    type: "Electric",
    generationId: 5
  },
  {
    name: "eelektrik",
    imageURL: "https://i.imgur.com/5UJJ0Dk.png",
    number: 603,
    type: "Electric",
    generationId: 5
  },
  {
    name: "eelektross",
    imageURL: "https://i.imgur.com/Ptjq0HC.png",
    number: 604,
    type: "Electric",
    generationId: 5
  },
  {
    name: "elgyem",
    imageURL: "https://i.imgur.com/o4jCSHR.png",
    number: 605,
    type: "Psychic",
    generationId: 5
  },
  {
    name: "beheeyem",
    imageURL: "https://i.imgur.com/pYfII7Y.png",
    number: 606,
    type: "Psychic",
    generationId: 5
  },
  {
    name: "litwick",
    imageURL: "https://i.imgur.com/yw96O1F.png",
    number: 607,
    type: "Ghost",
    type2: "Fire",
    generationId: 5
  },
  {
    name: "lampent",
    imageURL: "https://i.imgur.com/8ryYFrV.png",
    number: 608,
    type: "Ghost",
    type2: "Fire",
    generationId: 5
  },
  {
    name: "chandelure",
    imageURL: "https://i.imgur.com/XbsQ21v.png",
    number: 609,
    type: "Ghost",
    type2: "Fire",
    generationId: 5
  },
  {
    name: "axew",
    imageURL: "https://i.imgur.com/2DdJzlL.png",
    number: 610,
    type: "Dragon",
    generationId: 5
  },
  {
    name: "fraxure",
    imageURL: "https://i.imgur.com/CwP00Je.png",
    number: 611,
    type: "Dragon",
    generationId: 5
  },
  {
    name: "haxorus",
    imageURL: "https://i.imgur.com/jtQrk5P.png",
    number: 612,
    type: "Dragon",
    generationId: 5
  },
  {
    name: "cubchoo",
    imageURL: "https://i.imgur.com/nuA8dRX.png",
    number: 613,
    type: "Ice",
    generationId: 5
  },
  {
    name: "beartic",
    imageURL: "https://i.imgur.com/O2NJTrH.png",
    number: 614,
    type: "Ice",
    generationId: 5
  },
  {
    name: "cryogonal",
    imageURL: "https://i.imgur.com/jN7naM2.png",
    number: 615,
    type: "Ice",
    generationId: 5
  },
  {
    name: "shelmet",
    imageURL: "https://i.imgur.com/pJZyfOU.png",
    number: 616,
    type: "Bug",
    generationId: 5
  },
  {
    name: "accelgor",
    imageURL: "https://i.imgur.com/wEcYEgU.png",
    number: 617,
    type: "Bug",
    generationId: 5
  },
  {
    name: "stunfisk",
    imageURL: "https://i.imgur.com/EkHg6JC.png",
    number: 618,
    type: "Ground",
    type2: "Electric",
    generationId: 5
  },
  {
    name: "mienfoo",
    imageURL: "https://i.imgur.com/PhhWRfn.png",
    number: 619,
    type: "Fighting",
    generationId: 5
  },
  {
    name: "mienshao",
    imageURL: "https://i.imgur.com/SyQ7EqQ.png",
    number: 620,
    type: "Fighting",
    generationId: 5
  },
  {
    name: "druddigon",
    imageURL: "https://i.imgur.com/W3Ghrbc.png",
    number: 621,
    type: "Dragon",
    generationId: 5
  },
  {
    name: "golett",
    imageURL: "https://i.imgur.com/T2bYATj.png",
    number: 622,
    type: "Ground",
    type2: "Ghost",
    generationId: 5
  },
  {
    name: "golurk",
    imageURL: "https://i.imgur.com/54gS1FZ.png",
    number: 623,
    type: "Ground",
    type2: "Ghost",
    generationId: 5
  },
  {
    name: "pawniard",
    imageURL: "https://i.imgur.com/mJ9fyPf.png",
    number: 624,
    type: "Dark",
    type2: "Steel",
    generationId: 5
  },
  {
    name: "bisharp",
    imageURL: "https://i.imgur.com/TBB53qg.png",
    number: 625,
    type: "Dark",
    type2: "Steel",
    generationId: 5
  },
  {
    name: "bouffalant",
    imageURL: "https://i.imgur.com/l1iHqxQ.png",
    number: 626,
    type: "Normal",
    generationId: 5
  },
  {
    name: "rufflet",
    imageURL: "https://i.imgur.com/ox5BsJf.png",
    number: 627,
    type: "Normal",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "braviary",
    imageURL: "https://i.imgur.com/bG5e6zR.png",
    number: 628,
    type: "Normal",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "vullaby",
    imageURL: "https://i.imgur.com/Trlw4q9.png",
    number: 629,
    type: "Dark",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "mandibuzz",
    imageURL: "https://i.imgur.com/yCsXZR3.png",
    number: 630,
    type: "Dark",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "heatmor",
    imageURL: "https://i.imgur.com/uB0qGvE.png",
    number: 631,
    type: "Fire",
    generationId: 5
  },
  {
    name: "durant",
    imageURL: "https://i.imgur.com/zbJj3Qt.png",
    number: 632,
    type: "Bug",
    type2: "Steel",
    generationId: 5
  },
  {
    name: "deino",
    imageURL: "https://i.imgur.com/KPzdFyT.png",
    number: 633,
    type: "Dark",
    type2: "Dragon",
    generationId: 5
  },
  {
    name: "zweilous",
    imageURL: "https://i.imgur.com/RP73wdh.png",
    number: 634,
    type: "Dark",
    type2: "Dragon",
    generationId: 5
  },
  {
    name: "hydreigon",
    imageURL: "https://i.imgur.com/jzaUPBv.png",
    number: 635,
    type: "Dark",
    type2: "Dragon",
    generationId: 5
  },
  {
    name: "larvesta",
    imageURL: "https://i.imgur.com/qowua0o.png",
    number: 636,
    type: "Bug",
    type2: "Fire",
    generationId: 5
  },
  {
    name: "volcarona",
    imageURL: "https://i.imgur.com/nIemlZY.png",
    number: 637,
    type: "Bug",
    type2: "Fire",
    generationId: 5
  },
  {
    name: "cobalion",
    imageURL: "https://i.imgur.com/DdZuTLW.png",
    number: 638,
    type: "Steel",
    type2: "Fighting",
    generationId: 5
  },
  {
    name: "terrakion",
    imageURL: "https://i.imgur.com/U6VkLh4.png",
    number: 639,
    type: "Rock",
    type2: "Fighting",
    generationId: 5
  },
  {
    name: "virizion",
    imageURL: "https://i.imgur.com/w0Kql6z.png",
    number: 640,
    type: "Grass",
    type2: "Fighting",
    generationId: 5
  },
  {
    name: "tornadus-incarnate",
    imageURL: "https://i.imgur.com/cidVHa0.png",
    number: 641,
    type: "Flying",
    generationId: 5
  },
  {
    name: "thundurus-incarnate",
    imageURL: "https://i.imgur.com/YvKiAmI.png",
    number: 642,
    type: "Electric",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "reshiram",
    imageURL: "https://i.imgur.com/t96K1sy.png",
    number: 643,
    type: "Dragon",
    type2: "Fire",
    generationId: 5
  },
  {
    name: "zekrom",
    imageURL: "https://i.imgur.com/5yj0fj6.png",
    number: 644,
    type: "Dragon",
    type2: "Electric",
    generationId: 5
  },
  {
    name: "landorus-incarnate",
    imageURL: "https://i.imgur.com/Si3MROh.png",
    number: 645,
    type: "Ground",
    type2: "Flying",
    generationId: 5
  },
  {
    name: "kyurem",
    imageURL: "https://i.imgur.com/LEw3H1w.png",
    number: 646,
    type: "Dragon",
    type2: "Ice",
    generationId: 5
  },
  {
    name: "keldeo-ordinary",
    imageURL: "https://i.imgur.com/uG0BJr1.png",
    number: 647,
    type: "Water",
    type2: "Fighting",
    generationId: 5
  },
  {
    name: "meloetta-aria",
    imageURL: "https://i.imgur.com/RuLo9e8.png",
    number: 648,
    type: "Normal",
    type2: "Psychic",
    generationId: 5
  },
  {
    name: "genesect",
    imageURL: "https://i.imgur.com/B0Ev3hO.png",
    number: 649,
    type: "Bug",
    type2: "Steel",
    generationId: 5
  }
];

export const ALL_POKEMON_KALOS = [
  {
    name: "chespin",
    imageURL: "https://i.imgur.com/MnzHgh8.png",
    number: 650,
    type: "Grass",
    generationId: 6
  },
  {
    name: "quilladin",
    imageURL: "https://i.imgur.com/Dx7sf6c.png",
    number: 651,
    type: "Grass",
    generationId: 6
  },
  {
    name: "chesnaught",
    imageURL: "https://i.imgur.com/FvUkjb2.png",
    number: 652,
    type: "Grass",
    type2: "Fighting",
    generationId: 6
  },
  {
    name: "fennekin",
    imageURL: "https://i.imgur.com/qBHV9gM.png",
    number: 653,
    type: "Fire",
    generationId: 6
  },
  {
    name: "braixen",
    imageURL: "https://i.imgur.com/SYmOEAg.png",
    number: 654,
    type: "Fire",
    generationId: 6
  },
  {
    name: "delphox",
    imageURL: "https://i.imgur.com/DAIEpRn.png",
    number: 655,
    type: "Fire",
    type2: "Psychic",
    generationId: 6
  },
  {
    name: "froakie",
    imageURL: "https://i.imgur.com/IAdteIQ.png",
    number: 656,
    type: "Water",
    generationId: 6
  },
  {
    name: "frogadier",
    imageURL: "https://i.imgur.com/ISsRJRy.png",
    number: 657,
    type: "Water",
    generationId: 6
  },
  {
    name: "greninja",
    imageURL: "https://i.imgur.com/qbBooKn.png",
    number: 658,
    type: "Water",
    type2: "Dark",
    generationId: 6
  },
  {
    name: "bunnelby",
    imageURL: "https://i.imgur.com/0tTzG3z.png",
    number: 659,
    type: "Normal",
    generationId: 6
  },
  {
    name: "diggersby",
    imageURL: "https://i.imgur.com/y5tCwkH.png",
    number: 660,
    type: "Normal",
    type2: "Ground",
    generationId: 6
  },
  {
    name: "fletchling",
    imageURL: "https://i.imgur.com/81MOZOb.png",
    number: 661,
    type: "Normal",
    type2: "Flying",
    generationId: 6
  },
  {
    name: "fletchinder",
    imageURL: "https://i.imgur.com/U1kmcWE.png",
    number: 662,
    type: "Fire",
    type2: "Flying",
    generationId: 6
  },
  {
    name: "talonflame",
    imageURL: "https://i.imgur.com/jdMyZ78.png",
    number: 663,
    type: "Fire",
    type2: "Flying",
    generationId: 6
  },
  {
    name: "scatterbug",
    imageURL: "https://i.imgur.com/i3y7BAU.png",
    number: 664,
    type: "Bug",
    generationId: 6
  },
  {
    name: "spewpa",
    imageURL: "https://i.imgur.com/qdl0bLk.png",
    number: 665,
    type: "Bug",
    generationId: 6
  },
  {
    name: "vivillon",
    imageURL: "https://i.imgur.com/GBfImGv.png",
    number: 666,
    type: "Bug",
    type2: "Flying",
    generationId: 6
  },
  {
    name: "litleo",
    imageURL: "https://i.imgur.com/axMN2vE.png",
    number: 667,
    type: "Fire",
    type2: "Normal",
    generationId: 6
  },
  {
    name: "pyroar",
    imageURL: "https://i.imgur.com/6auPMf7.png",
    number: 668,
    type: "Fire",
    type2: "Normal",
    generationId: 6
  },
  {
    name: "flabebe",
    imageURL: "https://i.imgur.com/WqWADdb.png",
    number: 669,
    type: "Fairy",
    generationId: 6
  },
  {
    name: "floette",
    imageURL: "https://i.imgur.com/komdnoo.png",
    number: 670,
    type: "Fairy",
    generationId: 6
  },
  {
    name: "florges",
    imageURL: "https://i.imgur.com/SFzTeL0.png",
    number: 671,
    type: "Fairy",
    generationId: 6
  },
  {
    name: "skiddo",
    imageURL: "https://i.imgur.com/ycJiz01.png",
    number: 672,
    type: "Grass",
    generationId: 6
  },
  {
    name: "gogoat",
    imageURL: "https://i.imgur.com/TOVBiZQ.png",
    number: 673,
    type: "Grass",
    generationId: 6
  },
  {
    name: "pancham",
    imageURL: "https://i.imgur.com/oyn5Q9i.png",
    number: 674,
    type: "Fighting",
    generationId: 6
  },
  {
    name: "pangoro",
    imageURL: "https://i.imgur.com/0yOdDBs.png",
    number: 675,
    type: "Fighting",
    type2: "Dark",
    generationId: 6
  },
  {
    name: "furfrou",
    imageURL: "https://i.imgur.com/mGuvxij.png",
    number: 676,
    type: "Normal",
    generationId: 6
  },
  {
    name: "espurr",
    imageURL: "https://i.imgur.com/mYecx0T.png",
    number: 677,
    type: "Psychic",
    generationId: 6
  },
  {
    name: "meowstic-male",
    imageURL: "https://i.imgur.com/zItcDgi.png",
    number: 678,
    type: "Psychic",
    generationId: 6
  },
  {
    name: "honedge",
    imageURL: "https://i.imgur.com/HKB90cW.png",
    number: 679,
    type: "Steel",
    type2: "Ghost",
    generationId: 6
  },
  {
    name: "doublade",
    imageURL: "https://i.imgur.com/F9YCJhC.png",
    number: 680,
    type: "Steel",
    type2: "Ghost",
    generationId: 6
  },
  {
    name: "aegislash",
    imageURL: "https://i.imgur.com/1MoHQgg.png",
    number: 681,
    type: "Steel",
    type2: "Ghost",
    generationId: 6
  },
  {
    name: "spritzee",
    imageURL: "https://i.imgur.com/Md53dzi.png",
    number: 682,
    type: "Fairy",
    generationId: 6
  },
  {
    name: "aromatisse",
    imageURL: "https://i.imgur.com/65boml9.png",
    number: 683,
    type: "Fairy",
    generationId: 6
  },
  {
    name: "swirlix",
    imageURL: "https://i.imgur.com/9aRqebj.png",
    number: 684,
    type: "Fairy",
    generationId: 6
  },
  {
    name: "slurpuff",
    imageURL: "https://i.imgur.com/6rVWJaW.png",
    number: 685,
    type: "Fairy",
    generationId: 6
  },
  {
    name: "inkay",
    imageURL: "https://i.imgur.com/QhxYDoF.png",
    number: 686,
    type: "Dark",
    type2: "Psychic",
    generationId: 6
  },
  {
    name: "malamar",
    imageURL: "https://i.imgur.com/W7eHw1X.png",
    number: 687,
    type: "Dark",
    type2: "Psychic",
    generationId: 6
  },
  {
    name: "binacle",
    imageURL: "https://i.imgur.com/hr0t8e7.png",
    number: 688,
    type: "Rock",
    type2: "Water",
    generationId: 6
  },
  {
    name: "barbaracle",
    imageURL: "https://i.imgur.com/vXgSck4.png",
    number: 689,
    type: "Rock",
    type2: "Water",
    generationId: 6
  },
  {
    name: "skrelp",
    imageURL: "https://i.imgur.com/Kbpq1T2.png",
    number: 690,
    type: "Water",
    type2: "Poison",
    generationId: 6
  },
  {
    name: "dragalge",
    imageURL: "https://i.imgur.com/PcESI9w.png",
    number: 691,
    type: "Water",
    type2: "Poison",
    generationId: 6
  },
  {
    name: "clauncher",
    imageURL: "https://i.imgur.com/FbPYAqB.png",
    number: 692,
    type: "Water",
    type2: "Steel",
    generationId: 6
  },
  {
    name: "clawitzer",
    imageURL: "https://i.imgur.com/t1KwPH5.png",
    number: 693,
    type: "Water",
    type2: "Steel",
    generationId: 6
  },
  {
    name: "helioptile",
    imageURL: "https://i.imgur.com/PqAKrYB.png",
    number: 694,
    type: "Electric",
    type2: "Normal",
    generationId: 6
  },
  {
    name: "heliolisk",
    imageURL: "https://i.imgur.com/PJC8ISI.png",
    number: 695,
    type: "Electric",
    type2: "Normal",
    generationId: 6
  },
  {
    name: "tyrunt",
    imageURL: "https://i.imgur.com/Op3dwPd.png",
    number: 696,
    type: "Rock",
    type2: "Dragon",
    generationId: 6
  },
  {
    name: "tyrantrum",
    imageURL: "https://i.imgur.com/wJh7Irz.png",
    number: 697,
    type: "Rock",
    type2: "Dragon",
    generationId: 6
  },
  {
    name: "amaura",
    imageURL: "https://i.imgur.com/H59ZsaD.png",
    number: 698,
    type: "Rock",
    type2: "Ice",
    generationId: 6
  },
  {
    name: "aurorus",
    imageURL: "https://i.imgur.com/Hprfg2U.png",
    number: 699,
    type: "Rock",
    type2: "Ice",
    generationId: 6
  },
  {
    name: "sylveon",
    imageURL: "https://i.imgur.com/eJCU2l2.png",
    number: 700,
    type: "Fairy",
    generationId: 6
  },
  {
    name: "hawlucha",
    imageURL: "https://i.imgur.com/J2RXMPh.png",
    number: 701,
    type: "Fighting",
    type2: "Flying",
    generationId: 6
  },
  {
    name: "dedenne",
    imageURL: "https://i.imgur.com/ADHcQo5.png",
    number: 702,
    type: "Electric",
    type2: "Fairy",
    generationId: 6
  },
  {
    name: "carbink",
    imageURL: "https://i.imgur.com/yADPKSl.png",
    number: 703,
    type: "Rock",
    type2: "Fairy",
    generationId: 6
  },
  {
    name: "goomy",
    imageURL: "https://i.imgur.com/kvWGivO.png",
    number: 704,
    type: "Dragon",
    generationId: 6
  },
  {
    name: "sliggoo",
    imageURL: "https://i.imgur.com/XZZtD8N.png",
    number: 705,
    type: "Dragon",
    generationId: 6
  },
  {
    name: "goodra",
    imageURL: "https://i.imgur.com/Z5BbhG3.png",
    number: 706,
    type: "Dragon",
    generationId: 6
  },
  {
    name: "klefki",
    imageURL: "https://i.imgur.com/lNWlHEX.png",
    number: 707,
    type: "Steel",
    type2: "Fairy",
    generationId: 6
  },
  {
    name: "phantump",
    imageURL: "https://i.imgur.com/Z0xkCtx.png",
    number: 708,
    type: "Ghost",
    type2: "Grass",
    generationId: 6
  },
  {
    name: "trevenant",
    imageURL: "https://i.imgur.com/BNkNyya.png",
    number: 709,
    type: "Ghost",
    type2: "Grass",
    generationId: 6
  },
  {
    name: "pumpkaboo",
    imageURL: "https://i.imgur.com/B2P2MNF.png",
    number: 710,
    type: "Ghost",
    type2: "Grass",
    generationId: 6
  },
  {
    name: "gourgeist",
    imageURL: "https://i.imgur.com/F4nVunP.png",
    number: 711,
    type: "Ghost",
    type2: "Grass",
    generationId: 6
  },
  {
    name: "bergmite",
    imageURL: "https://i.imgur.com/QI6BHAS.png",
    number: 712,
    type: "Ice",
    generationId: 6
  },
  {
    name: "avalugg",
    imageURL: "https://i.imgur.com/kC7JBMy.png",
    number: 713,
    type: "Ice",
    generationId: 6
  },
  {
    name: "noibat",
    imageURL: "https://i.imgur.com/JoAiHMQ.png",
    number: 714,
    type: "Flying",
    type2: "Dragon",
    generationId: 6
  },
  {
    name: "noivern",
    imageURL: "https://i.imgur.com/9WqVP75.png",
    number: 715,
    type: "Flying",
    type2: "Dragon",
    generationId: 6
  },
  {
    name: "xerneas",
    imageURL: "https://i.imgur.com/GhJELE7.png",
    number: 716,
    type: "Fairy",
    generationId: 6
  },
  {
    name: "yveltal",
    imageURL: "https://i.imgur.com/tanSoUU.png",
    number: 717,
    type: "Dark",
    type2: "Flying",
    generationId: 6
  },
  {
    name: "zygarde",
    imageURL: "https://i.imgur.com/KcFjjb0.png",
    number: 718,
    type: "Dragon",
    type2: "Ground",
    generationId: 6
  },
  {
    name: "diancie",
    imageURL: "https://i.imgur.com/6vRgGrn.png",
    number: 719,
    type: "Rock",
    type2: "Fairy",
    generationId: 6
  },
  {
    name: "hoopa",
    imageURL: "https://i.imgur.com/I85bc7Q.png",
    number: 720,
    type: "Psychic",
    type2: "Ghost",
    generationId: 6
  },
  {
    name: "volcanion",
    imageURL: "https://i.imgur.com/zrrTGdq.png",
    number: 721,
    type: "Fire",
    type2: "Water",
    generationId: 6
  }
];

export const ALL_POKEMON_ALOLA: CreatePokemon[] = [
  {
    name: "rowlet",
    imageURL: "https://i.imgur.com/Jp5rSge.png",
    number: 722,
    generationId: 7,
    type: "Grass",
    type2: "Flying"
  },
  {
    name: "dartrix",
    imageURL: "https://i.imgur.com/TRqFAyB.png",
    number: 723,
    generationId: 7,
    type: "Grass",
    type2: "Flying"
  },
  {
    name: "decidueye",
    imageURL: "https://i.imgur.com/TpDfAya.png",
    number: 724,
    generationId: 7,
    type: "Grass",
    type2: "Ghost"
  },
  {
    name: "litten",
    imageURL: "https://i.imgur.com/DXoGICc.png",
    number: 725,
    generationId: 7,
    type: "Fire",
    type2: null
  },
  {
    name: "torracat",
    imageURL: "https://i.imgur.com/6ovBtZq.png",
    number: 726,
    generationId: 7,
    type: "Fire",
    type2: null
  },
  {
    name: "incineroar",
    imageURL: "https://i.imgur.com/PgnCcBI.png",
    number: 727,
    generationId: 7,
    type: "Fire",
    type2: "Dark"
  },
  {
    name: "popplio",
    imageURL: "https://i.imgur.com/2xd95eQ.png",
    number: 728,
    generationId: 7,
    type: "Water",
    type2: null
  },
  {
    name: "brionne",
    imageURL: "https://i.imgur.com/LYJenE6.png",
    number: 729,
    generationId: 7,
    type: "Water",
    type2: null
  },
  {
    name: "primarina",
    imageURL: "https://i.imgur.com/KDPUgS3.png",
    number: 730,
    generationId: 7,
    type: "Water",
    type2: "Fairy"
  },
  {
    name: "pikipek",
    imageURL: "https://i.imgur.com/5RKC1yo.png",
    number: 731,
    generationId: 7,
    type: "Normal",
    type2: "Flying"
  },
  {
    name: "trumbeak",
    imageURL: "https://i.imgur.com/PUgWJac.png",
    number: 732,
    generationId: 7,
    type: "Normal",
    type2: "Flying"
  },
  {
    name: "toucannon",
    imageURL: "https://i.imgur.com/mRV8IMk.png",
    number: 733,
    generationId: 7,
    type: "Normal",
    type2: "Flying"
  },
  {
    name: "yungoos",
    imageURL: "https://i.imgur.com/VZi3vqn.png",
    number: 734,
    generationId: 7,
    type: "Normal",
    type2: null
  },
  {
    name: "gumshoos",
    imageURL: "https://i.imgur.com/7UChZPU.png",
    number: 735,
    generationId: 7,
    type: "Normal",
    type2: null
  },
  {
    name: "grubbin",
    imageURL: "https://i.imgur.com/MfFx95U.png",
    number: 736,
    generationId: 7,
    type: "Bug",
    type2: null
  },
  {
    name: "charjabug",
    imageURL: "https://i.imgur.com/jRPdiRe.png",
    number: 737,
    generationId: 7,
    type: "Bug",
    type2: "Electric"
  },
  {
    name: "vikavolt",
    imageURL: "https://i.imgur.com/AZ0J5ru.png",
    number: 738,
    generationId: 7,
    type: "Bug",
    type2: "Electric"
  },
  {
    name: "crabrawler",
    imageURL: "https://i.imgur.com/EazzEnm.png",
    number: 739,
    generationId: 7,
    type: "Fighting",
    type2: null
  },
  {
    name: "crabominable",
    imageURL: "https://i.imgur.com/ZGQE6xR.png",
    number: 740,
    generationId: 7,
    type: "Fighting",
    type2: "Ice"
  },
  {
    name: "oricorio",
    imageURL: "https://i.imgur.com/zGPYUar.png",
    number: 741,
    generationId: 7,
    type: "Bug",
    type2: "Flying"
  },
  {
    name: "cutiefly",
    imageURL: "https://i.imgur.com/DWMsbvf.png",
    number: 742,
    generationId: 7,
    type: "Bug",
    type2: "Fairy"
  },
  {
    name: "ribombee",
    imageURL: "https://i.imgur.com/L6upcAZ.png",
    number: 743,
    generationId: 7,
    type: "Bug",
    type2: "Fairy"
  },
  {
    name: "rockruff",
    imageURL: "https://i.imgur.com/qi8LH3u.png",
    number: 744,
    generationId: 7,
    type: "Rock",
    type2: null
  },
  {
    name: "lycanroc",
    imageURL: "https://i.imgur.com/7VNblVX.png",
    number: 745,
    generationId: 7,
    type: "Rock",
    type2: null
  },
  {
    name: "wishiwashi",
    imageURL: "https://i.imgur.com/0Y2i4Kb.png",
    number: 746,
    generationId: 7,
    type: "Water",
    type2: null
  },
  {
    name: "mareanie",
    imageURL: "https://i.imgur.com/I4nZweq.png",
    number: 747,
    generationId: 7,
    type: "Water",
    type2: "Poison"
  },
  {
    name: "toxapex",
    imageURL: "https://i.imgur.com/ZsK7m4h.png",
    number: 748,
    generationId: 7,
    type: "Water",
    type2: "Poison"
  },
  {
    name: "mudbray",
    imageURL: "https://i.imgur.com/X5nBOrT.png",
    number: 749,
    generationId: 7,
    type: "Ground",
    type2: null
  },
  {
    name: "mudsdale",
    imageURL: "https://i.imgur.com/UoSMKue.png",
    number: 750,
    generationId: 7,
    type: "Ground",
    type2: null
  },
  {
    name: "dewpider",
    imageURL: "https://i.imgur.com/y38W47r.png",
    number: 751,
    generationId: 7,
    type: "Bug",
    type2: "Water"
  },
  {
    name: "araquanid",
    imageURL: "https://i.imgur.com/hXJXvvN.png",
    number: 752,
    generationId: 7,
    type: "Bug",
    type2: "Water"
  },
  {
    name: "fomantis",
    imageURL: "https://i.imgur.com/rGf2aaG.png",
    number: 753,
    generationId: 7,
    type: "Grass",
    type2: null
  },
  {
    name: "lurantis",
    imageURL: "https://i.imgur.com/9lwFnns.png",
    number: 754,
    generationId: 7,
    type: "Grass",
    type2: null
  },
  {
    name: "morelull",
    imageURL: "https://i.imgur.com/tonK78f.png",
    number: 755,
    generationId: 7,
    type: "Grass",
    type2: "Fairy"
  },
  {
    name: "shiinotic",
    imageURL: "https://i.imgur.com/XOTIPie.png",
    number: 756,
    generationId: 7,
    type: "Grass",
    type2: "Fairy"
  },
  {
    name: "salandit",
    imageURL: "https://i.imgur.com/nhy6H60.png",
    number: 757,
    generationId: 7,
    type: "Fire",
    type2: "Poison"
  },
  {
    name: "salazzle",
    imageURL: "https://i.imgur.com/kNvhcue.png",
    number: 758,
    generationId: 7,
    type: "Fire",
    type2: "Poison"
  },
  {
    name: "stufful",
    imageURL: "https://i.imgur.com/zRaJKlC.png",
    number: 759,
    generationId: 7,
    type: "Bear",
    type2: "Fighting"
  },
  {
    name: "bewear",
    imageURL: "https://i.imgur.com/4aLjX5E.png",
    number: 760,
    generationId: 7,
    type: "Bear",
    type2: "Fighting"
  },
  {
    name: "bounsweet",
    imageURL: "https://i.imgur.com/uD9thIW.png",
    number: 761,
    generationId: 7,
    type: "Grass",
    type2: null
  },
  {
    name: "steenee",
    imageURL: "https://i.imgur.com/4L2Ff09.png",
    number: 762,
    generationId: 7,
    type: "Grass",
    type2: null
  },
  {
    name: "tsareena",
    imageURL: "https://i.imgur.com/mKOxdoH.png",
    number: 763,
    generationId: 7,
    type: "Grass",
    type2: null
  },
  {
    name: "comfey",
    imageURL: "https://i.imgur.com/pvQO4K1.png",
    number: 764,
    generationId: 7,
    type: "Fairy",
    type2: null
  },
  {
    name: "oranguru",
    imageURL: "https://i.imgur.com/rbG41lg.png",
    number: 765,
    generationId: 7,
    type: "Normal",
    type2: "Psychic"
  },
  {
    name: "passimian",
    imageURL: "https://i.imgur.com/cR0pCnr.png",
    number: 766,
    generationId: 7,
    type: "Fighting",
    type2: null
  },
  {
    name: "wimpod",
    imageURL: "https://i.imgur.com/KpFQ5uT.png",
    number: 767,
    generationId: 7,
    type: "Bug",
    type2: "Water"
  },
  {
    name: "golisopod",
    imageURL: "https://i.imgur.com/O1Dc17V.png",
    number: 768,
    generationId: 7,
    type: "Bug",
    type2: "Water"
  },
  {
    name: "sandygast",
    imageURL: "https://i.imgur.com/yQsPIQ0.png",
    number: 769,
    generationId: 7,
    type: "Ghost",
    type2: "Ground"
  },
  {
    name: "palossand",
    imageURL: "https://i.imgur.com/xiYHDQV.png",
    number: 770,
    generationId: 7,
    type: "Ghost",
    type2: "Ground"
  },
  {
    name: "pyukumuku",
    imageURL: "https://i.imgur.com/nXCTZE3.png",
    number: 771,
    generationId: 7,
    type: "Water",
    type2: null
  },
  {
    name: "type-null",
    imageURL: "https://i.imgur.com/buF5e8B.png",
    number: 772,
    generationId: 7,
    type: "Normal",
    type2: null
  },
  {
    name: "silvally",
    imageURL: "https://i.imgur.com/WjFPI3k.png",
    number: 773,
    generationId: 7,
    type: "Normal",
    type2: null
  },
  {
    name: "minior",
    imageURL: "https://i.imgur.com/21hHAa0.png",
    number: 774,
    generationId: 7,
    type: "Rock",
    type2: "Flying"
  },
  {
    name: "komala",
    imageURL: "https://i.imgur.com/Cq7dKAt.png",
    number: 775,
    generationId: 7,
    type: "Normal",
    type2: null
  },
  {
    name: "turtonator",
    imageURL: "https://i.imgur.com/joFHRqm.png",
    number: 776,
    generationId: 7,
    type: "Fire",
    type2: "Dragon"
  },
  {
    name: "togedemaru",
    imageURL: "https://i.imgur.com/WjaL90d.png",
    number: 777,
    generationId: 7,
    type: "Electric",
    type2: "Steel"
  },
  {
    name: "mimikyu",
    imageURL: "https://i.imgur.com/CwU54eT.png",
    number: 778,
    generationId: 7,
    type: "Ghost",
    type2: "Fairy"
  },
  {
    name: "bruxish",
    imageURL: "https://i.imgur.com/syXFHo4.png",
    number: 779,
    generationId: 7,
    type: "Water",
    type2: "Psychic"
  },
  {
    name: "drampa",
    imageURL: "https://i.imgur.com/q2yHhbE.png",
    number: 780,
    generationId: 7,
    type: "Dragon",
    type2: "Normal"
  },
  {
    name: "dhelmise",
    imageURL: "https://i.imgur.com/aOklAim.png",
    number: 781,
    generationId: 7,
    type: "Ghost",
    type2: "Grass"
  },
  {
    name: "jangmo-o",
    imageURL: "https://i.imgur.com/YEkKvSk.png",
    number: 782,
    generationId: 7,
    type: "Dragon",
    type2: null
  },
  {
    name: "hakamo-o",
    imageURL: "https://i.imgur.com/fxwhMuq.png",
    number: 783,
    generationId: 7,
    type: "Dragon",
    type2: "Fighting"
  },
  {
    name: "kommo-o",
    imageURL: "https://i.imgur.com/XeQ6YnU.png",
    number: 784,
    generationId: 7,
    type: "Dragon",
    type2: "Fighting"
  },
  {
    name: "tapu-koko",
    imageURL: "https://i.imgur.com/ZgZGecZ.png",
    number: 785,
    generationId: 7,
    type: "Electric",
    type2: "Fairy"
  },
  {
    name: "tapu-lele",
    imageURL: "https://i.imgur.com/Hk9NTl7.png",
    number: 786,
    generationId: 7,
    type: "Psychic",
    type2: "Fairy"
  },
  {
    name: "tapu-bulu",
    imageURL: "https://i.imgur.com/t4BHnii.png",
    number: 787,
    generationId: 7,
    type: "Grass",
    type2: "Fairy"
  },
  {
    name: "tapu-fini",
    imageURL: "https://i.imgur.com/OsTw5QP.png",
    number: 788,
    generationId: 7,
    type: "Water",
    type2: "Fairy"
  },
  {
    name: "cosmog",
    imageURL: "https://i.imgur.com/tNg1HJi.png",
    number: 789,
    generationId: 7,
    type: "Psychic",
    type2: null
  },
  {
    name: "cosmoem",
    imageURL: "https://i.imgur.com/vEqFYPL.png",
    number: 790,
    generationId: 7,
    type: "Psychic",
    type2: null
  },
  {
    name: "solgaleo",
    imageURL: "https://i.imgur.com/LWNGVsV.png",
    number: 791,
    generationId: 7,
    type: "Psychic",
    type2: "Steel"
  },
  {
    name: "lunala",
    imageURL: "https://i.imgur.com/qWfnDXI.png",
    number: 792,
    generationId: 7,
    type: "Psychic",
    type2: "Ghost"
  },
  {
    name: "nihilego",
    imageURL: "https://i.imgur.com/MX89cup.png",
    number: 793,
    generationId: 7,
    type: "Rock",
    type2: "Poison"
  },
  {
    name: "buzzwole",
    imageURL: "https://i.imgur.com/NkJWyn7.png",
    number: 794,
    generationId: 7,
    type: "Bug",
    type2: "Fighting"
  },
  {
    name: "pheromosa",
    imageURL: "https://i.imgur.com/qj1Cuzb.png",
    number: 795,
    generationId: 7,
    type: "Bug",
    type2: "Flying"
  },
  {
    name: "xurkitree",
    imageURL: "https://i.imgur.com/TNYLQ8V.png",
    number: 796,
    generationId: 7,
    type: "Electric",
    type2: null
  },
  {
    name: "celesteela",
    imageURL: "https://i.imgur.com/WkxIvqZ.png",
    number: 797,
    generationId: 7,
    type: "Steel",
    type2: "Flying"
  },
  {
    name: "kartana",
    imageURL: "https://i.imgur.com/IguAPng.png",
    number: 798,
    generationId: 7,
    type: "Grass",
    type2: "Steel"
  },
  {
    name: "guzzlord",
    imageURL: "https://i.imgur.com/idTms7E.png",
    number: 799,
    generationId: 7,
    type: "Dark",
    type2: "Dragon"
  },
  {
    name: "necrozma",
    imageURL: "https://i.imgur.com/n99NmxZ.png",
    number: 800,
    generationId: 7,
    type: "Psychic",
    type2: null
  },
  {
    name: "magearna",
    imageURL: "https://i.imgur.com/o815ubK.png",
    number: 801,
    generationId: 7,
    type: "Steel",
    type2: "Fairy"
  },
  {
    name: "marshadow",
    imageURL: "https://i.imgur.com/FjDqhnM.png",
    number: 802,
    generationId: 7,
    type: "Fighting",
    type2: "Ghost"
  },
  {
    name: "poipole",
    imageURL: "https://i.imgur.com/nYGAjPg.png",
    number: 803,
    generationId: 7,
    type: "Poison",
    type2: null
  },
  {
    name: "naganadel",
    imageURL: "https://i.imgur.com/4yo251d.png",
    number: 804,
    generationId: 7,
    type: "Poison",
    type2: "Dragon"
  },
  {
    name: "stakataka",
    imageURL: "https://i.imgur.com/NQeUfH5.png",
    number: 805,
    generationId: 7,
    type: "Rock",
    type2: "Steel"
  },
  {
    name: "blacephalon",
    imageURL: "https://i.imgur.com/nWK2pni.png",
    number: 806,
    generationId: 7,
    type: "Fire",
    type2: "Ghost"
  },
  {
    name: "zeraora",
    imageURL: "https://i.imgur.com/1210aFM.png",
    number: 807,
    generationId: 7,
    type: "Electric",
    type2: null
  },
  {
    name: "meltan",
    imageURL: "https://i.imgur.com/QWjrU2J.png",
    number: 808,
    generationId: 7,
    type: "Steel",
    type2: null
  },
  {
    name: "melmetal",
    imageURL: "https://i.imgur.com/VN6Qd76.png",
    number: 809,
    generationId: 7,
    type: "Steel",
    type2: null
  }
];

export const ALL_POKEMON_GALAR: CreatePokemon[] = [
  {
    name: "grookey",
    imageURL: "https://i.imgur.com/nH3RRlH.png",
    number: 810,
    generationId: 8,
    type: "Grass",
    type2: ""
  },
  {
    name: "thwackey",
    imageURL: "https://i.imgur.com/RkK71cN.png",
    number: 811,
    generationId: 8,
    type: "Grass",
    type2: ""
  },
  {
    name: "rillaboom",
    imageURL: "https://i.imgur.com/sjYDCHV.png",
    number: 812,
    generationId: 8,
    type: "Grass",
    type2: ""
  },
  {
    name: "scorbunny",
    imageURL: "https://i.imgur.com/1g1GPaP.png",
    number: 813,
    generationId: 8,
    type: "Fire",
    type2: ""
  },
  {
    name: "raboot",
    imageURL: "https://i.imgur.com/7Mn77MM.png",
    number: 814,
    generationId: 8,
    type: "Fire",
    type2: ""
  },
  {
    name: "cinderace",
    imageURL: "https://i.imgur.com/BNqNbMi.png",
    number: 815,
    generationId: 8,
    type: "Fire",
    type2: ""
  },
  {
    name: "sobble",
    imageURL: "https://i.imgur.com/MYrTT6R.png",
    number: 816,
    generationId: 8,
    type: "Water",
    type2: ""
  },
  {
    name: "drizzile",
    imageURL: "https://i.imgur.com/olMVTUj.png",
    number: 817,
    generationId: 8,
    type: "Water",
    type2: ""
  },
  {
    name: "inteleon",
    imageURL: "https://i.imgur.com/D9Kipb9.png",
    number: 818,
    generationId: 8,
    type: "Water",
    type2: ""
  },
  {
    name: "skwovet",
    imageURL: "https://i.imgur.com/4pZU9SL.png",
    number: 819,
    generationId: 8,
    type: "Normal",
    type2: ""
  },
  {
    name: "greedent",
    imageURL: "https://i.imgur.com/RMxDSCn.png",
    number: 820,
    generationId: 8,
    type: "Normal",
    type2: ""
  },
  {
    name: "rookidee",
    imageURL: "https://i.imgur.com/bkVTB3n.png",
    number: 821,
    generationId: 8,
    type: "Flying",
    type2: ""
  },
  {
    name: "corvisquire",
    imageURL: "https://i.imgur.com/U95oIjA.png",
    number: 822,
    generationId: 8,
    type: "Flying",
    type2: ""
  },
  {
    name: "corviknight",
    imageURL: "https://i.imgur.com/02BvvKU.png",
    number: 823,
    generationId: 8,
    type: "Flying",
    type2: "Steel"
  },
  {
    name: "blipbug",
    imageURL: "https://i.imgur.com/o8IOJyX.png",
    number: 824,
    generationId: 8,
    type: "Bug",
    type2: ""
  },
  {
    name: "dottler",
    imageURL: "https://i.imgur.com/cm8Gsg7.png",
    number: 825,
    generationId: 8,
    type: "Bug",
    type2: "Psychic"
  },
  {
    name: "orbeetle",
    imageURL: "https://i.imgur.com/bzKHHke.png",
    number: 826,
    generationId: 8,
    type: "Bug",
    type2: "Psychic"
  },
  {
    name: "nickit",
    imageURL: "https://i.imgur.com/mYDWNQ9.png",
    number: 827,
    generationId: 8,
    type: "Dark",
    type2: ""
  },
  {
    name: "thievul",
    imageURL: "https://i.imgur.com/rttlHnp.png",
    number: 828,
    generationId: 8,
    type: "Dark",
    type2: ""
  },
  {
    name: "gossifleur",
    imageURL: "https://i.imgur.com/c7ODqvN.png",
    number: 829,
    generationId: 8,
    type: "Grass",
    type2: ""
  },
  {
    name: "eldegoss",
    imageURL: "https://i.imgur.com/fHPntNd.png",
    number: 830,
    generationId: 8,
    type: "Grass",
    type2: ""
  },
  {
    name: "wooloo",
    imageURL: "https://i.imgur.com/otyL4kJ.png",
    number: 831,
    generationId: 8,
    type: "Normal",
    type2: ""
  },
  {
    name: "dubwool",
    imageURL: "https://i.imgur.com/yZaQYTu.png",
    number: 832,
    generationId: 8,
    type: "Normal",
    type2: ""
  },
  {
    name: "chewtle",
    imageURL: "https://i.imgur.com/w77n9Cn.png",
    number: 833,
    generationId: 8,
    type: "Water",
    type2: ""
  },
  {
    name: "drednaw",
    imageURL: "https://i.imgur.com/8DbS8Cd.png",
    number: 834,
    generationId: 8,
    type: "Water",
    type2: "Rock"
  },
  {
    name: "yamper",
    imageURL: "https://i.imgur.com/3mZfdXX.png",
    number: 835,
    generationId: 8,
    type: "Electric",
    type2: ""
  },
  {
    name: "boltund",
    imageURL: "https://i.imgur.com/p9adhTr.png",
    number: 836,
    generationId: 8,
    type: "Electric",
    type2: ""
  },
  {
    name: "rolycoly",
    imageURL: "https://i.imgur.com/yHVKHka.png",
    number: 837,
    generationId: 8,
    type: "Rock",
    type2: ""
  },
  {
    name: "carkol",
    imageURL: "https://i.imgur.com/havIUOc.png",
    number: 838,
    generationId: 8,
    type: "Rock",
    type2: "Fire"
  },
  {
    name: "coalossal",
    imageURL: "https://i.imgur.com/qxJfhvG.png",
    number: 839,
    generationId: 8,
    type: "Rock",
    type2: "Fire"
  },
  {
    name: "applin",
    imageURL: "https://i.imgur.com/eQdzv3E.png",
    number: 840,
    generationId: 8,
    type: "Grass",
    type2: "Dragon"
  },
  {
    name: "flapple",
    imageURL: "https://i.imgur.com/j565BLd.png",
    number: 841,
    generationId: 8,
    type: "Grass",
    type2: "Dragon"
  },
  {
    name: "appletun",
    imageURL: "https://i.imgur.com/OkuDGU9.png",
    number: 842,
    generationId: 8,
    type: "Grass",
    type2: "Dragon"
  },
  {
    name: "silicobra",
    imageURL: "https://i.imgur.com/smZdMs3.png",
    number: 843,
    generationId: 8,
    type: "Ground",
    type2: ""
  },
  {
    name: "sandaconda",
    imageURL: "https://i.imgur.com/S9ee1te.png",
    number: 844,
    generationId: 8,
    type: "Ground",
    type2: ""
  },
  {
    name: "cramorant",
    imageURL: "https://i.imgur.com/x1PF54z.png",
    number: 845,
    generationId: 8,
    type: "Flying",
    type2: "Water"
  },
  {
    name: "arrokuda",
    imageURL: "https://i.imgur.com/SAw5kP8.png",
    number: 846,
    generationId: 8,
    type: "Water",
    type2: ""
  },
  {
    name: "barraskewda",
    imageURL: "https://i.imgur.com/CvlgfPA.png",
    number: 847,
    generationId: 8,
    type: "Water",
    type2: ""
  },
  {
    name: "toxel",
    imageURL: "https://i.imgur.com/GF2Iu7n.png",
    number: 848,
    generationId: 8,
    type: "Electric",
    type2: "Poison"
  },
  {
    name: "toxtricity",
    imageURL: "https://i.imgur.com/AUWAxkR.png",
    number: 849,
    generationId: 8,
    type: "Electric",
    type2: "Poison"
  },
  {
    name: "sizzlipede",
    imageURL: "https://i.imgur.com/XUE7opz.png",
    number: 850,
    generationId: 8,
    type: "Fire",
    type2: "Bug"
  },
  {
    name: "centiskorch",
    imageURL: "https://i.imgur.com/YxMPR0y.png",
    number: 851,
    generationId: 8,
    type: "Fire",
    type2: "Bug"
  },
  {
    name: "clobbopus",
    imageURL: "https://i.imgur.com/bgQBTkO.png",
    number: 852,
    generationId: 8,
    type: "Fighting",
    type2: ""
  },
  {
    name: "grapploct",
    imageURL: "https://i.imgur.com/g92vqUL.png",
    number: 853,
    generationId: 8,
    type: "Fighting",
    type2: ""
  },
  {
    name: "sinistea",
    imageURL: "https://i.imgur.com/7LnyNmS.png",
    number: 854,
    generationId: 8,
    type: "Ghost",
    type2: ""
  },
  {
    name: "polteageist",
    imageURL: "https://i.imgur.com/CCLbMD5.png",
    number: 855,
    generationId: 8,
    type: "Ghost",
    type2: ""
  },
  {
    name: "hatenna",
    imageURL: "https://i.imgur.com/wLFzhSk.png",
    number: 856,
    generationId: 8,
    type: "Psychic",
    type2: ""
  },
  {
    name: "hattrem",
    imageURL: "https://i.imgur.com/dSMwwHn.png",
    number: 857,
    generationId: 8,
    type: "Psychic",
    type2: ""
  },
  {
    name: "hatterene",
    imageURL: "https://i.imgur.com/A8vavbU.png",
    number: 858,
    generationId: 8,
    type: "Psychic",
    type2: "Fairy"
  },
  {
    name: "impidimp",
    imageURL: "https://i.imgur.com/NvcvjUh.png",
    number: 859,
    generationId: 8,
    type: "Dark",
    type2: "Fairy"
  },
  {
    name: "morgrem",
    imageURL: "https://i.imgur.com/5rsKL0S.png",
    number: 860,
    generationId: 8,
    type: "Dark",
    type2: "Fairy"
  },
  {
    name: "grimmsnarl",
    imageURL: "https://i.imgur.com/r5AaHCo.png",
    number: 861,
    generationId: 8,
    type: "Dark",
    type2: "Fairy"
  },
  {
    name: "obstagoon",
    imageURL: "https://i.imgur.com/UtxOs9s.png",
    number: 862,
    generationId: 8,
    type: "Dark",
    type2: "Normal"
  },
  {
    name: "perrserker",
    imageURL: "https://i.imgur.com/rGW5bP3.png",
    number: 863,
    generationId: 8,
    type: "Steel",
    type2: ""
  },
  {
    name: "cursola",
    imageURL: "https://i.imgur.com/7jVXJrl.png",
    number: 864,
    generationId: 8,
    type: "Ghost",
    type2: ""
  },
  {
    name: "sirfetchd",
    imageURL: "https://i.imgur.com/D5S4PYn.png",
    number: 865,
    generationId: 8,
    type: "Fighting",
    type2: ""
  },
  {
    name: "mr-rime",
    imageURL: "https://i.imgur.com/xsntu50.png",
    number: 866,
    generationId: 8,
    type: "Ice",
    type2: "Psychic"
  },
  {
    name: "runerigus",
    imageURL: "https://i.imgur.com/xLYeJyn.png",
    number: 867,
    generationId: 8,
    type: "Ground",
    type2: "Ghost"
  },
  {
    name: "milcery",
    imageURL: "https://i.imgur.com/5tzPOpd.png",
    number: 868,
    generationId: 8,
    type: "Fairy",
    type2: ""
  },
  {
    name: "alcremie",
    imageURL: "https://i.imgur.com/cxHNUuH.png",
    number: 869,
    generationId: 8,
    type: "Fairy",
    type2: ""
  },
  {
    name: "falinks",
    imageURL: "https://i.imgur.com/YStgQFg.png",
    number: 870,
    generationId: 8,
    type: "Fighting",
    type2: ""
  },
  {
    name: "pincurchin",
    imageURL: "https://i.imgur.com/a6JD7ZF.png",
    number: 871,
    generationId: 8,
    type: "Electric",
    type2: ""
  },
  {
    name: "snom",
    imageURL: "https://i.imgur.com/2RsNpZE.png",
    number: 872,
    generationId: 8,
    type: "Ice",
    type2: "Bug"
  },
  {
    name: "frosmoth",
    imageURL: "https://i.imgur.com/URwIwNL.png",
    number: 873,
    generationId: 8,
    type: "Ice",
    type2: "Bug"
  },
  {
    name: "stonjourner",
    imageURL: "https://i.imgur.com/NGyUiuZ.png",
    number: 874,
    generationId: 8,
    type: "Rock",
    type2: ""
  },
  {
    name: "eiscue",
    imageURL: "https://i.imgur.com/Lj2ZhJF.png",
    number: 875,
    generationId: 8,
    type: "Ice",
    type2: ""
  },
  {
    name: "indeedee",
    imageURL: "https://i.imgur.com/cEMYnvm.png",
    number: 876,
    generationId: 8,
    type: "Psychic",
    type2: "Normal"
  },
  {
    name: "morpeko",
    imageURL: "https://i.imgur.com/AvrmzcL.png",
    number: 877,
    generationId: 8,
    type: "Electric",
    type2: "Dark"
  },
  {
    name: "cufant",
    imageURL: "https://i.imgur.com/pVLcQPj.png",
    number: 878,
    generationId: 8,
    type: "Steel",
    type2: ""
  },
  {
    name: "copperajah",
    imageURL: "https://i.imgur.com/giGgRrd.png",
    number: 879,
    generationId: 8,
    type: "Steel",
    type2: ""
  },
  {
    name: "dracozolt",
    imageURL: "https://i.imgur.com/gmxZm0e.png",
    number: 880,
    generationId: 8,
    type: "Electric",
    type2: "Dragon"
  },
  {
    name: "arctozolt",
    imageURL: "https://i.imgur.com/o7s4D4Q.png",
    number: 881,
    generationId: 8,
    type: "Electric",
    type2: "Ice"
  },
  {
    name: "dracovish",
    imageURL: "https://i.imgur.com/tEl11zU.png",
    number: 882,
    generationId: 8,
    type: "Water",
    type2: "Dragon"
  },
  {
    name: "arctovish",
    imageURL: "https://i.imgur.com/lwlqKdT.png",
    number: 883,
    generationId: 8,
    type: "Water",
    type2: "Ice"
  },
  {
    name: "duraludon",
    imageURL: "https://i.imgur.com/z7V2K4h.png",
    number: 884,
    generationId: 8,
    type: "Steel",
    type2: "Dragon"
  },
  {
    name: "dreepy",
    imageURL: "https://i.imgur.com/goXHL5f.png",
    number: 885,
    generationId: 8,
    type: "Dragon",
    type2: "Ghost"
  },
  {
    name: "drakloak",
    imageURL: "https://i.imgur.com/bfCAh3L.png",
    number: 886,
    generationId: 8,
    type: "Dragon",
    type2: "Ghost"
  },
  {
    name: "dragapult",
    imageURL: "https://i.imgur.com/FCCfM7j.png",
    number: 887,
    generationId: 8,
    type: "Dragon",
    type2: "Ghost"
  },
  {
    name: "zacian",
    imageURL: "https://i.imgur.com/jfX7lOh.png",
    number: 888,
    generationId: 8,
    type: "Fairy",
    type2: "Steel"
  },
  {
    name: "zamazenta",
    imageURL: "https://i.imgur.com/oKyl3qc.png",
    number: 889,
    generationId: 8,
    type: "Fighting",
    type2: "Steel"
  },
  {
    name: "eternatus",
    imageURL: "https://i.imgur.com/ljhKaY7.png",
    number: 890,
    generationId: 8,
    type: "Poison",
    type2: "Dragon"
  },
  {
    name: "kubfu",
    imageURL: "https://i.imgur.com/nJPCwhA.png",
    number: 891,
    generationId: 8,
    type: "Fighting",
    type2: ""
  },
  {
    name: "urshifu",
    imageURL: "https://i.imgur.com/Oj3rNKF.png",
    number: 892,
    generationId: 8,
    type: "Fighting",
    type2: "Dark"
  },
  {
    name: "zarude",
    imageURL: "https://i.imgur.com/DEAQ8sD.png",
    number: 893,
    generationId: 8,
    type: "Dark",
    type2: "Grass"
  },
  {
    name: "regieleki",
    imageURL: "https://i.imgur.com/zv02W1G.png",
    number: 894,
    generationId: 8,
    type: "Electric",
    type2: ""
  },
  {
    name: "regidrago",
    imageURL: "https://i.imgur.com/43b2U2D.png",
    number: 895,
    generationId: 8,
    type: "Dragon",
    type2: ""
  },
  {
    name: "glastrier",
    imageURL: "https://i.imgur.com/tZoWBli.png",
    number: 896,
    generationId: 8,
    type: "Ice",
    type2: ""
  },
  {
    name: "spectrier",
    imageURL: "https://i.imgur.com/7CPGnTn.png",
    number: 897,
    generationId: 8,
    type: "Ghost",
    type2: ""
  },
  {
    name: "calyrex",
    imageURL: "https://i.imgur.com/InSHKxm.png",
    number: 898,
    generationId: 8,
    type: "Psychic",
    type2: "Grass"
  },
  {
    name: "wyrdeer",
    imageURL: "https://i.imgur.com/tUsFBvG.png",
    number: 899,
    generationId: 8,
    type: "Normal",
    type2: "Psychic"
  },
  {
    name: "kleavor",
    imageURL: "https://i.imgur.com/Lg4Qskf.png",
    number: 900,
    generationId: 8,
    type: "Bug",
    type2: "Rock"
  },
  {
    name: "ursaluna",
    imageURL: "https://i.imgur.com/aEi7KUB.png",
    number: 901,
    generationId: 8,
    type: "Ground",
    type2: "Normal"
  },
  {
    name: "basculegion",
    imageURL: "https://i.imgur.com/b6tczOv.png",
    number: 902,
    generationId: 8,
    type: "Water",
    type2: "Ghost"
  },
  {
    name: "sneasler",
    imageURL: "https://i.imgur.com/Ib8OZT4.png",
    number: 903,
    generationId: 8,
    type: "Fighting",
    type2: "Poison"
  },
  {
    name: "overqwil",
    imageURL: "https://i.imgur.com/sdNlASz.png",
    number: 904,
    generationId: 8,
    type: "Dark",
    type2: "Poison"
  },
  {
    name: "enamorus",
    imageURL: "https://i.imgur.com/R9CQn7F.png",
    number: 905,
    generationId: 8,
    type: "Fairy",
    type2: "Flying"
  }
];

export const ALL_POKEMON_PALDEA: CreatePokemon[] = [
  {
    name: "sprigatito",
    imageURL: "",
    number: 906,
    type: "Grass",
    type2: "",
    generationId: 9
  },
  {
    name: "floragato",
    imageURL: "",
    number: 907,
    type: "Grass",
    type2: "",
    generationId: 9
  },
  {
    name: "meowscarada",
    imageURL: "",
    number: 908,
    type: "Grass",
    type2: "Dark",
    generationId: 9
  },
  {
    name: "fuecoco",
    imageURL: "",
    number: 909,
    type: "Fire",
    type2: "",
    generationId: 9
  },
  {
    name: "crocalor",
    imageURL: "",
    number: 910,
    type: "Fire",
    type2: "",
    generationId: 9
  },
  {
    name: "skeledirge",
    imageURL: "",
    number: 911,
    type: "Fire",
    type2: "Ghost",
    generationId: 9
  },
  {
    name: "quaxly",
    imageURL: "",
    number: 912,
    type: "Water",
    type2: "",
    generationId: 9
  },
  {
    name: "quaxwell",
    imageURL: "",
    number: 913,
    type: "Water",
    type2: "",
    generationId: 9
  },
  {
    name: "quaquaval",
    imageURL: "",
    number: 914,
    type: "Water",
    type2: "Fighting",
    generationId: 9
  },
  {
    name: "lechonk",
    imageURL: "",
    number: 915,
    type: "Normal",
    type2: "",
    generationId: 9
  },
  {
    name: "oinkologne",
    imageURL: "",
    number: 916,
    type: "Normal",
    type2: "",
    generationId: 9
  },
  {
    name: "tarountula",
    imageURL: "",
    number: 917,
    type: "Bug",
    type2: "",
    generationId: 9
  },
  {
    name: "spidops",
    imageURL: "",
    number: 918,
    type: "Bug",
    type2: "",
    generationId: 9
  },
  {
    name: "nymble",
    imageURL: "",
    number: 919,
    type: "Bug",
    type2: "",
    generationId: 9
  },
  {
    name: "lokix",
    imageURL: "",
    number: 920,
    type: "Bug",
    type2: "Dark",
    generationId: 9
  },
  {
    name: "pawmi",
    imageURL: "",
    number: 921,
    type: "Electric",
    type2: "",
    generationId: 9
  },
  {
    name: "pawmo",
    imageURL: "",
    number: 922,
    type: "Electric",
    type2: "Fighting",
    generationId: 9
  },
  {
    name: "pawmot",
    imageURL: "",
    number: 923,
    type: "Electric",
    type2: "Fighting",
    generationId: 9
  },
  {
    name: "tandemaus",
    imageURL: "",
    number: 924,
    type: "Normal",
    type2: "",
    generationId: 9
  },
  {
    name: "maushold",
    imageURL: "",
    number: 925,
    type: "Normal",
    type2: "",
    generationId: 9
  },
  {
    name: "fidough",
    imageURL: "",
    number: 926,
    type: "Fairy",
    type2: "",
    generationId: 9
  },
  {
    name: "dachsbun",
    imageURL: "",
    number: 927,
    type: "Fairy",
    type2: "",
    generationId: 9
  },
  {
    name: "smoliv",
    imageURL: "",
    number: 928,
    type: "Grass",
    type2: "Normal",
    generationId: 9
  },
  {
    name: "dolliv",
    imageURL: "",
    number: 929,
    type: "Grass",
    type2: "Normal",
    generationId: 9
  },
  {
    name: "arboliva",
    imageURL: "",
    number: 930,
    type: "Grass",
    type2: "Normal",
    generationId: 9
  },
  {
    name: 'squawkabilly',
    imageURL: "",
    number: 931,
    type: "Flying",
    type2: "",
    generationId: 9
  },
  {
    name: 'nacli',
    imageURL: "",
    number: 932,
    type: "Rock",
    type2: "",
    generationId: 9
  },
  {
    name: 'naclstack',
    imageURL: "",
    number: 933,
    type: "Rock",
    type2: "Steel",
    generationId: 9
  },
  {
    name: 'garganacl',
    imageURL: "",
    number: 934,
    type: "Rock",
    type2: "Salt",
    generationId: 9
  },
  {
    name: 'charcadet',
    imageURL: "",
    number: 935,
    type: "Fire",
    type2: "",
    generationId: 9
  },
  {
    name: 'armarouge',
    imageURL: "",
    number: 936,
    type: "Fire",
    type2: "Psychic",
    generationId: 9
  },
  {
    name: 'ceruledge',
    imageURL: "",
    number: 937,
    type: "Fire",
    type2: "Ghost",
    generationId: 9
  },
  {
    name: 'tadbulb',
    imageURL: "",
    number: 938,
    type: "Electric",
    type2: "",
    generationId: 9
  },
  {
    name: 'bellibolt',
    imageURL: "",
    number: 939,
    type: "Electric",
    type2: "Water",
    generationId: 9
  },
  {
    name: 'wattrel',
    imageURL: "",
    number: 940,
    type: "Electric",
    type2: "Flying",
    generationId: 9
  },
  {
    name: 'kilowattrel',
    imageURL: "",
    number: 941,
    type: "Electric",
    type2: "Flying",
    generationId: 9
  },
  {
    name: 'maschiff',
    imageURL: "",
    number: 942,
    type: "Dark",
    type2: "",
    generationId: 9
  },
  {
    name: 'mabosstiff',
    imageURL: "",
    number: 943,
    type: "Dark",
    type2: "",
    generationId: 9
  },
  {
    name: 'shroodle',
    imageURL: "",
    number: 944,
    type: "Poison",
    type2: "Normal",
    generationId: 9
  },
  {
    name: 'grafaiai',
    imageURL: "",
    number: 945,
    type: "Poison",
    type2: "Normal",
    generationId: 9
  },
  {
    name: 'bramblin',
    imageURL: "",
    number: 946,
    type: "Grass",
    type2: "Ghost",
    generationId: 9
  },
  {
    name: 'brambleghast',
    imageURL: "",
    number: 947,
    type: "Grass",
    type2: "Ghost",
    generationId: 9
  },
  {
    name: 'toedscool',
    imageURL: "",
    number: 948,
    type: "Ground",
    type2: "Grass",
    generationId: 9
  },
  {
    name: 'toedscruel',
    imageURL: "",
    number: 949,
    type: "Ground",
    type2: "Grass",
    generationId: 9
  },
  {
    name: 'klawf',
    imageURL: "",
    number: 950,
    type: "Rock",
    type2: "Bug",
    generationId: 9
  },
  {
    name: 'capsakid',
    imageURL: "",
    number: 951,
    type: "Grass",
    type2: "Fire",
    generationId: 9
  },
  {
    name: 'scovillain',
    imageURL: "",
    number: 952,
    type: "Grass",
    type2: "Fire",
    generationId: 9
  },
  {
    name: 'rellor',
    imageURL: "",
    number: 953,
    type: "Bug",
    type2: "Grass",
    generationId: 9
  },
  {
    name: 'rabsca',
    imageURL: "",
    number: 954,
    type: "Bug",
    type2: "Psychic",
    generationId: 9
  },
  {
    name: 'flittle',
    imageURL: "",
    number: 955,
    type: "Psychic",
    type2: "",
    generationId: 9
  },
  {
    name: 'espathra',
    imageURL: "",
    number: 956,
    type: "Psychic",
    type2: "",
    generationId: 9
  },
  {
    name: 'tinkatink',
    imageURL: "",
    number: 957,
    type: "Fairy",
    type2: "Steel",
    generationId: 9
  },
  {
    name: 'tinkatuff',
    imageURL: "",
    number: 958,
    type: "Fairy",
    type2: "Steel",
    generationId: 9
  },
  {
    name: 'tinkaton',
    imageURL: "",
    number: 959,
    type: "Fairy",
    type2: "Steel",
    generationId: 9
  },
  {
    name: 'wiglett',
    imageURL: "",
    number: 960,
    type: "Water",
    type2: "Ground",
    generationId: 9
  },
  {
    name: 'wugtrio',
    imageURL: "",
    number: 961,
    type: "Water",
    type2: "Ground",
    generationId: 9
  },
  {
    name: 'bombirdier',
    imageURL: "",
    number: 962,
    type: "Flying",
    type2: "Dark",
    generationId: 9
  },
  {
    name: 'finizen',
    imageURL: "",
    number: 963,
    type: "Water",
    type2: "",
    generationId: 9
  },
  {
    name: 'palafin',
    imageURL: "",
    number: 964,
    type: "Water",
    type2: "",
    generationId: 9
  },
  {
    name: 'varoom',
    imageURL: "",
    number: 965,
    type: "Steel",
    type2: "Poison",
    generationId: 9
  },
  {
    name: 'revavroom',
    imageURL: "",
    number: 966,
    type: "Steel",
    type2: "Poison",
    generationId: 9
  },
  {
    name: 'cyclizar',
    imageURL: "",
    number: 967,
    type: "Dragon",
    type2: "Normal",
    generationId: 9
  },
  {
    name: 'orthworm',
    imageURL: "",
    number: 968,
    type: "Steel",
    type2: "Ground",
    generationId: 9
  },
  {
    name: 'glimmet',
    imageURL: "",
    number: 969,
    type: "Rock",
    type2: "Poison",
    generationId: 9
  },
  {
    name: 'glimmora',
    imageURL: "",
    number: 970,
    type: "Rock",
    type2: "Poison",
    generationId: 9
  },
  {
    name: 'greavard',
    imageURL: "",
    number: 971,
    type: "Ghost",
    type2: "",
    generationId: 9
  },
  {
    name: 'houndstone',
    imageURL: "",
    number: 972,
    type: "Ghost",
    type2: "",
    generationId: 9
  },
  {
    name: 'flamigo',
    imageURL: "",
    number: 973,
    type: "Flying",
    type2: "Fire",
    generationId: 9
  },
  {
    name: 'cetoddle',
    imageURL: "",
    number: 974,
    type: "Ice",
    type2: "",
    generationId: 9
  },
  {
    name: 'cetitan',
    imageURL: "",
    number: 975,
    type: "Ice",
    type2: "",
    generationId: 9
  },
  {
    name: 'veluza',
    imageURL: "",
    number: 976,
    type: "Water",
    type2: "Psychic",
    generationId: 9
  },
  {
    name: 'dondozo',
    imageURL: "",
    number: 977,
    type: "Water",
    type2: "",
    generationId: 9
  },
  {
    name: 'tatsugiri',
    imageURL: "",
    number: 978,
    type: "Dragon",
    type2: "Water",
    generationId: 9
  },
  {
    name: 'annihilape',
    imageURL: "",
    number: 979,
    type: "Ghost",
    type2: "Fighting",
    generationId: 9
  },
  {
    name: 'clodsire',
    imageURL: "",
    number: 980,
    type: "Poison",
    type2: "Ground",
    generationId: 9
  },
  {
    name: 'farigiraf',
    imageURL: "",
    number: 981,
    type: "Normal",
    type2: "Psychic",
    generationId: 9
  },
  {
    name: 'dudunsparce',
    imageURL: "",
    number: 982,
    type: "Normal",
    type2: "",
    generationId: 9
  },
  {
    name: 'kingambit',
    imageURL: "",
    number: 983,
    type: "Dark",
    type2: "Steel",
    generationId: 9
  },
  {
    name: 'great-tusk',
    imageURL: "",
    number: 984,
    type: "Ground",
    type2: "Fighting",
    generationId: 9
  },
  {
    name: 'scream-tail',
    imageURL: "",
    number: 985,
    type: "Fairy",
    type2: "Psychic",
    generationId: 9
  },
  {
    name: 'brute-bonnet',
    imageURL: "",
    number: 986,
    type: "Grass",
    type2: "Dark",
    generationId: 9
  },
  {
    name: 'flutter-mane',
    imageURL: "",
    number: 987,
    type: "Ghost",
    type2: "Flying",
    generationId: 9
  },
  {
    name: 'slither-wing',
    imageURL: "",
    number: 988,
    type: "Bug",
    type2: "Flying",
    generationId: 9
  },
  {
    name: 'sandy-shocks',
    imageURL: "",
    number: 989,
    type: "Electric",
    type2: "Ground",
    generationId: 9
  },
  {
    name: 'iron-treads',
    imageURL: "",
    number: 990,
    type: "Steel",
    type2: "Ground",
    generationId: 9
  },
  {
    name: 'iron-bundle',
    imageURL: "",
    number: 991,
    type: "Ice",
    type2: "Steel",
    generationId: 9
  },
  {
    name: 'iron-hands',
    imageURL: "",
    number: 992,
    type: "Fighting",
    type2: "Electric",
    generationId: 9
  },
  {
    name: 'iron-jugulis',
    imageURL: "",
    number: 993,
    type: "Dark",
    type2: "Flying",
    generationId: 9
  },
  {
    name: 'iron-moth',
    imageURL: "",
    number: 994,
    type: "Fire",
    type2: "Bug",
    generationId: 9
  },
  {
    name: 'iron-thorns',
    imageURL: "",
    number: 995,
    type: "Rock",
    type2: "Electric",
    generationId: 9
  },
  {
    name: 'frigibax',
    imageURL: "",
    number: 996,
    type: "Dragon",
    type2: "Ice",
    generationId: 9
  },
  {
    name: 'arctibax',
    imageURL: "",
    number: 997,
    type: "Dragon",
    type2: "Ice",
    generationId: 9
  },
  {
    name: 'baxcalibur',
    imageURL: "",
    number: 998,
    type: "Dragon",
    type2: "Ice",
    generationId: 9
  },
  {
    name: 'gimmighoul',
    imageURL: "",
    number: 999,
    type: "Ghost",
    type2: "Steel",
    generationId: 9
  },
  {
    name: 'gholdengo',
    imageURL: "",
    number: 1000,
    type: "Ghost",
    type2: "Steel",
    generationId: 9
  },
  {
    name: 'wo-chien',
    imageURL: "",
    number: 1001,
    type: "Dark",
    type2: "Grass",
    generationId: 9
  },
  {
    name: 'chien-pao',
    imageURL: "",
    number: 1002,
    type: "Dark",
    type2: "Ice",
    generationId: 9
  },
  {
    name: 'ting-lu',
    imageURL: "",
    number: 1003,
    type: "Ground",
    type2: "Dark",
    generationId: 9
  },
  {
    name: 'chi-yu',
    imageURL: "",
    number: 1004,
    type: "Dark",
    type2: "Fire",
    generationId: 9
  },
  {
    name: 'roaring-moon',
    imageURL: "",
    number: 1005,
    type: "Dragon",
    type2: "Dark",
    generationId: 9
  },
  {
    name: 'iron-valiant',
    imageURL: "",
    number: 1006,
    type: "Fairy",
    type2: "Fighting",
    generationId: 9
  },
  {
    name: 'koraidon',
    imageURL: "",
    number: 1007,
    type: "Dragon",
    type2: "Fighting",
    generationId: 9
  },
  {
    name: 'miraidon',
    imageURL: "",
    number: 1008,
    type: "Electric",
    type2: "Dragon",
    generationId: 9
  },
  {
    name: 'walking-wake',
    imageURL: "",
    number: 1009,
    type: "Water",
    type2: "Dragon",
    generationId: 9
  },
  {
    name: 'iron-leaves',
    imageURL: "",
    number: 1010,
    type: "Grass",
    type2: "psychic",
    generationId: 9
  },
  {
    name: 'dipplin',
    imageURL: "",
    number: 1011,
    type: "Grass",
    type2: "Dragon",
    generationId: 9
  },
  {
    name: 'poltchageist',
    imageURL: "",
    number: 1012,
    type: "Ghost",
    type2: "Grass",
    generationId: 9
  },
  {
    name: 'sinistcha',
    imageURL: "",
    number: 1013,
    type: "Ghost",
    type2: "Grass",
    generationId: 9
  },
  {
    name: 'okidogi',
    imageURL: "",
    number: 1014,
    type: "Fighting",
    type2: "Grass",
    generationId: 9
  },
  {
    name: 'munkidori',
    imageURL: "",
    number: 1015,
    type: "Poison",
    type2: "Dark",
    generationId: 9
  },
  {
    name: 'fezandipiti',
    imageURL: "",
    number: 1016,
    type: "Fairy",
    type2: "Dragon",
    generationId: 9
  },
  {
    name: 'ogerpon',
    imageURL: "",
    number: 1017,
    type: "Grass",
    type2: "",
    generationId: 9
  },
  {
    name: 'archaludon',
    imageURL: "",
    number: 1018,
    type: "Dragon",
    type2: "Steel",
    generationId: 9
  },
  {
    name: 'hydrapple',
    imageURL: "",
    number: 1019,
    type: "Dragon",
    type2: "Grass",
    generationId: 9
  },
  {
    name: 'gouging-fire',
    imageURL: "",
    number: 1020,
    type: "Fire",
    type2: "Dragon",
    generationId: 9
  },
  {
    name: 'raging-bolt',
    imageURL: "",
    number: 1021,
    type: "Electric",
    type2: "Dragon",
    generationId: 9
  },
  {
    name: 'iron-boulder',
    imageURL: "",
    number: 1022,
    type: "Rock",
    type2: "psychic",
    generationId: 9
  },
  {
    name: 'iron-crown',
    imageURL: "",
    number: 1023,
    type: "Steel",
    type2: "psychic",
    generationId: 9
  },
  {
    name: 'terapagos',
    imageURL: "",
    number: 1024,
    type: "Normal",
    type2: "",
    generationId: 9
  },
  {
    name: 'pecharunt',
    imageURL: "",
    number: 1025,
    type: "Poison",
    type2: "Ghost",
    generationId: 9
  }
];
