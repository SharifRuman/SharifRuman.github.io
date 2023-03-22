var connected_flag = 0
var mqtt;
var reconnect_Timeout = 2000;

function onConnectionLost() {
    console.log("connection lost");
    document.getElementById("status").innerHTML = "Disconnected";
    document.getElementById("messages").innerHTML = "";
    connected_flag = 0;
}

function onFailure(msg) {
    console.log("Failed");
    document.getElementById("messages").innerHTML = "Connection Failed - Retrying Please Wait";
    setTimeout(MQTTconnect, reconnect_Timeout);
}

function onMessageArrived(rec_msg) {
    if(isJson(rec_msg.payloadString)){
        updateMap(rec_msg.payloadString);
    } else {
        message = tmpVar;
        document.getElementById("messages").innerHTML = message;
        console.log("Received: " + message);
    }
}

function isJson(msg) {
    console.log(msg);
    msg = typeof msg !== "string"
        ? JSON.stringify(msg)
        : msg;
    try {
        msg = JSON.parse(msg);
    } catch (e) {
        return false;
    }
    if (typeof msg === "object" && msg !== null) {
        return true;
    }
    return false;
}

function onConnect() {
    document.getElementById("messages").innerHTML = "Connected to " + host + " on port " + port;
    connected_flag = 1
    document.getElementById("status").innerHTML = "Connected";
    console.log("Connected Flag = " + connected_flag);

}

function disconnect() {
    if (connected_flag == 1)
        document.getElementById("status").innerHTML = "Disconnected";
        mqtt.disconnect();
}


function MQTTconnect() {
  document.getElementById("messages").innerHTML = "";
  var s = document.forms["connform"]["server"].value;
  var p = document.forms["connform"]["port"].value;
  if (p != "") {
      console.log("ports");
      port = parseInt(p);
      console.log("port" + port);
  }
  if (s != "") {
      host = s;
      console.log("host");
  }
  console.log("connecting to " + host + " " + port);
  var ranNum = Math.floor(Math.random() * 1000);
  var cname = "ClientName-" + ranNum;
  mqtt = new Paho.MQTT.Client(host, port, cname);
 
  var options = {
      useSSL: true,
      timeout: 4000,
      
      onSuccess: onConnect,
      onFailure: onFailure,

  };
  mqtt.connect(options);

  mqtt.onMessageArrived = onMessageArrived;
  mqtt.onConnectionLost = onConnectionLost;

  return false;
}

function sub_topics() {
    document.getElementById("messages").innerHTML = "";
    if (connected_flag == 0) {
        out_msg = "Not Connected"
        console.log(out_msg);
        document.getElementById("messages").innerHTML = out_msg;
        return false;
    }
    var stopic = document.forms["subs"]["Stopic"].value;
    document.getElementById("messages").innerHTML ="You are subscribe to " + stopic;
    console.log("You are subscribe to " + stopic);
    mqtt.subscribe(stopic);
    
    return false;
}

function send_message() {
    document.getElementById("messages").innerHTML = "";
    if (connected_flag == 0) {
        out_msg = "Not Connected"
        console.log(out_msg);
        document.getElementById("messages").innerHTML = out_msg;
        return false;
    }
    var msg = document.forms["smessage"]["message"].value;
    console.log(msg);

    var topic = document.forms["smessage"]["Ptopic"].value;
    message = new Paho.MQTT.Message(msg);
    if (topic == "")
        message.destinationName = "test-topic"
    else
        message.destinationName = topic;
    mqtt.send(message);
    document.getElementById("messages").innerHTML = "Massege Published";
    return false;
}

L.mapbox.accessToken = 'pk.eyJ1Ijoic2hhcmlmcnVtYW4iLCJhIjoiY2xmNTV5N3JqMGZ0MzNxcXJ1amJrM3U5eSJ9.o6ps2oN5TcXgMKy5ArEJWA';
var map = L.mapbox.map('map')
  .setView([51.0448, -114.064], 11)
  .addLayer(L.mapbox.styleLayer('mapbox://styles/sharifruman/clf5e1xes002i01pwo6ix6auh'));

var RedIcon = L.icon({
    iconUrl: 'assets/Red.png',

    iconSize: [50, 50],
    iconAnchor: [25, 50], 
    popupAnchor: [0, -30]
});

var BlueIcon = L.icon({
  iconUrl: 'assets/Blue.png',

  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -30]
});

var GreenIcon = L.icon({
  iconUrl: 'assets/Green.png',

  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -30]
});

function updateMap(msg) {
    try {
        
        var temp = JSON.parse(msg);
        var lat = temp.latitude;
        var lon = temp.longitude;
        var temp = temp.temperature;
        document.getElementById("messages").innerHTML = "Published Location: {Latitude: " + lat + "Longitude: " + lon + " Temperature: " + temp +"}";
  
        if (temp < 10) {
            var marker = L.marker([lat, lon], { icon: BlueIcon });
        } else if (temp > 29) {
            var marker = L.marker([lat, lon], { icon: RedIcon });
        } else {
            var marker = L.marker([lat, lon], { icon: GreenIcon });
        }
        marker.bindPopup("Temperature: " + temp + String.fromCharCode(176));
        marker.addTo(map);
    } catch (e) {
        console.log(e);
        document.getElementById("messages").innerHTML = "Invalid JSON";
        console.log("Invalid JSON");
    }
  }

function shareStatus() {
  const message = document.querySelector('#mapStatus');

  if (!navigator.geolocation) {
      message.textContent = `Your browser doesn't support Geolocation`;
      message.classList.add('error');
      return;
  }

  const btn = document.querySelector('#shareMyStatus');
  btn.addEventListener('click', function () {
      
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });
  
  function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

  function onSuccess(position) {

      const {
          latitude,
          longitude
      } = position.coords;

      const min = -40;
      const max = 60;
      var temperature = getRndInteger(min,max)

      var lat = latitude.toString();
      var lon = longitude.toString();
      var temp = temperature.toString();

      var geojson = '{"latitude": ' + lat + ', "longitude": ' + lon + ', "temperature": ' + temp + '}';

      document.getElementById("status").innerHTML = "";

      var name = document.forms["mapStatus"]["name"].value;
      
      var course = document.forms["mapStatus"]["course"].value;
      if(name == "" || course ==""){
          name = "Test_Name"
          course = "Test_Course"
      }
      topic = course + "/" + name + "/My_Temperature";
      var msgjson = new Paho.MQTT.Message(geojson);
      msgjson.destinationName = topic;
      
      mqtt.subscribe(topic);
      mqtt.send(msgjson);
      console.log("Message: " + geojson + " sent to topic: " + topic)
      document.getElementById("messages").innerHTML = "GeoJSON: " + geojson + " sent to " + topic;
  }

  function onError() {
      message.classList.add('error');
      message.textContent = `Failed to get your location!`;
  }


};