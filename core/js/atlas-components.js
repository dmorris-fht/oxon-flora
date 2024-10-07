define(
  ['jquery.min', 'atlas-general'],
  // [foo bar] /*optional dependencies*/, 
  // module definition function
  // dependencies (foo and bar) are mapped to function parameters
  //function ( foo, bar ) {
  function (jq, general) {
    // return a value that defines the module export
    // (i.e the functionality we want to expose for consumption)
    // Create module

    const components = {

      create: async function loadContent() {
  
        const configSite = await general.getConfig("../user/config/site.txt")
        const configImages = await general.getConfig("../user/config/images.txt") 
        const configCore = await general.getConfig("config/config.txt") 


        generateHeader(configSite)
        generateFooter(configCore)
 
        function generateFooter(configCore) {
          // Footer
          const $footer = $("#brc-footer")
          $footer.attr("class", "pt-5 my-5 text-body-secondary border-top")
          $footer.html(`
            <span class="me-2">
              Created using <a href="https://github.com/BiologicalRecordsCentre/configurable-atlas">
              BRC configurable atlas project</a> (version <b>${configCore.version}</b>).
            </span>
            <a href="admin.html">
              <img class="pt-2 pb-2" style="width:30px" src="images/gear-icon.png"></img>
            </a>
            <div>
              <img class="pt-2 pb-2" src="images/BRC_UKCEH_logo_small.png"></img>
            </div>
          `)
        }

        function generateHeader(configSite) {

          // Header tag
          const $header = $("#brc-header")
          $header.attr("class", "xd-flex mb-5 border-bottom")

          // Logo and name
          const $divLogoNameNav = $("<div>")
          $divLogoNameNav.attr("class", "d-flex flex-row p-2 align-items-center fs-1").appendTo($header)

          // Header background colour
          const headerColour = configSite['header-background-colour']
          if (headerColour) {
            $divLogoNameNav.css("background-color", headerColour)
          }

          // Header text colour
          const headerTextColour = configSite['header-text-colour']
          if (headerTextColour) {
            $divLogoNameNav.css("color", headerTextColour)
          }

          // Logo
          const headerLogo = configSite['header-logo']
          const logoHeight = configSite['header-logo-height']
          if (headerLogo) {
            const $img = $(`<img src="../user/config/${headerLogo}">`).appendTo($divLogoNameNav)
            if (logoHeight) {
              $img.css("height", `${logoHeight}px`)
              $img.css("margin-right", "10px")
            }
          }
          // Header text
          const headerName = configSite.name ? configSite.name : "Site name configuration not specified"
          $('<div>').text(headerName).appendTo($divLogoNameNav)

          // Navigation
          if (configSite.nav) {
            
            const $navbar = $('<nav class="fs-6 navbar navbar-expand-lg navbar-light bg-light">').appendTo($header)
            const $navbarContainer = $('<div class="container-fluid">').appendTo($navbar)

            const $navbarToggler = $('<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">').appendTo($navbarContainer)
            $('<span class="navbar-toggler-icon">').appendTo($navbarToggler)

            const $navbarCollapse = $('<div class="collapse navbar-collapse" id="navbarSupportedContent">').appendTo($navbarContainer)

            const $navbarNav = $('<ul class="navbar-nav mb-2 mb-lg-0">').appendTo($navbarCollapse)

            // Current page
            const urlParams = new URLSearchParams(window.location.search)
            const userContent = urlParams.get('page')

            const $navItem = $('<li class="nav-item">').appendTo($navbarNav)
            const $navLink = $(`<a class="nav-link" href="main.html">Home</a>`).appendTo($navItem)
            if (!userContent) {
              $navLink.addClass('active')
              $navLink.attr('aria-current', 'page')
            }

            configSite.nav.forEach(n => {
              const $navItem = $('<li class="nav-item">').appendTo($navbarNav)
              const $navLink = $(`<a class="nav-link" href="userpage.html?page=${n.page}">${n.caption}</a>`).appendTo($navItem)
              if (userContent && userContent === n.page) {
                $navLink.addClass('active')
                $navLink.attr('aria-current', 'page')
              }
            })
          }

          // Carousel
          // Undocumented feature for adding a carousel image to top of page
          if (location.pathname.substring(location.pathname.length - 9) === "main.html" && configSite['header-carousel']) {

            const $carousel = $(`<div id="brc-header-carousel-div" class="carousel slide" data-bs-ride="carousel">`).appendTo($($header))
            
            // Indicators
            const indicators = configSite['header-carousel-indicators']
            if (indicators && indicators === "yes") {
              const $carouselIndicators = $(`<div class="carousel-indicators">`).appendTo($carousel)
              configSite['header-carousel'].forEach((img,i) => {
                const $button = $(`<button type="button" data-bs-target="#brc-header-carousel-div" data-bs-slide-to="${i}">`).appendTo($carouselIndicators)
                if (i === 0) {
                  $button.addClass("active")
                  $button.attr("aria-current", "true")
                }
              })
            }

            // Images
            const $carouselInner = $(`<div class="carousel-inner">`).appendTo($carousel)
            configSite['header-carousel'].forEach((img,i) => {
              const $divImg = $(`<div class="align-items-center carousel-item">`).appendTo($carouselInner)
              const height = configSite['header-carousel-height']
              $divImg.css("height", height ? `${height}px` : "150px")
              if (i === 0) {
                $divImg.addClass("active")
              }
              const $img = $(`<img src="../user/config/${img}" class="position-absolute top-50 start-50 translate-middle d-block w-100" alt="...">`).appendTo($divImg)
            })

            const carousel = new bootstrap.Carousel(document.getElementById("brc-header-carousel-div"))
            //carousel.cycle
          }

          // Error message (to display YAML config file errors back to site admins)
          const $err = $('<div>').appendTo($header)
          if (configSite.errName) {
            $err.html(`
              <p>There was a problem reading the 'site.txt' config file...</p>
              <pre>${configSite.errName}: ${configSite.errMessage}</pre>`
            )
          } else if (configImages.errName) {
            $err.html(`
              <p>There was a problem reading the 'images.txt' config file...</p>
              <pre>${configImages.errName}: ${configImages.errMessage}</pre>`
            )
          }
        }

        function siteRoot() {
          // Not used
          const pathElements = window.location.pathname.split('/')

          if (pathElements[1] === 'core') {
            return ''
          } else {
            return `/${pathElements[1]}`
          }
        }
      },

      makeRadio: function makeRadio(id, label, val, checked, ls, $container, callbacks) {
    
        const $div = $('<div>').appendTo($container)
        $div.css('display', 'inline-block')
        $div.css('margin-left', '0.5em')
        $div.attr('class', 'radio')
        const $label = $('<label>').appendTo($div)
        const $radio = $('<input>').appendTo($label)
        const $span = $('<span>').appendTo($label)
        $span.text(label)
        $span.css('padding', '0 10px 0 5px')
        $radio.attr('type', 'radio')
        $radio.attr('name', `atlas-map-control-${id}`)
        $radio.attr('class', `atlas-map-control-${val}`)
        $radio.attr('value', val)
        $radio.css('margin-left', 0)
        if (checked) $radio.prop('checked', true)
    
        $radio.change(function (e) {
          // Store value in local storage
          localStorage.setItem(ls, val)
          // Ensure that the control on other map matches this
          $(`.atlas-map-control-${val}`).prop("checked", true)
          // Callbacks
          callbacks.forEach(cb => {
            cb(val)
          })
        })
      }
    }
    // Return module
    return components
  }
)
