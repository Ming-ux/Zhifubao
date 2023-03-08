const fs = require('fs');
const express = require('express');
const formidable = require('formidable');//接受表单数据
const path = require('path');

const app = new express();

//项目服务器
app.get('/pic/list', (req, res) => {
    const filepath = path.join(__dirname, 'web/data/data.json');
    fs.readFile(filepath, (err, content) => {
        if (err) {
            res.json({ success: false });
            return;
        }
        res.json({ success: true, data: JSON.parse(content) });
    });
});



app.use(express.static('web'));

//接受sumit上传的图片文件
app.post('/pic/upload', (req, res) => {
    //创建表单，{}进行必要的配置
    const form = formidable({
        multiples: true,
        keepExtensions: true,//设置是否保留文件扩展名，默认不保留，此处保留
        uploadDir: path.join(__dirname, 'web/data/pic'),//设置文件储存默认路径
        filename: (name, ext) => {
            return `${name}-${Date.now()}${ext}`
        }
    });
    form.parse(req, (err, fields, files) => {//将请求的报文转为对象格式
        if (err) {
            res.json({ success: false });
            console.log(err);
            return;
        }
        console.log('服务端upload', fields, files);
        const filepath = path.join(__dirname, 'web/data/data.json');//json文件储存地址
        fs.readFile(filepath, (err, content) => {
            if (err) {
                res.json({ success: false });
                return;
            }
            const data = JSON.parse(content);//将json字符串Data变成js格式
            data.push({//往数组对象push新的图片对象
                name: fields.name,
                photographer: fields.phtotgrapher,
                desc: fields.desc,
                picPath: `data/pic/${files.file.newFilename}`
            })
            fs.writeFile(filepath, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    res.json({ success: false });
                    return;
                }
                res.json({ success: true });
            });
        });


    });
});

//接受评论提交
app.post('/comm/upload', (req, res) => {
    //创建表单，{}进行必要的配置
    const form = formidable({
        multiples: true,
        keepExtensions: true,//设置是否保留文件扩展名，默认不保留，此处保留
        // uploadDir: path.join(__dirname, 'web/data/pic'),//设置文件储存默认路径
        // filename: (name, ext) => {
        //     return `${name}-${Date.now()}${ext}`
        // }
    });
    form.parse(req, (err, fields, files) => {//将请求的报文转为对象格式
        if (err) {
            res.json({ success: false });
            console.log(err);
            return;
        }
        console.log('服务端upload', fields, files);
        const filepath = path.join(__dirname, 'web/data/comments_data.json');//json文件储存地址
        fs.readFile(filepath, (err, content) => {
            if (err) {
                res.json({ success: false });
                return;
            }
            const data = JSON.parse(content);//将json字符串Data变成js格式
            data.push({//往数组对象push新的图片对象
                name: fields.name,
                comment: fields.comment,
            })
            fs.writeFile(filepath, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    res.json({ success: false });
                    return;
                }
                res.json({ success: true });
            });
        });


    });
});




app.listen(3000, () => {//默认浏览器3000端口
    console.log('server listening on port:3000');
});