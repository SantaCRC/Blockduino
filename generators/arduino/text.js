/**
 * @license
 * Copyright 2015 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ARDUINO for text blocks.
 * @author daarond@gmail.com (Daaron Dwyer)
 */
'use strict';

goog.provide('Blockly.ARDUINO.texts');

goog.require('Blockly.ARDUINO');


Blockly.ARDUINO['text'] = function(block) {
  // Text value.
  var code = Blockly.ARDUINO.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.ARDUINO.ORDER_ATOMIC];
};

Blockly.ARDUINO['text_multiline'] = function(block) {
  // Text value.
  var code = Blockly.ARDUINO.multiline_quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.ARDUINO.ORDER_ATOMIC];
};

Blockly.ARDUINO['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  if (block.itemCount_ == 0) {
    return ['\'\'', Blockly.ARDUINO.ORDER_ATOMIC];
  } else if (block.itemCount_ == 1) {
    var element = Blockly.ARDUINO.valueToCode(block, 'ADD0',
        Blockly.ARDUINO.ORDER_NONE) || '\'\'';
    var code = element;
    return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
  } else if (block.itemCount_ == 2) {
    var element0 = Blockly.ARDUINO.valueToCode(block, 'ADD0',
        Blockly.ARDUINO.ORDER_ATOMIC) || '\'\'';
    var element1 = Blockly.ARDUINO.valueToCode(block, 'ADD1',
        Blockly.ARDUINO.ORDER_ATOMIC) || '\'\'';
    var code = element0 + ' . ' + element1;
    return [code, Blockly.ARDUINO.ORDER_STRING_CONCAT];
  } else {
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
      elements[i] = Blockly.ARDUINO.valueToCode(block, 'ADD' + i,
          Blockly.ARDUINO.ORDER_COMMA) || '\'\'';
    }
    var code = 'implode(\'\', array(' + elements.join(',') + '))';
    return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
  }
};

Blockly.ARDUINO['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.ARDUINO.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var value = Blockly.ARDUINO.valueToCode(block, 'TEXT',
      Blockly.ARDUINO.ORDER_ASSIGNMENT) || '\'\'';
  return varName + ' .= ' + value + ';\n';
};

Blockly.ARDUINO['text_length'] = function(block) {
  // String or array length.
  var functionName = Blockly.ARDUINO.provideFunction_(
      'length',
      ['function ' + Blockly.ARDUINO.FUNCTION_NAME_PLACEHOLDER_ + '($value) {',
       '  if (is_string($value)) {',
       '    return strlen($value);',
       '  } else {',
       '    return count($value);',
       '  }',
       '}']);
  var text = Blockly.ARDUINO.valueToCode(block, 'VALUE',
      Blockly.ARDUINO.ORDER_NONE) || '\'\'';
  return [functionName + '(' + text + ')', Blockly.ARDUINO.ORDER_FUNCTION_CALL];
};

Blockly.ARDUINO['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  var text = Blockly.ARDUINO.valueToCode(block, 'VALUE',
      Blockly.ARDUINO.ORDER_NONE) || '\'\'';
  return ['empty(' + text + ')', Blockly.ARDUINO.ORDER_FUNCTION_CALL];
};

Blockly.ARDUINO['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var operator = block.getFieldValue('END') == 'FIRST' ?
      'strpos' : 'strrpos';
  var substring = Blockly.ARDUINO.valueToCode(block, 'FIND',
      Blockly.ARDUINO.ORDER_NONE) || '\'\'';
  var text = Blockly.ARDUINO.valueToCode(block, 'VALUE',
      Blockly.ARDUINO.ORDER_NONE) || '\'\'';
  if (block.workspace.options.oneBasedIndex) {
    var errorIndex = ' 0';
    var indexAdjustment = ' + 1';
  } else {
    var errorIndex = ' -1';
    var indexAdjustment = '';
  }
  var functionName = Blockly.ARDUINO.provideFunction_(
      block.getFieldValue('END') == 'FIRST' ?
          'text_indexOf' : 'text_lastIndexOf',
      ['function ' + Blockly.ARDUINO.FUNCTION_NAME_PLACEHOLDER_ +
          '($text, $search) {',
       '  $pos = ' + operator + '($text, $search);',
       '  return $pos === false ? ' + errorIndex + ' : $pos' +
          indexAdjustment + ';',
       '}']);
  var code = functionName + '(' + text + ', ' + substring + ')';
  return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
};

Blockly.ARDUINO['text_charAt'] = function(block) {
  // Get letter at index.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var textOrder = (where == 'RANDOM') ? Blockly.ARDUINO.ORDER_NONE :
      Blockly.ARDUINO.ORDER_COMMA;
  var text = Blockly.ARDUINO.valueToCode(block, 'VALUE', textOrder) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = 'substr(' + text + ', 0, 1)';
      return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
    case 'LAST':
      var code = 'substr(' + text + ', -1)';
      return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
    case 'FROM_START':
      var at = Blockly.ARDUINO.getAdjusted(block, 'AT');
      var code = 'substr(' + text + ', ' + at + ', 1)';
      return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
    case 'FROM_END':
      var at = Blockly.ARDUINO.getAdjusted(block, 'AT', 1, true);
      var code = 'substr(' + text + ', ' + at + ', 1)';
      return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
    case 'RANDOM':
      var functionName = Blockly.ARDUINO.provideFunction_(
          'text_random_letter',
          ['function ' + Blockly.ARDUINO.FUNCTION_NAME_PLACEHOLDER_ + '($text) {',
           '  return $text[rand(0, strlen($text) - 1)];',
           '}']);
      code = functionName + '(' + text + ')';
      return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
  }
  throw Error('Unhandled option (text_charAt).');
};

