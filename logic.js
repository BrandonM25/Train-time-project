// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAHzr_i3s5rQ8Shi580GYyLlQdYqCHu-xw",
    authDomain: "traintime-f383f.firebaseapp.com",
    databaseURL: "https://traintime-f383f.firebaseio.com",
    projectId: "traintime-f383f",
    storageBucket: "",
    messagingSenderId: "62141484449"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

  // Create variable for the current time

   var currentTime = moment().format("hh:mm");
    console.log("CURRENT TIME: " + currentTime);


//  Button for adding Train

$("#train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name").val().trim();
  var des = $("#destination").val().trim();
  var firstTime = moment($("#first").val().trim(), "hh:mm").format("X");
  var freq = $("#frequency").val().trim();

  // Creates local "temporary" object for holding train data

  var newTrain = {
    name: trainName,
    newDes: des,
    start: firstTime,
    rate: freq,
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(trainName.name);
  console.log(des.newDes);
  console.log(firstTime.start);
  console.log(freq.rate);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first").val("");
  $("#frequency").val("");
});

// Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var des = childSnapshot.val().newDes;
  var firstTime = childSnapshot.val().start;
  var freq = childSnapshot.val().rate;


 // Difference between the times
    var tFrequency = freq;
    var tfirstTime = firstTime;
  
    var firstTimeConverted = moment(tfirstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);


    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minutes Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Minutes until next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


      // Put each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + des + "</td><td>" +
  freq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");
});
