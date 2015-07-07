# Peachtree Installation Instructions

## Install Peachtree Locally

Make sure you have node installed, this project was built and tested with node 0.12.2 and npm 2.7.4.

Go ahead and clone the repository
```
$ git clone https://github.com/NETESOLUTIONS/peachtree.git
$ cd peachtree/
```
Once in the directory run 
```
$ npm install
```
This will install all the project dependencies and run bower install postinstall. One thing to note here is that many of the bower dependencies are in dependencies and not devDependencies. This because of the structure or our deployment. Depending on you application you can move these around as you see fit. It will will also run an initial build which includes the tests to make sure it is delivered in a passing state.

## Run Peachtree Locally

This app started with John Papa's Angular [Hottowel](https://github.com/johnpapa/HotTowel-Angular) yeoman generator. So, if you are interested in diving really deep into the structure, rules or the gulp setup please refer to his repo as it is an excellent resource.

That beign said the gulp commands are directly taken from there with some minor modifications for deployment configurations. To get a list of the gulp tasks just run the default task or 
```
$ gulp help
```
That will list all the available actions

To quickly fire up a development server and start messing around
```
$ gulp serve-dev
```
Which automatically starts the nodeserver opens your browser and starts browsersync for reloading and style injection.