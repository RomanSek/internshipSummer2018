const getAverage = require('./stats');

describe('getAverage', () => {
  let oneWeek = [
    { date: new Date('2018-01-01'), visits: 32 },
    { date: new Date('2018-01-02'), visits: 82 },
    { date: new Date('2018-01-03'), visits: 74 },
    { date: new Date('2018-01-04'), visits: 35 },
    { date: new Date('2018-01-05'), visits: 54 },
    { date: new Date('2018-01-06'), visits: 64 },
    { date: new Date('2018-01-07'), visits: 44 },
  ];

  test('average of one week', () => {
    expect(getAverage(oneWeek)).toEqual({
      averageVisits: 55,
    });
  });

  test('week days average of one week', () => {
    expect(getAverage(oneWeek, true)).toEqual({
      Monday: {
        averageVisits: 32,
      },
      Tuesday: {
        averageVisits: 82,
      },
      Wednesday: {
        averageVisits: 74,
      },
      Thursday: {
        averageVisits: 35,
      },
      Friday: {
        averageVisits: 54,
      },
      Saturday: {
        averageVisits: 64,
      },
      Sunday: {
        averageVisits: 44,
      },
    });
  });
});
