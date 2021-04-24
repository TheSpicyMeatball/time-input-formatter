[![Build Status](https://travis-ci.com/TheSpicyMeatball/time-input-formatter.svg?branch=main)](https://travis-ci.com/TheSpicyMeatball/time-input-formatter)
[![Coverage Status](https://coveralls.io/repos/github/TheSpicyMeatball/time-input-formatter/badge.svg?branch=main)](https://coveralls.io/github/TheSpicyMeatball/time-input-formatter?branch=main)
[![dependencies Status](https://status.david-dm.org/gh/TheSpicyMeatball/time-input-formatter.svg)](https://david-dm.org/TheSpicyMeatball/time-input-formatter)

# time-input-formatter

<p>Interpret and format a user inputted time string or partial time string to 12hr or 24hr time</p>

> This library contains es5 and es6 implementations in the deliverable and is fully tree-shakable for es6.

<p><b>Version:</b> 1.0.0</p>


  <h2>deriveTimeFormat</h2>
<p>Derive a time format from a user inputted string</p>
<p>Since v1.0.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>value</b></p>The input value to derive the format</td><td>string</td></tr><tr><td><p><b>format</b></p>The desired output format</td><td>Format</td></tr></tbody>
    </table><p><b>Returns:</b> {ParsedTime}</p><h4>Supporting Types</h4>

```
export type Format = '12hm' | '12hms' | '24hm' | '24hms';
export type ParsedTime = { valid: boolean, value: string };
```
<h4>Import</h4>

```
import { deriveTimeFormat, Format, ParsedTime } from 'time-input-formatter';
```

  



<table>
  <thead>
    <tr>
      <th>Input</th>
      <th>12hm Output</th>
      <th>12hms Output</th>
      <th>24hm Output</th>
      <th>24hms Output</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>7</code></td>
      <td><code>7:00 AM</code></td>
      <td><code>7:00:00 AM</code></td>
      <td><code>07:00</code></td>
      <td><code>07:00:00</code></td>
    </tr>
    <tr>
      <td><code>7a</code></td>
      <td><code>7:00 AM</code></td>
      <td><code>7:00:00 AM</code></td>
      <td><code>07:00</code></td>
      <td><code>07:00:00</code></td>
    </tr>
    <tr>
      <td><code>7am</code></td>
      <td><code>7:00 AM</code></td>
      <td><code>7:00:00 AM</code></td>
      <td><code>07:00</code></td>
      <td><code>07:00:00</code></td>
    </tr>
    <tr>
      <td><code>7p</code></td>
      <td><code>7:00 PM</code></td>
      <td><code>7:00:00 PM</code></td>
      <td><code>19:00</code></td>
      <td><code>19:00:00</code></td>
    </tr>
    <tr>
      <td><code>700</code></td>
      <td><code>7:00 AM</code></td>
      <td><code>7:00:00 AM</code></td>
      <td><code>07:00</code></td>
      <td><code>07:00:00</code></td>
    </tr>
    <tr>
      <td><code>0700</code></td>
      <td><code>7:00 AM</code></td>
      <td><code>7:00:00 AM</code></td>
      <td><code>07:00</code></td>
      <td><code>07:00:00</code></td>
    </tr>
    <tr>
      <td><code>715</code></td>
      <td><code>7:15 AM</code></td>
      <td><code>7:15:00 AM</code></td>
      <td><code>07:15</code></td>
      <td><code>07:15:00</code></td>
    </tr>
    <tr>
      <td><code>71527</code></td>
      <td><code>7:15 AM</code></td>
      <td><code>7:15:27 AM</code></td>
      <td><code>07:15</code></td>
      <td><code>07:15:27</code></td>
    </tr>
    <tr>
      <td><code>16</code></td>
      <td><code>4:00 PM</code></td>
      <td><code>4:00:00 PM</code></td>
      <td><code>16:00</code></td>
      <td><code>16:00:00</code></td>
    </tr>
    <tr>
      <td><code>0</code></td>
      <td><code>12:00 AM</code></td>
      <td><code>12:00:00 AM</code></td>
      <td><code>00:00</code></td>
      <td><code>00:00:00</code></td>
    </tr>
    <tr>
      <td><code>27</code></td>
      <td><code>12:00 AM</code></td>
      <td><code>12:00:00 AM</code></td>
      <td><code>00:00</code></td>
      <td><code>00:00:00</code></td>
    </tr>
  </tbody>
</table>

<a href="#license"></a>
<h2>License</h2>

MIT


<a href="#author"></a>
<h2>Author</h2>
Michael Paravano




<a href="#dependencies"></a>
<h2>Dependencies</h2>



<table>

  <tr>
    <td>
      @paravano/utils
    </td>
    <td>
      ^1.4.0
    </td>
  </tr>

  <tr>
    <td>
      date-fns
    </td>
    <td>
      ^2.21.1
    </td>
  </tr>

</table>
