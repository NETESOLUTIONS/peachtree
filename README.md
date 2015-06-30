[ ![Codeship Status for NETESOLUTIONS/peachtree](https://codeship.com/projects/6684a180-fc10-0132-ef4e-46c0998097e0/status?branch=master)](https://codeship.com/projects/87386)

#[nete peachtree app <nete-peachtree.herokuapp.com>](nete-peachtree.herokuapp.com)
##[peachtree original design concept](https://live.uxpin.com/b520be96922e9c950998a741bd5d3778ae7df860#/pages/24273706)
# peachtree
MVP App for GSA RFQ:4QTFHS150004. This app is meant to showcase NET ESOLUTIONS ability to deliver open, modern, and agile solutions for government applications. The name pays homage to the location of GSA and their foresight in providing modern acquisition strategies. 401 West Peachtree Street NW, Suite 820 Atlanta, GA 30308
## Description
This app was created in response to GSA RFQ:4QTFHS150004. The intention of the app is to showcase NETE's ability to deliver quality solutions in a modern agile way. The name of the app is in reference to the sponsoring agency and was named thusly to show respect for a new and enlightened way of  government procurement solutions.

Private industry is moving at a blinding pace and all the while opening up visibility into what they do, which has led to an explosion in collaboration. This network of openess can be leveraged by the governemnt. Groups like 18f and openDataFDA, and with guidance from visionary federal executive leaders such as Dr. Kass-Hout, the public sector is quickly catching up.

Peachtree was made as a prototype but also has the extensibility to be a full fledged delivery and methodology platform that can be leveraged for future products. It was made with openness in mind and utilizes the opensource community that has pushed technology solutions forward. Using all open source technologies and frameworks, from things created by big corporations (AngularJs) to visualization frameworks that started with one man's vision (D3.Js Mike Bostock). The stack is built completely in javascript using NodeJs with Express for the server side langage, and Angular for the front. The visual patter library and framework are bootstrap with the paper bootswatch theme.

This app attempts to answer a few simple user stories:
    * "Which durgs have the most adverse events reported?"
    * "Which devices have the most adverse events reported?"
    * "Which states have the most enforcement actions for food items?"
    * "What are the top reported reactions associated with adverse events for drug brand x?"

Although simple the user stories have complexity when analyzed and could easily grow along with the API's development. It leads to more questions through data discovery.
    * Are certain adverse events events limited to select demographic groups?
    * Are adverse events of a certain kind related to specific named brand drug or do all generic counterparts experience similar adverse events?
    * Why are reporting rates for certain agents higher than others?
    
The possibilities are endless and so many questions can be asked, and hopefully answered in world where a community has the opportunity to colloborate.

Nete is proud to deliver this app to GSA and regardless of outcome is excited to be a part of a changing field that has the ability to make a world of difference.


## Installation of peachtree

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

## Running the application locally.

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

## Deployment
We have tailored our setup to facilitate our deployment structure, so it may not be well suited for other CI/CD platforms. Please feel free to fork and change as needed for you specific deployment approach.

## Technology and Tools Stack.
* **Server Side**
    * [NodeJS](https://nodejs.org/)
    * [Express Generator](http://expressjs.com/)
    * [PG - PosgreSQL](https://github.com/brianc/node-postgres)
* **Data Back End**
    * [PostgreSQL](http://www.postgresql.org/)
* **Client Side**
    * [AngularJS](https://angularjs.org/)
    * [Angular UI Router](http://angular-ui.github.io/ui-router/site/#/api/ui.router)
    * [Angular Chartist JS](https://github.com/paradox41/angular-chartist.js/tree/master)
* **UI Frameworks/Font Libraries**
    * [Bootstrap](http://getbootstrap.com/)
    * [Font Awesome](http://fortawesome.github.io/Font-Awesome/)
    * [Toastr](https://github.com/CodeSeven/toastr)
    * [Jquery](https://jquery.com/)
* **Build Tools and Generators**
    * [GulpJS](http://gulpjs.com/)
    * [Yeoman](http://yeoman.io/)
    * [Hottowel Generator](https://github.com/johnpapa/generator-hottowel)
    * [Bower](http://bower.io/)
* **Testing Framework**
    * [Karma](http://karma-runner.github.io/0.12/index.html)
    * [ChaiJS](http://chaijs.com/)
    * [BardJS](https://github.com/wardbell/bardjs)
* **Hinting and Code Style Enforcement**
    * [JSCS](http://jscs.info/)
    * [JSHint](http://jshint.com/about/)
* **CI/CD**
    * [Codeship](https://codeship.com)
* **Hosting**
    * [Heroku](https://www.heroku.com/home)
    * [AWS](http://aws.amazon.com/)
* **Other Tools**
    * [John Papa's Style Guide](https://github.com/johnpapa/angular-styleguide)
    
