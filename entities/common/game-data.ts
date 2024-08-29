export interface Games {
  generation:   string;
  generationId: number;
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
  generationId: 1,
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
  generationId: 1,
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
  generationId: 2,
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
    La historia también se desarrollará en Kanto después de conseguir las ocho medallas de Johto y derrotar al Alto Mando. En Kanto el jugador debe derrotar a los líderes de gimnasio, y encontrará algunos cambios en la región respecto a Pokémon Rojo, Azul y Amarillo.`,
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
  generationId: 2,
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
  generationId: 3,
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

export const pokemonEmeraldData: Games = {
  generation: "generation-iii",
  generationId: 3,
  games: ['Emerald'],
  urlFrontPage: ["https://i.imgur.com/iBt2PjX.jpeg"],
  genre: "RPG",
  players: "1-4",
  publishedBy: "Nintendo",
  developedBy: "Game Freak",
  platforms: ["Game Boy Advance"],
  characters: "",
  gameHistory: `La aventura tiene lugar en la región de Hoenn, un archipiélago localizado al sureste de las regiones Kanto y Johto. Se caracteriza por la introducción de batallas dobles, concursos Pokémon, el complejo del Frente Batalla y dos nuevos equipos antagonistas, el Equipo Magma y el Equipo Aqua que desean capturar a Groudon y Kyogre respectivamente para cumplir sus planes. Primera batalla entre Groudon y Kyogre Esta región se divide en varias islas, algunas de estas solo disponibles con tickets entregados en eventos especiales organizados por Nintendo: Isla Origen, Isla Suprema, Roca Ombligo e Isla del Sur donde se encontrarán Pokémon legendarios (Deoxys, Mew, Ho-Oh, Lugia, Latios o Latias). Las rutas se numeran de la 101 a 134 y entre las ciudades y pueblos destacan Villa Raíz donde está el laboratorio del profesor Abedul y el jugador comienza su viaje, Arrecípolis, donde se encuentra la Cueva Ancestral, y en ciudad Algaria está el centro espacial, por mencionar unos cuantos. El origen de la región data de la antigua leyenda Pokémon, el Pokémon continente Groudon hizo crecer la tierra durante la batalla con el Pokémon océano Kyogre quien extendió los mares, para resolver el conflicto de los cielos apareció Rayquaza terminando con la batalla. Cada uno regresó a dormir, desde ese momento no se sabe nada de ellos, creyendo que solo desaparecieron. Los tres se pueden obtener en el videojuego. Pokémon Esmeralda El viaje del protagonista comienza justo después de que sus padres y este se muden a la región de Hoenn. Después de instalarse en tu cuarto y poner la hora, tendrá que conocer a su vecino (Aura o Bruno dependiendo del género del protagonista), su futuro rival e hijo del profesor Abedul. El Profesor es atacado por un Zigzagoon en las afueras del pueblo (en Rubí/Zafiro era un Poochyena). Ahí, el jugador podrá escoger entre Treecko, Torchic o Mudkip, cualquiera de ellos se convertirá en su Pokémon inicial. Después de completar una pequeña tarea, en el laboratorio el profesor le entrega una Pokédex y 5 Poké Balls. Ahora, junto a su Pokémon, el jugador está listo para iniciar una aventura donde encontrará amigos, aliados, enemigos y cientos de Pokémon que le permitirán convertirse en un maestro Pokémon.`,
  summary: `Pokémon Esmeralda (Pokémon Emerald en inglés, ポケットモンスター エメラルド Pocket Monsters Emerald en japonés) es la edición superior que cierra la tercera generación en los videojuegos principales de Pokémon iniciada por Pokémon Rubí y Pokémon Zafiro. También se le conoce como "Pokémon Edición Esmeralda". Al igual que otras terceras versiones o ediciones superiores, este comparte la base con su dúo antecesor, pero con varias novedades, lugares y eventos en la historia que hacen que el videojuego sea más completo.`,
  releaseDates:
    [
      {
        console: "Game Boy Advance",
        region: "Japon",
        date: "16 de septiembre de 2004",
      },
      {
        console: "Game Boy Advance",
        region: "America",
        date: "1 de mayo de 2005",
      },
      {
        console: "Game Boy Advance",
        region: "Australia",
        date: "9 de junio de 2005",
      },
      {
        console: "Game Boy Advance",
        region: "Europa",
        date: "21 de octubre de 2005",
      },
  ]
}

export const pokemonFireRedLeafGreenData: Games = {
  generation: "generation-iii",
  generationId: 3,
  games: ['Ruby', 'Sapphire'],
  urlFrontPage: ["https://i.imgur.com/iCOfHbf.png", "https://i.imgur.com/VFYX7iK.png"],
  genre: "RPG",
  players: "1-4",
  publishedBy: "Nintendo",
  developedBy: "Game Freak",
  platforms: ["Game Boy Advance"],
  characters: "",
  gameHistory: `Como en el videojuego original, llevas a tu personaje a través de Kanto. El profesor Oak te da a elegir entre Bulbasaur, Charmander o Squirtle. Tu rival es el vecino de la casa de al lado y se enfrentará a ti con ventaja, pues elegirá al Pokémon inicial cuyo tipo será ventajoso contra el que tú elijas. Estos Pokémon no son capturables. Sólo los puedes conseguir de la mano del profesor Oak, así que para conseguirlos a todos, tendrás que intercambiar con los conseguidos en otros cartuchos. Región de Kanto, donde se desarrolla la aventura. Deberás convertirte en el mejor entrenador Pokémon y para ello deberás derrotar a los ocho líderes de gimnasio para conseguir las medallas y así poder enfrentarte al Alto Mando. Por el camino tendrás que resolver algunas situaciones y dar su merecido al Team Rocket. Además deberás capturar a todos los Pokémon para completar la Pokédex y así ayudar al profesor Oak en sus investigaciones. Tras haber ganado la Liga Pokémon podrás visitar un nuevo archipiélago (Archi7) donde se podrán seguir pequeñas historias secundarias y donde aparecen algunos Pokémon de otras generaciones. Después de pasarte el videojuego aún tienes muchas cosas que hacer: Visitar Archi7 y capturar parte de los Pokémon de Johto. Criar Pokémon de Kanto para obtener Pokémon de Johto (Tyrogue, Pichu, Elekid, Magby, Smoochum, Togepi, Cleffa, Igglybuff entre otros). Competir en la Torre Desafío en Isla Sétima. Capturar a uno de los perros legendarios (Suicune si escogiste a Charmander, Raikou si Squirtle fue tu inicial, y Entei si te decidiste por Bulbasaur) que correrá por todo Kanto. Intercambiar Pokémon con un amigo que tenga la edición opuesta a la tuya para completar la Pokédex de Kanto. Intercambiar Pokémon con las ediciones de Pokémon Rubí y Pokémon Zafiro o Esmeralda para completar la Pokédex de Hoenn (después de conseguir el Rubí y el Zafiro y activar la máquina de redes de Celio). Intercambiar con Pokémon Colosseum y XD: Tempestad oscura para obtener Pokémon de la segunda generación (después de conseguir el Rubí y el Zafiro y activar la máquina de redes de Celio). Visitar la casa de Consu en Isla Inta y enseñarle el Pokémon indicado para que te obsequie algún objeto valioso (Carameloraro, Lujo Ball, entre otros).`,
  summary: `Pokémon Rojo Fuego y Pokémon Verde Hoja (Pokémon FireRed y Pokémon LeafGreen en inglés, ポケットモンスター ファイアレッド Pocket Monsters FireRed y ポケットモンスター リーフグリーン Pocket Monsters LeafGreen en japonés) son las ediciones reeditadas de los videojuegos originales Pokémon Rojo y Pokémon Verde (Rojo y Azul fuera de Japón), con las novedades de los videojuegos para Game Boy Advance de Pokémon Rubí y Pokémon Zafiro. También llamados "Pokémon Edición Rojo Fuego" y "Pokémon Edición Verde Hoja", ambas ediciones fueron lanzadas a las tiendas europeas el 1 de octubre de 2004.`,
  releaseDates:
    [
      {
        console: "Game Boy Advance",
        region: "Japon",
        date: "29 de enero de 2004",
      },
      {
        console: "Game Boy Advance",
        region: "America",
        date: "9 de septiembre de 2004",
      },
      {
        console: "Game Boy Advance",
        region: "Australia",
        date: "23 de septiembre de 2004",
      },
      {
        console: "Game Boy Advance",
        region: "Europa",
        date: "1 de octubre de 2004",
      },
  ]
}

export const pokemonDiamondPearlData: Games = {
  generation: "generation-iv",
  generationId: 4,
  games: ['Diamond', 'Pearl'],
  urlFrontPage: ["https://i.imgur.com/BTSnnx8.png", "https://i.imgur.com/jpBEyi2.png"],
  genre: "RPG",
  players: "1-4",
  publishedBy: "Nintendo",
  developedBy: "Game Freak",
  platforms: ["Nintendo DS"],
  characters: "",
  gameHistory: `El videojuego nos sitúa en Sinnoh, una región aislada de todas las anteriores donde encontraremos nuevos Pokémon. Al comienzo, gracias al Profesor Serbal obtendremos nuestro primer Pokémon, a elegir entre Turtwig (Pokémon de tipo planta), Chimchar (Pokémon de tipo fuego) y Piplup (Pokémon de tipo agua). A partir de ese momento, el objetivo será el mismo que en el resto de RPG's Pokémon, obtener tantos Pokémon como puedas para vencer a los Líderes de Gimnasio que aguardan en la región hasta llegar al Alto Mando y vencer a la campeona. Sin embargo, por el camino nos encontraremos con otros muchos entrenadores, tendremos que recorrer cuevas, bosques, cruzar lagos... Como siempre, la manera de conseguir a tu primer Pokémon ha cambiado, como en las ediciones anteriores. Esta vez, comienzas en tu casa en Pueblo Hojaverde y tras ver en la tele un documental sobre un Gyarados rojo, harás una visita a tu amigo/a (que será el rival en el videojuego) y te irás con él en busca del profesor Serbal, que está en Orilla Veraz con la/el hija/o de uno de sus colaboradores comprobando si hay presencia del Gyarados rojo. Una vez allí hablaréis con el profesor y se irá sin darse cuenta de que se ha dejado el maletín en el lago. Tú y tu amigo/a iréis a coger el maletín para devolverlo a su dueño, pero, en ese mismo instante, dos Pokémon salvajes os atacarán. Vuestra única opción es coger las Poké Ball que hay dentro del maletín para así combatir contra estos dos Pokémon. En este momento tienes la posibilidad de elegir tu primer Pokémon, que será, como en las demás ediciones quien te acompañe a lo largo de tu aventura.`,
  summary: `Pokémon Diamante y Pokémon Perla (Pokémon Diamond y Pokémon Pearl en inglés, ポケットモンスター ダイヤモンド Pocket Monsters Diamond y ポケットモンスター パール Pocket Monsters Pearl en japonés), son los primeros videojuegos de la cuarta generación de Pokémon y el primer dúo de videojuegos RPG para Nintendo DS1. También llamados "Pokémon Edición Diamante" y "Pokémon Edición Perla", fueron lanzados en Japón en septiembre del 2006. Tuvieron el lanzamiento más exitoso de las otras generaciones de Pokémon en Japón, y la mejor semana de lanzamiento de cualquier videojuego de Nintendo DS. Tienen el récord de ser los segundos videojuegos más vendidos de su consola. El lanzamiento en América de los videojuegos consiguió muchas reservas, llegando casi al doble del número de reservas de Pokémon Rojo Fuego y Pokémon Verde Hoja. Salió a la venta el 22 de abril de 2007 y el 27 de julio de 2007, llegó finalmente al público europeo. A finales de 2008 fue lanzada a la venta en Japón la tercera entrega de esta serie, Pocket Monsters Platinum, en castellano Pokémon Platino. En España se puso a la venta el 22 de mayo de 2009. En 2021 se anunció el lanzamiento de los remakes para Nintendo Switch de estas entregas: Pokémon Diamante Brillante y Pokémon Perla Reluciente, para finales del mismo año.`,
  releaseDates:
    [
      {
        console: "Nintendo DS",
        region: "Japon",
        date: "28 de septiembre de 2006",
      },
      {
        console: "Nintendo DS",
        region: "America",
        date: "22 de abril de 2007",
      },
      {
        console: "Nintendo DS",
        region: "Australia",
        date: "21 de junio de 2007",
      },
      {
        console: "Nintendo DS",
        region: "Europa",
        date: "27 de julio de 2007",
      },
  ]
}

