import Ember from 'ember';

export default Ember.Controller.extend({
    multiple: false,
    value: [2, 3],
    options: Ember.A([{
        value: 2,
        label: 'Option 2',
        disabled: false
    }, {
        value: 1,
        label: 'Option 1',
        disabled: false
    }, {
        value: 3,
        label: 'Option 3',
        disabled: false
    }])
});