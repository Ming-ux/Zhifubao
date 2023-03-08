## 一些图片上传预览相关的API
- FileReader()和FileReader()

html文件：
```
<div class="file-wrap">
    <label for="upload">
        <img src="./imgs/upload-large.png" id="preview" class="uploadlogo" >
    </label>
    <input id="upload" type="file" accept=".png,.jpg,.jpeg">
</div>
<input multiple type = "file"/>//可上传多个文件


```
js文件
```
const uploadEl = $('#upload');
const previewEl = $('#preview');
uploadEl.addEventListener('change',function(){
    const reader = new FileReader();//reader读取<input>获取的文件result
    reader.addEventListener('load',function(){
        previewEl.src = reader.result;//赋值给<img>url，实现图片预览
    });
    reader.readAsDataURL(uploadEl.files[0]);
})

```

## formidable()
- formidable：一个用于解析表单数据、文件上传的 Node.js 模块。
- path.join('url1','url2','url3')=>"url1/url2/url3" 将多个路径拼合成新路径的方法
