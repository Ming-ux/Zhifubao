//定义$符号的用法
function $(selector) {
    return document.querySelector(selector);
}


/*在页面中动态追加图片*/
function appendPic(item) {
  // console.log('执行了appendPic',item)
  const {
    name,
    photographer,
    desc,
    picPath
  } = item || {}

  const html = 
  `<li class="photos">
    <img src="./${picPath}" class="imgdisplay"/>
    <h5>${name}</h5>
    <h6>${photographer}</h6>
    <p>${desc}</p>
  </li>`;

  $('#picts').innerHTML += html;
}


async function fetchPics(){
  try{
    const response =await fetch('/data/data.json',{
      method:"GET"
    });
    // console.log('图片返回状态',response.status);
    const result = await response.json();
    // console.log('result',result);

    result.forEach(item =>{
      appendPic(item);
    })
  }catch(e){
    console.error('查询图片发生错误',e);
    alert('查询图片发生错误');
  }
}

fetchPics();

//留言区动态展示
async function fetchComm(){
  try{
    const response =await fetch('/data/comments_data.json',{
      method:"GET"
    });
    console.log('评论返回状态',response.status);
    const result = await response.json();
    console.log('评论result',result);

    result.forEach(item =>{
      appendComm(item);
    })
  }catch(e){
    console.error('查询评论发生错误',e);
    alert('查询评论发生错误');
  }
}
fetchComm();


//动态追加评论
function appendComm(item) {
  console.log('执行了appendComm',item)
  const {
    name,
    comment
  } = item || {}//解构赋值

  const html = 
  `<li class="comment">
    <p class="userword">${comment}</p>
    <span class="theName">${name}</span>
  </li>`;

  $('#comments').innerHTML += html;
}




async function HandleAppendComm(){
  const name = $('#writeName').value.trim()
  const comment = $('#writeComment').value.trim()
  const commentForm = new FormData();
  commentForm.append("name",name)
  commentForm.append("comment",comment)

  //提交评论到后台
  try{
    const response = await fetch('/comm/upload',{
      method:'POST',
      body:commentForm
    })
    console.log('正在上传')
    const result = await response.json()
    if(result.success){
      $('#signal').display=''
      window.location.reload()
      return;
    }
    
  }catch(e){
    alert('留言失败');
    console.log('留言失败',e)
  }
}

//生成随机颜色
//取不到节点呜呜呜

// function changeTrangel () {
//   //生成随机颜色
//   // randomColor = '#'+Math.floor(Math.random()*(2<<23)).toString(16); 
//   // $(".userword").style.color = 'red'
//    document.querySelector('#commentarea').style.backgroundColor = 'red'
//   console.log('@')
// }

// changeTrangel()