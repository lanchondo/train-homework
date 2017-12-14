  // Initialize Firebase
var config = {
        apiKey: "AIzaSyCgTI0irXOmlGsEONEcdZ40mMhz1335Iwc",
         authDomain: "train-6e23c.firebaseapp.com",
         databaseURL: "https://train-6e23c.firebaseio.com",
         projectId: "train-6e23c",
         storageBucket: "train-6e23c.appspot.com",
         messagingSenderId: "87410090111"
};
firebase.initializeApp(config);
var database = firebase.database();
$('#addTrainBtn').on("click", function() {
  // take user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();
  // to create local temporary object to hold train data
  var newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: frequency
    }
    // uploads train data to the database
  database.ref().push(newTrain);
  console.log(newTrain.name);
  // clears all the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
  // Prevents moving to new page
  return false;
});
//  'On' event listener for adding trains to Firebase and adding it to the html
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
// Snapshot info turned into a variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;

// Moments time conversion for the first train and current time
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime); 

// Difference in time between currentTime and the first train
  var diffMin = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(firstTrain);
  console.log("Difference in Time: " + diffMin);

  // Find out the time remaining and place it in a variable
  var timeRemainder = diffMin % frequency;
  console.log(timeRemainder); 

// Calculate the the time til the train
  var minToTrain = frequency - timeRemainder; 

// The next train
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
}); 
