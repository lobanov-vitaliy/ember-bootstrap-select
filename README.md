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

### Available options
#### disabled
Default: `false`
Accepts: `boolean`
Disabled select box.

#### disabledEmpty
Default: `false`
Accepts: `boolean`
Disabled select box if don't have options

#### multiple
Default: `false`
Accepts: `boolean`
Multiple select boxes

#### title
Default: `undefined`
Accepts: `string`
Using the title property will set the default placeholder text when nothing is selected. This works for both multiple and standard select boxes

#### size
Default: `'auto'`
Accepts: `'auto' | integer | false`
The size option is set to 'auto' by default. When size is set to 'auto', the menu always opens up to show as many items as the window will allow without being cut off. Set size to false to always show all items.

#### header
Default: `false`
Accepts: `string`
Adds a header to the top of the menu; includes a close button by default

#### format
Default: `'values'`
Accepts: `'values' | 'static' | 'count' | 'count > x' (where x is an integer)`
Specifies how the selection is displayed with a multiple select.

#### search
Default: `false`
Accepts: `boolean`
When set to true, adds a search box to the top of the selectpicker dropdown.

#### actionsBox
Default: `false`
Accepts: `boolean`
When set to true, adds two buttons to the top of the dropdown menu (Select All & Deselect All).

## Running Tests

* `ember test`
* `ember test --server`
