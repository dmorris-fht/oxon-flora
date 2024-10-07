define(["jquery.min", "d3", "brcatlas.umd.min", "atlas-common-map"],

  function (jq, d3, brcatlas, common) {

    let mapZoom, c

    $(window).resize(function() {
      resizeZoomMap()
    })

    function createZoomMap(selectorTab, selectorControl, config) {

      // Set config
      c = config

      // Initialise map
      mapZoom = brcatlas.leafletMap({
        selector: selectorTab,
        height: 500,
        mapTypesSel: {standard: common.genStandardMap, density: common.genDensityMap, timeslice: common.genTimeSliceMap},
        mapTypesKey: 'standard'
      })

      // Initialise map centre and zoom if set
      if (localStorage.getItem('zoomLevel')) {
        mapZoom.lmap.setView({lat: localStorage.getItem('zoomLat'), lng: localStorage.getItem('zoomLng')}, localStorage.getItem('zoomLevel'))
      }

      // Store location and zoom level when map changes
      function viewChanged(e) {
        const latlng = mapZoom.lmap.getCenter()
        localStorage.setItem('zoomLat', latlng.lat)
        localStorage.setItem('zoomLng', latlng.lng)
        localStorage.setItem('zoomLevel', mapZoom.lmap.getZoom())
      }
      mapZoom.lmap.on('moveend', viewChanged )

      //setView(center, zoom)

      // Boundaries
      if (c.get('zoom.boundaries')) {
        if (c.zoom.boundaries === 'countries') {
          mapZoom.setShowCountries(true) 
        } else if (c.zoom.boundaries === 'vcs') {
          mapZoom.setShowVcs(true) 
        }
      }

      resizeZoomMap() // Required here in case slipply map is first tab

      // Map controls
      createZoomControls(selectorControl)
    }

    
    function createZoomControls(selectorControl) {
      $(selectorControl).html('')

      // Map type selection 
      common.createMapTypeControl(selectorControl, 'zoom', refreshZoomMap)

      // Resolution selection
      if (c.get('common.resolution')) {
        resolutions = c.get('common.resolution').replace(/\s+/g, ' ').split(' ').filter(r => ['hectad', 'quadrant', 'tetrad', 'monad'].includes(r))
        if (resolutions.length > 1) {
          common.createResolutionControl(selectorControl, 'zoom', refreshZoomMap)
        }
      }

      // Dot shape selection
      if (c.get('common.dot-shape') === 'control') {
        common.createDotShapeControl(selectorControl, 'zoom', refreshZoomMap)
      }
      // Dot opacity
      if (c.get('common.dot-opacity') === 'control') {
        common.createDotOpacityControl(selectorControl, 'zoom', refreshZoomMap)
      }
    }

    function refreshZoomMap() {

      legOpts = {
        density: {
          width: 140,
          height: 90
        },
        timeslice: {
          width: 225,
          height: 110
        }
      }
      const dotSize = common.getDotSize()
      const taxonId = localStorage.getItem('taxonId')
      const mapType = localStorage.getItem('map-type')
      mapZoom.setMapType(mapType)
      mapZoom.setIdentfier(`../user/data/${dotSize}/${taxonId}.csv`)

      // Set the legend opts
      if (c.get('common.legends')) {
        const opts = c.common.legends.find(l => l.id === mapType)
        if (opts && legOpts[mapType]) {
          mapZoom.setLegendOpts({
            display: true,
            scale: 0.9,
            x: 10,
            y: 10,
            width: legOpts[mapType].width,
            height: legOpts[mapType].height
          })
        }
      }
      mapZoom.redrawMap()
    }

    function resizeZoomMap() {
      if (mapZoom) {
        const height = c.get('zoom.height') ? c.zoom.height : 500
        mapZoom.setSize($("#brc-tab-zoom").width(), height)
        mapZoom.invalidateSize()
      }
    }

    return {
      createZoomMap: createZoomMap,
      refreshZoomMap: refreshZoomMap,
      resizeZoomMap: resizeZoomMap
    }
  }
)
