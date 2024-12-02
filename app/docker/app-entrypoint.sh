#!/bin/bash
set -e

npm install &&
npm run prisma:schema-push &&
npm run prisma:init &&
npm run start
