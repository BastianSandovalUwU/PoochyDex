export const URL_ROUTES = {
  POKEDEX: {
    LIST: '/pokedex/list',
    HUNT: '/pokedex/hunt',
    SHOW: '/pokedex/show-pokedex/',
    SHOW_ABILITY: '/pokedex/show-ability/',
    LIST_POKEDEX: '/pokedex/list-pokedex',
    SHOW_POKEDEX: '/pokedex/show-pokedex/',
  },
  MOVEMENTS: {
    SHOW: '/movements/show-movement/',
  },
  API_DEX: {
    CRUD: '/apiDex',
  },
  AUTH: {
    LOGIN: '/auth/login',
    SIGN_UP: '/auth/sign-up',
  },
  PROFILE: {
    SHOW: '/profile/show',
  },
  SETTINGS: {
    SETTINGS: '/settings',
  },
};

export interface MenuOption {
  labelEs: string;
  labelEn: string;
  icon: string;
  route?: string;
  children?: MenuOption[];
  role?: string; // Rol requerido para ver esta opción (ej: 'ADMIN')
  imageIcon?: string; // Ruta a imagen personalizada (opcional)
}

export const MENU_OPTIONS: MenuOption[] = [
  {
    labelEs: 'Pokédex',
    labelEn: 'Pokédex',
    icon: 'list',
    imageIcon: '/assets/icons/roza-pokedex/icon-72x45.png',
    children: [
      {
        labelEs: 'Pokédex Nacional',
        labelEn: 'National Dex',
        icon: 'add',
        imageIcon: '/assets/icons/menu-icons/pokeball.png',
        route: URL_ROUTES.POKEDEX.LIST
      },
      {
        labelEs: 'Listado de Pokédex',
        labelEn: 'Pokédex List',
        icon: 'list',
        imageIcon: '/assets/icons/menu-icons/superball.png',
        route: URL_ROUTES.POKEDEX.LIST_POKEDEX
      },
      {
        labelEs: 'Caza Pokémon',
        labelEn: 'Pokémon Hunt',
        icon: 'list',
        imageIcon: '/assets/icons/menu-icons/ultraball.png',
        route: URL_ROUTES.POKEDEX.HUNT
      },
    ]
  },
  {
    labelEs: 'Admin Pokémon (API)',
    labelEn: 'Pokemon Admin (API)',
    icon: 'storage',
    route: URL_ROUTES.API_DEX.CRUD,
    role: 'ADMIN'
  },
];