Blockly.ARDUINO['text_getSubstring'] = function(block) {
  // Get substring.
  var text = Blockly.ARDUINO.valueToCode(block, 'STRING',
      Blockly.ARDUINO.ORDER_FUNCTION_CALL) || '\'\'';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  if (where1 == 'FIRST' && where2 == 'LAST') {
    var code = text;
  } else {
    var at1 = Blockly.ARDUINO.getAdjusted(block, 'AT1');
    var at2 = Blockly.ARDUINO.getAdjusted(block, 'AT2');
    var functionName = Blockly.ARDUINO.provideFunction_(
        'text_get_substring',
        ['function ' + Blockly.ARDUINO.FUNCTION_NAME_PLACEHOLDER_ +
            '($text, $where1, $at1, $where2, $at2) {',
         '  if ($where1 == \'FROM_END\') {',
         '    $at1 = strlen($text) - 1 - $at1;',
         '  } else if ($where1 == \'FIRST\') {',
         '    $at1 = 0;',
         '  } else if ($where1 != \'FROM_START\') {',
         '    throw new Exception(\'Unhandled option (text_get_substring).\');',
         '  }',
         '  $length = 0;',
         '  if ($where2 == \'FROM_START\') {',
         '    $length = $at2 - $at1 + 1;',
         '  } else if ($where2 == \'FROM_END\') {',
         '    $length = strlen($text) - $at1 - $at2;',
         '  } else if ($where2 == \'LAST\') {',
         '    $length = strlen($text) - $at1;',
         '  } else {',
         '    throw new Exception(\'Unhandled option (text_get_substring).\');',
         '  }',
         '  return substr($text, $at1, $length);',
         '}']);
    var code = functionName + '(' + text + ', \'' +
        where1 + '\', ' + at1 + ', \'' + where2 + '\', ' + at2 + ')';
  }
  return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
};

Blockly.ARDUINO['text_changeCase'] = function(block) {
  // Change capitalization.
  var text = Blockly.ARDUINO.valueToCode(block, 'TEXT',
          Blockly.ARDUINO.ORDER_NONE) || '\'\'';
  if (block.getFieldValue('CASE') == 'UPPERCASE') {
    var code = 'strtoupper(' + text + ')';
  } else if (block.getFieldValue('CASE') == 'LOWERCASE') {
    var code = 'strtolower(' + text + ')';
  } else if (block.getFieldValue('CASE') == 'TITLECASE') {
    var code = 'ucwords(strtolower(' + text + '))';
  }
  return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
};

Blockly.ARDUINO['text_trim'] = function(block) {
  // Trim spaces.
  var OPERATORS = {
    'LEFT': 'ltrim',
    'RIGHT': 'rtrim',
    'BOTH': 'trim'
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var text = Blockly.ARDUINO.valueToCode(block, 'TEXT',
      Blockly.ARDUINO.ORDER_NONE) || '\'\'';
  return [operator + '(' + text + ')', Blockly.ARDUINO.ORDER_FUNCTION_CALL];
};

Blockly.ARDUINO['text_print'] = function(block) {
  // Print statement.
  var msg = Blockly.ARDUINO.valueToCode(block, 'TEXT',
      Blockly.ARDUINO.ORDER_NONE) || '\'\'';
  return 'print(' + msg + ');\n';
};

Blockly.ARDUINO['text_prompt_ext'] = function(block) {
  // Prompt function.
  if (block.getField('TEXT')) {
    // Internal message.
    var msg = Blockly.ARDUINO.quote_(block.getFieldValue('TEXT'));
  } else {
    // External message.
    var msg = Blockly.ARDUINO.valueToCode(block, 'TEXT',
        Blockly.ARDUINO.ORDER_NONE) || '\'\'';
  }
  var code = 'readline(' + msg + ')';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'floatval(' + code + ')';
  }
  return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
};

Blockly.ARDUINO['text_prompt'] = Blockly.ARDUINO['text_prompt_ext'];

Blockly.ARDUINO['text_count'] = function(block) {
  var text = Blockly.ARDUINO.valueToCode(block, 'TEXT',
      Blockly.ARDUINO.ORDER_MEMBER) || '\'\'';
  var sub = Blockly.ARDUINO.valueToCode(block, 'SUB',
      Blockly.ARDUINO.ORDER_NONE) || '\'\'';
  var code = 'strlen(' + sub + ') === 0'
    + ' ? strlen(' + text + ') + 1'
    + ' : substr_count(' + text + ', ' + sub + ')';
  return [code, Blockly.ARDUINO.ORDER_CONDITIONAL];
};

Blockly.ARDUINO['text_replace'] = function(block) {
  var text = Blockly.ARDUINO.valueToCode(block, 'TEXT',
      Blockly.ARDUINO.ORDER_MEMBER) || '\'\'';
  var from = Blockly.ARDUINO.valueToCode(block, 'FROM',
      Blockly.ARDUINO.ORDER_NONE) || '\'\'';
  var to = Blockly.ARDUINO.valueToCode(block, 'TO',
      Blockly.ARDUINO.ORDER_NONE) || '\'\'';
  var code = 'str_replace(' + from + ', ' + to + ', ' + text + ')';
  return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
};

Blockly.ARDUINO['text_reverse'] = function(block) {
  var text = Blockly.ARDUINO.valueToCode(block, 'TEXT',
      Blockly.ARDUINO.ORDER_MEMBER) || '\'\'';
  var code = 'strrev(' + text + ')';
  return [code, Blockly.ARDUINO.ORDER_FUNCTION_CALL];
};
