# AugmentedSzczecin_HTML 


## DESCRIPTION
Augmented Szczecin is an application that allows people to find interesting place in the city. An application running in a  web browser shows the way to reach and description of interesting places in Szczecin.  
Application possibilities:  
- The application will link maps with the data about interesting places in Szczecin (monuments, restaurants, parks, etc.).  
- Linking real-time data from Open-Data.org.pl (monuments, parks, transport, restaurants, distance from your, photo, thumbnails, object type) with street view.  
- The possibility of showing a route to the location (2D route and possibly also in street view).  
- The ability of watching through a map of Szczecin with marked places.  
- Filtering the types of objects displayed on the map / from street view.  

Augmented Szczecin will be free and open to anyone interested in different places in the Szczecin. The application is based on Javascript and AngularJS. Augmented Szczecin requires to operate one of the popular browsers for the end user. (WebBrowsers:Chrome 28, Firefox 24,Opera 15,Internet Explorer). This app was designed by a group of front-end in the patronage program.

## PREQUITES:
* -Install GIT [GIT download link]  
* -Install Nodejs [NODEJS download link] 
* -Install Nginx [NGINX download link] 

##INSTALLATION AND CONFIGURATION:

### Step 1: CLONE REPO
Once installed, enter the following command Git:  
```git clone https://github.com/blstream/AugmentedSzczecin_HTML.git```

### Step 2: INSTALLATION
 * The application relies upon various node.js tools, such as Bower. install nodejs with bower (Installation must be in the folder where you find the cloned repo):

* Install bower  
```npm install –g bower```
* Install npm  
```npm install```

### Step 3: RUNNING LOCALLY
* Open the folder that you have install nginx and find the configuration file (nginx.conf).
* Change the following line of code to your site to locate the application:

        location / 
            root   „Your path with aplication”;
            index  index.html index.htm;
* Then start local hosting with this command:  
```Nginx start```

### Step 4: RUNNING THE APP 

* Run the aplication in Web browser with your local ip adress path:  
```http://”Your local IP adress”/#/map```

## DISTRIBUTION OF FILES
* All files downloaded from the Gita and added depending (eg. Bower) should be in one 
folder, which should be set in the configuration file Nginx.
[GIT download link]:https://github.com/
[NODEJS download link]:https://nodejs.org/
[NGINX download link]:http://nginx.org/en/download.html