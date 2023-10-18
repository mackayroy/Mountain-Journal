var addRouteBtn = document.querySelector("#addRouteBtn");

var routeList = [];

// On click this will save a route and be able to POST that route
addRouteBtn.onclick = function () {
  let nameOfRoute = document.querySelector("#nameOfRoute");
  let typeOfRoute = document.querySelector("#rockClimbingTypes");
  let gradeOfRoute = document.querySelector("#rockClimbingGrades");
  let attemptsOnRoute = document.querySelector("#rockClimbingAttemptsID");
  let ratingOfRoute = document.querySelector("#rockClimbingRatingID");
  let userFeedBack = document.querySelector("#userfeedback");
  // Checks to see if name value is empty before doing anything
  if (nameOfRoute.value != "") {
    // Sets up data to be POST
    data = "Name=" + encodeURIComponent(nameOfRoute.value);
    data += "&Type=" + encodeURIComponent(typeOfRoute.value);
    data += "&Grade=" + encodeURIComponent(gradeOfRoute.value);
    data += "&Attempts=" + encodeURIComponent(attemptsOnRoute.value);
    data += "&Rating=" + encodeURIComponent(ratingOfRoute.value);

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
// Update Function
function updateRouteFromServer(routeId) {
  var openModal = document.querySelector("#UpdatedModal");
  var closeModal = document.querySelector("#closeModal");
  var updateRouteFromModal = document.querySelector("#modalUpdateRouteBtn");
  openModal.style.display = "flex";
  closeModal.onclick = function () {
    openModal.style.display = "none";
  };

  let modalNameOfRoute = document.querySelector("#modalNameOfRoute");
  let modalTypeOfRoute = document.querySelector("#modalRockClimbingTypes");
  let modalGradeOfRoute = document.querySelector("#modalRockClimbingGrades");
  let modalAttemptsOnRoute = document.querySelector(
    "#modalRockClimbingAttemptsID"
  );
  let modalRatingOfRoute = document.querySelector("#modalRockClimbingRatingID");

  fetch("http://localhost:8080/routes/" + routeId).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      modalNameOfRoute.value = data.name;
      modalTypeOfRoute.value = data.type;
      modalGradeOfRoute.value = data.grade;
      modalAttemptsOnRoute.value = data.attempts;
      modalRatingOfRoute.value = data.rating;
    });
  });
  updateRouteFromModal.onclick = function () {
    data = "Name=" + encodeURIComponent(modalNameOfRoute.value);
    data += "&Type=" + encodeURIComponent(modalTypeOfRoute.value);
    data += "&Grade=" + encodeURIComponent(modalGradeOfRoute.value);
    data += "&Attempts=" + encodeURIComponent(modalAttemptsOnRoute.value);
    data += "&Rating=" + encodeURIComponent(modalRatingOfRoute.value);

    fetch("http://localhost:8080/routes/" + routeId, {
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(function (response) {
      loadDataFromServer();
    });
    openModal.style.display = "none";
  };
}
// Delete Function
function deleteRouteFromServer(routeId) {
  let text = "Click Ok If You Want To Delete";
  if (confirm(text) == true) {
    data = routeId;
    fetch("http://localhost:8080/routes/" + routeId, {
      method: "DELETE",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(function (response) {
      loadDataFromServer();
    });
  }
}
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
        var th4 = document.createElement("th");
        var th5 = document.createElement("th");
        var th6 = document.createElement("th");
        var th7 = document.createElement("th");
        var updateRouteBtn = document.createElement("button");
        var deleteRouteBtn = document.createElement("button");
        deleteRouteBtn.onclick = function () {
          deleteRouteFromServer(route.id);
        };
        updateRouteBtn.onclick = function () {
          updateRouteFromServer(route.id);
        };
        updateRouteBtn.innerHTML = "Update";
        deleteRouteBtn.innerHTML = "Delete";
        updateRouteBtn.setAttribute("id", "updateRouteBtn");
        deleteRouteBtn.setAttribute("id", "deleteRouteBtn");
        th6.appendChild(updateRouteBtn);
        th7.appendChild(deleteRouteBtn);

        th1.innerHTML = route.name;
        th2.innerHTML = route.type;
        th3.innerHTML = route.grade;
        th4.innerHTML = route.attempts;
        th5.innerHTML = route.rating;
        newTableRow.appendChild(th1);
        newTableRow.appendChild(th2);
        newTableRow.appendChild(th3);
        newTableRow.appendChild(th4);
        newTableRow.appendChild(th5);
        newTableRow.appendChild(th6);
        newTableRow.appendChild(th7);
        table.appendChild(newTableRow);
      });
    });
  });
}

loadDataFromServer();
