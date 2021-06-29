

class AnimatedText{
  constructor(targetNode){
    this.interval = 0; 
    this.targetNode = targetNode;
    this.currentLetter = 0;
    this.word = [];
  }
  
  createLetter(letter, cssClasses = []){
    const span = document.createElement("span");
    cssClasses.forEach(cssClass => {
      span.classList.add(cssClass);
    })
    if(letter === " "){
      span.innerText = "\u00A0";

    } else {

      span.innerText = letter;
    }
  return span;
  }

  createWord(word){
    return word.split("").map( letter =>this.createLetter(letter,['animated-text']));
  }

  appendText(textArray){
    textArray.forEach(letter => {
      this.targetNode.appendChild(letter)
    })
  }
  animate(text){
    const context = this;
    this.word = this.createWord(text);
    this.appendText(this.word);
      this.interval = setInterval(this.run.bind(context),50);
  }
  run(){
    
    this.word[this.currentLetter].classList.add('animated-text--active');
    this.currentLetter = this.currentLetter + 1;
    if( this.currentLetter >= this.word.length ) this.onComplete();
  }
  onComplete(){
    clearInterval(this.interval);
  }
}
 


window.addEventListener('DOMContentLoaded', ()=>{
  const animatedText = new AnimatedText(document.getElementById('js-animated-text'));
  animatedText.animate('we are creatives');
 
  })