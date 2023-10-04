document.addEventListener("DOMContentLoaded", () => {

    const searchForm = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const repoList = document.getElementById("repos-list");
  
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = searchInput.value.trim();
  
      if (username) {
        searchGitHubUser(username);
      }
    });
  
    function searchGitHubUser(username) {
      // Clear previous search results
      userList.innerHTML = "";
      repoList.innerHTML = "";
  
      // Fetch user data using GitHub User Search Endpoint
      fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((userInfo) => {
          displayUserData(userInfo);
          getUserRepos(username);
        })
       
    }
  
    function getUserRepos(username) {
      // Fetch user's repositories using GitHub User Repos Endpoint
      fetch(`https://api.github.com/users/${username}/repos`)
        .then((res) => res.json())
        .then((reposData) => {
          displayUserRepos(reposData);
        })
       
    }
  
    function displayUserData(userInfo) {
      // Create a user card and display user information
      const userCard = document.createElement("div");
      userCard.className = "user-card";
      userCard.innerHTML = `
        <h2>${userInfo.login}</h2>
        <img src="${userInfo.avatar_url}" alt="${userInfo.login}'s avatar">
        <a href="${userInfo.html_url}" target="_blank">View My Profile</a>
      `;
      userList.appendChild(userCard);
    }
  
    function displayUserRepos(reposData) {
      // Display user's repositories
      if (reposData.length === 0) {
        repoList.innerHTML = "<p>No repositories found.</p>";
      } else {
        const repoHeading = document.createElement("h3");
        repoHeading.textContent = "Repositories:";
        repoList.appendChild(repoHeading);
  
        const repoListUl = document.createElement("ul");
        reposData.forEach((repo) => {
          const repoItem = document.createElement("li");
          repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
          repoListUl.appendChild(repoItem);
        });
        repoList.appendChild(repoListUl);
      }
    }
  });
  