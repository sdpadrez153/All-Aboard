$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDV5K7cICdiDZkgpTbicZX1R4Z98LlX8Uc",
        authDomain: "cool-beans-668ac.firebaseapp.com",
        databaseURL: "https://cool-beans-668ac.firebaseio.com",
        projectId: "cool-beans-668ac",
        storageBucket: "cool-beans-668ac.appspot.com",
        messagingSenderId: "61445823274"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    database.ref("trainData").on("child_added", function (data) {


        var tr = $("<tr>");

        $("<td>").text(data.val().name).appendTo(tr);
        $("<td>").text(data.val().destination).appendTo(tr);
        $("<td>").text(data.val().Frequency).appendTo(tr);
        $("<td>").text(moment(data.val().firstTrain).format("HH:mm")).appendTo(tr);
        $("<td>").text(parseInt(data.val().minutesAway)).appendTo(tr);


        $(tr).appendTo("#schedules");
    });


    $("#submit").on("click", function (e) {
        e.preventDefault();

        var trainName = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTrain = $("#time-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        console.log(trainName);
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);


        database.ref("trainData").push({
            "name": trainName,
            "destination": destination,
            "First Train": firstTrain,
            "Frequency": frequency
        });

        $("#name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");

        var currentTime = moment();

        var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");

        var diffTimeInMinutes = moment().diff(moment(firstTrainConverted), "minutes");

        var frequencyRemainingMinutes = diffTimeInMinutes % frequency;

        var nextArrival = frequency - frequencyRemainingMinutes;

        var nextTrain = moment().add(nextArrival, "minutes");



    });
});