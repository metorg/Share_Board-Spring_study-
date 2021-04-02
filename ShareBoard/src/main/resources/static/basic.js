let targetId;
let post_id;
function time2str(date) {
    let today = new Date()
    let time = (today - date) / 1000 / 60  // 분

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60  // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
        return parseInt(time) + "일 전"
    }
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

$(document).ready(function () {
    getPosts();
    getReply();
})

function getReply() {
    $.ajax({
        type: 'GET',
        url: '/api/replys',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let reply = response[i];
                let id=reply.id;
                let name = reply.name;
                let contents = reply.contents;
                let modifiedAt = new Date(reply.modifiedAt);
                let posts_id=reply.post_id;

                if(post_id==posts_id) {

                    addreplyHtml(id, name, contents, time2str(modifiedAt));
                }
            }
        }
    })
}

function addreplyHtml(id,name, contents, modifiedAt) {
    // 1. HTML 태그를 만듭니다.
    let nickname =$('#login_name').text();
    let tempHtml;
    if(nickname==name) {
        tempHtml = `               
           <div class="reply_list_top" id="reply_list_top">
                <div id="reply-${id}"
                <div class="reply_contents">${contents}</div>
                <div class="reply_date">${modifiedAt}</div>
                <div class="reply_name">${name}</div>
                </div>
                <textarea id="reply-repair-${id}"></textarea>
                <button >수정</button>
                <button >삭제</button>
                <hr>
            </div>`;
    }
    else {
        tempHtml = `               
           <div class="reply_list_top" id="reply_list_top">
                <div class="reply_contents">${contents}</div>
                <div class="reply_date">${modifiedAt}</div>
                <div class="reply_name">${name}</div> 
            </div>`;
    }
    // 2. #cards-box 에 HTML을 붙인다.
    $('#reply_list_box').append(tempHtml);
}
function submitEdit(id) {
    // 1. 작성 대상 메모의 username과 contents 를 확인합니다.

    let contents = $(`#reply-repair-${id}`).val().trim();

    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }

    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'username': username, 'contents': contents};

    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/memos/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지 변경에 성공하였습니다.');
            window.location.reload();
        }
    });
}

function getPosts() {
    $.ajax({
        type: 'GET',
        url: '/api/posts',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let post = response[i];
                let id = post.id;
                let name = post.name;
                let title = post.title;
                let modifiedAt = new Date(post.modifiedAt);

                addHTML(i+1,id, name, title, time2str(modifiedAt));

            }
        }
    })
}
function addHTML(number,id, name, title, modifiedAt) {

        let tempHtml = `<div>
                    <div class = "num" >${number}</div>
                <div class="title"><a href="detail.html?id=${id}">${title}</a></div>
                <div class="writer">${name}</div>
                <div class="date">${modifiedAt}</div>
                <div class="count">33</div>
            </div>`;



$('#board_list').append(tempHtml);
}
function isValidContents(contents) {
if (contents == '') {
alert('내용을 입력해주세요');
return false;
}
if (contents.trim().length > 140) {
alert('공백 포함 140자 이하로 입력해주세요');
return false;
}
return true;
}

function isValidtitle(title) {
if (title == '') {
alert('내용을 입력해주세요');
return false;
}
if (title.trim().length > 140) {
alert('공백 포함 30자 이하로 입력해주세요');
return false;
}
return true;
}

function isValidname(name) {
if (name == '') {
alert('작성자를 입력해주세요');
return false;
}
if (name.trim().length > 140) {
alert('공백 포함 20자 이하로 입력해주세요');
return false;
}
return true;
}
function getDetail(id) {
    post_id=id;
    $.ajax({
    type: 'GET',
    url: '/api/detail/' + id,
    success: function (post) {
    let id = post.id;
    let name = post.name;
    let title = post.title;
    let modifiedAt = new Date(post.modifiedAt);
    let contents = post.contents;
    addHTML2(id, name, title, contents, time2str(modifiedAt));

}
})
}

function addHTML2(id, name, title, contents, modifiedAt) {
// 1. HTML 태그를 만듭니다.

    let tempHtml = `
                    <header class="view_title">
                    <div class="title">${title}</div>
                    <div class="name">${name}</div>
                    <div class="date">${modifiedAt}</div>
                    
                    <img id="${id}" onclick="editPost('${id}')" class="icon-start-edit" src="images/edit.png" alt="">
                    </header>
                    
                    
                    <div class="view_cont">
                    <div class="text">
                    ${contents}
            </div>
            
            </div>

`
$('#boardView').append(tempHtml);
}

function deleteOne(id) {
$.ajax({
type: "DELETE",
url: `/api/posts/${id}`,
success: function (response) {
alert('메시지 삭제에 성공하였습니다.');
window.location.reload();
}
})
}
function writeReply() {

let contents = $('#reply_input').val();
let name =$('#login_name').text();


let data = {'post_id':post_id,'name': name, 'contents': contents};

$.ajax({
type: "POST",
url: "/api/replys",
contentType: "application/json", // JSON 형식으로 전달함을 알리기
data: JSON.stringify(data),
success: function (response) {
alert('메시지가 성공적으로 작성되었습니다.');
window.location.reload();
}
});
}
function writePost() {

let title = $('#title_write').val();
let name =$('#login_name').text();
let contents = $('#contents_write').val();
if (isValidtitle(title) == false) return;
if (isValidContents(contents) == false) return;


let data = {'name': name, 'title': title, 'contents': contents};

$.ajax({
type: "POST",
url: "/api/posts",
contentType: "application/json", // JSON 형식으로 전달함을 알리기
data: JSON.stringify(data),
success: function (response) {
alert('메시지가 성공적으로 작성되었습니다.');
window.location.href="main.html";
}
});
}
