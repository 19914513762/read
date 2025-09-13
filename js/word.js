const button=document.querySelector('#button');
button.addEventListener('click',submitChick);
// 鼠标点击时校验输入的数据是否合法
function submitChick(){
    console.log('llll');
    let title=document.getElementById('title');
    let content=document.getElementById('content');
    if(name.value===''||content.value===''){
        const remind=document.querySelector('.remind');
        remind.innerText='留言主题或内容不得为空!!!';
        remind.classList.add('active');
        setTimeout(()=>{
            remind.classList.remove('active');
        },5000);
    }else{
        parent.location.href = 'mailto:' + '1540597538@qq.com' + '?subject=' + title.value + '' + '&body=' + content.value;
    }
};