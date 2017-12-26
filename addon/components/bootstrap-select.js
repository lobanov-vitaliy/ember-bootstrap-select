import Ember from 'ember';
import layout from '../templates/components/bootstrap-select';

const { set, observer, on } = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'select',
  classNames: ['show-tick'],

  attributeBindings: [
    'multiple',
    'title',
    'header:data-header',
    'format:data-selected-text-format',
    'container:data-container'
  ],

  container: 'body',

  handleValueChange: on('didInsertElement', observer('value', function(){
    this.getComponent().selectpicker('val', this.value);
  })),

  didInsertElement(){
    let component = this.getComponent();
    component.selectpicker();
    component.on('changed.bs.select', () => {
      set(this, 'value', component.val());
    });
  },

  getComponent(){
    return this.$();
  }
});