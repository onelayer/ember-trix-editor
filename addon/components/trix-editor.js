import Ember from 'ember';
import layout from '../templates/components/trix-editor';

const { isPresent } = Ember;

let TrixEditor = Ember.Component.extend({
  layout: layout,
  attachmentsDisabled: false,

  inputId: Ember.computed('elementId',function() {
    return `trix-editor-${this.get('elementId')}`;
  }),

  autofocusOn: Ember.computed('attrs.autofocus', function () {
    return !!this.attrs.autofocus ? true : null;
  }),

  _listenToTrixEditorActions: Ember.on('didInsertElement', function () {
    const $trixEditor = Ember.$(this.get('element')).find('trix-editor');

    TrixEditor.EVENTS.forEach((event) => {
      return $trixEditor.on(event, e => this._tryEvent(event, e));
    });

    $trixEditor.on("trix-file-accept", event => {
      if (this.attrs.attachmentsDisabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    });
  }),

  _tryEvent(name, event) {
    let handler = this.attrs[name];

    if (isPresent(handler)) {
      return handler(event);
    }
  },

  _removeTrixEditorListeners: Ember.on('willDestroyElement', function () {
    const $trixEditor = Ember.$(this.get('element')).find('trix-editor');

    TrixEditor.EVENTS.forEach((event) => $trixEditor.off(event));
  })
});

TrixEditor.reopenClass({
  EVENTS: [
    "trix-blur",
    "trix-change",
    "trix-focus",
    "trix-initialize",
    "trix-selection-change",
    "trix-file-accept",
    "trix-attachment-add",
    "trix-attachment-remove"
  ]
});

export default TrixEditor;
