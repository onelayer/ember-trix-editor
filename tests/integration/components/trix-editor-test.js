/* jshint jquery: true */

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import TrixEditor from 'ember-trix-editor/components/trix-editor';

moduleForComponent("trix-editor", "Integration | Component | trix editor", {
  integration: true
});

function renderAndFindElement(context, template) {
  context.clearRender();
  context.render(template);

  return context.$("> div");
}

test("it renders", function (assert) {
  let $trix = renderAndFindElement(this, hbs`{{trix-editor}}`);

  assert.expect(4);
  assert.strictEqual($trix.length, 1);
  assert.strictEqual($trix.find("> input").length, 1);
  assert.strictEqual($trix.find("> trix-toolbar").length, 1);
  assert.strictEqual($trix.find("> trix-editor").length, 1);
});

test("sets correct HTML attributes to inputId attribute", function (assert) {
  const template = hbs`{{trix-editor inputId="attrs-id"}}`;
  let $trix = renderAndFindElement(this, template);

  assert.expect(2);
  assert.strictEqual($trix.find("> input").attr("id"), "attrs-id");
  assert.strictEqual($trix.find("> trix-editor").attr("input"), "attrs-id");
});

test("is focused based on autofocus attribute", function(assert) {
  let template = hbs`{{trix-editor}}`;
  let $trix = renderAndFindElement(this, template).find("trix-editor");

  assert.expect(7);
  assert.notOk($trix.is(":focus"), "editor not focused by default");

  template = hbs`{{trix-editor autofocus=false}}`;
  $trix = renderAndFindElement(this, template).find("trix-editor");

  assert.notOk($trix.is(":focus"), "editor not focused when autofocus attr is false");

  template = hbs`{{trix-editor autofocus=0}}`;
  $trix = renderAndFindElement(this, template).find("trix-editor");

  assert.notOk($trix.is(":focus"), "editor not focused when autofocus attr is 0");

  template = hbs`{{trix-editor autofocus=""}}`;
  $trix = renderAndFindElement(this, template).find("trix-editor");

  assert.notOk($trix.is(":focus"), "editor not focused when autofocus attr is a falsey string");

  template = hbs`{{trix-editor autofocus=true}}`;
  $trix = renderAndFindElement(this, template).find("trix-editor");

  assert.ok($trix.is(":focus"), "editor focused when autofocus attr is true");

  template = hbs`{{trix-editor autofocus=1}}`;
  $trix = renderAndFindElement(this, template).find("trix-editor");

  assert.ok($trix.is(":focus"), "editor focused when autofocus attr is true");

  template = hbs`{{trix-editor autofocus="true"}}`;
  $trix = renderAndFindElement(this, template).find("trix-editor");

  assert.ok($trix.is(":focus"), "editor focused when autofocus attr is a truthy string");
});

test("sets trix-editor's placeholder attribute to placeholder attr", function (assert) {
  let template = hbs`{{trix-editor}}`;
  let $trix = renderAndFindElement(this, template).find("trix-editor");

  assert.expect(2);
  assert.notOk($trix.attr("placeholder"), "placeholder empty if not set");

  template = hbs`{{trix-editor placeholder="test placeholder"}}`;
  $trix = renderAndFindElement(this, template).find("trix-editor");

  assert.strictEqual($trix.attr("placeholder"), "test placeholder",
    "passing placeholder attribute should set trix-editor placeholder");
});

test("sets trix-editor's class attribute to editorClass attr", function (assert) {
  let template = hbs`{{trix-editor}}`;
  let $trix = renderAndFindElement(this, template).find("trix-editor");

  assert.expect(3);
  assert.notOk($trix.attr("class"), "class is empty by default");

  template = hbs`{{trix-editor editorClass="one"}}`;
  $trix = renderAndFindElement(this, template).find("trix-editor");

  assert.ok($trix.hasClass("one"), "accepts class name from editorClass");

  template = hbs`{{trix-editor editorClass="one two"}}`;
  $trix = renderAndFindElement(this, template).find("trix-editor");

  assert.ok($trix.hasClass("one two"), "accepts multiple class names from editorClass");
});

test("sets trix-editor's event listeners on insert", function (assert) {
  let template = hbs`{{trix-editor}}`;
  let trix = renderAndFindElement(this, template).find("trix-editor")[0];
  let listeners = Object.keys(jQuery._data(trix, "events"));

  assert.expect(TrixEditor.EVENTS.length);

  TrixEditor.EVENTS.forEach(eventName => {
    assert.ok(listeners.indexOf(eventName) > -1,
      `${eventName} should be handled by component`);
  });
});

test("removes trix-editor's event listeners on destruction", function (assert) {
  let template = hbs`{{trix-editor}}`;
  let trix = renderAndFindElement(this, template).find("trix-editor")[0];

  assert.expect(1);
  this.clearRender();

  let listeners = jQuery._data(trix, "events");

  assert.notOk(listeners, "it removes all event listeners from DOM");
});

test("attachmentsDisabled should disable trix attachments", function (assert) {
  assert.expect(1);
});
