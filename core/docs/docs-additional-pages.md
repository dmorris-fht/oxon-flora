# Creating additional HTML or Markdown pages
You may add any number of additional HTML or Markdown pages to your atlas website. These should be stored under the *user/config* folder, but typically you would place them in a subfolder (or multiple sub-folders) of the */user/config* folder in order to keep that space organised. HTML pages should have the file extension `.html` and Markdown pages `.md`.

Creating, uploading and editing files in your repo is described in the document [*Using GitHub ot add/edit files*](./docs-add-edit-config.md).

If you have some HTML skills, then you may want to stick with providing additional pages in HTML format to give you full flexibility of HTML layout and styling. Markdown is a good option for those without HTML skills. If you don't have any Markdown skills, you can easily pick up the basics in just a few minutes by looking at online resources, e.g: https://www.markdownguide.org/.

## HTML pages
When you write HTML pages for your atlas, you don't write full HTML pages because the atlas software embeds them within the general HTML page framework of the atlas. The HTML you provide is inserted into a `<div>` tag that sits between the atlas header (including navigation bar) and the footer. So you don't need to use, for example, `<header>` or `<body>` tags.

If you want to apply CSS styling to any elements within your page, you need to do it directly on the elements themselves using the HTML `style` attribute.

To use an image in a page, the best way is to place the image in the same folder as the page (or a sub-folder you create for it) and set the `src` attribute of the image to the path of the image relative to the website root which will be something like: `<img src="/user/config/pages/logo.png">`

The example below will create a couple of paragraphs of text with an image floating to the right:

```
<h2>Project information</h2>
<img src="/user/config/pages/badge-circle.png" alt="Earthworm Society logo" style="float:right"/>
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a purus maximus, fermentum tortor in, 
    facilisis est. Curabitur hendrerit justo eu erat laoreet, non aliquet lacus lobortis. Proin dapibus 
    commodo mi a commodo. In quis orci a turpis cursus porta et id tortor.
</p>
<p>
    Nulla fringilla lacus vel ornare ultrices. Orci varius natoque penatibus et magnis dis parturient 
    montes, nascetur ridiculus mus. Mauris dictum turpis non vestibulum bibendum. Curabitur commodo sapien 
    id augue condimentum convallis et eget nibh.
</p>
```
## Markdown pages
Markdown pages are the simplest way to provide additional pages for an atlas website, especially where there are minimal special layout requirements. Note that all this documentation is provided in Markdown format - so you can see that it is easy to produce well organised and laid-out pages using pure Markdown.

The example below will create a couple of paragraphs of text preceded by an image:

```
## Project information

![Earthworm Society logo](/user/config/pages/badge-circle.png)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a purus maximus, fermentum tortor in, 
facilisis est. Curabitur hendrerit justo eu erat laoreet, non aliquet lacus lobortis. Proin dapibus 
commodo mi a commodo. In quis orci a turpis cursus porta et id tortor.

Nulla fringilla lacus vel ornare ultrices. Orci varius natoque penatibus et magnis dis parturient 
montes, nascetur ridiculus mus. Mauris dictum turpis non vestibulum bibendum. Curabitur commodo sapien 
id augue condimentum convallis et eget nibh.
```

In the example above, the image won't float to the right as it did with the HTML example - there is no facility to do that in pure Markdown. However, if you have the occasional more sophisticated requirement like that, you can use HTML within a Markdown document. So the example below would give exactly the same results as the HTML page:

```
## Project information

<img src="/user/config/pages/badge-circle.png" alt="Earthworm Society logo" style="float:right"/>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a purus maximus, fermentum tortor in, 
facilisis est. Curabitur hendrerit justo eu erat laoreet, non aliquet lacus lobortis. Proin dapibus 
commodo mi a commodo. In quis orci a turpis cursus porta et id tortor.

Nulla fringilla lacus vel ornare ultrices. Orci varius natoque penatibus et magnis dis parturient 
montes, nascetur ridiculus mus. Mauris dictum turpis non vestibulum bibendum. Curabitur commodo sapien 
id augue condimentum convallis et eget nibh.
```

