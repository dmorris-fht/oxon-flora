
define(["jquery.min", "d3", "brccharts.umd.min"],

  function (jq, d3, brccharts) {

    let chartByWeek, chartByYear
 
    function createCharts(selectorTab, selectorControl, c) {
   
      const width =  600
      const ar = c.get('charts.aspect-ratio') ? c.charts['aspect-ratio'] : 0.5
      let whichCharts = c.get('charts.include') ? c.charts['include'] : 'weekly yearly'
      whichCharts = whichCharts.split(' ')
      
      const $labelWeeklyChart = $('<div>Records by week</div>').appendTo($(selectorTab))
      $(selectorTab)
      const optsByDay = {
        selector: selectorTab,
        // title: 'Records by week',
        // titleFontSize: 14,
        data: [],
        taxa: ['taxon'],
        metrics: [
          { prop: 'count', label: 'count', colour: 'rgb(0,128,0)', fill: 'rgb(221,255,221)'},
        ],
        showLegend: false,
        showTaxonLabel: false,
        interactivity: 'none',
        width: width,
        //height: height,
        height: width * ar,
        perRow: 1,
        expand: true,
        missingValues: 0, 
        metricExpression: '',
        minMaxY: null,
        minY: 0,
        lineInterpolator: 'curveMonotoneX',
        chartStyle: 'area',
        periodType: 'week',
        axisLeftLabel: 'Record count',
        margin: {left: 40, right: 0, top: 0, bottom: 15},
      }
      if (whichCharts.includes('weekly')) {
        chartByWeek = brccharts.temporal(optsByDay)
      } else {
        $labelWeeklyChart.hide()
      }

      const $labelYearlyChart = $('<div>Records by year</div>').appendTo($(selectorTab))
      const optsByYear = {
        selector: selectorTab,
        // title: 'Records by year',
        // titleFontSize: 14,
        data: [],
        taxa: ['taxon'],
        metrics: [
          { prop: 'count', colour: 'grey'},
        ],
        showLegend: false,
        showTaxonLabel: false,
        interactivity: 'none',
        width: width,
        height: width * ar,
        perRow: 1,
        expand: true,
        metricExpression: '',
        minMaxY: null,
        minY: 0,
        periodType: 'year',
        chartStyle: 'bar',
        axisLeftLabel: 'Record count',
        margin: {left: 40, right: 0, top: 0, bottom: 15},
      }

      // Set min and/or max year if configured by admin
      const minYear = c.get('charts.yearly-min') ? c.charts['yearly-min'] : 0
      const maxYear = c.get('charts.yearly-max') ? c.charts['yearly-max'] : 0
      if (minYear) {
        optsByYear.minPeriod = minYear
      }
      if (maxYear) {
        optsByYear.maxPeriod = maxYear
      }
      
      if (whichCharts.includes('yearly')) {
        chartByYear = brccharts.temporal(optsByYear)
      } else {
        $labelYearlyChart.hide()
      }
    }

    function refreshCharts(taxonId) {
      if (chartByWeek) {
        d3.csv(`../user/data/weekly/${taxonId}.csv`, d => {
          return {
            taxon: d.taxon,
            count: Number(d.count),
            period: Number(d.period)
          }
        }).then(data => {
          chartByWeek.setChartOpts({data: data})
        })
      }
      if (chartByYear) {
        d3.csv(`../user/data/yearly/${taxonId}.csv`, d => {
          return {
            taxon: d.taxon,
            count: Number(d.count),
            period: Number(d.period)
          }
        }).then(data => {
          chartByYear.setChartOpts({data: data})
        })
      }
    }

    return {
      createCharts: createCharts,
      refreshCharts: refreshCharts
    }
  }
)
