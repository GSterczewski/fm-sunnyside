import FocusTrap from "./focusTrap.js";

const nodes = {
  navigation : document.getElementById("js-mobile-navigation"),
  overlay :  document.getElementById("js-overlay"),
  button : document.getElementById("js-mobile-menu-button") 
};


class MobileNavigation {
  constructor(element, overlay){
    this.element = element; 
    this.overlay = overlay;
    this.isVisible = false;
    this.focusTrap = new FocusTrap(this.element); 
    
  }
  show(){
    this.element.classList.add('header__navigation--visible');
    this.overlay.classList.add('overlay--visible');
    this.overlay.addEventListener("click", this.hide.bind(this))
    this.isVisible = true;
    this.focusTrap.trap();
  }
  hide(){
    this.element.classList.remove('header__navigation--visible');
    this.overlay.classList.remove('overlay--visible');
    this.isVisible = false;
    this.focusTrap.release();
  }
  toggle(){
    if(this.isVisible){
      this.hide()
    } else {
      this.show();
    }
  }
  getElement(){
    return this.element;
  }
}



window.addEventListener("DOMContentLoaded", ()=>{
  const navigation = new MobileNavigation(nodes.navigation, nodes.overlay);
  nodes.button.addEventListener("click", navigation.toggle.bind(navigation));
  
})