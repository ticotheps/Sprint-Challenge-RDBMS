exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects')
    .truncate() // resets the primary key, in addition to cleaning the table
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { 
          name: "Tico's Hoop Squad Twilio Texting App",
          description: `This app will automate the process of sending
            and receiving mass text messages to RSVP for pickup basketball
            games.`,
          completed: false,
        },
        { 
          name: "Lucy's Milestone Tracker App",
          description: `This app will keep records of Lucy's cognitive,
            emotional, and physical progress as she ages.`,
          completed: false,
        },
        { 
          name: "Church Attendance Twilio Texting App",
          description: `This app will automate the process of taking church
            attendance, using text messages via the Twilio API.`,
          completed: false,
        },
      ]);
    });
};
