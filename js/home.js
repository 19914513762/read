const arr=["images/轮播图14.jpg","images/轮播图15.jpg","images/轮播图22.jpg","images/轮播图21.jpg"];
let n=1;
const circle=document.querySelector('.circle');
const img=document.querySelector('.banner img');
const banner=document.querySelector('.banner');
const prev=document.querySelector('.icon-xiangyoujiantou');
const next=document.querySelector('.icon-xiangzuojiantou');
setInterval(()=>{
    n++;
    if(n==5){
        n=1;
    }
    img.src=arr[n-1];
    const re=document.querySelector('.circle .active');
    re.classList.remove('active');
    const li=document.querySelector(`li[data-id='${n}']`)
    li.classList.add('active');
},4000);
circle.addEventListener('click',(e)=>{
    if(e.target.tagName==='LI'){
        const re=document.querySelector('.circle .active');
        re.classList.remove('active');
        e.target.classList.add('active');
        img.src=arr[e.target.dataset.id-1];
        n=e.target.dataset.id;
    } 
});
prev.addEventListener('click',()=>{
    n++;
    if(n==5){
        n=1;
    }
    img.src=arr[n-1];
    const re=document.querySelector('.circle .active');
    re.classList.remove('active');
    const li=document.querySelector(`li[data-id='${n}']`)
    li.classList.add('active');
});
next.addEventListener('click',()=>{
    n--;
    if(n==0){
        n=4;
    }
    img.src=arr[n-1];
    const re=document.querySelector('.circle .active');
    re.classList.remove('active');
    const li=document.querySelector(`li[data-id='${n}']`)
    li.classList.add('active');
    
});