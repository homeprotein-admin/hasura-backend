cat code/drcuro-hasura/readme.md
# Init

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli/)


## Setup

```bash
git clone https://github.com/homeprotein-admin/hasura-backend.git
```

## Usage

- Backend commands

```
sh ./run.sh
```

Open http://localhost:9695/ for the Hasura UI

- Make sure to run migrations when there are any changes to the schema (which is the `hasura` folder)

```
sh ./sync.sh
```

Start [Firebase Emulator](https://firebase.google.com/docs/emulator-suite)
```bash
firebase emulators:start
```
or
```bash
npx firebase emulators:start
```