import Ember from 'ember';
import layout from '../templates/components/select-option';

const { Component, computed, get } = Ember;

const getAttr = computed('params', function(name){
  return get(this, `params.${name}`) || null;
});

export default Component.extend({
  layout,
  tagName: 'option',
  attributeBindings: [
    'value', 
    'disabled',
    'subtext:data-subtext',
    'tokens:data-tokens',
    'icon:data-icon',
    'content:data-content',
    'size:data-size'
  ],
  size:    getAttr,
  icon:    getAttr,
  tokens:  getAttr,
  content: getAttr,
  subtext: getAttr
});