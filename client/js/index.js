var List = require('./views/List');
var Form = require('./views/Form');

var list = new List();

var form = new Form();

var main = document.querySelector('.main');

window.addEventListener("hashchange", router, false);

router();

function router() {
    if (location.hash === '#form') {
        main.innerHTML = '';
        main.appendChild(form.el);
    } else {
        main.innerHTML = '';
        main.appendChild(list.el);
    }
}
