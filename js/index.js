const logOut=document.querySelector('.logOut');
logOut.addEventListener('click',()=>{
    localStorage.removeItem('用户名');
    location.href="login.html";
});
// 根据子页面的高度调整iframe的高度
function adjustHeight(){
    let iframe=document.getElementById("iframeId");   /*获取iframe这个元素*/
    iframe.height=iframe.contentWindow.document.body.scrollHeight+'px';/*根据iframe子页面的高度调整自身的额高度*/
    const f=document.querySelector('footer');
    if((parseInt(iframe.height)+68)<parseInt(window.innerHeight)){
        f.style.position='absolute';
        f.style.bottom='0';
        f.style.left='0';
    }else{
        f.style.position='relative';
    }
};

// 设置鼠标选中状态
function chick(el){
    let a=document.querySelectorAll('.list');   /*将所有类名为list的元素放到a中*/
    a.forEach(function (item){
        item.classList.remove('active');   /*将所有类名为list的元素都去除选中的状态*/
    });
    el.classList.add('active');   /*单独将鼠标选中的元素设置为选中状态，让其拥有选中时相应的颜色*/
};
function mo(){
    const user=localStorage.getItem('用户名');
    if(user===null){
        document.querySelector('li:nth-of-type(6)').style.display='inline-block';
        document.querySelector('li:nth-of-type(7)').style.display='none';
    }else{
        document.querySelector('li:nth-of-type(6)').style.display='none';
        document.querySelector('li:nth-of-type(7) a').innerText=`欢迎您,${user}`;
        document.querySelector('li:nth-of-type(7)').style.display='inline-block';
    }
};
