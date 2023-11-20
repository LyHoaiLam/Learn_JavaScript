// var postAPI = "https://jsonplaceholder.typicode.com/todos/1"
var postAPI = "https://jsonplaceholder.typicode.com/posts"
fetch(postAPI)
    .then(function(reponse){
        return reponse.json()
        //JSON.parse
    })
    .then(function(posts){//post nhận đc bên này chính là từ Json -> JavaScript types
        // console.log(posts)
        var htmls = posts.map(function(post){
            return `<li>
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            </li>`
        })
        var html = htmls.join('')
        document.getElementById('post-block').innerHTML = html
    })
    .catch(function(err){
        console.log(err)
    })