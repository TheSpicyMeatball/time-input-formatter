import { parse, isValid, format as formatDate } from 'date-fns';
import { first, isNilOrEmpty, last, or, pluck, replaceAt, take } from '@paravano/utils';
import { Format, Format12Hr, Format24Hr, ParsedTime } from '../types';

const meridian = (value: string) : string => value.includes('p') ? 'PM' : 'AM';
const minutes = (value: string) : string => parseInt(value.slice(0, 2), 10) < 60 ? value.slice(0, 2) : '00';
const seconds = (value: string) : string => parseInt(value.slice(0, 2), 10) < 60 ? value.slice(0, 2) : '00';

export const timeFormats = {
  _12hm: 'h:mm a',
  _12hms: 'h:mm:ss a',
  _24hm: 'HH:mm',
  _24hrs: 'HH:mm:ss',
};

/**
 * Try to interpret partial entry for 12hr time
 *
 * @param {string} value - The input value to derive the format
 * @param {Format12Hr} format - The desired output format
 * @returns {ParsedTime}
 */
 export const try12Hr = (value: string, format: Format12Hr) : ParsedTime => {
  if (isNilOrEmpty(value)) return;

  const hour = (value: string) : string => {
    const int = parseInt(value, 10);

    if (int < 10 || or(int, 10, 11, 12)) return int.toString();
    if (int >= 24) return '12';
    
    return (int - 12).toString();
  };

  // 0 | 00000000 | 0a | 0A | 0am | 0p | 0P | 0pm | 0PM => 12:00 AM
  if (/^0*(a|am|p|pm)?$/i.test(value)) {
    return { valid: true, value: `12:00${format === timeFormats._12hms ? ':00' : ''} AM` };
  }

  // remove leading zeros
  const _value = value.replace(/^0*/, '').toLowerCase();

  // 7 | 7a | 7am | 7A | 7AM   => 7:00 AM
  // 7p | 7pm | 7P | 7PM            => 7:00 PM
  if (/^[0-9](a|am|p|pm)?$/.test(_value)) {
    const num = _value.replace(/a|p|m/g, '');
    return { valid: true, value: `${num}:00${format === timeFormats._12hms ? ':00' : ''} ${meridian(_value)}` };
  }

  // 10 | 10a | 10am | 10A | 10AM  => 10:00 AM
  // 12 | >= 24  => 12:00 AM
  // 16          => 4:00 PM
  if (/^(1|2)[0-9]{3,}(a|am|p|pm)?$/.test(_value) || /^(1|2)[0-9]{1}(a|am|p|pm)?$/.test(_value)) {
    const num = take(Array.from(_value.replace(/a|am|p|pm$/g, '')), format === timeFormats._12hms ? 6 : 4);
    const h = hour(take(num, 2).join(''));
    const m = minutes(pluck(num, [2, 3]).map(x => x === undefined ? '0' : x).join(''));
    const s = format === timeFormats._12hms ? ':' + seconds(pluck(num, [4, 5]).map(x => x === undefined ? '0' : x).join('')) : '';

    if (parseInt(take(num, 2).join('')) <= 12) return { valid: true, value: `${h}:${m}${s} ${meridian(_value)}` };
    if (parseInt(take(num, 2).join('')) >= 24) return { valid: true, value: `${h}:${m}${s} AM` };

    return { valid: true, value: `${h}:${m}${s} PM` };
  }

  // 700 | 0700 | 799 | 77777777  => 7:00 AM
  // 715                          => 7:15 AM
  if (/[0-9]{3}[0-9]*(a|am|p|pm)?$/.test(_value)) {
    const num = take(Array.from(_value.replace(/a|am|p|pm$/g, '')), format === timeFormats._12hms ? 5 : 3);
    return { valid: true, value: `${first(num, '0')}:${minutes(pluck(num, [1, 2]).join(''))}${format === timeFormats._12hms ? ':' + seconds(pluck(num, [3, 4]).join('')) : ''} ${meridian(_value)}` };
  }
};

/**
 * Try to interpret partial entry for 24hr time
 *
 * @param {string} value - The input value to derive the format
 * @param {Format24Hr} format - The desired output format
 * @returns {ParsedTime}
 */
