import Ember from 'ember';
import layout from '../templates/components/bootstrap-select';
import { next, once } from '@ember/runloop';
import { get } from '@ember/object';
import { A } from '@ember/array';

const {
  set,
  observer,
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'select',
  classNameBindings: ['tick:show-tick'],
  attributeBindings: [
    'disabled',
    'multiple',
    'title',
    'width:data-width',
    'header:data-header',
    'format:data-selected-text-format',
    'container:data-container',
    'search:data-live-search',
    'actionsBox:data-actions-box'
  ],

  /**
   * Append the select to a specific element, e.g. container: 'body'
   * 
   * @property container
   * @type String
   * @default 'body'
   * @public
   */
  container: 'body',

  /**
   * Disabled select boxes
   * 
   * @property disabled
   * @type Boolean
   * @default false
   * @public
   */
  disabled: false,

  /**
   * Multiple select boxes
   * 
   * @property multiple
   * @type Boolean
   * @default false
   * @public
   */
  multiple: false,

  /**
   * Show the checkmark icon on standard select boxes
   * 
   * @property tick
   * @type Boolean
   * @default true
   * @public
   */
  tick: true,

  /**
   * Disable select if don't have options
   * 
   * @property disabledEmpty
   * @type Boolean
   * @default false
   * @public
   */
  disabledEmpty: false,

  _isChangeSelect: false,

  /**
   * Collection of all `option-item`s that are children
   * @property options
   * @type {Array}
   */
  options: A(),

  refresh: observer(
    'disabled',
    'options.[]',
    'options.@each.disabled',
    'options.@each.value',
    'options.@each.subtext',
    'options.@each.tokens',
    'options.@each.icon',
    'options.@each.content',
    'options.@each.title',
    'options.@each.size',
    function() {
      if (get(this, 'disabledEmpty') && get(this, 'options.length') === 0) {
        set(this, 'disabled', true);
      }
      once(this, 'updateSelectValue');
    }
  ),

  updateSelectValue(){
    next(() => {
      const component = this.$();
      component.selectpicker('val', this.getValue());
      component.selectpicker('refresh');
    });
  },

  getValue() {
    const options = get(this, 'options') || A();
    let value = this.value;

    if (value === undefined || value === null) {
      value = '';
    } else if (Array.isArray(value)) {
      value = value.map(String).filter(id => options.findBy('value', id));
    } else {
      value = options.findBy('value', String(value)) ? value : '';
    }

    return value;
  },

  didInsertElement() {
    const component = this.$();
    component.selectpicker();
    component.on('changed.bs.select', (e, clickedIndex) => {
      if (typeof clickedIndex !== 'undefined'){
        set(this, 'value', component.selectpicker('val'));
      }
    });
    this.addObserver('value', this, 'updateSelectValue');
    this.updateSelectValue();
  },

  willDestroyElement() {
    this.$().off('changed.bs.select');
    this.removeObserver('value', this, 'updateSelectValue');
  }
});