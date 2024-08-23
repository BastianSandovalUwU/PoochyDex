export interface Games {
  generation:   string;
  games:        string[];
  urlFrontPage: string[];
  genre:        string;
  players:      string;
  publishedBy:  string;
  developedBy:  string;
  platforms:    string[];
  gameHistory?:  string;
  characters?:  string;
  summary?: string;
  releaseDates: ReleaseDate[];
}

export interface ReleaseDate {
  console: string;
  region:  string;
  date:    string;
  date2?:  string;
}


export const pokemonRedBlueData: Games = {
  generation: "generation-i",
  games: ['Red', 'Blue'],
  urlFrontPage: ["https://i.imgur.com/LXL066K.jpeg", "https://i.imgur.com/JL2zmZW.jpeg"],
  genre: "RPG",
  players: "1-2",
  publishedBy: "Nintendo",
  developedBy: "Game Freak",
  platforms: ["Game Boy", "Nintendo 3DS (Consola Virtual)"],
  gameHistory: `El jugador toma el mando de un niño que vive en Pueblo Paleta, y ha cumplido la edad para poder irse de su casa y dedicarse a entrenar Pokémon. El nombre del protagonista puede ser escogido por el jugador, aunque su nombre genérico es Rojo. El profesor Oak te permitirá elegir uno de entre tres Pokémon iniciales (Bulbasaur, Charmander y Squirtle) para iniciar la aventura y poder combatir contra otros Pokémon salvajes y entrenadores.
    Al mismo tiempo se presenta al nieto del profesor Oak que también escogerá a su Pokémon inicial y se convertirá en tu rival durante el videojuego, por lo que deberás combatirlo varias veces.
    La meta principal del videojuego es llegar a la Liga Pokémon y enfrentarse al implacable Alto Mando. Para ello el jugador debe reunir las ocho medallas de gimnasio que se consiguen derrotando a los líderes de cada gimnasio Pokémon ubicados en distintas partes de la región Kanto. Para avanzar en su viaje el jugador debe sortear todo tipo de obstáculos, cumplir objetivos y entrenar constantemente a los Pokémon de su equipo para que aumenten su nivel y aprendan nuevos movimientos.
    Dentro de la aventura además el jugador deberá hacer frente a un grupo de villanos conocidos como el Team Rocket liderados por el misterioso Giovanni quienes con sus ambiciosos planes amenazan el bienestar de las personas y los Pokémon de Kanto.
    Otro objetivo del videojuego es completar la Pokédex para el profesor Oak, pero para ello el jugador necesita intercambiar Pokémon con otro que tenga la otra edición, como en la mayoría de los videojuegos de Pokémon.`,
  summary: `Pokémon Rojo y Pokémon Azul (Pokémon Red y Pokémon Blue en inglés, ポケットモンスター 赤 Pocket Monsters Aka y ポケットモンスター青 Pocket Monsters Ao en japonés) son los dos primeros videojuegos de Pokémon que fueron lanzados al mercado occidental para la consola portátil Game Boy y posteriormente el 27 de febrero de 2016 se estrenó en la eShop de Nintendo 3DS. Estos videojuegos utilizan el motor y los gráficos del videojuego japonés Pokémon Azul, aunque la disponibilidad de Pokémon se corresponde con las ediciones japonesas Pokémon Rojo y Pokémon Verde (los primeros dos videojuegos Pokémon).
  El término edición (versión en inglés) se debe a que ambos videojuegos son casi idénticos. Su única diferencia a grandes rasgos es la disponibilidad de Pokémon, puesto que cada edición presenta 11 criaturas exclusivas que no aparecen en la otra edición. Esta es una característica que se mantendría en todos los títulos siguientes de Pokémon.
  Este videojuego presenta a los 151 Pokémon originales que luego se denominarían "la primera generación."
  Este contenido proviene de wikidex.net, y debe darse atribución a sus autores, tal como especifica la licencia.`,
  releaseDates:
    [
      {
        console: "Game Boy",
        region: "Japon",
        date: "27 de febrero de 1996 (Rojo)",
        date2: "15 de octubre de 1996 (Azul)"
      },
      {
        console: "3DS (Consola Virtual)",
        region: "Japon",
        date: "27 de febrero de 2016",
      },
      {
        console: "Game Boy",
        region: "America",
        date: "30 de septiembre de 1998",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "America",
        date: "27 de febrero de 2016",
      },
      {
        console: "Game Boy",
        region: "Australia",
        date: "1 de noviembre de 1998",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "Australia",
        date: "27 de febrero de 2016",
      },
      {
        console: "Game Boy",
        region: "Europa",
        date: "5 de octubre de 1999",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "Europa",
        date: "27 de febrero de 2016",
      },
  ]
}

