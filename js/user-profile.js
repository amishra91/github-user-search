let loadingIcon = document.getElementById("loading-icon");
const getURLParamValue = (query) => {
    let t = document.URL,
        a = query,
        params = i = j = k = null,
        arr = [];
    params = t.split('?')[1].split('&');
    l = params.length;
    for (i = 0; i < l; i++) {
        k = params[i].split('=');
        arr[k[0]] = k[1].replace('#','');
    }
    return arr[a];
}
let apiAvatar = new XMLHttpRequest();
apiAvatar.open('GET', 'https://api.github.com/users/' + getURLParamValue("uname"));
loadingIcon.classList.remove("hidden");
apiAvatar.onload = function() {
    let apiData = JSON.parse(apiAvatar.responseText);
    loadingIcon.classList.add("hidden");
    renderAvatar(apiData);
};
apiAvatar.send();

const renderAvatar = (data) => {
    let container = document.getElementById("user-info");
    let fragElement = document.createDocumentFragment();

    // user image
    let userImage = document.createElement('img');
    userImage.className = "img-responsive";
    userImage.src = data.avatar_url;

    // user image container
    let insideImageContainer = document.createElement('div');
    insideImageContainer.className = "col-md-12 user-name-full";

    // user image container
    let imageContainer = document.createElement('div');
    imageContainer.className = "col-md-3";
    imageContainer.appendChild(userImage);
    container.appendChild(imageContainer);
    imageContainer.appendChild(insideImageContainer);

    // user info
    let userName = document.createElement('a');
    userName.className = "user-name";
    userName.href = data.html_url;
    userName.text = "@" + data.login;

    // user info
    let userFullName = document.createElement('p');
    userFullName.className = "user-name";
    userFullName.innerHTML = (data.name ? data.name : "Name not available");

    // user bio
    let userBio = document.createElement('p');
    userBio.className = "user-type";
    userBio.innerHTML = "Bio :" + " " + (data.bio ? data.bio : "No Information");

    // user email
    let userEmail = document.createElement('p');
    userEmail.className = "user-type";
    userEmail.innerHTML = "Email :" + " " + (data.email ? '<a href="#">'+data.email+'</a>' : "No Information");

    // user blog
    let userBlog = document.createElement('p');
    userBlog.className = "user-type";
    userBlog.innerHTML = "Blog :" + " " + (data.blog ? '<a href='+data.blog+'>'+data.blog+'</a>' : "No Information");

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
    insideImageContainer.appendChild(userName);
    insideImageContainer.appendChild(userFullName);
    userInfoBlock.appendChild(userid);
    userInfoBlock.appendChild(userBio);
    userInfoBlock.appendChild(userEmail);
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

const renderRepo = (repoData) => {
    let container = document.getElementById("user-repos");
    let fragElement = document.createDocumentFragment();
    let repoLabel = document.createElement('h2');
    if (repoData.length > 0) {
        repoLabel.innerHTML = "Repositories by" + " " + repoData[i].owner.login + " " + "(" + repoData.length + ")";
    } else {
        repoLabel.innerHTML = "No Repositories found.";    
    }
    
    container.appendChild(repoLabel);
    for (i = 0; i < repoData.length; i++) {
        let mainDiv = document.createElement('div');
        mainDiv.className = "col-md-4 repository-box";
        
        let userLink = document.createElement('a');
        userLink.href = repoData[i].html_url;
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