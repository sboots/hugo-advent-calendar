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

## Updating spreadsheet content

Source data is retrieved from a Google Spreadsheet on initial page load. The source URL for the spreadsheet can be set in [`app.js`](https://github.com/sboots/hugo-advent-calendar/blob/main/static/js/app.js#L8). 

Note that for the data retrival to work, the Google Spreadsheet has to be publicly-viewable, and [published to the web](https://support.google.com/docs/answer/183965).

Here's an [example of the column format to use](https://docs.google.com/spreadsheets/d/1Fk2HrHM-2CPUCIlORGcwnYELPOqTeMtYbCLemOu6C10/edit).
