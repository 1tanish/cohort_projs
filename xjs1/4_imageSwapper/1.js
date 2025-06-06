var but = document.querySelector(".but")
but.innerHTML="<h1 class='font-mono text-[2vw]'>Image Swap</h1>"

but.addEventListener('click',() => {
    img1=document.querySelector('.img1')
    img1src=img1.getAttribute('src')
    img2=document.querySelector('.img2')
    img2src=img2.getAttribute('src')

    img1.setAttribute('src',img2src)
    img2.setAttribute('src',img1src)
})