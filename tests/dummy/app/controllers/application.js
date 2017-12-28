import Ember from 'ember';

export default Ember.Controller.extend({
    value: 1,
    options: Ember.A([{
        value: 1,
        label: 'Label: 1',
        disabled:false
    },{
        value: 2,
        label: 'Label: 2',
        disabled:false
    },{
        value: 3,
        label: 'Label: 3',
        disabled:false
    },{
        value: 4,
        label: 'Label: 4',
        disabled:false
    },{
        value: 5,
        label: 'Label: 5',
        disabled:false
    },{
        value: 6,
        label: 'Label: 6',
        disabled:false
    },{
        value: 7,
        label: 'Label: 7',
        disabled:false
    },{
        value: 8,
        label: 'Label: 8',
        disabled:false
    }])
});