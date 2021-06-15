# Patient CRM (Vue SPA)

This project is a Vue Single Page Application (SPA) for managing patients data. SPA will retrieve the data from API in the project: https://github.com/damieneskimo/patients-crm. <br />

It uses Axios as the http client, Vue Router for the routing, Vuex for state management and Tailwind CSS for basic styling. <br />

For a quick overview and easier development without being tied up with a back end, this project uses [Mock Service Worker] (https://github.com/mswjs/msw) to mock rest api and [faker.js] (https://github.com/Marak/faker.js) to generate fake data.

<br />

To use a real backend API service, please check the sibling Laravel project: https://github.com/damieneskimo/patients-crm. And before run `yarn start`, please uncomment `baseURL: 'http://localhost:8000'` in the `api.js` file to initilise the backend api url.

> Note: If you are using a different domain and port for the backend, please change it accordingly in api.js file

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
