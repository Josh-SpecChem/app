# vue-pwa-tutorial

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

### Steps to update PWA

helpful URL's - https://firebase.google.com/docs/cli

### In VS Code - Terminal
From within the Specchem folder for the app
npm run build -> builds the current project
firebase logout -> This will log the current user out
firebase login -> Opens login to authenticate to google account
firebase projects:list -> Will list the projects on the account
firebase use -> sets the instance that will be deployed to
firebase use --add
  - choose the project
  - assign an alias
firebase deploy -> Will deploy the app to the logged in account

firebase serve --only hosting -> run the project on localhost


### Deploy to Stage
npm run build -> builds the current project
firebase logout -> This will log the current user out
firebase login -> Opens login to authenticate to google account
Login to Google as rhoenig1776@gmail.com
firebase projects:list -> Will list the projects on the account
firebase use specchem-pwa-stage -> sets the instance Stage that will be deployed to
firebase deploy


### Deploy to Prod
npm run build -> builds the current project
firebase logout -> This will log the current user out
firebase login -> Opens login to authenticate to google account
Login to Google as noc@specchemllc.com
firebase projects:list -> Will list the projects on the account
firebase use mobile-web-app-f958d -> sets the instance Prod that will be deployed to
firebase deploy