export const pokemonYellowData: Games = {
  generation: "generation-i",
  games: ['Yellow'],
  urlFrontPage: ["https://i.imgur.com/NNOouHx.png"],
  genre: "RPG",
  players: "1-2",
  publishedBy: "Nintendo",
  developedBy: "Game Freak",
  platforms: ["Game Boy", "Nintendo 3DS (Consola Virtual)"],
  gameHistory: `Sigue la misma historia que las ediciones originales, pero añadiendo contenido basado en el anime.
    Encarnando a Rojo (rediseñado para parecerse a Ash Ketchum), se recibe como Pokémon inicial a Pikachu de manos del profesor Oak. El rival será Azul (rediseñado para parecerse más a Gary Oak), quien recibirá un Eevee y con quien se tendrán enfrentamientos en varias ocasiones a lo largo de la aventura.
    Una vez obtenido a Pikachu, iniciará una aventura a lo largo de la región de Kanto con el objetivo de atrapar a todos los Pokémon para completar la Pokédex, formar un equipo, reunir las ocho medallas de gimnasio para desafiar al Alto Mando y al campeón de la Liga Pokémon, y así convertirse en el mejor entrenador Pokémon del mundo.
    Sin embargo, al igual que en Pokémon Rojo y Azul, estará presente el Team Rocket, una malvada organización que se dedica a hacer fechorías con los Pokémon. Pero tres miembros en especifico aparecerán de forma recurrente en la aventura: Jessie, James y Meowth, como ocurre en el anime.`,
  summary: `Pokémon Amarillo (Pokémon Yellow en inglés, ポケットモンスター ピカチュウ Pocket Monsters Pikachu en japonés) es el cuarto videojuego de la primera generación tras Pokémon Verde y Pokémon Rojo y Azul. También llamado "Pokémon Edición Amarilla" o "Pokémon Edición Especial Pikachu", la principal diferencia respecto a los títulos anteriores es que está basado en la historia del anime, pero los objetivos y modo de videojuego son los mismos que en sus predecesores.`,
  releaseDates:
    [
      {
        console: "Game Boy",
        region: "Japon",
        date: "12 de septiembre de 1998",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "Japon",
        date: "27 de febrero de 2016",
      },
      {
        console: "Game Boy",
        region: "America",
        date: "1 de octubre de 1999",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "America",
        date: "27 de febrero de 2016",
      },
      {
        console: "Game Boy",
        region: "Australia",
        date: "1 de noviembre de 1999",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "Australia",
        date: "27 de febrero de 2016",
      },
      {
        console: "Game Boy",
        region: "Europa",
        date: "16 de junio de 2000",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "Europa",
        date: "27 de febrero de 2016",
      },
  ]
}