export const pokemonPlatinumData: Games = {
  generation: "generation-iv",
  generationId: 4,
  games: ['Platinum'],
  urlFrontPage: ["https://i.imgur.com/cdUw5h4.png"],
  genre: "RPG",
  players: "1-4",
  publishedBy: "Nintendo",
  developedBy: "Game Freak",
  platforms: ["Nintendo DS"],
  characters: "",
  gameHistory: `En los videojuegos Pokémon Diamante y Pokémon Perla se puede ver cómo es el videojuego. Sin embargo, Pokémon Platino introduce mejoras, como el cambio de los gimnasios Pradera y Corazón y la Montaña Dura, las sombras y neblinas nuevas del Bosque Vetusto, el nuevo Mundo Distorsión... La trama principal de este videojuego se centra en Giratina, pues esta vez el Equipo Galaxia intentará crear un nuevo mundo sin saber que ya existía otro mundo llamado Mundo Distorsión que está bajo el reinado del Pokémon Giratina. En esta ocasión, este equipo invoca a Palkia y a Dialga, por lo que se pueden capturar ambos llevando sus respectivas esferas en la mochila.`,
  summary: `Pokémon Platino (Pokémon Platinum en inglés; ポケットモンスター プラチナ Pocket Monsters Platinum en japonés), también llamado "Pokémon Edición Platino", es la edición superior del dúo Pokémon Diamante y Pokémon Perla. Pocos días después de su lanzamiento en Japón, se vendieron alrededor de un millón de copias, convirtiéndose en el videojuego más rápidamente vendido de la historia para Nintendo DS en aquel momento1. El 22 de marzo de 2009 salió a la venta en Estados Unidos y en España salió el 22 de mayo del mismo año.`,
  releaseDates:
    [
      {
        console: "Nintendo DS",
        region: "Japon",
        date: "13 de septiembre de 2008",
      },
      {
        console: "Nintendo DS",
        region: "America",
        date: "22 de marzo de 2009",
      },
      {
        console: "Nintendo DS",
        region: "Australia",
        date: "14 de mayo de 2009",
      },
      {
        console: "Nintendo DS",
        region: "Europa",
        date: "22 de mayo de 2009",
      },
  ]
}

