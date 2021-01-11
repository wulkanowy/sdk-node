import {
  dayIsAfter, dayIsBefore, formatDateString, getWeekDate, inDateRange, parseDateString,
} from './date';

describe('Date util tests', () => {
  describe('parseDateString', () => {
    it('Basic', () => {
      const date = parseDateString('2020-11-20');
      expect(date.getFullYear()).toEqual(2020);
      expect(date.getMonth()).toEqual(10);
      expect(date.getDate()).toEqual(20);
      expect(date.getHours()).toEqual(0);
      expect(date.getMinutes()).toEqual(0);
      expect(date.getSeconds()).toEqual(0);
    });

    it('Leading 0', () => {
      const date = parseDateString('2019-05-03');
      expect(date.getFullYear()).toEqual(2019);
      expect(date.getMonth()).toEqual(4);
      expect(date.getDate()).toEqual(3);
      expect(date.getHours()).toEqual(0);
      expect(date.getMinutes()).toEqual(0);
      expect(date.getSeconds()).toEqual(0);
    });

    it('No leading 0', () => {
      const date = parseDateString('2019-5-3');
      expect(date.getFullYear()).toEqual(2019);
      expect(date.getMonth()).toEqual(4);
      expect(date.getDate()).toEqual(3);
      expect(date.getHours()).toEqual(0);
      expect(date.getMinutes()).toEqual(0);
      expect(date.getSeconds()).toEqual(0);
    });
  });

  describe('formatDateString', () => {
    it('Simple', () => {
      expect(formatDateString(new Date('2020-11-20T00:00:00'))).toEqual('2020-11-20');
      expect(formatDateString(new Date('2020-11-20T23:00:00'))).toEqual('2020-11-20');
      expect(formatDateString(new Date('2019-05-03T00:00:00'))).toEqual('2019-05-03');
    });

    it('Detailed', () => {
      ['2011-10-15', '2000-01-01', '2050-02-04', '2020-01-11'].forEach((testDate) => {
        for (let h = 0; h < 24; h += 1) {
          for (let m = 0; m < 60; m += 15) {
            const date = new Date(testDate);
            date.setHours(h);
            date.setMinutes(m);
            date.setSeconds(0);
            expect(formatDateString(date)).toEqual(testDate);
          }
        }
      });
    });
  });

  it('dayIsAfter and dayIsBefore', () => {
    const tests: [string, 'before' | 'after' | 'equal', string][] = [
      ['2020-10-10', 'equal', '2020-10-10'],
      ['2000-12-31', 'before', '2001-01-01'],
      ['2010-10-02', 'after', '2010-10-01'],
      ['2015-02-28', 'before', '2015-03-01'],
      ['2020-01-11', 'after', '2020-01-09'],
      ['2020-01-11', 'after', '2020-1-9'],
      ['2022-05-23', 'equal', '2022-5-23'],
      ['2022-05-03', 'equal', '2022-5-3'],
    ];
    tests.forEach(([date, relationship, dateToCompare]) => {
      expect(dayIsBefore(date, dateToCompare)).toEqual(relationship === 'before');
      expect(dayIsAfter(date, dateToCompare)).toEqual(relationship === 'after');
    });
  });

  it('inDateRange', () => {
    expect(inDateRange('2020-05-01', '2020-04-01', '2020-06-01')).toEqual(true);
    expect(inDateRange('2020-03-01', '2020-04-01', '2020-06-01')).toEqual(false);
    expect(inDateRange('2015-07-01', '2020-04-01', '2020-06-01')).toEqual(false);
    expect(inDateRange('2010-04-15', '2010-05-30', '2010-01-01')).toEqual(false);
    expect(inDateRange('2020-05-05', '2020-05-05', '2020-06-01')).toEqual(true);
    expect(inDateRange('2020-06-01', '2020-05-05', '2020-06-01')).toEqual(true);
    expect(inDateRange('2013-09-17', '2013-09-17', '2013-09-17')).toEqual(true);
    expect(inDateRange('2013-09-18', '2013-09-17', '2013-09-17')).toEqual(false);
    expect(inDateRange('2013-09-16', '2013-09-17', '2013-09-17')).toEqual(false);
  });

  it('getWeekDate', () => {
    expect(getWeekDate('2021-01-11')).toEqual('2021-01-11');
    expect(getWeekDate('2021-01-12')).toEqual('2021-01-11');
    expect(getWeekDate('2021-01-10')).toEqual('2021-01-04');
    expect(getWeekDate('2021-11-10')).toEqual('2021-11-08');
    expect(getWeekDate('2019-11-10')).toEqual('2019-11-04');
    expect(getWeekDate('2015-03-14')).toEqual('2015-03-09');
  });
});