export const pokemonGoldSiverData: Games = {
  generation: "generation-ii",
  games: ['Gold', 'Silver'],
  urlFrontPage: ["https://i.imgur.com/bOJ8fon.jpeg", "https://i.imgur.com/WIIy6jx.jpeg"],
  genre: "RPG",
  players: "1",
  publishedBy: "Nintendo",
  developedBy: "Game Freak",
  platforms: ["Game Boy Color", "Nintendo 3DS (Consola Virtual)"],
  characters: "https://i.imgur.com/1uY3MAl.png",
  gameHistory: `Han pasado tres años desde la aventura de Pokémon Rojo y Azul y el Team Rocket ha regresado y va a volver a intentar conquistar el mundo. Durante la historia maquinarán perversos planes que más tarde el jugador tendrá que evitar que se lleven a cabo. Desde robar las colas de los Slowpoke en el Pozo Slowpoke hasta utilizar las ondas de radio para hacer evolucionar artificialmente a los Pokémon.
    El jugador, que se llama por defecto Oro, comenzará su aventura en Pueblo Primavera, donde elegirá uno de los tres Pokémon iniciales de Johto en el laboratorio del profesor Elm. Después de escoger un Pokémon inicial Oro recibirá un encargo del profesor Elm para recoger un huevo Pokémon del señor Pokémon. Entonces conocerá al profesor Oak que le entregará un Pokédex. Mientras Oro vuelve a Pueblo Primavera con el huevo será atacado por un misterioso entrenador. Al regresar al laboratorio descubre que ese entrenador ha robado uno de los Pokémon iniciales del profesor Elm. Este entrenador se conoce por defecto como Plata. Durante el videojuego Oro se enfrentara a los planes del Team Rocket, a los ocho Lideres de Gimnasio de Johto y también a Plata que lo irá retando conforme vaya avanzando la historia. Plata siempre robará el inicial que tenga ventaja sobre el que Oro eligió. Por ejemplo, si Oro elige a Chikorita, Plata elegirá a Cyndaquil.
    La historia también se desarrollará en Kanto después de conseguir las ocho medallas de Johto y derrotar al Alto Mando. En Kanto el jugador debe derrotar a los líderes de gimnasio, y encontrará algunos cambios en la región respecto a Pokémon Rojo, Azul y Amarillo.
    Este contenido proviene de wikidex.net, y debe darse atribución a sus autores, tal como especifica la licencia.
    Se prohíbe su uso a PlagioDex (el wiki de FANDOOM), por copiar reiteradamente sin dar atribución`,
  summary: `Pokémon Oro y Pokémon Plata (Pokémon Gold y Pokémon Silver en inglés, ポケットモンスター 金 Pocket Monsters Kin y ポケットモンスターム 銀 Pocket Monsters Gin en japonés) son los videojuegos RPG de Pokémon para consola portátil pertenecientes a la segunda generación. La reedición que salió después es Pokémon Cristal.
    También llamados "Pokémon Edición Oro" y "Pokémon Edición Plata", con estos videojuegos se añadió un total de 100 Pokémon más a los anteriormente capturables, mediante la aparición de una nueva región (Johto). En otoño del 2009, Nintendo lanzó los remakes de Pokémon Oro y Plata, Pokémon Oro HeartGold y Pokémon Plata SoulSilver. El 22 de septiembre de 2017 se puso a la venta en formato digital Pokémon Oro y Pokémon Plata para la consola virtual de Nintendo 3DS.
    La carátula de Pokémon Oro enseña a Ho-Oh, la de Pokémon Plata a Lugia, los Pokémon legendarios principales de las dos primeras ediciones.
    En los videojuegos, es el profesor Elm quien hace entrega del Pokémon inicial (Chikorita, Cyndaquil o Totodile), al jugador y no el profesor Oak como en Pokémon Rojo, Azul y Pokémon Amarillo, si bien este también hace aparición con solo comenzar el videojuego preguntándote la hora y el nombre. Además, tiene un programa en la radio.
    Otra de las innovaciones es el Pokégear (Pokémon Gear), dispositivo multifunciones (incorpora teléfono móvil, mapa, radio) que en las ediciones posteriores sería reemplazado por el Pokénav. Este tiene que estar en hora, porque otra de los nuevos factores introducidos es la diferencia de videojuego si es de día o de noche.
    Los videojuegos vendieron un total de 23,10 millones de copias.`,
  releaseDates:
    [
      {
        console: "Game Boy",
        region: "Japon",
        date: "21 de noviembre de 1999",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "Japon",
        date: "22 de septiembre de 2017",
      },
      {
        console: "Game Boy",
        region: "America",
        date: "15 de octubre de 2000",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "America",
        date: "22 de septiembre de 2017",
      },
      {
        console: "Game Boy",
        region: "Australia",
        date: "13 de octubre de 2000",
      },
      {
        console: "Game Boy",
        region: "Europa",
        date: "6 de abril de 2001",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "Europa",
        date: "22 de septiembre de 2017",
      },
  ]
}

