import Ember from 'ember';
import layout from '../templates/components/bootstrap-select';

const {
    set, get,
    observer,
    computed,
    on,
    run,
    A
} = Ember;

export default Ember.Component.extend({
    layout,
    tagName: 'select',
    classNameBindings: ['tick:show-tick'],

    isRender: false,

    container: 'body',
    disabled: false,
    multiple: false,
    tick:     true,
    options:  A(),

    attributeBindings: [
        'disabled',
        'multiple',
        'title',
        'header:data-header',
        'format:data-selected-text-format',
        'container:data-container',
        'search:data-live-search'
    ],

    change: on(
        'didInsertElement', 
        observer(
            'value', 
            function() {
                this.getComponent().selectpicker('val', this.getValue());
            }
        )
    ),

    refresh: observer(
        'disabled',
        'options.[]',
        function(){
            run.scheduleOnce('afterRender', this, this._selectpickerRefresh);
        }
    ),

    didInsertElement() {
        let component = this.getComponent();
        component.selectpicker();
        component.on('changed.bs.select', () => {
            set(this, 'value', component.selectpicker('val'));
        });

        this.isRender = true;
    },

    getValue() {
        let value = this.value;

        if (value === undefined || 
            value === null) {
            value = '';
        }

        return value;
    },

    getComponent() {
        return this.$();
    },

    _selectpickerRefresh(){
        this.getComponent().selectpicker('refresh');
    }
});