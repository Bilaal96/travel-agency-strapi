<h1>✈ Strapi CMS for <a href="https://github.com/Bilaal96/travel-agency-nextjs" target="_blank">Free Roam App</a> 🌴</h1>

The [Strapi](https://strapi.io/) Server used to create and manage [content-types](https://docs.strapi.io/developer-docs/latest/development/backend-customization/models.html#content-types) and site content. Entries created using Strapi are stored in a database:

- [development environment](config/database.js) - uses SQLite by default
- [production environment](config/env/production/database.js) - configured to use PostgreSQL

Strapi was configured to expose a GraphQL API which can be used to query the database via the `/graphql` endpoint.

**Table of contents**

- [1 | Technologies Used](#1--technologies-used)
- [2 | Strapi Content-types](#2--strapi-content-types)
  - [2.1 | Collection Types Created](#21--collection-types-created)
  - [2.2 | Single Types Created](#22--single-types-created)
- [3 | Issues Faced](#3--issues-faced)
  - [3.1 | Accessing GraphQL Playground for Strapi in Production](#31--accessing-graphql-playground-for-strapi-in-production)
  - [3.2 | Creating Filler Content To Test The Blog](#32--creating-filler-content-to-test-the-blog)
    - [3.2.1 | Overview](#321--overview)
    - [3.2.2 | Creating The `seed.js` Utility Script](#322--creating-the-seedjs-utility-script)
    - [3.2.3 | Generating Dummy Articles](#323--generating-dummy-articles)
- [4 | Deployment to Heroku](#4--deployment-to-heroku)

# 1 | Technologies Used

- [Strapi CMS](https://strapi.io/)
- Strapi plugins:
  - GraphQL - can be installed via Strapi dashboard (see [_documentation_](https://docs.strapi.io/developer-docs/latest/plugins/graphql.html#usage) for use)
  - Cloudinary (see [_NPM package_](https://www.npmjs.com/package/@strapi/provider-upload-cloudinary)) - follow [this article](https://strapi.io/blog/add-cloudinary-support-to-your-strapi-application) for setup
- [Faker's _Lorem_ module](https://fakerjs.dev/api/lorem.html)

# 2 | Strapi Content-types

[Content-types](https://docs.strapi.io/developer-docs/latest/development/backend-customization/models.html#content-types) were created using the [Content-type Builder](https://docs.strapi.io/user-docs/latest/content-types-builder/introduction-to-content-types-builder.html) (which is accessible via the Strapi dashboard). They are used to organise user-created entries into groups. There are 2 variations of content-types:

- Collection types - can manage several entries
- Single types - can only manage one entry

## 2.1 | Collection Types Created

> 💡 Manage several entries - like a NoSQL database collection

- [`Article`](src/api/article/content-types/article/schema.json) - each blog article is an instance of the `Articles` collection type
- [`Holiday Package`](src/api/holiday-package/content-types/holiday-package/schema.json) - each holiday package card in the home page UI uses data from an instance of the `Holiday Package` collection type

## 2.2 | Single Types Created

> 💡 Manage one entry

- [About](src/api/about/content-types/about/schema.json) - the site content for the About page

# 3 | Issues Faced

## 3.1 | Accessing GraphQL Playground for Strapi in Production

GraphQL Playground is a very useful tool that I used to:

- debug queries
- check GraphQL schemas (defined by Strapi) to get a better understanding of:
  - what types exist
  - which types accept parameters, and what were the parameter names

GraphQL Playground is available in development (at `<localhost-url>/graphql`), however it had to be separately configured for production. See GraphQL Playground config [_here_](config/env/production/plugins.js).

> 💡 NOTE: the key here is that the plugin configuration for production occurs on the following path `/config/env/production/plugins.js` instead of `/config/plugins.js`

## 3.2 | Creating Filler Content To Test The Blog

### 3.2.1 | Overview

Initially, I used Strapi's Content-type Builder to create Articles. This worked fine to test if they were create correctly, however once I began to work on Pagination it became tedious to manually create articles using the Content-type Builder.

To test if Pagination was working correctly, it would be much more efficient if I could write a script that creates a batch of dummy Articles. I accomplished this using:

- [Faker's _Lorem_ module](https://fakerjs.dev/api/lorem.html)
- Strapi's [Entity Service API](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/entity-service-api.html)
- Strapi's [`bootstrap()` function](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/functions.html#bootstrap)

### 3.2.2 | Creating The `seed.js` Utility Script

Faker-js is a library used to create dummy/filler content for websites during development. Faker has a `Lorem` module which allows us to generate `Lorem ipsum` - a popular filler text format. I used this to generate the content for the dummy articles.

In order to store the Articles I needed to create entries in the database using the `Article` content-type. Strapi's `Entity Service API` helped me to accomplish this.

You can view the `seed.js` utility script [_here_](utils/seed.js).

### 3.2.3 | Generating Dummy Articles

The `seed.js` script exports a function (`seedArticleCollection()`). It accepts one argument: the number of articles to generate (which defaults to 10). To create dummy articles, we invoke `seedArticleCollection()` within the `bootstrap()` function (found [_here_](src/index.js)).

The `bootstrap()` function executes every time the server starts. I used `seedArticleCollection()` to create `100+` articles. Obviously, you wouldn't want `100+` articles to be created **EVERY** time the server starts, so it was important to execute the function only **once**.

The backend was hosted with [Heroku](https://devcenter.heroku.com/). So to execute `seedArticleCollection()` **once**, I did the following:

1. Called `seedArticleCollection()` in `bootstrap()`
2. Deployed to Heroku
3. Uncommented the invocation of `seedArticleCollection()` in `bootstrap()`
4. Re-deployed to Heroku

# 4 | Deployment to Heroku

The Strapi docs were excellent and provided an easy to follow guide;
see [Deploying the Strapi Server to Heroku](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/heroku.html). Strapi gives you many possible deployment options for your project. Read more about them in the [deployment section of the documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).

Note that development and production environments can be configured separately in Strapi using the following folder structure:

- `/config` - default & development configurations
- `/config/env/production` - used to override defaults in `/config` for production
