var searchButton = document.getElementById("search-btn");
var clearButton = document.getElementById("clear-btn");
var searchTextBox = document.getElementById("search");

searchTextBox.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode == 13) {
      document.getElementById("search-btn").click();
  }
});

searchButton.addEventListener("click", () => {
  var apiRequest = new XMLHttpRequest();
  if (searchTextBox.value === '') {
      document.getElementById("error-message").classList.remove("hidden");
      document.getElementById('user-info').innerHTML = '';
  } else {
      document.getElementById("error-message").classList.add("hidden");
      apiRequest.open('GET', 'https://api.github.com/search/users?q=' + searchTextBox.value + 'in:login');
  }

  apiRequest.onload = () => {
      let apiData = JSON.parse(apiRequest.responseText);
      document.getElementById('user-info').innerHTML = '';
      renderHTML(apiData.items);
  };
  apiRequest.send();
});

clearButton.addEventListener("click", () => {
  document.getElementById('user-info').innerHTML = '';
  document.getElementById("search").value = '';
});

renderHTML = (data) => {
  let container = document.getElementById("user-info");
  let fragElement = document.createDocumentFragment();
  for (i = 0; i < data.length; i++) {
      let mainDiv = document.createElement('div');
      mainDiv.className = "col-md-2";

      let userLink = document.createElement('a');
      userLink.href = "user-details.html?uname=" + data[i].login;
      userLink.text = data[i].login;
      userLink.target = "_blank";
      let userInfo = document.createElement('ul');

      let userName = document.createElement('li');

      let userImage = document.createElement('img');
      userImage.className = "img-responsive";
      userImage.src = data[i].avatar_url;

      mainDiv.appendChild(userInfo);
      userInfo.appendChild(userImage);
      userInfo.appendChild(userName);
      userName.appendChild(userLink);
      fragElement.appendChild(mainDiv);
  }
  container.appendChild(fragElement);
}