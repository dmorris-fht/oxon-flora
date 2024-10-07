# Using GitHub to add/edit files
To configure your atlas, you add and edit files in the *user* folder of your forked repo. Other pages tell you how to create data files and what to add to configuration files, but this page will tell you how to add them to your repo and edit configuration files in your repo.

Note that when files are added, removed or edited in your GitHub repo, the changes are not instantly propagated to your website. *It can take a few minutes for changes to your repo to be reflected on your linked GitHub pages website.*

## Adding a configuration file
There are two ways of creating a new file in your repo:

1. create it first on your computer and then upload it, or
2. create it directly in the repo.

### Creating first and then uploading
To use the first method, first create a configuration file, e.g. *site.txt* on your own computer and, optionally, edit it with a plain text editor (e.g. Notepad on Windows) to include some configuration options.

Next, navigate to the place where you wish to upload the file in your GitHub repo. For the *site.txt* folder, this will be the *user/config* folder - simply click on the *user* folder from the homepage of your GitHub repo and then click again on the *config* folder: that opens the *config* folder. You will see a button near the top right of the page like this:

![GitHub add button](./images/add-button.png)

When you click that button, you will see two options: *Create a new file* and *Upload files*. Click on *Upload files*. An upload page appears where you can either drag your new file to or, by clicking on the *Choose your files* link, select your file with the file-select dialog.

Your file won't actually be added to the repo until you hit the 'Commit changes' button. If you have not used a versioning repository tool like GitHub before, then this step will be unfamiliar to you. It's what allows GitHub to track changes to files and, if necessary, revert changes at a later date. 

You can usually just keep the default commit message - *Add files via upload* - but you may wish to add a more descriptive message and, optionally a full description of the addition or changes you've made. For our purposes, keeping the default is okay and it certainly speeds things up a bit.

### Creating directly in GitHub
To use the second method, navigate to the folder as before, but click the *Create new file* option after you've clicked the *Add file* button. You will see something like this:

![Add file page](./images/add-file-page.png)

In the *Name your file* box, enter the name of the file you wish to create, e.g. *site.txt*, and optionally add some text to the body of the file (where it says *Enter file contents here*). Then click the green *Commit changes...* button. You will see a commit dialog appear. As with the previous method you can added a commit message and/or description or just accept the default commit message before clicking the green *Commit changes* button.

## Editing a file
To edit a file, e.g. a configuration file like *site.txt*, navigate to the folder that contains the file and then click on the file name (which will show as a blue link when your mouse moves over it). Now on the right near the top of the screen you will see a set of buttons like this:

![Edit buttons](./images/edit-buttons.png)

Click on the button with the pencil icon and that will take you into edit mode. When you have finished your edits, click the green *Commit changes...* button. You will see a commit dialog appear. As described previously you can added a commit message and/or description or just accept the default commit message before clicking the green *Commit changes* button.

## Adding data and other resources
To add files such as data files and resources like images and markdown/html pages, first navigate to the folder where you want to create the resources, then click the *Add file* button (near the top right of the page) and then click *Upload files*.

You can use GitHub's drag and drop facility to copy the files or click the *choose your files* link to use a file-select dialog. When you have copied all the files you wish to add, click the green *Commit changes* button (as described in the section *Creating first and then uploading*).

If the files you wish to upload need to go into a folder which is not yet present, there are two options:

1. create the folder first and then copy the files into the new folder, or
2. use GitHub's drag and drop feature on the upload page and drag the whole folder.

GitHub does not have a facility to create an empty folder, but you can create one with a dummy file in it and later, once there are some real files in the folder, delete the dummy file. To do that, navigate to the folder where you want to create the new subfolder and  click the *Add file* button (near the top right of the page) and then click *Create new file*. You will see something like this:

![Add file page](./images/add-file-page.png)

Instead of typing the name of a file into the *Name your file* box, type something like 'folder/dummy', where 'folder' is the name of the of the folder you wish to create. Then commit the new folder complete with dummy file. Once you've added other files to this folder, you can delete the 'dummy' file (see next section). (If you delete the 'dummy' file before uploading other files into the folder, the folder disappears.)

**Important note: GitHub imposes a limit of 100 files that can be uploaded in any one commit through its interface.** That can be awkward if you have more than 100 taxa in your atlas (which could easily be the case). It means that you will have to upload data files in batches of 100. 

GitHub does not impose any such limit if you are uploading files via the Git command line tool. To find out more about that read the section on *Using Git* in this document.

## Deleting config files and resources
To delete a file in GitHub, navigate to the folder containing the file and click on the name of the file (you will see the name turn blue as you hover over it - indicating a link). That will display the file contents. Towards the top-right of this page you will see a button with an ellipsis (three dots):

![Ellipsis button](./images/ellipsis-button.png)

Click this button and you will see a list of options - click the red one which says *Delete file*. The file will not actually be deleted until you commit the changes using the green *Commit changes...* button that you will be familiar with by now. As usual, you need to supply a commit message, but you can accept the default.

Deleting a folder is very similar. Navigate into the folder you wish to delete. You will see the folder's contents displayed. Click on the ellipsis button and select the red *Delete directory* button. The folder and all its contents will be deleted, but not until you have committed the changes.

# Using Git
If you are a seasoned user of Git, it will likely be much more convenient for you to update your repo by using the Git command line rather than the GitHub interface. This can also overcome GitHub's limit on the number of files that can be uploaded in one go.

If you are not a Git user but would like to learn how to use it to modify and upload files in your repo rather than using the GitHub interface, there are plenty of tutorials online that will show you how to do that, e.g.:

https://www.freecodecamp.org/news/introduction-to-git-and-github/

Note that many of those tutorials, including the one above, take you through setting up a repo on your own computer and then pushing that to GitHub. However, you already have a GitHub repo for your project, so you will skip that part and, instead, use the git *clone* command to get a local copy of your repo which you can keep in sync with the GitHub repo using Git command line instructions.