#!/bin/bash

echo $(mongosh --quiet --eval "db.students.countDocuments()")

if [ -z "$(mongosh --quiet --eval "db.students.countDocuments()")" ] || [ "$(mongosh --quiet --eval "db.students.countDocuments()")" -eq 0 ]
  then mongoimport --host localhost --db test --collection students --type json --file /students.json --jsonArray
fi