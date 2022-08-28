document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form")
    console.log(form)
 
 
 form.addEventListener("submit", (e) => {
   e.preventDefault()
   const searchValue = document.getElementById("search").value
 //Remove the spaces whwn a user name is typed
 const userName =searchValue.split(" ").join("")
 console.log(userName)
 
 // Fetch data when fom is submited to search for a user
 fetch(`https://api.github.com/search/users?q=${userName}`)
 .then(response => response.json())
 .then(data => {
     data.items.forEach(item => 
         { console.log(item)
             addUserToDom(item)})
 })
 })
 
 // Displays user profile to the DOM depending on the search
 const addUserToDom = (item) => {
     const userList = document.getElementById('user-list');
     const li = document.createElement('li');
     li.innerHTML = `<p>${item.login}</p>
                      <img src="${item.avatar_url}"/>
                       <p><a href="${item.url}">GitHub Profile Link</a></p>`
 
 userList.appendChild(li)
 li.addEventListener("click",getUserRepositories)
 }
 
 
 //Displays list of users Repos
 const getUserRepositories = () => {
     const user = document.getElementById("search").value    
 fetch(`https://api.github.com/users/${user}/repos`)
 .then(response => response.json())
 .then(data => {
     console.log(data);
  data.forEach(item=>{
   const ul = document.getElementById("repos-list")
   const li = document.createElement("li")
   li.innerText = item.name
   ul.appendChild(li)
 
  })
 
 })
 }
 
 })