'use strict';

/**
 * holiday-package service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::holiday-package.holiday-package');
