import './js/app.js';
import './styl/app.styl';

let requireAll = r => r.keys().forEach(r);

// подключение svg-спрайтов
requireAll(require.context('./icons/', true, /\.svg$/));
// подключение pug-шаблонов
requireAll(require.context('./pug/', false, /\.pug$/));
