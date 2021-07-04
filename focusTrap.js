export default class FocusTrap {
  constructor(element){
    this.element = element;
    this.focusables = this._getAllFocusables();
    this.currentFocusIndex = 0;
    this.keydownHandler = this._handleKeydown.bind(this);
    this.mouseoverHandler = this._handleMouseover.bind(this);
  };
  
  _getAllFocusables(){
    return Array.from(this.element.childNodes).filter(node => node.tabIndex >= 0);
  };

  _incrementFocusIndex(){
    if(this.currentFocusIndex === this.focusables.length - 1){
      this.currentFocusIndex = 0;
    } else {
      this.currentFocusIndex++;
    }
  };

  _focusNext(){ 
    this._incrementFocusIndex();    
    this._focus(this.currentFocusIndex);
  };
  
  _focus(index){  
    this.focusables[index].focus();  
  };

  _handleMouseover(event){
    const index = this.focusables.findIndex(element => element === event.target);
    if(index >= 0){
      this.currentFocusIndex = index;
      this._focus(index);
    }
  };

  _handleKeydown(event){
    if(event.key === "Tab"){
      event.preventDefault();
      this._focusNext();
    }
  };

  trap = () => {
    this.element.addEventListener("keydown", this.keydownHandler);
    this.element.addEventListener("mouseover", this.mouseoverHandler);
  };

  release = () => {
  
    this.element.removeEventListener("keydown", this.keydownHandler);
    this.element.removeEventListener("mouseover", this.mouseoverHandler);
  };
};