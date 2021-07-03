
const nodes = {
  mainHeader : document.getElementById('js-animated-text'),
  header1 : document.getElementById('js-animated-heading-1'), 
  header2 : document.getElementById('js-animated-heading-2'),
  testimonials : document.getElementsByClassName('testimonial')
   
};
const headings = {
  main : 'We are creatives',
  first: 'Transform your brand',
  second : "Stand out to the right audience"
};

class AnimatedText{
  constructor(targetNode, interval = 50, activeCssClass, staticCssClasses = []){
    this.interval = 0; 
    this.targetNode = targetNode;
    this.currentLetter = 0;
    this.word = [];
    this.staticCssClasses = staticCssClasses;
    this.activeCssClass = activeCssClass;
    this.interval = interval;
  }
  
  createLetter(letter){
    const span = document.createElement("span");
    this.staticCssClasses.forEach(cssClass => {
      span.classList.add(cssClass);
    })
    if(letter === " "){
      span.innerText = "\u00A0";

    } else {

      span.innerText = letter;
    }
  return span;
  }

  createWord(word, splitByWords = false){
    if(splitByWords){
      return word.split(" ").map(letter => letter + " ").map( letter =>this.createLetter(letter));
    }
    return word.split("").map( letter =>this.createLetter(letter));
  }

  appendText(textArray){
    textArray.forEach(letter => {
      this.targetNode.appendChild(letter)
    })
  }
  animate(text, splitByWords = false){
    const context = this;
    this.word = this.createWord(text, splitByWords);
    
    this.appendText(this.word);
      this.interval = setInterval(this.run.bind(context),context.interval);
  }
  run(){
    
    this.word[this.currentLetter].classList.add(this.activeCssClass);
    this.currentLetter = this.currentLetter + 1;
    if( this.currentLetter >= this.word.length ) this.onComplete();
  }
  onComplete(){
    clearInterval(this.interval);
  }
  
}
 

function detectScroll(elementId, callback){
  const scrollBox = document.getElementById(elementId)
  const isWithin = scrollBox.getBoundingClientRect().bottom - 200 <= window.innerHeight;
  
  if(isWithin){
    callback();
  }
};

let isMainHeadingDrawn = false;
let isHeading1Drawn = false;
let isHeading2Drawn = false;
let isTestimonialsSlided = false;

function setupAnimations(){
  if(!isMainHeadingDrawn){
    const animatedHeader = new AnimatedText(nodes.mainHeader,50,'animated-text--active',['animated-text']);
    animatedHeader.animate(headings.main);
    isMainHeadingDrawn = true;
  }
  const animatedHeading = new AnimatedText(nodes.header1,20,'fadein-heading--active',['fadein-heading']);
  const animatedHeading2 = new AnimatedText(nodes.header2,20,'fadein-heading--active',['fadein-heading']);

    const detectScroll1 = () => detectScroll('js-scroll-box-1', ()=>{
      if(!isHeading1Drawn){
        animatedHeading.animate(headings.first);
        isHeading1Drawn = true;
        window.removeEventListener("scroll",detectScroll1);
      }
    });

    const detectScroll2 = () => detectScroll('js-scroll-box-2', ()=>{
      if(!isHeading2Drawn){
        animatedHeading2.animate(headings.second);
        isHeading2Drawn = true;
        window.removeEventListener("scroll",detectScroll2);
      }
    })
    const slideInTestimonials = () => detectScroll('js-testimonials',()=>{
      console.log('reached testimonials')
      if(!isTestimonialsSlided){
       for(let i = 0; i < nodes.testimonials.length; i++){
         nodes.testimonials[i].classList.add("swiping-element");
         nodes.testimonials[i].classList.add(`swiping-element-${i+1}`);

       }
       
      }
      window.removeEventListener("scroll", slideInTestimonials);
    })

    window.addEventListener("scroll", slideInTestimonials);
    window.addEventListener("scroll", detectScroll1);
    window.addEventListener("scroll", detectScroll2);
}


function printFallbackContent(){
    nodes.mainHeader.innerText = headings.main; 
    nodes.header1.innerText = headings.first;
    nodes.header2.innerText = headings.second;
    isMainHeadingDrawn = true;
    isHeading1Drawn = true;
    isHeading2Drawn = true;
}

function animateOrPrintFallback(){
  if(window.innerWidth > 500){
    setupAnimations();
  } else {
    printFallbackContent();
  }
  
}

window.addEventListener("resize", animateOrPrintFallback);
window.addEventListener('DOMContentLoaded', animateOrPrintFallback);
 
