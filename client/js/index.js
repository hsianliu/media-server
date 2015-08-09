var List = require('./views/List');
var Form = require('./views/Form');
var Router = require('ampersand-router');
var events = require('./libs/events');

var list = new List();

var form = new Form();

var main = document.querySelector('.main');

var AppRouter = Router.extend({
    routes: {
        '': 'list',
        'list': 'list',
        'new': 'newItem',
        'edit/:id': 'edit'
    },

    list: function() {
        main.innerHTML = '';
        main.appendChild(list.el);
    },

    newItem: function(id) {
        main.innerHTML = '';
        main.appendChild(form.el);

        events.trigger('new-item');
    },

    edit: function(id) {
        main.innerHTML = '';
        main.appendChild(form.el);

        events.trigger('edit-item', id);
    }
});

var appRouter = new AppRouter();

appRouter.history.start({pushState: false});
