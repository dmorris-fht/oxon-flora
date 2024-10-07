# General site configuration
The file `site.txt` is the main site configuration page which you must be create and place in the folder `user/config`. The format in which the configuration options are laid out (described below) is known as YAML (pronounced 'yamel'). YAML files normally have a '.yml' file extension, but this configuration file has the file extension '.txt' to make it easy to open and edit with any text editor.

To initially create, upload and edit your 'site.txt' file, you can follow the instructions laid out in the document [*Using GitHub to add/edit files*](./docs-add-edit-config.md). 

Add configuration options to this file as outlined below. Note that none of the options are mandatory. The software is designed such that it will operate without any of the configuration options being specified. So you can start very gently by adding one or two options and seeing how that affects your website before adding more.

## General format
The general format for configuration options is:
```
option_name: option_value
```
An example is:
```
name: Shropshire Earthworm Atlas
```

Some options are nested indicating a related group of options like this:
```
group_name:
  group_option_1_name: group_option_1_value
  group_option_2_name: group_option_2_value
```
And example is:
```
overview:
  height: 900
  vc: gb40
  hectad-grid: true
```
In the preceding example, the options *height*, *vc* and *hectad-grid all* relate to the *overview* map. In code - and in this documentation - these are referenced like this: *overview.height*, *overview.vc* and *overview.hectad-grid*.

Some options reference a collection, or array, of sets of option values like this:
```
collection_name:
  - set1_option1_name: set1_option1_value
    set1_option2_name: set1_option2_value
  - set2_option1_name: set2_option1_value
    set2_option2_name: set2_option2_value
```

For example:
```
nav:
  - caption: Info
    page: info.html
  - caption: About
    page: about.md
```
In code, this would translate to a collection of two nav items, each with a *caption* and *page* property.

**Important note**: In YAML format, the indentation is all important. The number of characters you use for an indentation is not that important as long as you are consistent in your usage. Items should line up as shown in the example above. If the software cannot read your *site.txt* configuration file because of a YAML formatting error, the error will be reported to you on the page and that should help you track down the problem.

## Site banner configuration
These options are used to tailor the overall look of the site banner.
- **name**: specifies the name of the atlas website which is displayed in the site banner. If the option is not specified, the banner text will say 'Site name configuration not specified'. Example:
  - `name: Shropshire Earthworm Atlas`
- **header-background-colour**: specifies the background colour of the website banner. Will accept any of the colour formats understood by HTML/CSS. If the option is not specified, the banner will be white. Examples:
  - `header-background-colour: red` (HTML colour name)
  - `header-background-colour: rgb(100,120,30)` (red, green blue format)
  - `header-background-colour: "#EF9766"` (hex colour format - double-quotes required)
- **header-text-colour**: specifies the colour of text on the website banner. Will accept any of the colour formats understood by HTML/CSS. If the option is not specified, the banner text will be black. Example:
  - `header-text-colour: white`
- **header-logo**: specifies the name of an image file to use as a site logo on the banner. The image must be uploaded to the *user/config* folder. If the option is not specified, no image is displayed. Example:
  - `header-logo: badge-circle.png`
- **header-logo-height**: A number indicating the height (in pixels) to be used to display the header-logo image. The width of the image will be automatically calculated, preserving the aspect ratio of the original image. If the option is not specified, the image is shown at its original size. Example:
  - `header-logo-height: 80`

## Navigation bar configuration
A navigation bar appears at the base of the site banner if you have configured additional HTML and/or markdown pages to be added to the site. The navigation bar provides users with the means to navigate to to pages. A typical use of this would be to add various information pages.

There is a separate help page with guidance on [setting up additional HTML or Markdown pages](./docs-additional-pages.md). Here we are only concerned with configuring the navigation bar to provide links to them.

