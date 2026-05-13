A responsive, high-performance implementation of 2048 featuring a WebAssembly-powered AI assistant.

[Live Demo](https://russell-lew.github.io/2048/)

## Highlights

- **Front end:** Using React's own `useReducer` for responsive state managements and Tailwind for styling
- **Expectimax AI Model:** Incorporated an existing C++ implementation from [this repository](https://github.com/nneonneo/2048-ai)
- **Offline AI:** Compiled to Web Assembly to run on the browser
- **Cross platform:** Desktop and mobile friendly

## Controls

- **Desktop:** Use your `Arrow Keys` to move tiles.
- **Mobile:** Swipe in any direction to move.
- **AI Hint:** Click the AI icon (bottom-right) for the best move suggestion.

## Assumptions

- **Spawn Rate:** 80% chance for `2`, 20% chance for `4`.
- **Win Condition:** Game ends at the 2048 tile (configurable in `constants.ts`).
- **AI behaviour:** Does not impose best moves, only a gentle recommendation.

## Developer Setup

### Clone and install

```
git clone https://github.com/russell-lew/2048.git
cd 2048
npm install
```

### Local development

```
npm run dev
```

### Web assembly compilation

- Setup EMSCRIPTEN to compile the C++ Expectimax source, or simply use the pre-built model in `src/wasm/`

### Deployment

- Web page is hosted on Github pages, you may fork this repository and modify homepage settings in `package.json`.

- See Github Pages documentation on how to quickly deploy.
