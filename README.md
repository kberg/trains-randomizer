# Trains Randomizer

Discussion thread at https://boardgamegeek.com/thread/2497142/web-based-trains-card-randomizer

## Development notes

This project uses [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/).

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:5173/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploying

### Ongoing
```
npm run build -- --base=/trains-randomizer/ && npx gh-pages -d dist
```

### Bugs
https://boardgamegeek.com/thread/2497142/article/35802812#35802812