import hbs from 'htmlbars-inline-precompile';
import {
    test,
    moduleForComponent
} from 'ember-qunit';
import Ember from 'ember';

const {
    run,
    set,
    A
} = Ember;

moduleForComponent('bootstrap-select', {
    integration: true
});

test('Test `Standard` selectpicker', function(assert) {
    this.render(hbs `
        {{#bootstrap-select 
            multiple=false 
            value=value as |select|}}
            {{#each options as |option|}}
                {{#select.option 
                    disabled=option.disabled 
                    subtext=option.subtext
                    value=option.value}} {{option.label}} {{/select.option}}
            {{/each}}
        {{/bootstrap-select}}
    `);

    this.setProperties({
        value: 1,
        options: A([{
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

    let component = this.$('select');
    /* open selectpicker */
    component.selectpicker('trigger');

    assert.equal(component.selectpicker('val'), 1, 'initialize value.');
    run(() => {
        component.selectpicker('val', '3').trigger('change');
        set(this.options[0], 'disabled', true);
        set(this.options[0], 'subtext', 'subtext');
    });
    assert.equal(this.value, 3, 'change selectpicker value');
    assert.ok(this.$('option:first').prop('disabled'), 'check disabled element in `select` element');
    assert.ok(this.$('ul>li:first').hasClass('disabled'), 'check disabled element in `ul` element');

    run(() => {
        set(this.options[0], 'disabled', false);
    });
    assert.ok(!this.$('option:first').prop('disabled'));

    run(() => {
        this.options.removeObject(this.options[this.options.length-1]);
    });
    assert.equal(this.$('option').length, 2, 'option has been deleted on `select` element');
    assert.equal(this.$('ul>li').length, 2, 'option has been deleted on `ul` element');

    run(() => {
        this.options.pushObject({
            value: 3,
            label: 'Option 3',
            disabled: false
        });
    });
    assert.equal(this.$('option').length, 3);
    assert.equal(this.$('ul>li').length, 3);
});

test('Test `Multiple` selectpicker', function(assert) {
    this.render(hbs `
        {{#bootstrap-select 
            multiple=true 
            value=value as |select|}}
            {{#each options as |option|}}
                {{#select.option 
                    disabled=option.disabled 
                    subtext=option.subtext
                    value=option.value}} {{option.label}} {{/select.option}}
            {{/each}}
        {{/bootstrap-select}}
    `);

    this.setProperties({
        value: [2,3],
        options: A([{
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

    let component = this.$('select');
    /* open selectpicker */
    component.selectpicker('trigger');

    assert.deepEqual(component.selectpicker('val'), ["2","3"], 'initialize value.');
    run(() => {
        component.selectpicker('val', ['1']).trigger('change');
    });
    assert.deepEqual(this.value, ['1'], 'change selectpicker value');
});