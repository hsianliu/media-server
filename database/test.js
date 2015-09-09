var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./db.sqlite"
    }
});

knex
    // .insert({filename: 'test2.test2', size: 99999, type: 'movie', meta: JSON.stringify({labels: ['funnny', 'bunny']})}).into('media')
    // .then(function(){
    //     return knex.select('*').from('media');
    // })
    .select('filename').from('media').where('id', 1)
    .then(function(media){
        console.log('media', media[0]);
    })
    .finally(function() {
        knex.destroy();
    });
