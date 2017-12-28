import Ember from 'ember';
import layout from '../templates/components/bootstrap-select';

const {
  set,
  observer,
  on,
  run,
  A
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
   * Collection of all `option-item`s that are children
   * @property options
   * @type {Array}
   */
  options: A(),

  change: on(
    'didInsertElement',
    observer(
      'value',
      function() {
        this._pickerCall(this._pickerSetValue);
      }
    )
  ),

  refresh: observer(
    'disabled',
    'options.[]',
    function() {
      this._pickerCall(this._pickerRefresh);
    }
  ),

  getValue() {
    let value = this.value;

    if (value === undefined ||
      value === null) {
      value = '';
    }

    return value;
  },

  _pickerCall(func) {
    run.scheduleOnce('afterRender', this, func);
  },

  _pickerRefresh() {
    this.$().selectpicker('refresh');
  },

  _pickerSetValue() {
    this.$().selectpicker('val', this.getValue());
  },

  didInsertElement() {
    let component = this.$();
    component.selectpicker();
    component.on('changed.bs.select', () => {
      set(this, 'value', component.selectpicker('val'));
    });
  },
});