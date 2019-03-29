exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions')
    .truncate() // resets the primary key, in addition to cleaning the table
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {
          id: 1,
          description: `Adds a feature that allows for sending
            one text message to a single recipient.`,
          notes: "The recipient's phone number must be verified with Twilio.",
          completed: false,
          project_id: 1,
        },
        {
          id: 2,
          description: `Adds a feature that allows for adding a new milestone
            to Lucy's current list of milestones.`,
          notes: "The new milestone cannot be longer than 255 characters.",
          completed: false,
          project_id: 2,
        },
        {
          id: 3,
          description: `Adds a feature that allows a church member to send
            a text message to verify their attendance for the service.`,
          notes: "Only admins can send text messages currently.",
          completed: false,
          project_id: 1,
        },
      ]);
    });
};