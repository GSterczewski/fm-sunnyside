class MobileNavigation {
  constructor(elementID){
    this.element = document.getElementById(elementID);
    this.isVisible = false;
  }
  show(){
    this.element.classList.add('mobile-navigation--visible');
  }
  hide(){
    this.element.classList.remove('mobile-navigation--visible');
  }
  toggle(){
    if(this.isVisible){
      this.hide()
      this.isVisible = false;
    } else {
      this.show();
      this.isVisible = true;
    }
  }
}

window.addEventListener("DOMContentLoaded", ()=>{
  const navigation = new MobileNavigation('js-mobile-navigation');
  const button = document.getElementById("js-mobile-menu-button");
  button.addEventListener("click", navigation.toggle.bind(navigation));
})