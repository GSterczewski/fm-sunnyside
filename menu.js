class MobileNavigation {
  constructor(elementID, overlayID){
    this.element = document.getElementById(elementID);
    this.overlay = document.getElementById(overlayID);
    this.isVisible = false;
    
  }
  show(){
    this.element.classList.add('header__navigation--visible');
    this.overlay.classList.add('overlay--visible');
    this.overlay.addEventListener("click", this.hide.bind(this))
    this.isVisible = true;
  }
  hide(){
    this.element.classList.remove('header__navigation--visible');
    this.overlay.classList.remove('overlay--visible');
    this.isVisible = false;
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
  const navigation = new MobileNavigation('js-mobile-navigation', 'js-overlay');
  const button = document.getElementById("js-mobile-menu-button");
  button.addEventListener("click", navigation.toggle.bind(navigation));
})