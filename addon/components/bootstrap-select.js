import layout from 'ember-bootstrap-select/templates/components/bootstrap-select';
import { run, once } from '@ember/runloop';
import { get, set } from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';
import { observer, computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'select',
  classNameBindings: ['tick:show-tick'],
  attributeBindings: [
    'disabled',
    'multiple',
    'title',
    'size:data-size',
    'width:data-width',
    'header:data-header',
    'format:data-selected-text-format',
    'container:data-container',
    'showSearch:data-live-search',
    'showActionsBox:data-actions-box'
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
   * Disabled select box if don't have options
   *
   * @property disabledEmpty
   * @type Boolean
   * @default false
   * @public
   */
  disabledEmpty: false,

  /**
   * Collection of all `option-item`s that are children
   * @property options
   * @type {Array}
   */
  options: A(),

  showSearch: computed(
    'search',
    function() {
      return this.search ? 'true' : false;
    }
  ),

  showActionsBox: computed(
    'actionsBox',
    function() {
      return this.actionsBox ? 'true' : false;
    }
  ),

  refresh: observer(
    'disabled',
    'options.[]',
    function() {
      if (get(this, 'disabledEmpty') && get(this, 'options.length') === 0) {
        set(this, 'disabled', true);
      }
      once(this, 'updateSelectValue');
    }
  ),

  updateSelectValue(){
    run(() => {
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
    component.on('changed.bs.select', () => {
      this.removeObserver('value', this, 'updateSelectValue');
      set(this, 'value', component.selectpicker('val'));
      this.addObserver('value', this, 'updateSelectValue');
    });
    component.selectpicker('val', this.getValue());
  },

  willDestroyElement() {
    this.$().off('changed.bs.select');
    this.removeObserver('value', this, 'updateSelectValue');
  }
});