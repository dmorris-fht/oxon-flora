# Technical documentation
Documentation intended for coders and contributors to this project. There follow some brief notes that explain one or two features of the project's  technical architecture.

## General architecture
There is no server-side architecture for the project - it runs entirely on the client-side via HTML, CSS and javascript that runs in the user's browser. That makes it possible to implement atlas sites via any internet service provider that can host static files - i.e. almost any provider including the GitHub 'pages' service.

There are two main folders in the project: core and user. Virtually all of the project software is contained in the *core* folder - people setting up local atlas projects (termed 'admins' in this documentation) are not expected to change the files in this folder. If they do, they may find merge conflicts when they try to update their forked repositories with code changes made by the BRC. On the other hand, the project is open source so it is possible that some people with coding experience might make changes to this code and raise a merge request (pull request) on the BRC repository. Others may just do so and take their forked project in a new direction without raising a merge request on the original project.

There is one core file which is in the root directory rather than the *core* folder - *index.html* - but this simply redirects to the *core/main.html* file. There are four HTML template pages in the *core* folder that host the content from this site:
- **main.html**: hosts the main atlas interface.
- **admin.html**: hosts a page of links for admin utilities (although there is currently only one).
- **generate.html**: hosts an admin utility for generating data from a CSV file.
- **userpage.html**: hosts any markdown/html information pages added by an admin.

All of these pages pull in *Bootstrap v5* Javascript and CSS which are used to provide some theming and layout management for the site. They also pull in the *Require JS* library which is described below. Note that *all* of the Javascript and CSS dependencies are bundled with the core software - there are no requirements on resources supplied by CDNs.

## Require JS
This project uses the Require JS module dependency framework (https://www.tutorialspoint.com/requirejs/) which enables the separation of code into modules without requiring a build step to 'compile' the source code into one monolithic JS code module. It means that development can proceed quite rapidly without requiring a build step before testing.

## Configuration files
Admins configure options using the YAML format - see, for example, [general site configuration](./docs-site-config.md). When these configuration files are read into code, they become available as JSON objects. The config files are read by the function *getConfig* in the *core/js/atlas-general.js* module. The *getConfig* function returns the JSON object representing the config file. Consider a *site.txt* file which includes this configuration:
```
common:
  resolution: monad tetrad quadrant hectad
  dot-shape: control
```
If the config object returned by *getConfig* function is assigned to the variable *config*, then the config variables would be available via these patterns:
```
config.common.resolution
config.common['dot-shape']
```
(The second construct style is required because of the hyphen in the config option name.) If the admin has not set the *common* option group, then the JS would throw an error if you just used the pattern *config.common.resolution*. So mitigate this, the *getConfig* function adds a convenience method to the object it returns called *get*, so to access the example options shown above you can just use the following pattern:
```
config.get('common.resolution')
config.get('common.dot-shape')
```
Note that it works the same whether or not a hyphen is included. The big advantage of accessing the variables in this way is that no error will be thrown if the admin has not set the *common* option group - the function will just return null. In these examples the function would also return null in the case were the *resolution* or *dot-shape* option is not set.

In the code, a mixture of all of these patterns is used depending on which is most convenient in a specific situation. In particular the brevity of the dot pattern, e.g. `config.common.resolution`, means that it is often used after the `config.get()` pattern has been used to establish that it has been set.

