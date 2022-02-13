# opencart-e2e-cypress [![Build Actions Status](https://github.com/diboris/opencart-e2e-cypress/actions/workflows/actions.yml/badge.svg)](https://github.com/diboris/opencart-e2e-cypress/actions)
Showcase for [opencart](https://demo.opencart.com/index.php?route=common/home) app automation tests with [Cypress](https://www.cypress.io/) 

## Run

Run in desktop mode

```shell
npm install
npm run cypress:run-desktop
```

Run in mobile mode

```shell
npm install
npm run cypress:run-mobile
```

## Reports

HTML reports are generated to **cypress/reports** folder. 
[cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) library is used for reporting.
