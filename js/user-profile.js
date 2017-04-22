var getURLParamValue = (query) => {
    var t = document.URL,
        a = query,
        params = i = j = k = null,
        arr = [];
    params = t.split('?')[1].split('&');
    l = params.length;
    for (i = 0; i < l; i++) {
        k = params[i].split('=');
        arr[k[0]] = k[1];
    }
    return arr[a];
}
var apiAvatar = new XMLHttpRequest();
apiAvatar.open('GET', 'https://api.github.com/users/' + getURLParamValue("uname"));
apiAvatar.onload = function() {
    var apiData = JSON.parse(apiAvatar.responseText);
    renderAvatar(apiData);
};
apiAvatar.send();

function renderAvatar(data) {
    var container = document.getElementById("user-info");
    var fragElement = document.createDocumentFragment();

    // user image
    var userImage = document.createElement('img');
    userImage.className = "img-responsive img-rounded";
    userImage.src = data.avatar_url;

    // user image container
    var imageContainer = document.createElement('div');
    imageContainer.className = "col-md-4";
    imageContainer.appendChild(userImage);
    container.appendChild(imageContainer);

    // user info
    var userName = document.createElement('a');
    userName.className = "user-name";
    userName.href = "user-details.html?uname=" + data.login;
    userName.text = "@" + data.login;

    // user info
    var userFullName = document.createElement('p');
    userFullName.className = "user-name";
    userFullName.innerHTML = data.name;

    // user id
    var userid = document.createElement('p');
    userid.className = "user-type";
    userid.innerHTML = "Id :" + " " + data.id;

    // user type
    var userType = document.createElement('p');
    userType.className = "user-type";
    userType.innerHTML = "Type :" + " " + data.type;

    // user admin
    var userAdmin = document.createElement('p');
    userAdmin.className = "user-type";
    userAdmin.innerHTML = "Site Admin :" + " " + data.site_admin;

    // user company
    var userCompany = document.createElement('p');
    userCompany.className = "user-type";
    userCompany.innerHTML = "Company :" + " " + data.company;

    // user location
    var userLocation = document.createElement('p');
    userLocation.className = "user-type";
    userLocation.innerHTML = "Location :" + " " + data.location;

    //generating user count
    var userCountFollow = document.createElement('p');
    userCountFollow.className = "user-followers";
    userCountFollow.innerHTML = data.followers;

    // generating user count text
    var userCountText = document.createElement('p');
    userCountText.className = "user-type";
    userCountText.innerHTML = "Followers";

    var userCountFollowing = document.createElement('p');
    userCountFollowing.className = "user-followers";
    userCountFollowing.innerHTML = data.following;

    // generating user count text
    var userCountFollowingText = document.createElement('p');
    userCountFollowingText.className = "user-type";
    userCountFollowingText.innerHTML = "Following";

    //creating user counts in li
    var userCount = document.createElement('li');
    userCount.appendChild(userCountFollow);
    userCount.appendChild(userCountText);

    //creating user counts in li
    var userCountFollowingli = document.createElement('li');
    userCountFollowingli.appendChild(userCountFollowing);
    userCountFollowingli.appendChild(userCountFollowingText);

    //creating user repos in li
    var userReposCount = document.createElement('p');
    userReposCount.className = "user-followers";
    userReposCount.innerHTML = data.public_repos;

    // generating user repos text
    var userReposText = document.createElement('p');
    userReposText.className = "user-type";
    userReposText.innerHTML = "Repos";

    //creating user repos counts in li
    var userRepos = document.createElement('li');
    userRepos.appendChild(userReposCount);
    userRepos.appendChild(userReposText);

    //user followers and following counts
    var userCounts = document.createElement('ul');
    userCounts.className = "follow-counts";
    userCounts.appendChild(userCount);
    userCounts.appendChild(userCountFollowingli);
    userCounts.appendChild(userRepos);

    // user info block
    var userInfoBlock = document.createElement('div');
    userInfoBlock.className = "col-md-4 user-info-block";
    userInfoBlock.appendChild(userName);
    userInfoBlock.appendChild(userFullName);
    userInfoBlock.appendChild(userid);
    userInfoBlock.appendChild(userType);
    userInfoBlock.appendChild(userAdmin);
    userInfoBlock.appendChild(userCompany);
    userInfoBlock.appendChild(userLocation);
    userInfoBlock.appendChild(userCounts);
    container.appendChild(userInfoBlock);
    container.appendChild(fragElement);
}

var apiRepo = new XMLHttpRequest();
apiRepo.open('GET', 'https://api.github.com/users/' + getURLParamValue("uname") + '/repos');
apiRepo.onload = function() {
    var repoData = JSON.parse(apiRepo.responseText);
    renderRepo(repoData);
};
apiRepo.send();

function renderRepo(repoData) {
    var container = document.getElementById("user-repos");
    var fragElement = document.createDocumentFragment();
    var repoLabel = document.createElement('h2');
    repoLabel.innerHTML = "Repositories by" + " " + getURLParamValue("uname");

    var mainDiv = document.createElement('div');
    mainDiv.className = "col-md-6 repository-list";
    mainDiv.appendChild(repoLabel);
    for (i = 0; i < repoData.length; i++) {
        var userLink = document.createElement('a');
        userLink.href = "#";
        userLink.text = repoData[i].name;
        mainDiv.appendChild(userLink);
        fragElement.appendChild(mainDiv);
    }
    container.appendChild(fragElement);
}