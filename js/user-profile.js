let getURLParamValue = (query) => {
    let t = document.URL,
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
let apiAvatar = new XMLHttpRequest();
apiAvatar.open('GET', 'https://api.github.com/users/' + getURLParamValue("uname"));
apiAvatar.onload = function() {
    let apiData = JSON.parse(apiAvatar.responseText);
    renderAvatar(apiData);
};
apiAvatar.send();

renderAvatar = (data) => {
    let container = document.getElementById("user-info");
    let fragElement = document.createDocumentFragment();

    // user image
    let userImage = document.createElement('img');
    userImage.className = "img-responsive img-rounded";
    userImage.src = data.avatar_url;

    // user image container
    let imageContainer = document.createElement('div');
    imageContainer.className = "col-md-4";
    imageContainer.appendChild(userImage);
    container.appendChild(imageContainer);

    // user info
    let userName = document.createElement('a');
    userName.className = "user-name";
    userName.href = "user-details.html?uname=" + data.login;
    userName.text = "@" + data.login;

    // user info
    let userFullName = document.createElement('p');
    userFullName.className = "user-name";
    userFullName.innerHTML = data.name;

    // user blog
    let userBlog = document.createElement('p');
    userBlog.className = "user-type";
    userBlog.innerHTML = "Blog :" + " " + (data.blog ? data.blog : "No Information");

    // user id
    let userid = document.createElement('p');
    userid.className = "user-type";
    userid.innerHTML = "Id :" + " " + data.id;

    // user type
    let userType = document.createElement('p');
    userType.className = "user-type";
    userType.innerHTML = "Type :" + " " + (data.type ? data.type : "No Information");

    // user admin
    let userAdmin = document.createElement('p');
    userAdmin.className = "user-type";
    userAdmin.innerHTML = "Site Admin :" + " " + (data.site_admin ? data.site_admin : "No");

    // user company
    let userCompany = document.createElement('p');
    userCompany.className = "user-type";
    userCompany.innerHTML = "Company :" + " " + (data.company ? data.company : "No Information");

    // user location
    let userLocation = document.createElement('p');
    userLocation.className = "user-type";
    userLocation.innerHTML = "Location :" + " " + (data.location ? data.location : "No Information");

    //generating user count
    let userCountFollow = document.createElement('p');
    userCountFollow.className = "user-followers";
    userCountFollow.innerHTML = data.followers;

    // generating user count text
    let userCountText = document.createElement('p');
    userCountText.className = "user-type";
    userCountText.innerHTML = "Followers";

    let userCountFollowing = document.createElement('p');
    userCountFollowing.className = "user-followers";
    userCountFollowing.innerHTML = data.following;

    // generating user count text
    let userCountFollowingText = document.createElement('p');
    userCountFollowingText.className = "user-type";
    userCountFollowingText.innerHTML = "Following";

    //creating user counts in li
    let userCount = document.createElement('li');
    userCount.appendChild(userCountFollow);
    userCount.appendChild(userCountText);

    //creating user counts in li
    let userCountFollowingli = document.createElement('li');
    userCountFollowingli.appendChild(userCountFollowing);
    userCountFollowingli.appendChild(userCountFollowingText);

    //creating user repos in li
    let userReposCount = document.createElement('p');
    userReposCount.className = "user-followers";
    userReposCount.innerHTML = data.public_repos;

    // generating user repos text
    let userReposText = document.createElement('p');
    userReposText.className = "user-type";
    userReposText.innerHTML = "Repos";

    //creating user repos counts in li
    let userRepos = document.createElement('li');
    userRepos.appendChild(userReposCount);
    userRepos.appendChild(userReposText);

    //user followers and following counts
    let userCounts = document.createElement('ul');
    userCounts.className = "follow-counts";
    userCounts.appendChild(userCount);
    userCounts.appendChild(userCountFollowingli);
    userCounts.appendChild(userRepos);

    // user info block
    let userInfoBlock = document.createElement('div');
    userInfoBlock.className = "col-md-6 user-info-block";
    userInfoBlock.appendChild(userName);
    userInfoBlock.appendChild(userFullName);
    userInfoBlock.appendChild(userid);
    userInfoBlock.appendChild(userBlog);
    userInfoBlock.appendChild(userType);
    userInfoBlock.appendChild(userAdmin);
    userInfoBlock.appendChild(userCompany);
    userInfoBlock.appendChild(userLocation);
    userInfoBlock.appendChild(userCounts);
    container.appendChild(userInfoBlock);
    container.appendChild(fragElement);
}

let apiRepo = new XMLHttpRequest();
apiRepo.open('GET', 'https://api.github.com/users/' + getURLParamValue("uname") + '/repos');
apiRepo.onload = function() {
    let repoData = JSON.parse(apiRepo.responseText);
    renderRepo(repoData);
};
apiRepo.send();

renderRepo = (repoData) => {
    let container = document.getElementById("user-repos");
    let fragElement = document.createDocumentFragment();
    let repoLabel = document.createElement('h2');
    repoLabel.innerHTML = "Repositories by" + " " + getURLParamValue("uname");
    container.appendChild(repoLabel);
    for (i = 0; i < repoData.length; i++) {
        let mainDiv = document.createElement('div');
        mainDiv.className = "col-md-4 repository-box";
        
        let userLink = document.createElement('a');
        userLink.href = "#";
        userLink.text = repoData[i].name;

        let repoDesc = document.createElement('p');
        repoDesc.innerHTML = (repoData[i].description ? repoData[i].description : "No Description Available" );

        let repoLangIcon = document.createElement('span');
        repoLangIcon.className = "repo-lang-icon";

        let repoLang = document.createElement('p');
        repoLang.innerHTML = '<span class="repo-lang-icon"></span>' + (repoData[i].language ? repoData[i].language : "No Information Available" );
        

        mainDiv.appendChild(userLink);
        mainDiv.appendChild(repoDesc);
        mainDiv.appendChild(repoLang);
        fragElement.appendChild(mainDiv);
    }
    container.appendChild(fragElement);
}