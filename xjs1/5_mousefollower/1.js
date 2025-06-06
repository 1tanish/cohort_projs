var box= document.querySelector('.box')
var bigb=document.querySelector('.bigb')
bigb.addEventListener('mouseover', function(){
    box.style.scale='200%'
})
bigb.addEventListener('mouseout', function(){
    box.style.scale='100%'
})
document.addEventListener('mousemove', function(dets){
    box.style.position='absolute'
    box.style.top=`${dets.clientY-10}px`
    box.style.left=`${dets.clientX-10}px`
    box.style.transition='0.05s'
    console.log(dets);
    
})

