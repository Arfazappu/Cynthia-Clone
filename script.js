
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function homePageAnimate(){
    gsap.registerPlugin(ScrollTrigger);

    var time_line = gsap.timeline();
    time_line.from("#nav",{
        y : '-10',
        opacity:0,
        duration: 2,
        ease: 'Expo.easeInOut'
    })

    time_line.to(".bound_elem",{
        y:0,
        ease:'Expo.easeOut',
        duration:1.3,
        delay:-1,
        stagger:.1
    })
    time_line.from("#home-footer",{
        y:10,
        opacity:0,
        duration:1.1,
        delay:-1,
        ease:'Expo.easeInOut'
    })
}



function squeezemousefollower(){
    var timer = 0 ;
    // define default scale value
    var xscale = 1;
    var yscale = 1;
    // initial mouse value
    var xprev = 0;
    var yprev = 0;
    window.addEventListener('mousemove',function(details){
        this.clearTimeout(timer);

        // when mouse moves  - find difference between previous and current mouse position
        var xdiff = details.clientX - xprev;
        var ydiff = details.clientY - yprev;

        // Clamps a number between a given minimum and maximum. If the number you provide is less than the minimum, it will return the minimum. If it's greater than the maximum, it returns the maximum. If it's between the minimum and maximum, it returns the number unchanged.

        xscale = gsap.utils.clamp(0.8,1.2,xdiff);
        yscale = gsap.utils.clamp(0.8,1.2,ydiff);

        // change x value to current value
        xprev = details.clientX;
        yprev = details.clientY;

        circlemousefollower(xscale,yscale);


        // this is to resolve the problem when mouse stop moving above cleartimer is also for this
        timer = setTimeout(function(){
    document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(1,1)`;

        },100)
        
    })
}

squeezemousefollower();

function circlemousefollower(xscale,yscale){
window.addEventListener('mousemove',function(dets){
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
})
}
circlemousefollower();

homePageAnimate();


// image following mouse
document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener('mouseleave',function(details){
        
        gsap.to(elem.querySelector("img"),{
            opacity:0,
        });
    });

    elem.addEventListener('mousemove',function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate ;
        rotate = details.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease : Power3,
            top : diff,
            left : details.clientX,
            rotate : gsap.utils.clamp(-20,20,diffrot*0.8),
        });
    });
});
