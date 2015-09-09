var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./db.sqlite"
    }
});

knex.schema
    .createTable('media', function (table) {
        table.increments('id');
        table.string('filename');
        table.integer('size');
        table.string('type');
        table.json('meta');
        table.timestamps();
    })
    .finally(function() {
        knex.destroy();
    });
