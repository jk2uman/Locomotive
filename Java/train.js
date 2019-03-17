function trainStation() {
var config = {
        apiKey: "AIzaSyA6Zw01aT9B6LQ86cZo44t2YRa3BBmppRc",
        authDomain: "train-schedule-8bd9e.firebaseapp.com",
        databaseURL: "https://train-schedule-8bd9e.firebaseio.com",
        projectId: "train-schedule-8bd9e",
        storageBucket: "fir-trainapp.appspot.com",
        messagingSenderId: "743102722161"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    //  Button for adding Train
    $('#addTrainBtn').on("click", function(_event)  {
      // Grabs trains input
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = moment($("#clockInput").val().trim(), "HH:mm").format("HH:mm");
        var frequency = $("#frequencyInput").val().trim();
        // Creates local "temporary" object for holding employee data
            var newTrain = {
            name: trainName,
            place: destination,
            firtrain: firstTrain,
            fre: frequency
            }
    // Uploads employee data to the database
      database.ref().push(newTrain);
     // Clears all of the text-boxes
     $("#trainNameInput").val("");
     $("#destinationInput").val("");
     $("#clockInput").val("");
     $("#frequencyInput").val("");
        //Stops from loading another page
      return false;
});
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
// Store everything into a variable.
 var trainName = childSnapshot.val().name;
 var destination = childSnapshot.val().place;
 var firstTrain = childSnapshot.val().firtrain;
 var frequency = childSnapshot.val().fre; 
// Calculate the next arrival using mathematics
var theTimeConverted = moment(firstTrain, "HH:mm");

var curTime = moment().format("HH:mm")
// To calculate the next arrival
var timeDiff = moment().diff(moment(theTimeConverted), "minutes");
// Calculate the next arrival
var timeRemainder = timeDiff % frequency;
var minutesAway = frequency - timeRemainder;
//Next Arrival
var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");  
// Create the new row
var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(destination),
  $("<td>").text(frequency),
  $("<td>").text(nextArrival),
  $("<td>").text(minutesAway),
);
// Append the new row to the table
$("#trainTable>tbody").append(newRow);
});
}