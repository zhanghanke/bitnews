'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native'

import Popover from "../common/Popover";

export default class MoreMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible:false,
      buttonRect:{},
    }
  }

  showPopover(anchorView){
    if (!anchorView) {
        return
    }
    anchorView.measure((ox, oy, width, height, px, py) => {
        this.setState({
            isVisible: true,
            buttonRect: {x: px, y: py, width: width, height: height}
        });
    });
  }

  closePopover(){
    this.setState({
        isVisible: false,
    });
  }

  onMoreMenuSelect(tab){
    Alert.alert('onMoreMenuSelect:'+tab)
  }

  render(){
    let view = <Popover
        isVisible={this.state.isVisible}
        fromRect={this.state.buttonRect}
        placement="bottom"
        onClose={()=>this.closePopover()}
        contentStyle={{opacity:0.82,backgroundColor:'#343434'}}
        contentMarginRight={20}
    >
        <View style={{alignItems: 'center',}}>
            {this.props.menus.map((result, i, arr) => {
                return <TouchableHighlight key={i} onPress={()=>this.onMoreMenuSelect(arr[i])}
                                           underlayColor='transparent'>
                    <Text
                        style={{fontSize: 18,color:'white', padding: 8, fontWeight: '400'}}>
                        {arr[i]}
                    </Text>
                </TouchableHighlight>
            })
            }
        </View>
    </Popover>;
    return view;
  }
}