- **nav**: the collection name under which navigation items are configured.
- **caption**: the text that will appear in the navigation bar for the link.
- **page**: the file path and name of the HTML/Markdown page to be displayed when the link is clicked. This path is relative to the *user/config* folder. Typically you would add information pages in a subfolder you create in the *user/config* folder, e.g. *user/config/pages*, as in the example below:
```
nav:
  - caption: Info
    page: pages/info.html
  - caption: About
    page: pages/about.md
```
The example above will display two navigation links in the navigation bar with the text *Info* and *About*. The first one is linking to an HTML page called *info.html* in a subfolder of the *user/config* folder called *pages*. The second one is linking to a Markdown page called *about.md*, also in a subfolder of the *user/config* folder called *pages*. 

## Main tabs configuration
The main body of the atlas web page is split into two regions: 1) a tool pane on the left of the page where the taxon selector and other user-interface elements are placed and 2) the main display area on the right where the various atlas visualisations are displayed. There are five visualisations which can be included in your atlas: the classic atlas map, a zoomable map, temporal charts, an image gallery and taxon information pages. The classic atlas map is always included, but the other four are optional. 

When more than one of these visualisations is made available, the user can switch between them using a tab control. You specify which of the visualisations (tabs) is available using these options:

- **tabs**: the collection name under which tab items are configured.
- **tab**: a label identifying the visualisation - must be one of *overview* (classic atlas map), *zoom* (zoomable map), *details* (taxon info pages), *charts* (temporal charts), *gallery* (image gallery).
- **caption**: the text that will appear on the tab control.

An example that would display all five tabs is shown below:
```
tabs:
  - tab: overview
    caption: Overview
  - tab: zoom
    caption: Explore
  - tab: details
    caption: Info
  - tab: charts
    caption: Temporal
  - tab: gallery
    caption: Gallery
```
If you do not specify the *tabs* option, the classic atlas map is shown without any tab control. If you don't specify the *caption* option for any of the tabs, then the text shown on the tab defaults to the identifying label, e.g. 'overview'. If you specify a tab with an identifier that is not one of the five recognised types then a tab will be created but nothing shown on it. The order in which you specify the tabs specifies the order they appear on the page. The first tab you specify is always selected by default.

To exclude a visualisation from your atlas, e.g. the temporal charts, simply do not specify it in the tabs collection.

## Configuring the main atlas map
These options are used to tailor the appearance and behaviour of the classic atlas map. These are specified as a group of options with the group name *overview*.
- **height**: specifies the maximum height of the atlas map in pixels. The nominal width of the map is calculated from the height you specify and the aspect ratio of your atlas area. If the nominal width exceeds the area available to display it (e.g. on small devices), then the width is reduced to fit it in and the height is also reduced to maintain the aspect ratio. Therefore the height you specify here should be regarded as a maximum height that will not be exceeded. Example:
  - `height: 800`
- **boundary**: specifies a pre-defined boundary to use as the atlas area. Valid values for country areas are 'ireland', 'northern-ireland', 'scotland', 'wales' and 'england'. You can also specify a British or Irish vice-county to use as the atlas area. Values are of the format 'gb*n*' or 'ir*n*' where *n* is the vice-county number, e.g. gb40 (Shropshire), gb1 (West Cornwall with Scilly) or ir21 (Dublin). Vice-county boundaries for Britain and Ireland are supplied with the core software. If unspecified, then the atlas area covers the whole of Britain and Ireland and the Channel Islands.
  - `display: gb40`
- **grid-display**: if set to 'dashed' or 'solid', this indicates that a grid is to be drawn over the map boundary (a dashed or solid line respectively). If the value is set to 'none', no grid is drawn. If a vice-county is used to specify the map extent and boundary, the grid will be a 10x10 km (hectad) grid. If a country-level boundary is used to specify the map extent and boundary, the grid will be a 100x100 km grid. Grids for all the pre-defined country and vice-county boundaries are supplied with the core software. If not specified a grid is not drawn unless the default boundary is used in which case it is drawn. Example:
  - `grid-display: dashed`
