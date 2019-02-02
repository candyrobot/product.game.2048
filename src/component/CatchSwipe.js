import React from 'react';
import Swipeable from 'react-swipeable';
 
class CatchSwipe extends React.Component {

  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    if(deltaX > 0){
      if(deltaY > 0){
        alert('左上');
      }else{
        alert('左下');
      }
    }else{
      if(deltaY > 0){
        alert('右上');
      }else{
        alert('右下');
      }
    }

    console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
  }
 
  swipingUp(e, absX) {
    console.log("You're Swiping to the Up...", e, absX)
  }

  swipingDown(e, absX) {
    console.log("You're Swiping to the Down...", e, absX)
  }

  swipingLeft(e, absX) {
    console.log("You're Swiping to the Left...", e, absX)
  }

  swipingRight(e, absX) {
    console.log("You're Swiping to the Right...", e, absX)
  }
 
  swiped(e, deltaX, deltaY, isFlick, velocity) {
    console.log("You Swiped...", e, deltaX, deltaY, isFlick, velocity)
  }
 
  swipedUp(e, deltaY, isFlick) {
    console.log("You Swiped Up...", e, deltaY, isFlick)
  }

  swipedDown(e, deltaY, isFlick) {
    console.log("You Swiped Down...", e, deltaY, isFlick)
  }

  swipedLeft(e, deltaY, isFlick) {
    console.log("You Swiped Left...", e, deltaY, isFlick)
  }

  swipedRight(e, deltaY, isFlick) {
    console.log("You Swiped Right...", e, deltaY, isFlick)
  }
 
  render() {
    return (
      <Swipeable
        onSwiping={this.swiping}
        onSwipingUp={this.swipingUp}
        onSwipingDown={this.swipingDown}
        onSwipingLeft={this.swipingLeft}
        onSwipingRight={this.swipingRight}
        onSwiped={this.swiped}
        onSwipedUp={this.swipedUp}
        onSwipedDown={this.swipedDown}
        onSwipedLeft={this.swipedLeft}
        onSwipedRight={this.swipedRight}
       >
          {this.props.children}
      </Swipeable>
    )
  }
}

export default CatchSwipe;