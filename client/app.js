var addRouteBtn = document.querySelector("#addRouteBtn");
var routeList = [];

// On click this will save a route and be able to POST that route
addRouteBtn.onclick = function () {
  let nameOfRoute = document.querySelector("#nameOfRoute");
  let typeOfRoute = document.querySelector("#rockClimbingTypes");
  let gradeOfRoute = document.querySelector("#rockClimbingGrades");
  let userFeedBack = document.querySelector("#userfeedback");
  // Checks to see if name value is empty before doing anything
  if (nameOfRoute.value != "") {
    // Sets up data to be POST
    data = "Name=" + encodeURIComponent(nameOfRoute.value);
    data += "&Type=" + encodeURIComponent(typeOfRoute.value);
    data += "&Grade=" + encodeURIComponent(gradeOfRoute.value);

    // POST Fetch request
    fetch("http://localhost:8080/routes", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(function (response) {
      console.log("Created");
      loadDataFromServer();
    });
    userFeedBack.style.color = "White";
    nameOfRoute.value = "";
  } else {
    userFeedBack.style.color = "Red";
  }
};
// Gets all the data from the server very first
function loadDataFromServer() {
  fetch("http://localhost:8080/routes").then(function (response) {
    response.json().then(function (data) {
      routeList = data;
      document.querySelectorAll(".routeRows").forEach((el) => el.remove());
      routeList.forEach(function (route) {
        var table = document.querySelector("#climbingTable");
        var newTableRow = document.createElement("tr");
        newTableRow.classList.add("routeRows");
        var th1 = document.createElement("th");
        var th2 = document.createElement("th");
        var th3 = document.createElement("th");
        th1.innerHTML = route.Name;
        th2.innerHTML = route.Type;
        th3.innerHTML = route.Grade;
        newTableRow.appendChild(th1);
        newTableRow.appendChild(th2);
        newTableRow.appendChild(th3);
        table.appendChild(newTableRow);
      });
    });
  });
}

loadDataFromServer();
