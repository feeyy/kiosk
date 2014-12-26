<!--首页业务事件 -->
<!--开发者：陈劲全（QQ:820094076） 最后编辑时间：2014-10-28 -->

$(document).ready(function(){
	//禁止右键
	$(document).bind("contextmenu",function(){
		return false;
	});
	$(document).bind("selectstart",function(){
		return false;
	});
	
	//开始计时
	timedCount();
	
	
//返回
	$("#goback").click(function(){
		stopCount();
		$("#proinfoid").fadeOut("slow");
		location.href = 'index.html';
	});

//打印回执
	$("#regprint").click(function(){
		c=90;
		//打印机打印内容
		var rq = myDate.getFullYear()+"/"+(myDate.getMonth()+1)+"/"+myDate.getDate()+" "+myDate.toLocaleTimeString();
		
		DriverManager.CleanPrint();//打印内容前要清除打印环境
		
		//LONG L_AddText(LONG m_x1, LONG m_y1, LONG m_FontSize, LPCTSTR m_FontName, LPCTSTR m_PrintText);
		DriverManager.L_AddText(0,45,18,"黑体","力麒自助服务终端演示系统");
		DriverManager.L_AddText(0,70,12,"宋体","您办理的业务是：会员注册申请");
		DriverManager.L_AddText(0,90,12,"宋体","会员ID："+userID);
		DriverManager.L_AddText(0,110,12,"宋体","联系电话："+tel);
		DriverManager.L_AddText(0,150,12,"宋体","打印日期："+rq);
		
		DriverManager.L_AddLogo(0,0,"logo.bmp");
		DriverManager.L_BeginPrint();//执行打印动作
		
		});
		
//取卡
	$("#regquka").click(function(){
		c=90;
		
		});
	
//下一步
	$("#regnext").click(function(){
		c=90;
		
		//步骤判断
		if(zt==2){
		$("#regts").css({"background":"url(images/reg2.jpg)","background-repeat":"no-repeat"});
		$("#dh").flash({src:'images/zhiwen.swf',width:310,height:220});
		$("#proinfotitle").html("第二步：指纹录入...");
		$("#dhtishi").show();
		$("#dhtishi").html("请将手指放置指纹仪上进行登记..");
	//关闭身份证读取
		CancelReadPersonIDCard();
	//开启指纹登记
		Enroll();
		$("#regnext").hide();
			}
			
		if(zt==3){
			$("#regts").css({"background":"url(images/reg3.jpg)","background-repeat":"no-repeat"});
			$("#proinfotitle").html("第三步：请输入联系方式...");
			$("#dh").flash({src:'images/mima.swf',width:310,height:220});
			$("#dhtishi").hide();
			$("#telinfo").show();
			//关闭指纹识别
			SetEnableFingerPrint(0);
			//开启键盘输入
			OpenTheKeyBoard(80);
			$("#regnext").hide();
			}
			
		if(zt==4){
			$("#regts").css({"background":"url(images/reg4.jpg)","background-repeat":"no-repeat"});
			$("#proinfotitle").html("第四步：完成注册...");
			$("#telinfo").hide();
			$("#dhtishi").show();
			$("#dhtishi").html("正在添加用户注册信息...");
			//关闭键盘输入
			CloseTheKeyBoard(30);
			$("#regnext").hide();
			$("#regprint").show();
			$("#regquka").show();
			//二维码生成
			var str = toUtf8("http://www.cnliqi.com/app/atmuser.html?u="+userID);
			$("#dh").css({"left":"20px"});
			$("#dh").html("");
			$("#dh").qrcode({
			render: "canvas",
			width: 200,
			height:200,
			text: str
		});
		
		//保存会员注册信息

			$.post("http://127.0.0.1:8500/app/atmuser.asp?ac=add&userID="+userID+"&sfName="+sname+"&sfNumber="+sfz+"&sfNation="+minz+"&sfBirthday="+shengri+"&sfSex="+sex+"&tel="+tel+"&sfAddress="+dizhi).done(function(){
    		$("#dhtishi").html("<span class='red'>恭喜您，会员注册完成！</span><br>会员ID号："+userID+"<br>您可以：<br>1、点击【返回】登录系统<br>2、打印办理结果回执<br>3、领取会员卡<br>4、手机扫描该二维码，登录会员系统");
			}).fail(function(){
	 		$("#dhtishi").html("添加用户注册信息失败！");
			});

			
			}
			
	});

//页面显示
	$("#proinfoid").fadeIn("slow");
	$("#dhtishi").show();
	$("#telinfo").hide();
	$("#regquka").hide();
	$("#regprint").hide();
	$("body").css({"background":"url(images/bg1.jpg)","background-repeat":"no-repeat"});
	$("#dh").flash({
		src:'images/sfz.swf',width:310,height:220
	});
	$("#proinfotitle").html("第一步：请刷二代身份证...");
	ReadSSidCard(80);
});

//注册步骤
var zt=1;
//用户ID号
var myDate = new Date();
var sjs=parseInt(Math.random()*(9999-1000+1)+1000);
var userID = myDate.getFullYear()+""+(myDate.getMonth()+1)+""+myDate.getDate()+""+myDate.getHours()+""+myDate.getMinutes()+""+myDate.getSeconds()+""+sjs;

//身份证信息
var sname="";
var sfz="";
var sex="";
var minz="";
var shengri="";
var dizhi="";
var tel="";
var fpic="";
var fTemplate="";

//计时器
var c=90;
var t;
function timedCount() 
{
	$("#times").fadeIn("slow");
	$("#times").html(c);
	c=c-1;
	t=window.setTimeout("timedCount()",1000);
	if(c<1){
		stopCount();
		
		location.href = 'index.html';
	}
}
//关闭计时器
function stopCount() 
{
	clearTimeout(t);
	c=90;
	$("#dh").html("");
	$("#times").fadeOut("slow");
	CancelReadPersonIDCard();
	SetEnableFingerPrint(0);
	CloseTheKeyBoard(30);

}

//以下为各设备调用事件

//读神思读卡器，m_TimeOut超时参数。
function ReadSSidCard(m_TimeOut)
{
	DriverManager.ReadSSidCard(m_TimeOut);
}
//取消神思读卡器读卡
function CancelReadPersonIDCard()
{
	DriverManager.CancelReadPersonIDCard();
	
}

function Enroll()  // 点击开始登记
{
   //参数为登记人的ID号
   DriverManager.L_BeginEnroll(userID);
   //RegeditState.value=("开始登记..");

}
function Identification()//指纹验证
{
	DriverManager.Identification();
	//RegeditState.value=("等待指纹输入..");
}
function SetEnableFingerPrint(m_Enable)
{
	DriverManager.SetEnableFingerPrint(m_Enable);
}

//打开密码键盘
function OpenTheKeyBoard(m_TimeOut)
{
	DriverManager.OpenTheKeyBoard(m_TimeOut);
}

//关闭密码键盘
function CloseTheKeyBoard(m_TimeOut)
{
	DriverManager.CloseTheKeyBoard(m_TimeOut);
}

//中文字符转换
function toUtf8(str) {   
    var out, i, len, c;   
    out = "";   
    len = str.length;   
    for(i = 0; i < len; i++) {   
    	c = str.charCodeAt(i);   
    	if ((c >= 0x0001) && (c <= 0x007F)) {   
        	out += str.charAt(i);   
    	} else if (c > 0x07FF) {   
        	out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));   
        	out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	} else {   
        	out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));   
        	out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));   
    	}   
    }   
    return out;   
}  