- **custom-boundary**: specifies the location of a geojson file to use as a project boundary. You must first upload your boundary file into a folder under the *user/config* folder. For example you could create a sub-folder called *boundary* here and upload your geojson file to that folder. You then reference the file using its full path starting with */user/config/* (see example below). The boundary file will only be used if you have *not* specified a value for the *boundary* config option. If the coordinate system of your geojson file is not British National grid - EPSG:27700 - you need to specify the *custom-proj* config option. Example:
  - `custom-boundary: /user/config/boundary/project-boundary.geojson`
- **custom-grid**: specifies the location of a geojson file to use as a project grid. You must first upload your grid file into a folder under the *user/config* folder. For example you could create a sub-folder called *boundary* here and upload your geojson file to that folder. You then reference the file using its full path starting with */user/config/* (see example below). The grid file will be used regardless of whether or not you have specified a value for the *boundary* config option. So you can use this to replace the default grid shown with pre-defined boundaries if you wish. If you also specify the *custom-boundary* config option, they coordinate systems of the two geojson files should be the same. If you do not specify the *custom-boundary* config option, then the coordinate system of your geosjon file needs to match that of the pre-defined boundary you are using. If the coordinate system of your geojson file is not British National grid - EPSG:27700 - you need to specify the *custom-proj* config option. Example:
  - `custom-grid: /user/config/boundary/project-grid.geojson`
- **custom-background**: specifies the location of a georeferenced image file to use as a background for the map. You must first upload your image file and its associated 'world' file (specifying the georeferencing) into a folder under the *user/config* folder. For example you could create a sub-folder called *boundary* here and upload your image files to that folder. The image file and world file must have the same name but different file extensions. The image file extensions you can use are: 'tif', 'jpg', 'png' or 'bmp' and the world file extensions corresponding to these are, respectively: 'tfw', jgw', 'pgw' and 'bpw'. Only use lower case for the file extensions. You then reference the image file using its full path starting with */user/config/*. If you do not specify the *custom-boundary* config option, then the coordinate system of your geosjon file needs to match that of the pre-defined boundary you are using. If the coordinate system of your world file is not British National grid - EPSG:27700 - you need to specify the *custom-proj* config option.(You can use a tool such as QGIS to design and create background images with their associated world files.) Example:
  - `custom-background: /user/config/boundary/background-image.png`
- **custom-proj**: specifies the coordinate reference system used by a custom boundary file. Must be one of 'gb', 'ir' or 'ci' which refer to these coordinate systems respectively: OSGB 1936 / British National Grid (EPSG:27700), TM75 / Irish Grid (EPSG:29903) and WGS 84 / UTM zone 30N (EPSG:32630). The last one is used for the Channel Islands.
- **buffer-west**: specifies a value in metres by which to extend the real-world extent of the map (as calculated from the map boundary) in the *westward* direction. This can be useful when specifying a vice-county or country map with a grid - it enables the map to be extended so that the whole grid is visible. Example:
  - `buffer-west: 10000`
- **buffer-east**: specifies a value in metres by which to extend the real-world extent of the map (as calculated from the map boundary) in the *eastward* direction. This can be useful when specifying a vice-county or country map with a grid - it enables the map to be extended so that the whole grid is visible. Example:
  - `buffer-east: 10000`
- **buffer-south**: specifies a value in metres by which to extend the real-world extent of the map (as calculated from the map boundary) in the *southward* direction. This can be useful when specifying a vice-county or country map with a grid - it enables the map to be extended so that the whole grid is visible. Example:
  - `buffer-south: 10000`
- **buffer-north**: specifies a value in metres by which to extend the real-world extent of the map (as calculated from the map boundary) in the *northward* direction. This can be useful when specifying a vice-county or country map with a grid - it enables the map to be extended so that the whole grid is visible. Example:
  - `buffer-north: 10000`
- **insets**: specifies whether or not to show the Channel Isles (CI) and the Northern Isles (NI) as insets. Valid values are 'both' to show both CI and NI as insets, 'ci' to show CI as an inset at NI it its natural position, 'ni' to show NI as an inset (CI is not shown) and 'none' to show both CI and NI in their natural positions. If unspecified, then 'both' is used. Example:
  - `insets: both`
- **land-colour**: specifies the colour of land areas. Will accept any of the colour formats understood by HTML/CSS. If the option is not specified, the land colour will be white. Examples:
  - `land-colour: red` (HTML colour name)
  - `land-colour: rgb(100,120,30)` (red, green blue format)
  - `land-colour: "#ffe6b3"` (hex colour format - double-quotes required)
- **sea-colour**: specifies the colour of sea areas. Will accept any of the colour formats understood by HTML/CSS. If the option is not specified, the sea colour will be white. Examples:
  - `sea-colour: red` (HTML colour name)
  - `sea-colour: rgb(100,120,30)` (red, green blue format)
  - `sea-colour: "#ffe6b3"` (hex colour format - double-quotes required)
- **inset-colour**: specifies the colour of the line around insets. Will accept any of the colour formats understood by HTML/CSS. If the option is not specified, the colour of the inset box will be "#7C7CD3". Examples:
  - `inset-colour: red` (HTML colour name)
  - `inset-colour: rgb(100,120,30)` (red, green blue format)
  - `inset-colour: "#ffe6b3"` (hex colour format - double-quotes required)
- **boundary-colour**: specifies the colour of the boundary lines. Will accept any of the colour formats understood by HTML/CSS. If the option is not specified, the colour of the inset box will be "#7C7CD3". Examples:
  - `boundary-colour: red` (HTML colour name)
  - `boundary-colour: rgb(100,120,30)` (red, green blue format)
  - `boundary-colour: "#ffe6b3"` (hex colour format - double-quotes required)
- **grid-colour**: specifies the colour of the grid lines. Will accept any of the colour formats understood by HTML/CSS. If the option is not specified, the colour of the grid lines will be "#7C7CD3". Examples:
  - `grid-colour: red` (HTML colour name)
  - `grid-colour: rgb(100,120,30)` (red, green blue format)
  - `grid-colour: "#ffe6b3"` (hex colour format - double-quotes required)
- **boundary-width**: specifies the width of boundary lines in pixels. Will accept any number (including fractional parts). If the option is not specified, the line width will be 1. Example:
  - `boundary-width: 1.5`
- **grid-width**: specifies the width of grid lines in pixels. Will accept any number (including fractional parts). If the option is not specified, the line width will be 1. Example:
  - `grid-width: 0.5`  
- **download-control**: specifies whether or not a control should be displayed that allows users to download an SVG or PNG image of the currently displayed map. The control will only be shown if this config option is set to 'true'. Example:
  - `download-control: true`
- **download-text**: specifies some text that should be added to the foot of map images downloaded from the site. Example:
  - `download-text: Shropshire Earthworm Atlas. `
- **download-info**: indicates whether or not to display the URL of the website and the date to the foot of map images downloaded from the site. If the 'download-text' option is also specified, this text is appended to that with a space to separate them. The information is only appended if this config option is set to 'true'. Example:
  - `download-info: true`

Data for the atlas map are stored in subfolders of the *user/data* folder as described in the documentation on [admin utilities](./docs-admin-utilities.md).

## Configuring the zoomable map
These options are used to tailor the appearance and behaviour of the zoomable map. These are specified as a group of options with the group name *zoom*.
- **height**: specifies the height of the zoomable map in pixels. The width of the zoomable map is always set to fill the available display area. If not specified, a value of 500 is used. Example:
  - `height: 800`
- **boundaries**: specifies whether to draw country or vice county boundaries on the map. Valid options are 'countries' or 'vcs'. If no value (or any other value) is specified, no boundaries are drawn on the zoom map. Example:
  - `boundaries: vcs`

Data for the zoomable map are stored in subfolders of the *user/data* folder as described in the documentation on [admin utilities](./docs-admin-utilities.md).

## Configuration common to both map types
These options are used to configure features that are common to both the atlas and zoom maps. These are specified as a group of options with the group name *common*.

- **resolution**: indicates which resolutions to use for the dots. Values can be any combination of 'hectad', 'quadrant', 'tetrad' and 'monad'. If more than one is specified, separate them with spaces. If more that one is specified, then the user is able to select between them using a drop-down selection control. If only one is specified, the control does not appear. Example:
  - `resolution: tetrad monad`
- **dot-shape**: indicates whether or not to offer the user a control to switch between squares and circles and, if not, what the shape should be. Value should be one of 'control' (to display the control to user), 'square' or 'circle'.  If not specified, then 'circle' is used. Examples:
  - `dot-shape: square`
  - `dot-shape: control`
- **dot-colour**: indicates the colour of the dots on a maps of type 'standard' and 'density'. Will accept any of the colour formats understood by HTML/CSS. If the option is not specified, the dots will be black. Examples:
  - `dot-colour: red` (HTML colour name)
  - `dot-colour: rgb(100,120,30)` (red, green blue format)
  - `dot-colour: "#EF9766"` (hex colour format - double-quotes required)
- **dot-opacity**: indicates whether or not to offer the user a control to change dot opacity and, if not, what the dot opacity should be. Value should be either 'control' or a number between 0 and 1. If the option is not specified, the value is 1. Examples:
  - `dot-opacity: 0.8`
  - `dot-opacity: control`
- **map-types**: indicates which map types to use. Can be any combination of the following types separated by a space: 'standard', 'density', 'timeslice'. The 'standard' map presents a classic atlas map with all dots a single colour. The 'density' map presents a map with the size of the dots relating to the number of records contributing to that atlas dot. The 'timeslice' map presents options for colouring the dots on the map depending on the year in which the first or the last record contributing to that dot was made. If only one option is specified, that is the only map type available to your users and no selection control is presented. If more than one type is specified, then the user is able to switch between them using a selection control. If the option is unspecified, then all three options are available to the user. Example:
  - `map-types: standard, timeslice`
- **legends**: the group under which map legend options are configured.
- **id**: a label identifying the map type - must correspond to one of the types configured under the *map-types* config option. If one of the map types is not included in this collection, a legend will not be displayed for that map type. (Note that a legend is not available for the standard map type.)
- **x**: an offset, in pixels, for the legend on the overview map (from the top left corner of the map). This is configurable because depending on the shape and layout of your project area, the top left corner of the map may not be the best place for the legend. (Only applies to the overview map - the zoomable map always shows the legend in the top left.) 
- **y**: an offset, in pixels, for the legend on the overview map (from the top left corner of the map). This is configurable because depending on the shape and layout of your project area, the top left corner of the map may not be the best place for the legend. (Only applies to the overview map - the zoomable map always shows the legend in the top left.) 
- **scale**: a numeric value that can be used to resize the legend. The default is 1. A value of 0.5 would halve the size of the legend and a value of 2 would double it.

An example that would display legends for the density and timeslice maps is show below:
```
legends:
  - id: density
    x: 10
    y: 10
    scale: 1.2
  - id: timeslice
    x: 10
    y: 10
    scale: 1.2
```
- **timesclice**: the group under which options are configured for the timeslice chart ('Occurrence by year').
- **colour1**: specifies the colour for dots representing records under the first year threshold. Will accept any of the colour formats understood by HTML/CSS. If the option is not specified, the value will be '#1b9e77'.
- **colour2**: specifies the colour for dots representing records between the first and second year thresholds. Will accept any of the colour formats understood by HTML/CSS. If the option is not specified, the value will be '#7570b3'.
- **colour3**: specifies the colour for dots representing records over the second year thresholds. Will accept any of the colour formats understood by HTML/CSS. If the option is not specified, the value will be '#d95f02'.
- **threshold1**: specifies the year that will be the upper limit of the first band of records and the lower limit of the second bad of records in the timeslice chart. If not specified, the value will be 1999.
- **threshold2**: specifies the year that will be the upper limit of the second band of records and the lower limit of the third band of records the in the timeslice chart. If not specified, the value will be 2009.

Example timeslice configuration:
```
  timeslice:
    colour1: red
    colour2: rgb(100,120,30)
    colour3: "#EF9766"
    threshold1: 2005
    threshold2: 2010
```
## Configuring the temporal charts
These options are used to tailor the appearance and behaviour of the temporal charts. These are specified as a group of options with the group name *charts*.
- **aspect-ratio**: a numeric value between 0 and 1 that indicates the height of each chart as a fraction of its width. The width of the charts is always set to fill the available display area. If not specified, a value of 0.5 is used. Example:
  - `aspect-ratio: 0.4`
- **yearly-min**: a year indicating the earliest year to show on the x axis of the *yearly* chart showing record accumulation over time. If not specified, the earliest year present in the data is used. Example:
  - `yearly-min: 1980`
- **yearly-max**: a year indicating the latest year to show on the x axis of the *yearly* chart showing record accumulation over time. If not specified, the latest year present in the data is used. Example:
  - `yearly-max: 2020`
- **include**: indicates which of the charts to show. Values can be *weekly*, *yearly* or *weekly yearly*. If not specified, a value of *weekly yearly* is used and both charts are displayed. Example:
  - `include: weekly yearly`

Data for the temporal are stored in subfolders of the *user/data* folder as described in the documentation on [admin utilities](./docs-admin-utilities.md).

## Configuring the image gallery
These options are used to tailor the appearance and behaviour of the image gallery. These are specified as a group of options with the group name *gallery*. (No options as yet.)

The available images and their captions are configured separately in a file called *images.txt* which also sits in the *user/config* folder. There is a separate help page with guidance on [setting up an image gallery](./docs-image-gallery.md). The images themselves are placed in the *user/data/images* folder (also described in the [setting up an image gallery](./docs-image-gallery.md) document).

## Configuring the taxon details
These options are used to tailor the appearance and behaviour of the taxon details pages. These are specified as a group of options with the group name *details*. (No options as yet.)

Taxon details are Markdown pages placed in the  *user/data/captions* folder. Each file is named after the identifier used for the taxon in the taxon list file. The pages can contain any information and be laid out in whatever way you wish. There is an admin utility to generate stub details pages for each of your taxa if you wish to use it (see [documentation on admin utilities](./docs-admin-utilities.md)).

## Example site.txt config file
```
nname: Demo atlas - Middlesex Earthworms
header-background-colour: "#EF9766"
header-text-colour: white
header-logo: badge-circle.png
header-logo-height: 80
nav:
  - caption: Readme
    page: pages/about.md
tabs:
  - tab: overview
    caption: Overview
  - tab: zoom
    caption: Explore
  - tab: details
    caption: Info
  - tab: charts
    caption: Temporal
  - tab: gallery
    caption: Gallery
overview:
  height: 900
  boundary: gb21
  grid-display: dashed
  buffer-west: 10000
  buffer-east: 10000
  buffer-south: 10000
  buffer-north: 10000
  land-colour: "#eeeeee"
  boundary-colour: black
  grid-colour: black
  boundary-width: 1.7
  download-control: true
  download-text: Demo atlas - Middlesex Earthworm - from ESB data downloaded from NBN on 05/09/2024.
  download-info: true
zoom:
  height: 700
  boundaries: vcs
common:
  resolution: monad tetrad quadrant hectad
  dot-shape: control
  dot-opacity: control
  dot-colour: black
  map-types: standard density timeslice
  legends:
    - id: density
      x: 10
      y: 10
      scale: 1.2
    - id: timeslice
      x: 10
      y: 10
      scale: 1.2
  timeslice:
    threshold1: 1999
    threshold2: 2009
charts:
  aspect-ratio: 0.4
  yearly-min: 1990
  include: weekly yearly