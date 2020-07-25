/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating C wiring
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

 goog.provide('Blockly.ARDUINO.wiring');
 goog.require('Blockly.ARDUINO');
 Blockly.ARDUINO = new Blockly.Generator('ARDUINO');


Blockly.ARDUINO.led = function() {
  var pin = this.getTitleValue('PIN');
  var val = this.getTitleValue('VAL');

  return 'digitalWrite(' + pin + ', ' + (val == 'ON' ? 'HIGH' : 'LOW') + ');\n';
};

Blockly.ARDUINO.output = function() {
  var pin = this.getTitleValue('PIN');
  var val = this.getTitleValue('VAL');

  return 'digitalWrite(' + pin + ', ' + val + ');\n';
};

Blockly.ARDUINO.input = function() {
  var pin = this.getTitleValue('PIN');
  var val = this.getTitleValue('VAL');

  return (val == 'LOW' ? '!' : '') + 'digitalRead(' + pin + ')';
};

Blockly.ARDUINO.servo = function() {
  var pin = this.getTitleValue('PIN');
  var val = Blockly.ARDUINO.valueToCode(this, 'A', true) || '0';

  return 'set_servo(' + pin + ', ' + val + ');\n';
};

Blockly.ARDUINO.optocoupler = function() {
  var pin = this.getTitleValue('PIN');
  var val = this.getTitleValue('VAL');

  return (val == 'ACTIVE' ? '!' : '') + 'digitalRead(' + pin + ')';
};