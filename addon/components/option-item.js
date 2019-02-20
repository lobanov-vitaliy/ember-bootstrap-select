import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { once } from '@ember/runloop';
import { get } from '@ember/object';

const getAttr = computed(
  'params',
  function(name) {
    return get(this, 'params.' + name) || null;
  }
);

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

  update: observer(
    'disabled',
    'value',
    'subtext',
    'tokens',
    'icon',
    'content',
    'title',
    'size',
    function() {
      once(get(this, 'parent'), 'refresh');
    }
  ),

  init() {
    this._super(...arguments);
    get(this, 'parent.options').pushObject(this);
  },

  willDestroy() {
    this._super(...arguments);
    get(this, 'parent.options').removeObject(this);
  }
});