export const pokemonCrystalData: Games = {
  generation: "generation-ii",
  games: ['Crystal'],
  urlFrontPage: ["https://i.imgur.com/7lAdv50.jpeg"],
  genre: "RPG",
  players: "1",
  publishedBy: "Nintendo",
  developedBy: "Game Freak",
  platforms: ["Game Boy Color", "Nintendo 3DS (Consola Virtual)"],
  gameHistory: `La historia de Cristal se desarrolla en un escenario similar al de Pokémon Oro y Plata pero con nuevos paisajes y edificios.`,
  summary: `Pokémon Cristal (Pokémon Crystal en inglés, ポケットモンスターム クリスタル Pocket Monsters Crystal en japonés), también llamado Pokémon Edición Cristal es el tercer videojuego de la segunda generación, desarrollado para la Game Boy Color.
    Su lanzamiento tuvo lugar en Japón salió al mercado el 14 de diciembre del 2000, mientras que en el resto del mundo fue durante la segunda mitad del 2001: el 29 de julio del 2001 en América y el 2 de noviembre de 2001 en Europa. El 26 de enero del 2018 se puso a la venta en formato digital Pokémon Cristal para la consola virtual de Nintendo 3DS.`,
  releaseDates:
    [
      {
        console: "Game Boy Color",
        region: "Japon",
        date: "14 de diciembre de 2000",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "Japon",
        date: "26 de enero de 2018",
      },
      {
        console: "Game Boy Color",
        region: "America",
        date: "29 de julio de 2001",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "America",
        date: "26 de enero de 2018",
      },
      {
        console: "Game Boy Color",
        region: "Australia",
        date: "30 de septiembre de 2001",
      },
      {
        console: "Game Boy Color",
        region: "Europa",
        date: "2 de noviembre de 2001",
      },
      {
        console: "3DS (Consola Virtual)",
        region: "Europa",
        date: "26 de enero de 2018",
      },
  ]
}

