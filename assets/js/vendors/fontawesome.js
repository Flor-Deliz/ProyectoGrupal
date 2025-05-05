// Configuración básica para usar íconos
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPaw, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faPaw, faHeart, faStar);
dom.watch();