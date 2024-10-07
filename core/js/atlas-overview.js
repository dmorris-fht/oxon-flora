define(["jquery.min", "d3", "brcatlas.umd.min", "atlas-common-map", "turf.v7.min", "atlas-components"],

  function (jq, d3, brcatlas, common, turf, components) {

    let mapStatic, c
 
    function createOverviewMap(selectorTab, selectorControl, config) {

      // Set module-level config
      c = config
      common.setConfig(c)

      // Initialise map
      const height =  c.get('overview.height') ? c.get('overview.height') : 500
      // Get value for map width given original height set in config
      // Need to do this with an instance of static map with expand set to false
      // Later used to set the max width of actual map.
      const $divTemp = $('<div id="brc-atlas-local-temp">').appendTo($('body'))
      const mapTemp = brcatlas.svgMap({
        selector: '#brc-atlas-local-temp',
        height: height,
        expand: false,
        transOptsKey: 'BI4',
        mapTypesControl: false,
        transOptsControl: false,
      })
      const maxWidth = mapTemp.getMapWidth()
      $divTemp.remove()

      // Now the real map
      const mapStaticOpts = {
        selector: selectorTab,
        seaFill: 'white',
        expand: true,
        height: height,
        transOptsKey: 'BI4',
        mapTypesControl: false,
        transOptsControl: false,
        mapTypesSel: {standard: common.genStandardMap, density: common.genDensityMap, timeslice: common.genTimeSliceMap},
        mapTypesKey: 'standard'
      }

      // Configure insets
      if (c.get('overview.insets')) {
        if (c.overview.insets === 'none') {
          mapStaticOpts.transOptsKey = 'BI1'
        } else if (c.overview.insets === 'ci') {
          mapStaticOpts.transOptsKey = 'BI2'
        } else if (c.overview.insets === 'ni') {
          mapStaticOpts.transOptsKey = 'BI3'
        } else {
          mapStaticOpts.transOptsKey = 'BI4'
        }
      } else {
        mapStaticOpts.transOptsKey = 'BI4'
      }

      // Configure styles
      if (c.get('overview.land-colour')) {
        mapStaticOpts.boundaryFill = c.get('overview.land-colour')
      }
      if (c.get('overview.sea-colour')) {
        mapStaticOpts.seaFill = c.get('overview.sea-colour')
      }
      if (c.get('overview.boundary-colour')) {
        mapStaticOpts.boundaryColour = c.get('overview.boundary-colour')
      }
      if (c.get('overview.grid-colour')) {
        mapStaticOpts.gridLineColour = c.get('overview.grid-colour')
      }
      if (c.get('overview.inset-colour')) {
        mapStaticOpts.insetColour = c.get('overview.inset-colour')
      }
      if (c.get('overview.boundary-width')) {
        mapStaticOpts.boundaryLineWidth = c.get('overview.boundary-width')
      }
      if (c.get('overview.grid-width')) {
        mapStaticOpts.gridLineWidth = c.get('overview.grid-width')
      }
      if (c.get('overview.grid-display')) {
        mapStaticOpts.gridLineStyle = c.get('overview.grid-display')
      }
      
      // If a boundary is specified, set up the transOptsSel
      if (c.get('overview.boundary')) {

        const vc = c.overview.boundary.match(/(gb|ir)(\d+)/)
        const country = c.overview.boundary.match(/(ireland|northern-ireland|scotland|england|wales)/)
        let gjsonFile, grid
        if (vc) {
          // Set correct projection for VC (British or Irish)
          mapStaticOpts.proj = vc[1]
          // Open the geojson file in order to get the minimum bounding box
          gjsonFile = `./data/vc-${vc[1]}-simp-100/vc-${vc[1]}-${vc[1] === 'ir' ? 'H' : ''}${vc[2]}.geojson`
          // Specify the grid file
          grid = `./data/vc-${vc[1]}-hectad-grids/vc-${vc[1]}-${vc[1] === 'ir' ? 'H' : ''}${vc[2]}-hectads.geojson`
        } else if (country) {
          // Set correct projection 
          mapStaticOpts.proj = c.overview.boundary.includes('ireland') ? 'ir' : 'gb'
          // Open the geojson file in order to get the minimum bounding box
          gjsonFile = `./data/countries-simp/country-${c.overview.boundary}-simp.geojson`
          // Specify the grid file
          grid = `./data/countries-grids/country-${c.overview.boundary}-100km.geojson`
        }
          
        if (vc || country) {
          let gjson
          $.ajax({
            url: gjsonFile,
            cache: false,
            async:  false,
            success: function (data) {
              gjson = data
            }
          })
          const props = gjson.features[0].properties
          const xminBuffer = c.get('overview.buffer-west') ? Number(c.overview['buffer-west']) : 0
          const xmaxBuffer = c.get('overview.buffer-east') ? Number(c.overview['buffer-east']) : 0
          const yminBuffer = c.get('overview.buffer-south') ? Number(c.overview['buffer-south']) : 0
          const ymaxBuffer = c.get('overview.buffer-north') ? Number(c.overview['buffer-north']) : 0

          // Set the transOptsSel
          mapStaticOpts.transOptsSel = {
            boundary: {
              id: 'boundary',
              bounds: {
                xmin: props.xmin - xminBuffer,
                ymin: props.ymin - yminBuffer,
                xmax: props.xmax + xmaxBuffer,
                ymax: props.ymax + ymaxBuffer
              }
            }
          }
          mapStaticOpts.transOptsKey = 'boundary'
          mapStaticOpts.boundaryGjson = gjsonFile

          // Set grid
          if (c.get('overview.grid-display') === 'solid' || c.get('overview.grid-display') === 'dashed') {
            mapStaticOpts.gridGjson = grid
          } else {
            mapStaticOpts.gridGjson = ''
          }
        }
      } else {
        // If no boundary is specified - then use custom boundary
        // if specified.
        if (c.get('overview.custom-boundary')) {
          mapStaticOpts.boundaryGjson = c.get('overview.custom-boundary')
          // Assume British projection unless other valid value specified
          if (c.get('overview.proj')) {
            if (c.common.proj === 'ci' || c.common.proj === 'ir') {
              mapStaticOpts.proj = c.common.proj
            } else {
              mapStaticOpts.proj = 'br'
            }
          }
          // Set extents from mbb
          let gjson
          $.ajax({
            url: c.get('overview.custom-boundary'),
            cache: false,
            async:  false,
            success: function (data) {
              gjson = data
            }
          })
          const bbox = turf.bbox(gjson)
          const xminBuffer = c.get('overview.buffer-west') ? Number(c.overview['buffer-west']) : 0
          const xmaxBuffer = c.get('overview.buffer-east') ? Number(c.overview['buffer-east']) : 0
          const yminBuffer = c.get('overview.buffer-south') ? Number(c.overview['buffer-south']) : 0
          const ymaxBuffer = c.get('overview.buffer-north') ? Number(c.overview['buffer-north']) : 0
          // Set the transOptsSel
          mapStaticOpts.transOptsSel = {
            boundary: {
              id: 'boundary',
              bounds: {
                xmin: bbox[0] - xminBuffer,
                ymin: bbox[1] - yminBuffer,
                xmax: bbox[2] + xmaxBuffer,
                ymax: bbox[3] + ymaxBuffer
              }
            }
          }
          mapStaticOpts.transOptsKey = 'boundary'

        }
      }

      // Display custom grid if specified
      if (c.get('overview.custom-grid')) {
        mapStaticOpts.gridGjson = c.get('overview.custom-grid')
      }

      // Create static map
      mapStatic = brcatlas.svgMap(mapStaticOpts)

      // Background image if specified
      // Only available as method (not properties)
      if (c.get('overview.custom-background')) {
        const extensions = {
          png: 'pgw',
          tif: 'tfw',
          jpg: 'jgw',
          bmp: 'bpw'
        }
        const file = c.get('overview.custom-background')
        const ext = file.substring(file.length-3)
        const world = `${file.substring(0, file.length-3)}${extensions[ext]}`
        mapStatic.basemapImage('background', true, file, world)
      }

      // Set container width
      $(selectorTab).css('max-width', `${maxWidth}px`)

      // Map controls
      createOverviewControls(selectorControl)
    }

    function createOverviewControls(selectorControl) {
      $(selectorControl).html('')

      // Map type selection 
      common.createMapTypeControl(selectorControl, 'overview', refreshOverviewMap)

      // Resolution selection
      if (c.get('common.resolution')) {
        resolutions = c.get('common.resolution').replace(/\s+/g, ' ').split(' ').filter(r => ['hectad', 'quadrant', 'tetrad', 'monad'].includes(r))
        if (resolutions.length > 1) {
          common.createResolutionControl(selectorControl, 'overview', refreshOverviewMap)
        }
      }
      // Dot shape selection
      if (c.get('common.dot-shape') === 'control') {
        common.createDotShapeControl(selectorControl, 'overview', refreshOverviewMap)
      }
      // Dot opacity
      if (c.get('common.dot-opacity') === 'control') {
        common.createDotOpacityControl(selectorControl, 'overview', refreshOverviewMap)
      }

      // Download button
      if (c.get('overview.download-control') === true) {
        const $downloadDiv=$('<div>').appendTo($(selectorControl))
        $downloadDiv.css('margin-top', '1em')
        const $downloadButton = $('<button>').appendTo($downloadDiv)
        $downloadButton.text('Download')
        $downloadButton.on('click', downloadMapImage)

        components.makeRadio(`download-type`, 'SVG', 'svg', localStorage.getItem('download-type') === 'svg', 'download-type', $downloadDiv, [])
        components.makeRadio(`download-type`, 'PNG', 'png', localStorage.getItem('download-type') === 'png', 'download-type', $downloadDiv, [])
      }
    }

    function downloadMapImage() {
      let info = null
      if (c.get('overview.download-text') || c.get('overview.download-info') === true) {
        info = {margin: 10,text: ''}
        if (c.get('overview.download-text')) {
          info.text = c.get('overview.download-text')
        }
        if (c.get('overview.download-info') === true) {
          const today = new Date()
          const yyyy = today.getFullYear()
          let mm = today.getMonth() + 1
          let dd = today.getDate()
          if (dd < 10) dd = '0' + dd
          if (mm < 10) mm = '0' + mm
          if (info.text) info.text = `${info.text} `
          info.text = `${info.text}From ${location.href} on ${dd}/${mm}/${yyyy}.`
        }
      }
      const asSvg = $("input[name='atlas-map-control-download-type']:checked").val() ==='svg'
      mapStatic.saveMap(asSvg, info, 'map')
    }

    function refreshOverviewMap() {
      const dotSize = common.getDotSize()
      const taxonId = localStorage.getItem('taxonId')
      const mapType = localStorage.getItem('map-type')
      mapStatic.setMapType(mapType)
      mapStatic.setIdentfier(`../user/data/${dotSize}/${taxonId}.csv`)
      // Set the legend opts
      if (c.get('common.legends')) {
        const opts = c.common.legends.find(l => l.id === mapType)
        if (opts) {
          mapStatic.setLegendOpts({
            display: true,
            scale: opts.scale ? Number(opts.scale) : 1,
            x: opts.x ? Number(opts.x) : 1,
            y: opts.y ? Number(opts.y) : 1
          })
        }
      }
      mapStatic.redrawMap()
    }

    return {
      createOverviewMap: createOverviewMap,
      refreshOverviewMap: refreshOverviewMap
    }
  }
)