export const pokemonRubySapphireData: Games = {
  generation: "generation-iii",
  games: ['Ruby', 'Sapphire'],
  urlFrontPage: ["https://i.imgur.com/m7cl5V6.png", "https://i.imgur.com/n65LQ1y.png"],
  genre: "RPG",
  players: "1-4",
  publishedBy: "Nintendo",
  developedBy: "Game Freak",
  platforms: ["Game Boy Advance"],
  characters: "",
  gameHistory: `La historia transcurre en la región de Hoenn. En la historia llega a Hoenn un chico/chica (Bruno/Aura) nuevo en la región desde Johto junto con su familia siendo su padre puesto como líder de gimnasio de Ciudad Petalia, él/ella vive junto con su madre en Villa Raíz, en la cual vive el profesor Abedul con su hijo/a. Un día, el profesor Abedul es atacado por un Poochyena, del que lo salva por Bruno/Aura. El profesor, como agradecimiento, le regala el Pokémon con el que fue salvado (los Pokémon iniciales Treecko, Torchic o Mudkip) y le pide que vaya a buscar a su hijo/a para poder entregarles la Pokédex. Bruno/Aura van en busca del hijo/a del profesor, que reta a un combate a Bruno/Aura teniendo el Pokémon inicial cuyo tipo gana al Pokémon elegido por Bruno/Aura. Luego del combate, él/ella le pide una carrera para ver quien llega primero a Villa Raíz. Tras entregarles la Pokédex el/la hijo/a del profesor, se van. Antes de salir de Villa Raíz, la madre de Bruno/Aura le regala los zapatos para correr diciéndole que su padre Norman le espera en el gimnasio, y Bruno/Aura marcha a su encuentro. Al llegar al Gimnasio Petalia, Norman le explica a Bruno/Aura que necesita las 8 medallas de Hoenn para poder entrar en la Liga Pokémon. Más tarde llega un chico llamado Blasco, que pide a Norman que le enseñe cómo capturar un Pokémon y éste acepta. Seguidamente le da un Zigzagoon y se encaminan él y Bruno/Aura a buscar al Pokémon, capturando a un Ralts, siendo como su Pokémon inicial. Acto seguido, regresan al gimnasio, y es ahí cuando Norman le dice a Bruno/Aura que no podrá retarlo hasta haber conseguido 4 medallas.
    Bruno/Aura inicia su viaje para conseguir ocho medallas y reta a su padre. Al llegar a Ciudad Férrica, tras haber vencido a la primera Líder de Gimnasio, conoce al Señor Devon, dueño de la Compañía Devon. Después de salvar unas piezas muy importantes para la compañía, el Señor Devon le regala a Bruno/Aura el PokéNav, una invención de la compañía. Y como un último favor, el Señor Devon le pide a Bruno/Aura que le entregue una carta a su hijo Máximo. Tiempo después de ganar la segunda medalla, el protagonista conoce a Máximo y le entrega la carta. A continuación, prosigue su camino en busca de las siguientes medallas, pero en su camino conoce a dos equipos malvados: el Equipo Magma liderado por Magno y el Equipo Aqua liderado por Aquiles. Bruno/Aura continúa su viaje por el centro y norte de Hoenn, ganando los otras dos medallas. Una vez ganadas decide ir a retar a Norman, y, aun siendo una lucha algo difícil, logra vencerlo obteniendo la quinta medalla. Ahora Bruno/Aura puede usar Surf, lo que le permite acceder a la parte oeste de Hoenn.
    La aventura continua por el resto de Hoenn. Después de conseguir las siguientes dos medallas, se descubren los planes del Equipo Magma/Aqua, que consisten en despertar a Groudon/Kyogre pero son detenidos por Bruno/Aura. El protagonista consigue la última medalla y, finalmente, se dirige a la Liga Pokémon, donde logra vencer al Alto Mando y llegar a enfrentarse al campeón Pokémon, que resulta ser Máximo. El combate de Bruno/Aura contra el Campeón Máximo tiene lugar, concluyendo con la victoria de Bruno/Aura, que se hace con el título de nuevo campeón/campeona.`,
  summary: `Pokémon Rubí y Pokémon Zafiro (Pokémon Ruby y Pokémon Sapphire en inglés, ポケットモンスター ルビー Pocket Monsters Ruby y ポケットモンスター サファイア Pocket Monsters Sapphire en japonés) son los primeros videojuegos de Pokémon de la tercera generación. También llamados "Pokémon Edición Rubí" y "Pokémon Edición Zafiro", aparecieron en español el 25 de julio de 2003, siendo las primeras ediciones de Pokémon para Game Boy Advance, contando así con una calidad gráfica superior a sus antiguas ediciones y novedades en lo que se refiere al entrenamiento de los Pokémon, una región nueva, Hoenn, y también nuevos Pokémon, en concreto 135 nuevas especies. La reedición de estas fue Pokémon Esmeralda. El día 7 de mayo de 2014, Nintendo anunció el lanzamiento de los remakes de esta generación, Pokémon Rubí Omega y Pokémon Zafiro Alfa, para noviembre del mismo año.`,
  releaseDates:
    [
      {
        console: "Game Boy Advance",
        region: "Japon",
        date: "21 de noviembre de 2002",
      },
      {
        console: "Game Boy Advance",
        region: "America",
        date: "19 de marzo de 2003",
      },
      {
        console: "Game Boy Advance",
        region: "Australia",
        date: "3 de abril de 2003",
      },
      {
        console: "Game Boy Advance",
        region: "Europa",
        date: "25 de julio de 2003",
      },
  ]
}

