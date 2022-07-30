"use strict";

const { seedArticleCollection } = require("../utils/seed");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap(/* { strapi } */) {
    /**
     * Uncomment to run before application starts
     * Comment out to prevent running EVERY time app is started */
    // await seedArticleCollection(10);
  },
};
