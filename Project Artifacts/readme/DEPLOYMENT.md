# Deploying peachtree
## Deployment as per current configuration.
* Deployment of the Peachtree application is quite easy. First things to make sure of are that you have a CodeShip account and Heroku account.
* First login to Heroku and create a web application. Make sure to add the PostgreSQL addon and get your application key. Instructions for how to do both of these tasks are outlined by Heroku's documentation found [here](https://devcenter.heroku.com/)
* Now login into Codeship and add the cloned version of the repository. Under project settings and then clicking repository.
    * Note: Make sure to create GitHub repository of the repository you cloned for this step.
* Then go to test settings and cut and paste the snippet below into Setup Commands to configure the proper testing environment on their hosted hardware.

``` nvm install 0.12.2
nvm use 0.12.2
npm install```

* The npm package has post install scripts that auto run which will automatically run the build process and run automated tests when npm install is run.
* Next, go to the deployment tab.
* In there you can configure you PaaS or IaaS service of choice.
* It will ask for specifics based on the chosen environment, since we are using Heroku in this case it will ask for the application name and your Heroku API key. Save the changes.
* Once setup correctly run a test push on the GitHub repository.
* This should trigger the automated tests and deployment hook if all tests are passed.
* Now visit your working app at it's Heroku Web Address.

## Other Deployment options
* This app is easily deployable to other container type environments.
* Using Docker is a great option and Heroku makes it easy to get a Docker file from an exisiting app to customize local development and other deployment options.
* To start it is reccomended to use Boot2Docker, a free open source lightweight Linux Distro. made for running Docker contaianers.
* Next, make sure to add in the Heroku Toolbelt Docker addon

```heroku plugins:install heroku-docker```

* Now run a Boot2Docker bash shell and cd into your project directory root
* Here if you just want a Docker file to use for other distributions type:

```heroku docker:init```

* A new docker file will be in the root of the project directory that can be used for spinning up docker containers.
* The toolbelt will also facilitate running local docker instances. However, a minimal Procfile is required if you are going to use the Heroku Toolbelt.

```web: node app.js```

* With saved as Procfile in the root run the following commands

```heroku docker:start```

* This should spin up a docker container and initiate the build process.
    * Note: Some familiarity with docker is assumed, i.e. Exposing ports necessary and folder permissions will need to be set correctly on your machine.
