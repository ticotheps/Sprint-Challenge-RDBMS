exports.up = function(knex) {
    return knex.schema.createTable('actions', function(tbl) {
        tbl.increments();

        tbl
            .string('description', 255)
            
        tbl
            .string('notes', 128)
            
        tbl
            .boolean('completed')
            
        tbl
            .integer('project_id')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('actions');
};
