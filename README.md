# hugo-advent-calendar
A simple, single-page advent calendar powered by a Google Spreadsheet

## Usage instructions

### Installing

Development of this website requires [Hugo](https://gohugo.io/getting-started/installing) and [npm](https://nodejs.org/en/download/).

After cloning the repository, run:

```
npm install
```

to install the [gh-pages](https://github.com/tschaub/gh-pages) package used for deployments.

### Local development

For local development, use Hugo's built-in server:

```
hugo server -D --disableFastRender
```

To deploy updates to GitHub pages, use:

```
npm run deploy
```

