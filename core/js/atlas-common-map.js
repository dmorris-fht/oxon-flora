define(["d3", "jquery.min", "atlas-components"],

  function (d3, jq, components) {

    const callbacksMapTypeControl = []
    const callbacksResolutionControl = []
    const callbacksDotShapeControl = []
    const callbacksDotOpacityControl = []
    //const callbacksTimesliceMap = []

    let c

    function setConfig(config) {
      c = config
    }

    function createMapTypeControl(selectorControl, map, callback) {

      const allMapTypes = {
        standard: 'Standard atlas map',
        density: 'Record density',
        timeslice: 'Occurrence by year'
      }
      let mapTypes = []
      if (c.get('common.map-types')) {
        mapTypes = c.get('common.map-types').replace(/\s+/g, ' ').split(' ').filter(r => Object.keys(allMapTypes).includes(r))
      }
      if (!mapTypes.length) {
        mapTypes = Object.keys(allMapTypes)
      }
      
      if (mapTypes.length === 1) {
        localStorage.setItem('map-type', mapTypes[0])
        return
      }

      if (!mapTypes.find(t => t === localStorage.getItem('map-type'))) {
        // Could happen if admin removed previously included map type
        localStorage.setItem('map-type', mapTypes[0])
      }

      const $sel = $('<select>').appendTo($(selectorControl))
      $sel.attr('id', `${map}-map-type-selector`)
      $sel.addClass('atlas-control')
      $sel.addClass('map-type-selector')
      $sel.addClass('form-select')
      $sel.on('change', function() {
        // Get selected value
        const mapType = $(`#${map}-map-type-selector`).find(":selected").val()
        // Store value in local storage
        localStorage.setItem('map-type', mapType)
        // Ensure that the control on other map matches this
        $(`.map-type-selector`).val(mapType)
        // Show/hide supplementary controls
        if (mapType === 'timeslice') {
          $('.timeslice-controls').show()
        } else {
          $('.timeslice-controls').hide()
        }
        // Callbacks
        callbacksMapTypeControl.forEach(cb => {
          cb()
        })
      })

      mapTypes.forEach(function(t){
        const $opt = $('<option>')
        $opt.attr('value', t)
        $opt.html(allMapTypes[t]).appendTo($sel)
        if (localStorage.getItem('map-type') === t) {
          $opt.attr('selected', 'selected')
        }
      })

      callbacksMapTypeControl.push(callback)

      // Also create the timeslice conrol
      createTimeSliceControls(selectorControl, map)
    }

    function createTimeSliceControls(selectorControl, map) {

      const $div0 = $('<div>').appendTo($(selectorControl))
      $div0.addClass('timeslice-controls')

      const $div1 = $('<div>').appendTo($div0)
      const $label = $('<div>').appendTo($div1)
      $label.css('display', 'inline-block')
      $label.css('margin-left', '0.5em')
      $label.text('Thresholds')

      $thresh1 = $('<input>').appendTo($div1)
      $thresh1.attr('type', 'number')
      $thresh1.attr('id', `${map}-timeslice-thresh1`)
      $thresh1.attr('value', localStorage.getItem('timeslice-thresh1'))
      $thresh1.addClass('timeslice-thresh1')
      $thresh1.css('width', '4em')
      $thresh1.css('margin-left', '1em')
      $thresh1.on('change', function() {
        const thresh1 = $(`#${map}-timeslice-thresh1`).val()
        // Store value in local storage
        localStorage.setItem('timeslice-thresh1', thresh1)
        // Ensure that the control on other map matches this
        $(`.timeslice-thresh1`).val(thresh1)
        // Callbacks
        callbacksMapTypeControl.forEach(cb => {
          cb()
        })
      })

      $thresh2 = $('<input>').appendTo($div1)
      $thresh2.attr('type', 'number')
      $thresh2.attr('id', `${map}-timeslice-thresh2`)
      $thresh2.attr('value', localStorage.getItem('timeslice-thresh2'))
      $thresh2.addClass('timeslice-thresh2')
      $thresh2.css('width', '4em')
      $thresh2.css('margin-left', '0.5em')
      $thresh2.on('change', function() {
        const thresh2 = $(`#${map}-timeslice-thresh2`).val()
        // Store value in local storage
        localStorage.setItem('timeslice-thresh2', thresh2)
        // Ensure that the control on other map matches this
        $(`.timeslice-thresh2`).val(thresh2)
        // Callbacks
        callbacksMapTypeControl.forEach(cb => {
          cb()
        })
      })

      const $sel = $('<select>').appendTo($div0)
      $sel.attr('id', `${map}-timeslice-order-selector`)
      $sel.addClass('atlas-control')
      $sel.addClass('timeslice-order-selector')
      $sel.addClass('form-select')
      $sel.on('change', function() {
        // Get selected value
        const order = $(`#${map}-timeslice-order-selector`).find(":selected").val()
        // Store value in local storage
        localStorage.setItem('timeslice-order', order)
        // Ensure that the control on other map matches this
        $(`.timeslice-order-selector`).val(order)
        // Callbacks
        callbacksMapTypeControl.forEach(cb => {
          cb()
        })
      })

      const scliceTypes = [
        {
          id: 'recent',
          text: 'Recent on top'
        },
        {
          id: 'oldest',
          text: 'Oldest on top'
        }
      ]
      scliceTypes.forEach(function(t){
        const $opt = $('<option>')
        $opt.attr('value', t.id)
        $opt.html(t.text).appendTo($sel)
        if (localStorage.getItem('timeslice-order') === t.id) {
          $opt.attr('selected', 'selected')
        }
      })

      if (localStorage.getItem('map-type') !== 'timeslice') {
        $div0.hide()
      }
    }

    function createResolutionControl(selectorControl, map, callback) {

      const $sel = $('<select>').appendTo($(selectorControl))
      $sel.attr('id', `${map}-resolution-selector`)
      $sel.addClass('atlas-control')
      $sel.addClass('resolution-selector')
      $sel.addClass('form-select')
      $sel.on('change', function() {
        // Get selected value
        const res = $(`#${map}-resolution-selector`).find(":selected").val()
        // Store value in local storage
        localStorage.setItem('resolution', res)
        // Ensure that the control on other map matches this
        $(`.resolution-selector`).val(res)
        // Callbacks
        callbacksResolutionControl.forEach(cb => {
          cb()
        })
      })

      const resolutions = c.get('common.resolution').replace(/\s+/g, ' ').split(' ').filter(r => ['hectad', 'quadrant', 'tetrad', 'monad'].includes(r))
      resolutions.forEach(function(r){
        const $opt = $('<option>')
        $opt.attr('value', r)
        $opt.html(r).appendTo($sel)
        if (localStorage.getItem('resolution') === r) {
          $opt.attr('selected', 'selected')
        }
      })

      callbacksResolutionControl.push(callback)
    }

    function createDotShapeControl(selectorControl, map, callback) {

      // Get current value
      const currentVal = localStorage.getItem('dot-shape')
      
      const $dotTypeDiv=$('<div>').appendTo($(selectorControl))
      $dotTypeDiv.addClass('atlas-control')
      components.makeRadio(`dot-type-${map}`, 'Circles', 'circle', currentVal === 'circle', 'dot-shape', $dotTypeDiv, callbacksDotShapeControl)
      components.makeRadio(`dot-type-${map}`, 'Squares', 'square', currentVal === 'square', 'dot-shape', $dotTypeDiv, callbacksDotShapeControl)

      callbacksDotShapeControl.push(callback)
    }

    function createDotOpacityControl(selectorControl, map, callback) {
  
      const $div = $('<div>').appendTo($(selectorControl))

      const $label = $('<label>').appendTo($div)
      $label.attr('for', `${map}-opacity-slider`)
      $label.text('Opacity:')
      $label.css('margin', '0 0.5em 0.5em 0.5em')
      $label.css('vertical-align', 'middle')

      const $slider = $('<input>').appendTo($div)
      $slider.attr('type', 'range')
      $slider.attr('min', 0)
      $slider.attr('max', 1)
      $slider.attr('step', 0.1)
      $slider.attr('value', localStorage.getItem('dot-opacity'))
      $slider.attr('id', `${map}-opacity-slider`)
      $slider.addClass('atlas-control')
      $slider.addClass('opacity-slider')
      $slider.on('input', function() {
        // Get selected value
        const opacity = $(`#${map}-opacity-slider`).val()
        // Store value in local storage
        localStorage.setItem('dot-opacity', opacity)
        // Ensure that the control on other map matches this
        $(`.opacity-slider`).val(opacity)
        // Callbacks
        callbacksDotOpacityControl.forEach(cb => {
          cb()
        })
      })
      callbacksDotOpacityControl.push(callback)
    }

    async function genStandardMap(file) {

      const data = await d3.csv(file)
      const dataMap = data.map(d => {
        return {gr: d.gr, colour: c.get('common.dot-colour') ? c.get('common.dot-colour') : 'black'}
      })

      let precision 
      switch(getDotSize()) {
        case 'hectad':
          precision = 10000
          break
        case 'quadrant':
          precision = 5000
          break
        case 'tetrad':
          precision = 2000
          break
        case 'monad':
          precision = 1000
      }

      let dotShape
      if (['circle', 'square'].includes(c.get('common.dot-shape'))) {
        dotShape = c.get('common.dot-shape')
      } else {
        dotShape = localStorage.getItem('dot-shape')
      }

      // let dotOpacity
      // if (Number(c.get('common.dot-shape')) >= 0 && Number(c.get('common.dot-shape')) <= 1) {
      //   dotOpacity = c.get('common.dot-opacity')
      // } else {
      //   dotOpacity = localStorage.getItem('dot-opacity')
      // }

      const dotOpacity = localStorage.getItem('dot-opacity')

      return new Promise((resolve) => {
        resolve({
          records: dataMap,
          precision: precision,
          shape: dotShape,
          opacity: dotOpacity,
          size: 1
        })
      })
    }

    async function genDensityMap(file) {

      const dotColour = c.get('common.dot-colour') ? c.get('common.dot-colour') : 'black'
      const data = await d3.csv(file)
      const maxn = data.reduce((a,r) => Number(r.recn) > a ? Number(r.recn) : a, 0)
      const minn = data.reduce((a,r) => Number(r.recn) < a ? Number(r.recn) : a, maxn)
      const dataMap = data.map(d => {
        return {
          gr: d.gr, 
          colour: dotColour,
          size: 0.3 + 0.7 * (Math.sqrt(Number(d.recn))-Math.sqrt(minn)) / (Math.sqrt(maxn)-Math.sqrt(minn))
        }
      })
      let precision 
      switch(getDotSize()) {
        case 'hectad':
          precision = 10000
          break
        case 'quadrant':
          precision = 5000
          break
        case 'tetrad':
          precision = 2000
          break
        case 'monad':
          precision = 1000
      }
      let dotShape
      if (['circle', 'square'].includes(c.get('common.dot-shape'))) {
        dotShape = c.get('common.dot-shape')
      } else {
        dotShape = localStorage.getItem('dot-shape')
      }

      // let dotOpacity
      // if (Number(c.get('common.dot-shape')) >= 0 && Number(c.get('common.dot-shape')) <= 1) {
      //   dotOpacity = c.get('common.dot-opacity')
      // } else {
      //   dotOpacity = localStorage.getItem('dot-opacity')
      // }

      const dotOpacity = localStorage.getItem('dot-opacity')

      return new Promise((resolve) => {

        const lines = [
          {
            size: 0.3,
            text: `${minn} record${minn === 1 ? '' : 's'}`
          },
          {
            size: 1,
            text: `${maxn} record${maxn === 1 ? '' : 's'}`
          },
        ]

        if (maxn === minn) {
          lines.shift()
        }
         
        resolve({
          records: dataMap,
          precision: precision,
          shape: dotShape,
          opacity: dotOpacity,
          size: 1,
          legend: {
            title: 'Record density',
            shape: dotShape,
            opacity: dotOpacity,
            colour: dotColour,
            precision: precision,
            lines: lines
          }
        })
      })
    }

    async function genTimeSliceMap(file) {

      const order = localStorage.getItem('timeslice-order')
      const colour1 = c.get('common.timeslice.colour1') ? c.get('common.timeslice.colour1') : '#1b9e77'
      const colour2 = c.get('common.timeslice.colour2') ? c.get('common.timeslice.colour2') : '#7570b3' 
      const colour3 = c.get('common.timeslice.colour3') ? c.get('common.timeslice.colour3') : '#d95f02' 
      const threshold1 = Number(localStorage.getItem('timeslice-thresh1'))
      const threshold2 = Number(localStorage.getItem('timeslice-thresh2'))

      const data = await d3.csv(file)

      const dataMap = data
      .filter(d => {
        // Filter out any records with null year values
        if (order === 'recent') {
          return(d.yearEnd !== 'null')
        } else {
          return(d.yearStart !== 'null')
        }
      })
      .map(d => {
        let colour
        if (order === 'recent') {
          // Recent on top
          // Will colour according to year of latest record in square
          if (Number(d.yearEnd) > threshold2) {
            colour = colour3
          } else if (Number(d.yearEnd) > threshold1) {
            colour = colour2
          } else {
            colour = colour1
          }
        } else {
          // Oldest on top
          // Will colour accoring to year of first record in square
          if (Number(d.yearStart) < threshold1) {
            colour = colour1
          } else if (Number(d.yearStart) < threshold2) {
            colour = colour2
          } else {
            colour = colour3
          }
        }

        return {gr: d.gr, colour: colour}
      })

      let precision 
      switch(getDotSize()) {
        case 'hectad':
          precision = 10000
          break
        case 'quadrant':
          precision = 5000
          break
        case 'tetrad':
          precision = 2000
          break
        case 'monad':
          precision = 1000
      }

      let dotShape
      if (['circle', 'square'].includes(c.get('common.dot-shape'))) {
        dotShape = c.get('common.dot-shape')
      } else {
        dotShape = localStorage.getItem('dot-shape')
      }

      // let dotOpacity
      // if (Number(c.get('common.dot-shape')) >= 0 && Number(c.get('common.dot-shape')) <= 1) {
      //   dotOpacity = c.get('common.dot-opacity')
      // } else {
      //   dotOpacity = localStorage.getItem('dot-opacity')
      // }

      const dotOpacity = localStorage.getItem('dot-opacity')

      return new Promise((resolve) => {
        resolve({
          records: dataMap,
          precision: precision,
          shape: dotShape,
          opacity: dotOpacity,
          size: 1,
          legend: {
            title: order === 'recent' ? 'Year of latest record in square' : 'Year of first record in square',
            shape: dotShape,
            opacity: dotOpacity,
            precision: precision,
            lines: [
              {
                colour: colour1,
                text: `${threshold1} and before`
              },
              {
                colour: colour2,
                text: `${threshold1+1}-${threshold2}`
              },
              {
                colour: colour3,
                text: `${threshold2+1} and after`
              },
            ]
          }
        })
      })
    }

    function getDotSize() {
      let dotRes
      const cRes = c.get('common.resolution')
      let resolutions = []
      if (cRes) {
        resolutions = cRes.replace(/\s+/g, ' ').split(' ').filter(r => ['hectad', 'quadrant', 'tetrad', 'monad'].includes(r))
      }
      if (!cRes || resolutions.length > 1) {
        dotRes = localStorage.getItem('resolution')
      } else {
        dotRes = c.get('common.resolution')
      }

      return dotRes
    }

    return {
      setConfig: setConfig,
      createMapTypeControl: createMapTypeControl,
      createDotShapeControl: createDotShapeControl,
      createDotOpacityControl: createDotOpacityControl,
      createResolutionControl: createResolutionControl,
      genStandardMap: genStandardMap,
      genDensityMap: genDensityMap,
      genTimeSliceMap: genTimeSliceMap,
      getDotSize: getDotSize
    }
  }
)
