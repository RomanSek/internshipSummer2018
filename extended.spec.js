const getAverage = require('./stats');

const range = function*(start, stop, step) {
  while (start <= stop) {
    yield start;
    start += step;
  }
};
const DAY = 24 * 60 * 60 * 1000;
const seriesGenerator = (values, startDate) => {
  return [...values].map((value, index) => {
    return {
      date: new Date(startDate.getTime() + index * DAY),
      visits: value,
    }
  })
};

describe('getAverage extended', () => {
  const emptySeries = [];
  const monthSeries = seriesGenerator(range(2, 62, 2), new Date('2018-01-01'));
  const endOfMonthSeries = seriesGenerator(range(1, 41, 2), new Date('2018-01-11'));
  const beginningOfMonthSeries = seriesGenerator(range(1, 41, 2), new Date('2018-01-01'));
  const shortBeginningOfMonthSeries = seriesGenerator(range(0, 9, 3), new Date('1970-08-3'));
  const shortEndOfMonthSeries = seriesGenerator(range(2, 10, 4), new Date('1970-08-23'));
  const endOfMonthOverlapTotalSeries = [...monthSeries, ...endOfMonthSeries];
  const beginningOfMonthOverlapTotalSeries = [...monthSeries, ...beginningOfMonthSeries];
  const middleOfMonthGapTotalSeries = [...shortBeginningOfMonthSeries, ...shortEndOfMonthSeries];

  test('should return object for emptySeries', () => {
    expect(getAverage(emptySeries)).toEqual(expect.objectContaining({}));
  });

  test.skip('should return average visits for emptySeries', () => {
    expect(getAverage(emptySeries)).toEqual({
      averageVisits: NaN,
    });
  });

  test('should return average visits for monthSeries', () => {
    expect(getAverage(monthSeries)).toEqual({
      averageVisits: 32,
    });
  });

  test('should return average visits for endOfMonthSeries', () => {
    expect(getAverage(endOfMonthSeries)).toEqual({
      averageVisits: 21,
    });
  });

  test('should return average visits for beginningOfMonthSeries', () => {
    expect(getAverage(beginningOfMonthSeries)).toEqual({
      averageVisits: 21,
    });
  });

  test('should return average visits for shortBeginningOfMonthSeries', () => {
    expect(getAverage(shortBeginningOfMonthSeries)).toEqual({
      averageVisits: 4.5,
    });
  });

  test('should return average visits for shortEndOfMonthSeries', () => {
    expect(getAverage(shortEndOfMonthSeries)).toEqual({
      averageVisits: 6,
    });
  });

  test('should return average visits for endOfMonthOverlapTotalSeries', () => {
    const combinedResults = getAverage(endOfMonthOverlapTotalSeries);
    expect(combinedResults).toEqual({
      averageVisits: expect.any(Number),
    });
    expect(combinedResults.averageVisits).toBeCloseTo(46.22580645, 4);
  });

  test('should return average visits for beginningOfMonthOverlapTotalSeries', () => {
    const combinedResults = getAverage(beginningOfMonthOverlapTotalSeries);
    expect(combinedResults).toEqual({
      averageVisits: expect.any(Number),
    });
    expect(combinedResults.averageVisits).toBeCloseTo(46.22580645, 4);
  });

  test('should return average visits for middleOfMonthGapTotalSeries', () => {
    const combinedResults = getAverage(middleOfMonthGapTotalSeries);
    expect(combinedResults).toEqual({
      averageVisits: expect.any(Number),
    });
    expect(combinedResults.averageVisits).toBeCloseTo(5.142857143, 4);
  });

  describe('grouped by week day', () => {
    test('should return object for emptySeries', () => {
      expect(getAverage(emptySeries, true)).toEqual(expect.objectContaining({}));
    });

    test('should return average visits for monthSeries', () => {
      expect(getAverage(monthSeries, true)).toEqual({
        Monday: {
          averageVisits: 30,
        },
        Tuesday: {
          averageVisits: 32,
        },
        Wednesday: {
          averageVisits: 34,
        },
        Thursday: {
          averageVisits: 29,
        },
        Friday: {
          averageVisits: 31,
        },
        Saturday: {
          averageVisits: 33,
        },
        Sunday: {
          averageVisits: 35,
        },
      });
    });

    test('should return average visits for endOfMonthSeries', () => {
      expect(getAverage(endOfMonthSeries, true)).toEqual({
        Monday: {
          averageVisits: 23,
        },
        Tuesday: {
          averageVisits: 25,
        },
        Wednesday: {
          averageVisits: 27,
        },
        Thursday: {
          averageVisits: 15,
        },
        Friday: {
          averageVisits: 17,
        },
        Saturday: {
          averageVisits: 19,
        },
        Sunday: {
          averageVisits: 21,
        },
      });
    });

    test('should return average visits for beginningOfMonthSeries', () => {
      expect(getAverage(beginningOfMonthSeries, true)).toEqual({
        Monday: {
          averageVisits: 15,
        },
        Tuesday: {
          averageVisits: 17,
        },
        Wednesday: {
          averageVisits: 19,
        },
        Thursday: {
          averageVisits: 21,
        },
        Friday: {
          averageVisits: 23,
        },
        Saturday: {
          averageVisits: 25,
        },
        Sunday: {
          averageVisits: 27,
        },
      });
    });

    test('should return average visits for shortBeginningOfMonthSeries', () => {
      expect(getAverage(shortBeginningOfMonthSeries, true)).toEqual(expect.objectContaining({
        Monday: {
          averageVisits: 0,
        },
        Tuesday: {
          averageVisits: 3,
        },
        Wednesday: {
          averageVisits: 6,
        },
        Thursday: {
          averageVisits: 9,
        },
      }));
    });

    test('should return average visits for shortEndOfMonthSeries', () => {
      expect(getAverage(shortEndOfMonthSeries, true)).toEqual(expect.objectContaining({
        Monday: {
          averageVisits: 6,
        },
        Tuesday: {
          averageVisits: 10,
        },
        Sunday: {
          averageVisits: 2,
        },
      }));
    });

    test('should return average visits for endOfMonthOverlapTotalSeries', () => {
      expect(getAverage(endOfMonthOverlapTotalSeries, true)).toEqual({
        Monday: {
          averageVisits: 43.8,
        },
        Tuesday: {
          averageVisits: 47,
        },
        Wednesday: {
          averageVisits: 50.2,
        },
        Thursday: {
          averageVisits: 40.25,
        },
        Friday: {
          averageVisits: 43.75,
        },
        Saturday: {
          averageVisits: 47.25,
        },
        Sunday: {
          averageVisits: 50.75,
        },
      });
    });

    test('should return average visits for beginningOfMonthOverlapTotalSeries', () => {
      expect(getAverage(beginningOfMonthOverlapTotalSeries, true)).toEqual({
        Monday: {
          averageVisits: 39,
        },
        Tuesday: {
          averageVisits: 42.2,
        },
        Wednesday: {
          averageVisits: 45.4,
        },
        Thursday: {
          averageVisits: 44.75,
        },
        Friday: {
          averageVisits: 48.25,
        },
        Saturday: {
          averageVisits: 51.75,
        },
        Sunday: {
          averageVisits: 55.25,
        },
      });
    });

    test('should return average visits for middleOfMonthGapTotalSeries', () => {
      expect(getAverage(middleOfMonthGapTotalSeries, true)).toEqual(expect.objectContaining({
        Monday: {
          averageVisits: 3,
        },
        Tuesday: {
          averageVisits: 6.5,
        },
        Wednesday: {
          averageVisits: 6,
        },
        Thursday: {
          averageVisits: 9,
        },
        Sunday: {
          averageVisits: 2,
        },
      }));
    });

    test.skip('should not return average visits for missing days in middleOfMonthGapTotalSeries', () => {
      expect(getAverage(middleOfMonthGapTotalSeries, true)).toEqual(expect.not.objectContaining({
        Friday: expect.any,
        Saturday: expect.any,
      }));
    });
  });
});
