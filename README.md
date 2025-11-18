<h1 align="center">
  Vite Template React
</h1>

<p align="center">
  <a href="https://github.com/SafdarJamal/vite-template-react/releases">
    <img src="https://img.shields.io/github/v/release/SafdarJamal/vite-template-react" alt="GitHub Release (latest by date)" />
  </a>
  <a href="https://github.com/SafdarJamal/vite-template-react/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/SafdarJamal/vite-template-react" alt="License" />
  </a>
</p>

<p align="center">
    A <a href="https://vitejs.dev">Vite</a> + <a href="https://react.dev">React</a> starter template.
</p>

![Vite Template React](https://github.com/SafdarJamal/vite-template-react/assets/48409548/4b1eb99e-01b8-4752-91c0-76930e7948c1)

## Folder Structure

No configuration or complicated folder structures, just the files you need to build your app:

```
vite-template-react
├── node_modules
├── public
│   ├── favicon.svg
│   └── robots.txt
└── src
    ├── App.css
    ├── App.jsx
    ├── App.test.jsx
    ├── index.css
    ├── index.jsx
    └── logo.svg
    └── setupTests.js
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
```

## Development

To get a local copy of the code, clone it using git:

```
git clone https://github.com/SafdarJamal/vite-template-react.git
cd vite-template-react
```

Make it your own:

```
rm -rf .git && git init && npm init
git add .
git commit -m "Initial commit"
```

Install dependencies:

```
npm i
```

Now, you can start a local web server by running:

```
npm start
```

And then open http://localhost:3000 to view it in the browser.

#### Available Scripts

In this project, you can run the following scripts:

| Script        | Description                                             |
| ------------- | ------------------------------------------------------- |
| npm start     | Runs the app in the development mode.                   |
| npm test      | Launches the test runner in the interactive watch mode. |
| npm run build | Builds the app for production to the `dist` folder.     |
| npm run serve | Serves the production build from the `dist` folder.     |

### Static prerendered build

`npm run build` runs the usual Vite build and then executes `scripts/prerender.mjs`, which spins up a local preview server and drives headless Chromium (Puppeteer) through the public routes (`/`, `/about`, `/partnership`, `/hajj`, `/umrah`, `/contact`, `/support`). For each route we snapshot the fully rendered DOM (including the `<head>` tags injected by `SEO.jsx`) and write it to `dist/<route>/index.html`. Upload the entire `dist` folder to shared hosting and every URL will expose its own canonical HTML + meta. If you add a new page, append the route to the `routes` array inside `scripts/prerender.mjs`.

## Credits

Vite Template React is built and maintained by [Safdar Jamal](https://safdarjamal.github.io).

## License

This project is licensed under the terms of the [MIT license](https://github.com/SafdarJamal/vite-template-react/blob/main/LICENSE).
