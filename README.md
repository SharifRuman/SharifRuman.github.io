# Project 5

### ENGO 651 - Adv. Topics on Geospatial Technologies


For this project I will built a web application which uses the javascript geolocation API and turn any smartphone into an IoT sensor and I will also build a web mapping application to visualize the location of the smartphone sensor. 

### DEMO

[DEMO](https://sharifruman.github.io)

##### Broker Host 

[Mosquitto (PORT: 8081)](https://test.mosquitto.org) 

##### Leaflet

[leaflet](https://leafletjs.com/download.html)

#### Mapbox

[API](https://api.mapbox.com/styles/v1/sharifruman/clf59c0vo002e01pw08c580us.html?title=view&access_token=pk.eyJ1Ijoic2hhcmlmcnVtYW4iLCJhIjoiY2xmNTV5N3JqMGZ0MzNxcXJ1amJrM3U5eSJ9.o6ps2oN5TcXgMKy5ArEJWA&zoomwheel=true&fresh=true#9.1/51.0876/-113.778)<br>
Style URL: mapbox://styles/sharifruman/clf59c0vo002e01pw08c580us

##### Files:
 1. assets
    1. style.css
    2. map.js
    3. Blue.png
    4. Red.png
    5. Green.png
2. dist
    1. leaflet.ajax.js
    2. leaflet.ajax.min.js
    3. leaflet.markercluster-src.js
    4. MarkerCluster.css
    5. MarkerCluster.Default.css
3. index.html

##### Requirements Lab 5

- [x] Users should be able to determine the MQTT message broker host and port
- [x] The web application must have a Start/End button to establish/finish a connection with the MQTT message broker. If the user pushed the start button, he would no longer be able to determine host and port values unless he/she clicks on the End button.
- [x] In case of disconnection, users should receive a proper message and the web application should automatically re-establish the connection.
- [x] Users should be able to publish any messages to any topics they want and you should show in your demo if MQTTX can subscribe to the topic and read the message that users have just published.
- [x] Users should be able to publish any messages to any topics they want and you should show in your demo if MQTTX can subscribe to the topic and read the message that users have just published.
- [x] Your map should show your current location by subscribing to the MQTT message broker. When the user clicks on your location icon, she/he should see the current temperature by subscribing to the message broker with the <your course code>/<your name>/my_temperature topic (you should use a leaflet popup to show the temperature value). Your location icon colour should be changed based on the current temperature. [-40,10) blue. [10,30) green. [30,60] red.
- [x] In your demo, you should publish the Geojson message from MQTTX and your map should automatically be updated by subscribing to the <your course code>/<your name>/my_temperature topic.
- [x] You are supposed to run your web application on a browser on your smartphone while you are using GPS for your location report. Therefore, your demo should include a recording of your mobile screen. You might use free screen recorder apps for iPhone and Android in the market or use Vysor to record your demo on your PC or laptop.