// 图片上传js

//定义jquery写法，$表示选择选择器
function $(selector){
    return document.querySelector(selector);
}

//实现图片预览？？
function handlePreview(){
    const uploadEl = $('#upload');//获取upload节点，具有上传文件的信息files属性，因为标签此处input不是multiple，因此list只有一个
    const previewEl = $('#preview');//上传后的图片id为preview
    // console.log('preview',previewEl)
    uploadEl.addEventListener('change',function(){
        const fileList = this.files; //获取用户上传的files
        console.log("upload后的",fileList)
        const reader = new FileReader();//我们无法获取上传的files的具体信息，因此借助FileReader读取文件
        reader.addEventListener('load',function(){//reader监听load返回文件信息，图片url藏在reader.result中
            console.log('显示图片');
            console.log("reader监听load后的",reader)
            previewEl.src = reader.result;//预览图片标签获取图片url便可展示图片
        });
        reader.readAsDataURL(uploadEl.files[0]);
    })
}

handlePreview();

async function uploadFile(){
    const name = $("#name").value.trim();
    const photographer =$("#photographer").value.trim();
    const desc =$("#desc").value.trim();
    const fileObj =$("#upload").files[0];
    if(!fileObj){
        alert('请选择图片');
        return;
    }
    if(!name){
        alert('请输入名称');
        return;
    }
    if(!photographer){
        alert('请输入拍摄者');
        return;
    }
    if(!desc){
        alert('请输入描述信息');
        return;
    }
    
//构建图片上传表单formdata
const form = new FormData();
form.append("file",fileObj);
form.append("name",name);
form.append("photographer",photographer);
form.append("desc",desc);



//提交formdata
console.log('开始上传',{ fileObj,name,photographer,desc});
try{
    const response = await fetch('/pic/upload',{//联系后端接口
        method:'POST',
        body:form
    });
    console.log('状态码',response.status);
    const result = await response.json();//联系成功后获取json数据
    if(result.success){
        alert("上传成功！");
        window.location.href = 'index.html'
        return;
    }
}catch(e){
    console.error('上传失败',e);
}
alert("上传失败！");
}