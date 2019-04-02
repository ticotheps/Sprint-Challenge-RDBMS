exports.up = function(knex) {
    return knex.schema.createTable('projects', function(tbl) {
        tbl.increments();

        tbl
            .string('name', 128)
            .notNullable()
            .unique();

        tbl
            .string('description', 255)
            
        tbl
            .boolean('completed')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('projects');
};
