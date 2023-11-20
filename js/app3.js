var coursesAPI = "http://localhost:3000/courses"

function start(){
    /*getCourses(function(courses){
        console.log(courses)
        renderCourses(courses)})*/
    getCourses(renderCourses)// dòng này tác dụng như trên
    handleCretaeForm()
}

start()

function getCourses(callback){
    fetch(coursesAPI)
        .then(function(response){// Khi thành công
            return response.json() // nhận thg json ở .then() tiếp theo (bên dưới)
        })
        .then(callback)
}
function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(coursesAPI, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function deleteCourse(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }

    };
    fetch(coursesAPI + "/" + id, options) //Sử dụng postman (nhớ bài trc /id)
        .then(function(response) {
            return response.json();
        })
        .then(function(){
            /*getCourses(renderCourses)/*Gọi lá hàm này de73 render lại sau khi xóa (get lại code rồi render lại code)*/
            var courseItem =  document.querySelector('.course-item-' + id)
            if(courseItem){
                courseItem.remove()
            }
        });
}


function renderCourses(courses){
var listCoursesBlock = document.querySelector('#list-courses')
    var htmls = courses.map(function(course){
        return `<class ="course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="deleteCourse(${course.id})">&times;</button>

        </class>`
    })
    listCoursesBlock.innerHTML = htmls.join('')
}
function handleCretaeForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value; // Corrected attribute selector
        var formData = {
            name: name,
            description: description
        };
        createCourse(formData, function () {
            getCourses(renderCourses);// Load lại list mới cho chúng ta (render lại cả cái list)
        });
    };
}


function updateCourse(id, data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(coursesAPI + "/" + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function renderCourses(courses){
    var listCoursesBlock = document.querySelector('#list-courses')
    var htmls = courses.map(function(course){
        return `<div class="course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button onclick="deleteCourse(${course.id})">&times;</button>
            <button onclick="handleEditCourse(${course.id})">Sửa</button>
        </div>`
    })
    listCoursesBlock.innerHTML = htmls.join('')
}

function handleEditCourse(id) {
    var name = prompt('Nhập tên khóa học mới:');
    var description = prompt('Nhập mô tả khóa học mới:');
    var formData = {
        name: name,
        description: description
    };
    updateCourse(id, formData, function () {
        getCourses(renderCourses);
    });
}



// function createCourse(data, callback){
//     var options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)//data là dữ liệu gửi đi
//     }
//     fetch(coursesAPI, options)
//         .then(function(response){
//             response.json()
//         })
//         .then(callback)
// }


// function handleCretaeForm(){

//     var createBtn = document.querySelector('#create')
//     // lắng nghe
//     createBtn.onclick = function(){
//         // alert()
//         var name =  document.querySelector('input[name="name"]').value
//         var description =  document.querySelector('input[description="description"]').value
//         //Khi click vào thì gọi tới
//         var formData = {
//             name: name,
//             description: description
//         }
//         createCourse(formData)
//         console.log(name)
//         console.log(description)


//     }
// }

