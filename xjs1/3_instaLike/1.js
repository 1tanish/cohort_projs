var box= document.querySelector('.box')
var body= document.querySelector('body')
box.addEventListener('dblclick',function(){
    var img= document.createElement('img')
    img.setAttribute('src','h.png')
    img.style.transition='2s ease'
    img.style.height='30px'
    img.style.position='absolute'
    img.style.scale

    setTimeout(()=>{
        img.style.opacity=0
        img.style.scale=0
    },1)

body.appendChild(img)

})