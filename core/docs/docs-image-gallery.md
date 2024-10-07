# Configuring gallery images
If you include the gallery tab on your atlas, you will also need to configure the gallery images. This is done in a dedicated configuration file called *images.txt* in the *user/config* folder, so first create that file. 

Creating, uploading and editing files in your repo is described in the document [*Using GitHub ot add/edit files*](./docs-add-edit-config.md).

The format in which the configuration options are laid out (described below) is known as YAML (pronounced 'yamel'). YAML files normally have a '.yml' file extension, but this configuration file has the file extension '.txt' to make it easy to open and edit with any text editor.

## General format
Each taxon for which you wish to display images is represented in this file as collection (array). The identifier for each collection matches taxon identifiers specified in the taxon list file. Each image in the collection is represented by three properties: *file*, *thumb* and *caption*. 

The *file* property is the name (without path) of an image file which you must place in the *user/data/images* folder. The *thumb* property is the name (without path) of an image file to use as a thumbnail in the gallery control. If you can create small thumbnail images of each of your full images, then you can specify these (which will improve the gallery performance - though often not noticeably), otherwise you can leave this property out and the image specified under *file* will also be used to generate a thumbnail. The *caption* property is used to display a caption over the image - it can be a useful place to put copyright information or an image description. You can leave this property out if there is no caption you wish to display. (You shouldn't really have to specify the taxon name in the caption since that will be obvious from the user selection.) Example:
```
aporrectodea_caliginosa:
  - file: aporrectodea-caliginosa-blah.jpg
    caption: Copyright Joe Bloggs
  - file: blah-a-cal.jpg
    thumb: blah-a-cal-thumb.jpg
    caption: Copyright Jane Doe
aporrectodea_rosea:
  - file: 202040801-crop-enhanced.jpg
```
Note that there is no specified format for image names - how you name them is entirely up to you. The gallery control supports all common image formats (e.g. png, tif, jpeg, gif).

