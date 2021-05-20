# Chabloom Billing React Frontend

## Dependencies

* Node 14 (LTS)
    * https://nodejs.org/en/download/

## Installing Yarn

Run the following command to install Yarn

    npm install -g yarn

Yarn should now be located in your path. If the project root directory contains
a `node_modules` folder, delete it. Our Yarn version no longer uses the
`node_modules` folder. Do not delete the `.yarn` folder.

## Installing NPM dependencies

Run the following command to install NPM dependencies

    yarn install

You should now be ready to develop using your preferred IDE or editor

## Running the application in development mode

Use the following command to run the application in development mode

    yarn start

The application is set up to use the `dev-1` environment backend by default
when running in development mode. The application will use SSL and run on the
port specified in the `.env` file located in the project root directory.

## Code linting and formatting

We use `eslint` and `prettier` for code linting and formatting. These can
easily be run from the project root directory by running the following
commands.

    yarn lint
    yarn format

These commands should be run before committing code to keep the codebase clean

## Building the project for Docker

Use one of the following command from the project root directory to build and
push Docker builds to the Docker registry. The command used will vary depending
on the current platform.

    ./scripts/docker-build.sh
    .\scripts\docker-build.ps1
