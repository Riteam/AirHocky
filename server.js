
var express = require("express")
var app = express()
var server = app.listen(80);
//神TM代码
var io = require('socket.io').listen(server)

app.set('view engine','ejs')
app.set('views','views')

app.use(express.static("./public"))


console.log("服务器启动")


app.get("/",function(req,res){
	res.render('index')
})

var roomOwner=[]
io.on('connection',function(socket){
	socket.on('in',function(data){
		socket.join('GameRoom')
		roomOwner.push(socket.id)
		roomOwner.length=1
		if(io.sockets.adapter.rooms['GameRoom'].length>=2){
			socket.emit('turn',true)
		}
		console.log('当前房主 '+roomOwner)
		console.log(socket.id+' 加入游戏')
	})
	socket.on('game',function(data){
		socket.broadcast.to('GameRoom').emit('game',{'ball':data.ball,'player':data.player})
	})
})
