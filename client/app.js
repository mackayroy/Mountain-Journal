var addRouteBtn = document.querySelector("#addRouteBtn");
var signIn = document.querySelector("#signInBtn");
var routeList = [];
var loggedIn = false;

signIn.onclick = function () {
  openModalFunction();
};
// On Click opens modals for sign in
openModalFunction = function () {
  // All the variables for the signIn function
  var switchSignInBtnToUser = document.querySelector("#userSignedIn");
  var signUpTitle = document.querySelector(".signUpTitle");
  var openSignInModal = document.querySelector("#signInModal");
  var openSignUpModal = document.querySelector("#signUpModal");
  openSignInModal.style.display = "flex";
  var closeSignInModal = document.querySelector("#closeSignInModal");
  var closeSignUpModal = document.querySelector("#closeSignUpModal");

  var switchToSignUp = document.querySelector("#SignUpUser");
  var switchToSignIn = document.querySelector("#SignInUser");

  var signInUserBtn = document.querySelector("#signInUserBtn");
  var signUpUserBtn = document.querySelector("#signUpUserBtn");

  // Closing and deleting all the fields
  closeSignInModal.onclick = function () {
    openSignInModal.style.display = "None";
    userEmail.value = "";
    userPasswords.value = "";
  };
  closeSignUpModal.onclick = function () {
    openSignUpModal.style.display = "None";
    userSignUpEmail.value = "";
    userSignUpPasswords.value = "";
    userConfirmSignUpPasswords.value = "";
    userSignUpFirstName.value = "";
    userSignUpLastName.value = "";
    signUpTitle.innerHTML = "Sign Up";
  };
  switchToSignUp.onclick = function () {
    openSignInModal.style.display = "None";
    openSignUpModal.style.display = "Flex";
  };
  switchToSignIn.onclick = function () {
    openSignUpModal.style.display = "None";
    openSignInModal.style.display = "Flex";
  };

  // Post user to server if all the feilds are filled and passwords match
  signUpUserBtn.onclick = function () {
    var userSignUpFirstName = document.querySelector("#userSignUpFirstName");
    var userSignUpLastName = document.querySelector("#userSignUpLastName");
    var userSignUpEmail = document.querySelector("#userSignUpEmail");
    var userSignUpPasswords = document.querySelector("#userSignUpPasswords");
    var userConfirmSignUpPasswords = document.querySelector(
      "#userConfirmSignUpPasswords"
    );
    if (
      userSignUpFirstName.value == "" ||
      userSignUpLastName.value == "" ||
      userSignUpEmail.value == "" ||
      userSignUpPasswords.value == "" ||
      userConfirmSignUpPasswords.value == ""
    ) {
      signUpTitle.innerHTML = "Fill all Fields";
    } else if (userSignUpPasswords.value != userConfirmSignUpPasswords.value) {
      signUpTitle.innerHTML = "Passwords Don't Match";
    } else {
      data = "firstName=" + encodeURIComponent(userSignUpFirstName.value);
      data += "&lastName=" + encodeURIComponent(userSignUpLastName.value);
      data += "&Email=" + encodeURIComponent(userSignUpEmail.value);
      data += "&Password=" + encodeURIComponent(userSignUpPasswords.value);
      fetch("http://localhost:8080/users", {
        credentials: "include",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then(function (response) {
        if (response.status == 201) {
          loadDataFromServer();
          userSignUpEmail.value = "";
          userSignUpPasswords.value = "";
          userConfirmSignUpPasswords.value = "";
          userSignUpFirstName.value = "";
          userSignUpLastName.value = "";
          openSignUpModal.style.display = "None";
        } else if (response.status == 422) {
          signUpTitle.innerHTML = "Email has been Used Already";
        }
      });
    }
  };

  // Sign in Modal and post to Session
  signInUserBtn.onclick = function () {
    var signInTitle = document.querySelector(".signInTitle");
    var userEmailInput = document.querySelector("#userEmail");
    var userPasswordInput = document.querySelector("#userPasswords");
    if (userEmailInput.value == "" || userPasswordInput.value == "") {
      signInTitle.innerHTML = "Please Fill Both Fields";
    } else {
      data = "&Email=" + encodeURIComponent(userEmailInput.value);
      data += "&Password=" + encodeURIComponent(userPasswordInput.value);
      fetch("http://localhost:8080/sessions", {
        credentials: "include",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then(function (response) {
        if (response.status == 201) {
          loadDataFromServer();
          userEmailInput.value = "";
          userPasswordInput.value = "";
          openSignInModal.style.display = "None";
          switchSignInBtnToUser.style.display = "Block";
          signIn.style.display = "None";
        } else if (response.status == 401) {
          signInTitle.innerHTML = "Email or Password is Wrong";
        }
      });
    }
  };
};

// On click this will save a route and be able to POST that route
addRouteBtn.onclick = function () {
  var nameOfRoute = document.querySelector("#nameOfRoute");
  var typeOfRoute = document.querySelector("#rockClimbingTypes");
  var gradeOfRoute = document.querySelector("#rockClimbingGrades");
  var attemptsOnRoute = document.querySelector("#rockClimbingAttemptsID");
  var ratingOfRoute = document.querySelector("#rockClimbingRatingID");
  var userFeedBack = document.querySelector("#userfeedback");
  if (loggedIn) {
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
        credentials: "include",
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
      userFeedBack.innerHTML = "Route Needs Name";
    }
  } else {
    userFeedBack.innerHTML = "Please Sign In";
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

  var modalNameOfRoute = document.querySelector("#modalNameOfRoute");
  var modalTypeOfRoute = document.querySelector("#modalRockClimbingTypes");
  var modalGradeOfRoute = document.querySelector("#modalRockClimbingGrades");
  var modalAttemptsOnRoute = document.querySelector(
    "#modalRockClimbingAttemptsID"
  );
  var modalRatingOfRoute = document.querySelector("#modalRockClimbingRatingID");

  fetch("http://localhost:8080/routes/" + routeId, {
    credentials: "include",
  }).then(function (response) {
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
      credentials: "include",
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
  var text = "Click Ok If You Want To Delete";
  if (confirm(text) == true) {
    data = routeId;
    fetch("http://localhost:8080/routes/" + routeId, {
      credentials: "include",
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
  fetch("http://localhost:8080/routes", {
    credentials: "include",
  }).then(function (response) {
    if (response.status == 401) {
      openModalFunction();
    } else {
      loggedIn = true;

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
          var switchSignInBtnToUser = document.querySelector("#userSignedIn");
          switchSignInBtnToUser.style.display = "Block";
          signIn.style.display = "None";
        });
      });
    }
  });
}

loadDataFromServer();
