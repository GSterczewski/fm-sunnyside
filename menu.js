class MobileNavigation {
  constructor(elementID){
    this.element = document.getElementById(elementID);
    this.isVisible = false;
    
  }
  show(){
    this.element.classList.add('header__navigation--visible');
    this.isVisible = true;
  }
  hide(){
    this.element.classList.remove('header__navigation--visible');
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
  const navigation = new MobileNavigation('js-mobile-navigation');
  const button = document.getElementById("js-mobile-menu-button");
  button.addEventListener("click", navigation.toggle.bind(navigation));
})