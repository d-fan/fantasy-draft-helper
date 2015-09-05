#!/usr/bin/python

from csv import DictReader
from json import dumps as to_json

out = []

with open("value_fpro.csv", "r") as csv_file:
    reader = DictReader(csv_file)
    for row in reader:
        out.append(row)

print to_json(out)
