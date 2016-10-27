import Ember from 'ember';
import layout from '../templates/components/ui-dropdown';

const { on } = Ember;

export default Ember.Component.extend({
  layout: layout,

  classNames: ['ff-dropdown'],
  classNameBindings: ['isOpen'],

  closeOnClick: false,

  cleanupEventHandlers: on('willDestroyElement', function() {
    Ember.$(document).off(`click.ui-dropdown-${this.elementId}`);
  }),

  actions: {
    open() {
      if (this.get('isOpen')) {
        this.send('close');
      } else {
        const closeOnClick = this.get('close-on-click');
        this.set('isOpen', true);
        this.sendAction('on-open');

        Ember.$(document).on(`click.ui-dropdown-${this.elementId}`, ({ target }) => {
          if (closeOnClick || this.$().find(target).length === 0) {
            this.send('close');
          }
        });
      }
    },

    close(fn, ...args) {
      this.set('isOpen', false);
      this.sendAction('on-close');

      Ember.$(document).off(`click.ui-dropdown-${this.elementId}`);

      if (fn) {
        fn(...args);
      }
    }
  }
});
