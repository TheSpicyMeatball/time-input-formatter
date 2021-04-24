/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { deriveTimeFormat } = require('../../dist/lib/es5');

describe('deriveTimeFormat', () => {
  const timeFormats = {
    _12hm: '12hm',
    _12hms: '12hms',
    _24hm: '24hm',
    _24hrs: '24hms',
  };

  test('12hr', () => {
    expect(deriveTimeFormat('7:00 AM', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('7:00 am', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('7:00 PM', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 PM' });
    expect(deriveTimeFormat('7:00 pm', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 PM' });
    expect(deriveTimeFormat('7:00a', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('7:00am', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('7:00AM', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('7:00p', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 PM' });
    expect(deriveTimeFormat('7:00pm', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 PM' });
    expect(deriveTimeFormat('7:00PM', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 PM' });

    expect(deriveTimeFormat('7:00', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });

    expect(deriveTimeFormat('7', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });

    expect(deriveTimeFormat('7a', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('7am', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('7A', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('7AM', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('7p', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 PM' });
    expect(deriveTimeFormat('7pm', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 PM' });
    expect(deriveTimeFormat('7P', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 PM' });
    expect(deriveTimeFormat('7PM', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 PM' });

    expect(deriveTimeFormat('10', timeFormats._12hm)).toStrictEqual({ valid: true, value: '10:00 AM' });
    expect(deriveTimeFormat('10a', timeFormats._12hm)).toStrictEqual({ valid: true, value: '10:00 AM' });
    expect(deriveTimeFormat('10am', timeFormats._12hm)).toStrictEqual({ valid: true, value: '10:00 AM' });
    expect(deriveTimeFormat('10A', timeFormats._12hm)).toStrictEqual({ valid: true, value: '10:00 AM' });
    expect(deriveTimeFormat('10AM', timeFormats._12hm)).toStrictEqual({ valid: true, value: '10:00 AM' });
    expect(deriveTimeFormat('1015', timeFormats._12hm)).toStrictEqual({ valid: true, value: '10:15 AM' });

    expect(deriveTimeFormat('700', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('0700', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('715', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:15 AM' });
    expect(deriveTimeFormat('71527', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:15 AM' });
  });
  
  test('12hr => edge cases', () => {
    expect(deriveTimeFormat(null, timeFormats._12hm)).toStrictEqual({ valid: false, value: null });
    expect(deriveTimeFormat('0', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('0a', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('0am', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('0A', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('0AM', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('0p', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('0pm', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('0P', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('0PM', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('000000', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('07', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('007', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('0000715', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:15 AM' });
    expect(deriveTimeFormat('000012', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('12', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('25', timeFormats._12hm)).toStrictEqual({ valid: true, value: '12:00 AM' });
    expect(deriveTimeFormat('16', timeFormats._12hm)).toStrictEqual({ valid: true, value: '4:00 PM' });
    expect(deriveTimeFormat('799', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('77777777777', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });

    expect(deriveTimeFormat('7:00000000000', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
    expect(deriveTimeFormat('7:00000000001', timeFormats._12hm)).toStrictEqual({ valid: true, value: '7:00 AM' });
  });

  test('12hrs', () => {
    expect(deriveTimeFormat('7:00:27 AM', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:27 AM' });
    expect(deriveTimeFormat('7:00 AM', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('7:00 am', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('7:00 PM', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 PM' });
    expect(deriveTimeFormat('7:00 pm', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 PM' });
    expect(deriveTimeFormat('7:00a', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('7:00am', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('7:00AM', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('7:00p', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 PM' });
    expect(deriveTimeFormat('7:00pm', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 PM' });
    expect(deriveTimeFormat('7:00PM', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 PM' });

    expect(deriveTimeFormat('7:00', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });

    expect(deriveTimeFormat('7', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });

    expect(deriveTimeFormat('7a', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('7am', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('7A', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('7AM', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('7p', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 PM' });
    expect(deriveTimeFormat('7pm', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 PM' });
    expect(deriveTimeFormat('7P', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 PM' });
    expect(deriveTimeFormat('7PM', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 PM' });

    expect(deriveTimeFormat('10', timeFormats._12hms)).toStrictEqual({ valid: true, value: '10:00:00 AM' });
    expect(deriveTimeFormat('10a', timeFormats._12hms)).toStrictEqual({ valid: true, value: '10:00:00 AM' });
    expect(deriveTimeFormat('10am', timeFormats._12hms)).toStrictEqual({ valid: true, value: '10:00:00 AM' });
    expect(deriveTimeFormat('10A', timeFormats._12hms)).toStrictEqual({ valid: true, value: '10:00:00 AM' });
    expect(deriveTimeFormat('10AM', timeFormats._12hms)).toStrictEqual({ valid: true, value: '10:00:00 AM' });
    expect(deriveTimeFormat('1015', timeFormats._12hms)).toStrictEqual({ valid: true, value: '10:15:00 AM' });
    expect(deriveTimeFormat('101527', timeFormats._12hms)).toStrictEqual({ valid: true, value: '10:15:27 AM' });

    expect(deriveTimeFormat('700', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('0700', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('070027', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:27 AM' });
    expect(deriveTimeFormat('715', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:15:00 AM' });
    expect(deriveTimeFormat('71527', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:15:27 AM' });
  });

  test('12hrs => edge cases', () => {
    expect(deriveTimeFormat(null, timeFormats._12hms)).toStrictEqual({ valid: false, value: null });
    expect(deriveTimeFormat('0', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('0a', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('0am', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('0A', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('0AM', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('0p', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('0pm', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('0P', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('0PM', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('000000', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('07', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('007', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('0000715', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:15:00 AM' });
    expect(deriveTimeFormat('000012', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('12', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('25', timeFormats._12hms)).toStrictEqual({ valid: true, value: '12:00:00 AM' });
    expect(deriveTimeFormat('16', timeFormats._12hms)).toStrictEqual({ valid: true, value: '4:00:00 PM' });
    expect(deriveTimeFormat('799', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('77777777777', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });

    expect(deriveTimeFormat('7:00000000000', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
    expect(deriveTimeFormat('7:00000000001', timeFormats._12hms)).toStrictEqual({ valid: true, value: '7:00:00 AM' });
  });

  test('24hr', () => {
    expect(deriveTimeFormat(null, timeFormats._24hm)).toStrictEqual({ valid: false, value: null });

    expect(deriveTimeFormat('07:00', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });
    expect(deriveTimeFormat('12:00', timeFormats._24hm)).toStrictEqual({ valid: true, value: '12:00' });

    expect(deriveTimeFormat('7', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });
    expect(deriveTimeFormat('7a', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });
    expect(deriveTimeFormat('7am', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });
    expect(deriveTimeFormat('7A', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });
    expect(deriveTimeFormat('7AM', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });
    expect(deriveTimeFormat('7p', timeFormats._24hm)).toStrictEqual({ valid: true, value: '19:00' });
    expect(deriveTimeFormat('7pm', timeFormats._24hm)).toStrictEqual({ valid: true, value: '19:00' });
    expect(deriveTimeFormat('7P', timeFormats._24hm)).toStrictEqual({ valid: true, value: '19:00' });
    expect(deriveTimeFormat('7PM', timeFormats._24hm)).toStrictEqual({ valid: true, value: '19:00' });

    expect(deriveTimeFormat('700', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });
    expect(deriveTimeFormat('0700', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });
    expect(deriveTimeFormat('700P', timeFormats._24hm)).toStrictEqual({ valid: true, value: '19:00' });
    expect(deriveTimeFormat('715', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:15' });

    expect(deriveTimeFormat('10', timeFormats._24hm)).toStrictEqual({ valid: true, value: '10:00' });
    expect(deriveTimeFormat('11', timeFormats._24hm)).toStrictEqual({ valid: true, value: '11:00' });
    expect(deriveTimeFormat('12', timeFormats._24hm)).toStrictEqual({ valid: true, value: '12:00' });
    expect(deriveTimeFormat('13', timeFormats._24hm)).toStrictEqual({ valid: true, value: '13:00' });
    expect(deriveTimeFormat('23', timeFormats._24hm)).toStrictEqual({ valid: true, value: '23:00' });

    expect(deriveTimeFormat('11a', timeFormats._24hm)).toStrictEqual({ valid: true, value: '11:00' });
    expect(deriveTimeFormat('11am', timeFormats._24hm)).toStrictEqual({ valid: true, value: '11:00' });
    expect(deriveTimeFormat('11A', timeFormats._24hm)).toStrictEqual({ valid: true, value: '11:00' });
    expect(deriveTimeFormat('11AM', timeFormats._24hm)).toStrictEqual({ valid: true, value: '11:00' });
    expect(deriveTimeFormat('11p', timeFormats._24hm)).toStrictEqual({ valid: true, value: '23:00' });
    expect(deriveTimeFormat('11pm', timeFormats._24hm)).toStrictEqual({ valid: true, value: '23:00' });
    expect(deriveTimeFormat('11P', timeFormats._24hm)).toStrictEqual({ valid: true, value: '23:00' });
    expect(deriveTimeFormat('11PM', timeFormats._24hm)).toStrictEqual({ valid: true, value: '23:00' });
  });
  
  test('24hr => edge cases', () => {
    expect(deriveTimeFormat('00:00', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('25:00', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });

    expect(deriveTimeFormat('0', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('0000000', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('0a', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('0am', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('0A', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('0AM', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('0p', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('0pm', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('0P', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('0PM', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });

    expect(deriveTimeFormat('000012', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('12a', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('12am', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('12A', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('12AM', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('0010', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:10' });

    expect(deriveTimeFormat('799', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });

    expect(deriveTimeFormat('24', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('25', timeFormats._24hm)).toStrictEqual({ valid: true, value: '00:00' });
    expect(deriveTimeFormat('2359', timeFormats._24hm)).toStrictEqual({ valid: true, value: '23:59' });
    expect(deriveTimeFormat('2360', timeFormats._24hm)).toStrictEqual({ valid: true, value: '23:00' });
    expect(deriveTimeFormat('2361', timeFormats._24hm)).toStrictEqual({ valid: true, value: '23:00' });

    expect(deriveTimeFormat('7:00000000000', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });
    expect(deriveTimeFormat('07:00000000000', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });
    expect(deriveTimeFormat('7:00000000001', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });
    expect(deriveTimeFormat('07:00000000001', timeFormats._24hm)).toStrictEqual({ valid: true, value: '07:00' });
  });

  test('24hrs', () => {
    expect(deriveTimeFormat(null, timeFormats._24hrs)).toStrictEqual({ valid: false, value: null });

    expect(deriveTimeFormat('07:00', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });
    expect(deriveTimeFormat('07:00:27', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:27' });
    expect(deriveTimeFormat('12:00', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '12:00:00' });

    expect(deriveTimeFormat('7', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });
    expect(deriveTimeFormat('7a', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });
    expect(deriveTimeFormat('7am', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });
    expect(deriveTimeFormat('7A', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });
    expect(deriveTimeFormat('7AM', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });
    expect(deriveTimeFormat('7p', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '19:00:00' });
    expect(deriveTimeFormat('7pm', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '19:00:00' });
    expect(deriveTimeFormat('7P', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '19:00:00' });
    expect(deriveTimeFormat('7PM', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '19:00:00' });

    expect(deriveTimeFormat('700', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });
    expect(deriveTimeFormat('0700', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });
    expect(deriveTimeFormat('700P', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '19:00:00' });
    expect(deriveTimeFormat('715', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:15:00' });
    expect(deriveTimeFormat('71527', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:15:27' });

    expect(deriveTimeFormat('10', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '10:00:00' });
    expect(deriveTimeFormat('11', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '11:00:00' });
    expect(deriveTimeFormat('12', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '12:00:00' });
    expect(deriveTimeFormat('13', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '13:00:00' });
    expect(deriveTimeFormat('23', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '23:00:00' });
    expect(deriveTimeFormat('1015', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '10:15:00' });
    expect(deriveTimeFormat('101527', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '10:15:27' });

    expect(deriveTimeFormat('11a', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '11:00:00' });
    expect(deriveTimeFormat('11am', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '11:00:00' });
    expect(deriveTimeFormat('11A', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '11:00:00' });
    expect(deriveTimeFormat('11AM', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '11:00:00' });
    expect(deriveTimeFormat('11p', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '23:00:00' });
    expect(deriveTimeFormat('11pm', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '23:00:00' });
    expect(deriveTimeFormat('11P', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '23:00:00' });
    expect(deriveTimeFormat('11PM', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '23:00:00' });
  });

  test('24hrs => edge cases', () => {
    expect(deriveTimeFormat('00:00', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('25:00', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });

    expect(deriveTimeFormat('0', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('0000000', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('0a', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('0am', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('0A', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('0AM', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('0p', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('0pm', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('0P', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('0PM', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });

    expect(deriveTimeFormat('000012', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:12' });
    expect(deriveTimeFormat('00000012', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('12a', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('12am', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('12A', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('12AM', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });

    expect(deriveTimeFormat('799', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });

    expect(deriveTimeFormat('24', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('25', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '00:00:00' });
    expect(deriveTimeFormat('2359', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '23:59:00' });
    expect(deriveTimeFormat('2360', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '23:00:00' });
    expect(deriveTimeFormat('2361', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '23:00:00' });

    expect(deriveTimeFormat('7:00000000000', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });
    expect(deriveTimeFormat('07:00000000000', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });
    expect(deriveTimeFormat('7:00000000001', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });
    expect(deriveTimeFormat('07:00000000001', timeFormats._24hrs)).toStrictEqual({ valid: true, value: '07:00:00' });
  });
  
  test('no match', () => {
    expect(deriveTimeFormat('bogus', timeFormats._12hm)).toStrictEqual({ valid: false, value: 'bogus' });
    expect(deriveTimeFormat('bogus', timeFormats._12hms)).toStrictEqual({ valid: false, value: 'bogus' });
    expect(deriveTimeFormat('bogus', timeFormats._24hm)).toStrictEqual({ valid: false, value: 'bogus' });
    expect(deriveTimeFormat('bogus', timeFormats._24hrs)).toStrictEqual({ valid: false, value: 'bogus' });
    expect(deriveTimeFormat('bogus', 'bogus')).toStrictEqual({ valid: false, value: 'bogus' });
  });
});