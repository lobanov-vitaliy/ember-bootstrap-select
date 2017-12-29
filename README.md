# ember-bootstrap-select
=======
# ember-bootstrap-select
[![npm version](https://badge.fury.io/js/ember-bootstrap-select.svg)](https://badge.fury.io/js/ember-bootstrap-select)
[![Build Status](https://travis-ci.org/lobanov-vitaliy/ember-bootstrap-select.svg?branch=master)](https://travis-ci.org/lobanov-vitaliy/ember-bootstrap-select)

An ember addon for using [bootstrap-select](https://silviomoreto.github.io/bootstrap-select/) in Ember applications.

## Installation

```
npm install ember-bootstrap-select
```
ember-bootstrap-select thinly wraps a [bootstrap-select](https://silviomoreto.github.io/bootstrap-select/) element 
so that it can be object and binding aware. It is used in conjuction with the select-option 
component to construct select boxes. E.g.

```handlebars
{{#bootstrap-select value=value as |select|}}
    {{#select.option value=1}}Option 1{{/select.option}}
    {{#select.option value=2 disabled=true}}Option 2{{/select.option}}
    {{#select.option value=3}}Option 3{{/select.option}}
{{/bootstrap-select}}
```
the options are always up to date, so that when the object bound to value changes, the corresponding option becomes selected.

### Multiselect

```handlebars
{{#bootstrap-select multiple=true value=value as |select|}}
    {{#select.option value=1}}Option 1{{/select.option}}
    {{#select.option value=2 disabled=true}}Option 2{{/select.option}}
    {{#select.option value=3}}Option 3{{/select.option}}
{{/bootstrap-select}}
```

## Running Tests

* `ember test`
* `ember test --server`
