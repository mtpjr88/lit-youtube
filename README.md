# LitElement TypeScript starter

This project includes a sample component using LitElement with TypeScript.

This template is generated from the `lit-starter-ts` package in [the main Lit
repo](https://github.com/lit/lit). Issues and PRs for this template should be
filed in that repo.

## Setup

Install dependencies:

```bash
npm i
```

## Build

This sample uses the TypeScript compiler to produce JavaScript that runs in modern browsers.

To build the JavaScript version of your component:

```bash
npm run build
```

To start

```bash
npm start
```

The site will usually be served at http://localhost:8000

# Description.

I decided to use the LIT framework since it was mentioned that the team uses it. I also thought it would be fun and challenging to try something completely new. I started with `lit-starter-ts` I basically removed everything but development config `web-dev-server.config.js`, linting, and some of the run scripts in the `package.json`, everything else I added.

I opted to use typescript since it would help with my development speed in catching errors at develop time. I also decided to use a ui library called `kor-ui/kor` it seemed like it had some pretty nice styling so I can focus more on the code and functionality given I knew it would take me longer using lit since it is something I have never used before.

Once I had a basic understanding of how it works,
I followed a simple top down data approach.
`<main-element>` being the parent that is responsible for the data hydration.
and three ui layers `<search-element>`, `<tab-element>`, and `<card-element>`
essentially what I imagined how the ui would breakdown as components.
