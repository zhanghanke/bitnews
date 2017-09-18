'use stick'
import React,{Component,PropTypes} from 'react'
import {
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  TouchableWithoutFeedback,
  View,
  Easing,
  Alert,
} from 'react-native'

var noop = () => {};
var {height:SCREEN_HEIGHT,width:SCREEN_WIDTH} = Dimensions.get('window');
var DEFAULT_ARROW_SIZE = new Size(10,5);

function Point(x,y){
  this.x = x;
  this.y = y;
}

function Size(width, height) {
  this.width = width;
  this.height = height;
}

function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

class Popover extends Component {

      constructor(props){
        super(props);
        this.state = this.getInitialState();
        this.measureContent = this.measureContent.bind(this);
      }

      getInitialState() {
        return {
          contentSize: {},
          anchorPoint: {},
          popoverOrigin: {},
          placement: 'auto',
          isTransitioning: false,
          defaultAnimatedValues: {
            scale: new Animated.Value(0),
            translate: new Animated.ValueXY(),
            fade: new Animated.Value(0),
          },
        };
      }
      _startAnimation({show}) {

      }
      componentWillReceiveProps(nextProps) {
        var willBeVisible = nextProps.isVisible;
        var {
          isVisible,
        } = this.props;

        if (willBeVisible !== isVisible) {
          if (willBeVisible) {
            this.setState({contentSize: {}, isAwaitingShow: true});
          } else {
            this._startAnimation({show: false});
          }
        }
      }

    measureContent(x) {
      var {width, height} = x.nativeEvent.layout
      var contentSize = {width, height}
      var geom = this.computeGeometry({contentSize})

      var isAwaitingShow = this.state.isAwaitingShow
      this.setState(Object.assign(geom,
        {contentSize, isAwaitingShow: undefined}), () => {
        isAwaitingShow && this._startAnimation({show: true});
      })
    }

    computeGeometry({contentSize}) {
      var options = {
        displayArea: this.props.displayArea,
        fromRect: this.props.fromRect,
        arrowSize: this.props.arrowSize,
        contentSize,
      }
      return this.computeBottomGeometry(options);
    }

    computeBottomGeometry({displayArea, fromRect, contentSize, arrowSize}) {
      var popoverOrigin = new Point(
        Math.min(displayArea.x + displayArea.width - contentSize.width,
          Math.max(displayArea.x, fromRect.x + (fromRect.width - contentSize.width) / 2)),
        fromRect.y + fromRect.height + arrowSize.height);
      var anchorPoint = new Point(fromRect.x + fromRect.width / 2.0, fromRect.y + fromRect.height);

      return {
        popoverOrigin,
        anchorPoint,
        placement: 'bottom',
      }
    }

    
    render(){
      if (!this.props.isVisible) {
          return null;
      }
      var contentSizeAvailable = this.state.contentSize.width;
      var {popoverOrigin} = this.state;
      var contentMarginRight=this.props.contentMarginRight? this.props.contentMarginRight:0;
      var contentStyle = [styles.content];
      return(
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <View style={styles.container}>
            <Animated.View style={[styles.popover,{top:popoverOrigin.y,left:popoverOrigin.x-contentMarginRight,}]}/>
              <Animated.View ref='content' onLayout={this.measureContent} style={[contentStyle,this.props.contentStyle]}>
                {this.props.children}
              </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )
    }
};

var styles = StyleSheet.create({
  container: {
    opacity: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  containerVisible: {
    opacity: 1,
  },
  background: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    //隐藏背景 backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popover: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  content: {
    borderRadius: 3,
    padding: 6,
    backgroundColor: '#fff',
    shadowColor: 'gray',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.8,
  },
  arrow: {
    position: 'absolute',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});

Popover.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  contentStyle:View.propTypes.style,
}

Popover.defaultProps = {
  isVisible: true,
  displayArea: new Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT),
  arrowSize: DEFAULT_ARROW_SIZE,
  placement: 'auto',
  onClose: noop,
}

export default Popover
