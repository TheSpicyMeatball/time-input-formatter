import { isNotNilOrEmpty } from '@paravano/utils';
import { Format, ParsedTime } from '../types';
import { fallback, timeFormats, try12Hr, try24Hr } from '../utils';

/**
 * Derive a time format from a user inputted string
 * 
 * @since v1.0.0
 * @param {string} value - The input value to derive the format
 * @param {Format} format - The desired output format
 * @returns {ParsedTime}
 * @docgen_types
 * export type Format = '12hm' | '12hms' | '24hm' | '24hms';
 * export type ParsedTime = { valid: boolean, value: string };
 * @docgen_import { deriveTimeFormat, Format, ParsedTime }
 */
const deriveTimeFormat = (value: string, format: Format) : ParsedTime => {
  let _format;

  switch (format) {
    case '12hm':
      _format = timeFormats._12hm;
      break;

    case '12hms':
      _format = timeFormats._12hms;
      break;
  
    case '24hm':
      _format = timeFormats._24hm;
      break;
  
    case '24hms':
      _format = timeFormats._24hrs;
      break;

    default:
      return { valid: false, value };
  }

  // Try to interpret partial entry
  switch (format) {
    case '12hm':
    case '12hms': {
        const output = try12Hr(value, _format);
    
        if (isNotNilOrEmpty(output)) return output;
      }
      break;

    case '24hm': 
    case '24hms': {
      const output = try24Hr(value, _format);
  
      if (isNotNilOrEmpty(output)) return output;
    }
    break;
  }

  // Partial entry pattern not found, try to parse with fallback
  
  return fallback(value, _format);
};

export { deriveTimeFormat };