export const try24Hr = (value: string, format: Format24Hr) : ParsedTime => {
  if (isNilOrEmpty(value)) return;

  const _value = value.toLowerCase();

  const hour = (value: string) : string => {
    const _meridian = meridian(_value);
    let int = parseInt(value.replace(/^0*|a|am|p|pm$/g, ''), 10);

    int = isNaN(int) ? 0 : int;

    if (int < 12) {
      if (_meridian === 'PM') {
        return (int + 12).toString();
      }

      if (int < 10) {
        return '0' + int.toString();
      }

      return int.toString();
    }

    if (int >= 24 || (int === 12 && value.includes('a'))) return '00';

    return int.toString();
  };

  // 0 | 0a | 0am | 0A | 0AM | 0p | 0pm | 0P | 0PM | 25:00  => 00:00
  if (/^0+(a|am|p|pm)?$/.test(_value) || /^2[4-9]:[0-9]{2}$/.test(_value)) {
    return { valid: true, value: `00:00${format === timeFormats._24hrs ? ':00' : ''}` };
  }

  // 7 | 07 | 7a | 7am | 7A | 7AM   => 07:00
  // 7p | 7pm | 7P | 7PM            => 19:00
  if (/^0*[0-9](a|am|p|pm)?$/.test(_value)) {
    return { valid: true, value: `${hour(_value)}:00${format === timeFormats._24hrs ? ':00' : ''}` };
  }

  // 10 | 10a | 10am | 10A | 10AM  => 10:00
  // >= 24                         => 00:00
  // 16                            => 16:00
  if (/^(1|2)[0-9]{3,}(a|am|p|pm)?$/.test(_value) || /^(1|2)[0-9]{1}(a|am|p|pm)?$/.test(_value)) {
    const num = take(Array.from(_value.replace(/^0|a|am|p|pm$/g, '')), format === timeFormats._24hrs ? 6 : 4);
    const _meridian = _value.includes('a') || _value.includes('p') ? meridian(_value).toLowerCase() : '';
    const h = hour(take(num, 2).join('') + _meridian);
    const m = minutes(pluck(num, [2, 3]).map(x => x === undefined ? '0' : x).join(''));
    const s = format === timeFormats._24hrs ? ':' + seconds(pluck(num, [4, 5]).map(x => x === undefined ? '0' : x).join('')) : '';

    if (parseInt(take(num, 2).join('')) <= 12) return { valid: true, value: `${h}:${m}${s}` };
    if (parseInt(take(num, 2).join('')) >= 24) return { valid: true, value: `00:00${format === timeFormats._24hrs ? ':00' : ''}` };

    return { valid: true, value: `${h}:${m}${s}` };
  }

  // 700 | 0700 | 799 | 77777777  => 7:00
  // 715                          => 7:15
  if (/^0?[0-9]{3}[0-9]*(a|am|p|pm)?$/.test(_value)) {
    let num = take(Array.from(_value.replace(/^0|a|am|p|pm$/g, '')), format === timeFormats._24hrs ? 5 : 3);
    
    if (parseInt(num.join(''), 10) === 0) return { valid: true, value: `00:00${format === timeFormats._24hrs ? ':00' : ''}` };

    if (meridian(_value) === 'PM') {
      num = replaceAt(num, 0, (parseInt(first(num, '0'), 10) + 12).toString());
    } else {
      num = replaceAt(num, 0, '0' + first(num, '0'));
    }

    return { valid: true, value: `${first(num, '00')}:${minutes(pluck(num, [1, 2]).join(''))}${format === timeFormats._24hrs ? ':' + seconds(pluck(num, [3, 4]).join('')) : ''}` };
  }

  // 7:00000000000 | 7:00000000001 | 07:00000000000 | 07:00000000001 => 07:00
  if (/^[0-9]{1,2}:[0-9]*(a|am|p|pm)?$/.test(_value)) {
    const ary = _value.split(':');
    const h = hour(first(ary, '00'));
    const m = minutes(last(ary, '00').replace(/am|pm|a|p/i, ''));
    const s = format === timeFormats._24hrs ? ':' + seconds(pluck(Array.from(last(ary, '00').replace(/am|pm|a|p/i, '')), [2, 3]).map(x => x === undefined ? '0' : x).join('')) : '';

    return { valid: true, value: `${h}:${m}${s}` };
  }
};

/**
 * If no partial entry patter was found, try to parse with this fallback
 *
 * @param {string} value - The input value to derive the format
 * @param {Format} format - The desired output format
 * @returns {ParsedTime}
 */
export const fallback = (value: string, format: Format) : ParsedTime => {
  if (/^[0-9]+:?[0-9]+(a|am|p|pm)$/i.test(value)) {
    value = value.replace(/(a|am|p|pm)$/i, ' $1');
  }
  const time = parse(value, format, new Date());

  if (isValid(parse(value, format, new Date()))) {
    return {
      valid: true,
      value: formatDate(time, format),
    };
  }

  // try each time format
  const keys = Object.keys(timeFormats);

  for (let i = 0; i < keys.length; i++) {
    const _format = timeFormats[keys[i]];
    const time = parse(value, _format, new Date());

    if (isValid(time)) {
      return {
        valid: true,
        value: formatDate(time, format),
      };
    }
  }

  return { valid: false, value };
};