# WizardlyAPI

WizardlyAPI is a user-friendly tool for developers to test, document and manage APIs. With an intuitive interface, users can easily make API requests, create and save collections, and share API documentation with their team. WizardlyAPI simplifies the API development process and helps developers save time and improve productivity.

## Get Started

If you want to run this project on your own machine then run the next command:

```bash
docker compose -f docker-compose-dev.yml up
```

for get access into postgresql db CLI:

```bash
docker exec -it postgres sh -c 'psql -h postgres -U admin -d wizardlyapi'
```

## Tests

```bash
# to run all tests just run this file
./tests.sh
```

> If you don't use docker so up the server one by one.

## Endpoints
