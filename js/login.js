const container=document.querySelector('.container');
const cover=document.querySelector('.cover');
const show=document.querySelector('.show');
const showPassword=document.querySelector('.showPassword');
const showEnterPassword=document.querySelector('.showEnterPassword');
let dir=true;
function verify(name){
    const reg=/^[\u4e00-\u9fa5a-zA-Z0-9]{3,12}$/;
    if(reg.test(name)){
        return true;
    }
    return false;
}
container.addEventListener('click',(e)=>{
    let reg=/iconfont/;
    if(e.target.tagName==='BUTTON'){
        const reg=/registerButton/;
        if(!reg.test(e.target.className)){
            e.preventDefault();
            if(dir===true){
                const login=document.querySelectorAll("[data-id='3']");
                if(login[0].value!==null&&login[1]!==null){
                    const password=localStorage.getItem(login[0].value);
                    if(password===login[1].value){
                        localStorage.setItem('用户名',login[0].value);
                        e.target.parentElement.parentElement.reset();
                        location.href="index.html";
                    }else{
                        const remind=document.querySelector('.remind');
                        remind.innerText='账号或密码不存在!!!';
                        remind.classList.add('active');
                        setTimeout(()=>{
                            remind.classList.remove('active');
                        },5000);
                    }
                }
            }else{
                const register=document.querySelectorAll("[data-id='1']");
                const enter=document.querySelector('[name=enterPassword]');
                const remind=document.querySelector('.remind');
                if(verify(register[0].value)&&verify(register[1].value)&&enter.value===register[1].value){
                    localStorage.setItem(register[0].value,register[1].value);
                    e.target.parentElement.parentElement.reset();
                    remind.innerText='注册成功!!!';
                    remind.classList.add('active');
                }else{
                    remind.innerText='注册失败!!!';
                    remind.classList.add('active');
                }
                setTimeout(()=>{
                    remind.classList.remove('active');
                },5000);
            }
        }else{
            cover.classList.remove('leftActive');
            cover.classList.remove('rightActive');
            if(dir===true){
                cover.classList.add('leftActive');
                dir=false;
                e.target.innerText='我要登录';
                show.style.opacity='0';
                showPassword.style.opacity='100%';
                showEnterPassword.style.opacity='100%';
            }else{
                cover.classList.add('rightActive');
                dir=true;
                e.target.innerText='我要注册';
                show.style.opacity='100%';
                showPassword.style.opacity='0';
                showEnterPassword.style.opacity='0';
            } 
        }
    }else if(e.target.tagName==='DIV'&&reg.test(e.target.className)){
        const input=e.target.parentElement.children[1];
        const reg=/icon-yanjing-bi/;
        if(reg.test(e.target.className)){
            input.type='text';
            e.target.classList.remove('icon-yanjing-bi');
            e.target.classList.add('icon-yanjing-chakan');
        }else{
            input.type='password';
            e.target.classList.remove('icon-yanjing-chakan');
            e.target.classList.add('icon-yanjing-bi');
        }
    }else if(e.target.tagName='INPUT'){
        if(e.target.dataset.id==='1'){
            const p=e.target.nextElementSibling;
            e.target.addEventListener('change',()=>{
                if(verify(e.target.value)){
                    p.style.opacity='0';     
                }else{
                    p.style.opacity='100%';
                }
            })
        }else if(e.target.dataset.id==='2'){
            const password=document.querySelector('.left input[name=password]').value;
            const enterPassword=document.querySelector('[name=enterPassword]');
            const p=enterPassword.nextElementSibling;
            enterPassword.addEventListener('change',()=>{
                if(enterPassword.value===password){
                    p.style.opacity='0';
                }else{
                    p.style.opacity='100%';
                }
            })
        }else{
            const p=e.target.nextElementSibling;
            e.target.addEventListener('change',()=>{
                if(e.target.value!==''){
                    p.style.opacity='0';     
                }else{
                    p.style.opacity='100%';
                }
            })
        }
    }
})
const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');
cvs.width = window.innerWidth * window.devicePixelRatio;
cvs.height = window.innerHeight * window.devicePixelRatio;

/**
 * 获取[min, max]范围内的随机整数
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

class Point {
  constructor() {
    this.r = 6;
    this.x = getRandom(0, cvs.width - this.r / 2);
    this.y = getRandom(0, cvs.height - this.r / 2);
    this.xSpeed = getRandom(-100, 100);
    this.ySpeed = getRandom(-100, 100); // 每秒钟移动的速度
    // 记录上一次作画的时间 - 知道每一个小段时间的间隔, 计算出移动距离
    this.lastDrawTime = null;
  }
  draw() {
    // 更新坐标
    if (this.lastDrawTime) {
      // 计算新的坐标
      const duration = (Date.now() - this.lastDrawTime) / 1000;
      // 距离
      const xDis = this.xSpeed * duration,
        yDis = this.ySpeed * duration;

      // 计算出新的x和y的坐标
      let x = this.x + xDis,
        y = this.y + yDis;

      // 判断边界
      if (x > cvs.width - this.r / 2) {
        x = cvs.width - this.r / 2;
        this.xSpeed = -this.xSpeed; // 正的变负的 负的变正的
      } else if (x < 0) {
        x = 0;
        this.xSpeed = -this.xSpeed;
      }

      if (y > cvs.height - this.r / 2) {
        y = cvs.height - this.r / 2;
        this.ySpeed = -this.ySpeed; // 正的变负的 负的变正的
      } else if (y < 0) {
        y = 0;
        this.ySpeed = -this.ySpeed;
      }

      this.x = x;
      this.y = y;
    }
    ctx.beginPath();
    // 画一个圆
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
    ctx.fill();
    this.lastDrawTime = Date.now();
  }
}

class Graph {
  /**
   *
   * @param {number} pointNumber 点的个数
   * @param {number} maxDis 两个点直接的最大距离
   */
  constructor(pointNumber = 100, maxDis = 200) {
    // 生成一系列的点
    this.points = new Array(pointNumber).fill(0).map(() => new Point());
    this.maxDis = maxDis;
  }
  draw() {
    requestAnimationFrame(() => {
      this.draw();
    });
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i];
      p1.draw();
      // 跟后面的点相连
      for (let j = i + 1; j < this.points.length; j++) {
        const p2 = this.points[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.closePath();
        // 利用勾股定理计算出两个点之间的距离  **是指数运算符 Math.sqrt()开根号
        const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        if (d > this.maxDis) {
          continue; // 看下一个点
        }
        ctx.strokeStyle = `rgba(200, 200,200, ${1 - d / this.maxDis})`;
        ctx.stroke();
      }
      // 两个点它们的距离越远, 颜色就越透明, 越近颜色就越不透明
      // 让点运动起来
    }
  }
}

// 画直线
// ctx.beginPath()
// ctx.moveTo(100, 50)
// ctx.lineTo(200, 100)
// ctx.closePath()
// ctx.strokeStyle = '#fff'
// // 描边
// ctx.stroke()

// ctx.beginPath()
// // 画一个圆
// ctx.arc(100, 50, 6, 0, 2 * Math.PI)
// ctx.fillStyle = '#fff'
// ctx.fill()

// ctx.beginPath()
// // 画一个圆
// ctx.arc(200, 100, 6, 0, 2 * Math.PI)
// ctx.fillStyle = '#fff'
// ctx.fill()

// const p1 = new Point()
// const p2 = new Point()
// p1.draw()
// p2.draw()

const g = new Graph();
g.draw();
