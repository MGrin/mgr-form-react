#Validation

This subpackage defines 2 things:
1. Form description validation
2. List of validators

## Description
A form description is a JSON document, containing 2 top level keys:
* `fields`: An array of field objects
* `submission`: An object describing the submission form part
Exported function named `validateFormDescription` is used to validate the form description. It is up to you to use it or not.

## Register