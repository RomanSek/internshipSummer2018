const weekDays = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const getWeekDayName = (dataPoint) => weekDays[dataPoint.date.getDay()];

const getSeriesAverage = (series) => {
  const dates = new Set(series.map(dataPoint => dataPoint.date.getTime()));
  const total = series.reduce((accumulator, dataPoint) => accumulator + dataPoint.visits, 0);

  return {
    averageVisits:  total / dates.size,
  };
};

const groupSeriesByWeekDay = (series)=> {
  return series.reduce((accumulator, dataPoint) => {
    const weekDay = getWeekDayName(dataPoint);
    let container = accumulator[weekDay];
    if (!container) {
      container = accumulator[weekDay] = []
    }
    container.push(dataPoint);

    return accumulator;
  }, {});
};

const getAverage = (series, groupByWeekDay = false) => {
  if (groupByWeekDay) {
    const groupedSeries = groupSeriesByWeekDay(series);

    return Object.entries(groupedSeries).reduce(
    	(accumulator, [ weekDayName, weekDaySeries ]) => {
				accumulator[weekDayName] = getSeriesAverage(weekDaySeries);
				return accumulator;
			},
			{}
		);
  }

  return getSeriesAverage(series);
};

module.exports = getAverage;
