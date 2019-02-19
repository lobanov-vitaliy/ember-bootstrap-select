import Ember from 'ember';

const {
  Component,
  computed,
  observer,
  get
} = Ember;

const getAttr = computed('params', function(name) {
  return get(this, `params.${name}`) || null;
});

export default Component.extend({
  tagName: 'option',
  attributeBindings: [
    'value',
    'disabled',
    'title',
    'subtext:data-subtext',
    'tokens:data-tokens',
    'icon:data-icon',
    'content:data-content',
    'size:data-size'
  ],
  value: computed({
    set(key, value) {
      return String(value);
    }
  }),
  size: getAttr,
  icon: getAttr,
  tokens: getAttr,
  content: getAttr,
  subtext: getAttr,

  init() {
    this._super();
    get(this, 'parent.options').pushObject(this);
  },

  willDestroy() {
    this._super();
    get(this, 'parent.options').removeObject(this);
  }
});