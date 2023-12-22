# sunrise-sunset

## Building project for GitHub Pages
ng build --output-path ../docs --base-href /sunrise-sunset/

## Business logic
Sunrise and sunset are obtained by external free API service. It can be also calculated using math formula. https://gml.noaa.gov/grad/solcalc/ & https://gml.noaa.gov/grad/solcalc/calcdetails.html & https://gml.noaa.gov/grad/solcalc/solareqns.PDF
Data are obtained in UTC time and calculated to user browser locale. This behavior might be configurable for user via additional checkbox. We can display time in the selected country timezone offset.

[![pages-build-deployment](https://github.com/martin-david/sunrise-sunset/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/martin-david/sunrise-sunset/actions/workflows/pages/pages-build-deployment)
