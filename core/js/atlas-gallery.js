
define(["jquery.min", "d3", "lightgallery.umd", "lg-zoom.umd", "lg-thumbnail.umd"],

  function (jq, d3, lightGallery, lgZoom, lgThumbnail) {

    let inlineGallery

    function createGallery(selectorTab, selectorControl, images) {

      $(selectorTab).css('height', 0)
      $(selectorTab).css('width', '100%')
      $(selectorTab).css('padding-bottom', '65%')

      const lgContainer = $(selectorTab)[0]

      // After https://www.lightgalleryjs.com/demos/inline/ & https://codepen.io/sachinchoolur/pen/zYZqaGm
      inlineGallery = lightGallery(lgContainer, { // eslint-disable-line no-undef
        container: lgContainer,
        dynamic: true,
        // Turn off hash plugin in case if you are using it
        // as we don't want to change the url on slide change
        hash: false,
        // Do not allow users to close the gallery
        closable: false,
        // Hide download button
        download: false,
        // Add maximize icon to enlarge the gallery
        showMaximizeIcon: true,
        // Append caption inside the slide item
        // to apply some animation for the captions (Optional)
        appendSubHtmlTo: '.lg-item',
        // Delay slide transition to complete captions animations
        // before navigating to different slides (Optional)
        // You can find caption animation demo on the captions demo page
        slideDelay: 400,
        plugins: [lgZoom, lgThumbnail], // eslint-disable-line no-undef
        dynamicEl: [{src: `./images/no-image.jpg`}],
        thumbWidth: 90,
        thumbHeight: "60px",
        thumbMargin: 4
      })
      setTimeout(() => {inlineGallery.openGallery()}, 200)
    }

    function refreshGallery(taxonId, images){

      let dynamicEl
      if (images[taxonId] && Array.isArray(images[taxonId])) {

        dynamicEl = images[taxonId].map(i => {
        
          let captionHtml
          if (i.caption) {
            captionHtml = `
              <div class="lightGallery-captions">
                <div style="background-color: black; opacity: 0.7; margin: 0.3em; font-size: 1em">${i.caption}<div>
              </div>`
          } else {
            captionHtml = ''
          }
          return {
            alt: i.caption,
            src: `../user/data/images/${i.file}`,
            thumb: `../user/data/images/${i.thumb ? i.thumb : i.file}`,
            subHtml: captionHtml
          }
        })
      } else {
        dynamicEl = [{src: `./images/no-image.jpg`, thumb: `./images/no-image.jpg`}]
      }
      inlineGallery.updateSlides(dynamicEl,0)

      // Workaround for appendSubHtmlTo problem 25/07/2024
      // For some reason, setting appendSubHtmlTo: '.lg-item'
      // on gallery control places the caption behind the thumb
      // strip. Doesn't do this in other implementations I've made.
      // Couldn't get to the bottom of it, so this is a workaround
      // to move it. Can't just target '.lightGallery-captions' in
      // CSS because then it's always shifted even for single images
      // when no thumb strip displayed. Can't use JS/d3 here to update
      // the caption directly because it seems to be recreated by
      // gallery, e.g. when image changes, and so loses styling.
      // Instead target #brc-tab-gallery.shift-caption .lightGallery-captions
      // in CSS and add/remove the 'shoft-caption' class on #brc-tab-gallery
      // which is always available.
      // Note setting appendSubHtmlTo to '.lg-sub-html' positions the 
      // caption correctly, but does not change the caption when 
      // the gallery images are reloaded.
      if (dynamicEl.length > 1) {
        d3.select('#brc-tab-gallery').classed('shift-caption', true)
      } else {
        d3.select('#brc-tab-gallery').classed('shift-caption', false)
      }
    }

    return {
      createGallery: createGallery,
      refreshGallery: refreshGallery
    }
  }
)
