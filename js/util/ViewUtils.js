'use strict'

import React,{Component} from 'react'
import {
  TouchableHighlight,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native'


export default class ViewUtils extends Component {
    static getMoreButton(callBack){
        return(
          <TouchableHighlight
            ref='moreMenuButton'
            underlayColor='transparent'
            style={{padding:5}}
            onPress={callBack}>
              <View style={{paddingRight:8}}>
                <Image
                  style={{width:24,height:24,marginLeft:5}}
                  source={require('../../res/images/ic_more_vert_white_48pt.png')}/>
              </View>
            </TouchableHighlight>
        )
    }
}
