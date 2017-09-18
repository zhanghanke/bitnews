'use strict';
import React, {Component} from 'react'
import {
    ListView,
    StyleSheet,
    RefreshControl,
    TouchableHighlight,
    Text,
    Image,
    View,
    Alert,
} from 'react-native'

import StringData from '../../res/data/strings.json'
import NavigationBar from '../common/NavigationBar'
import ViewUtils from '../util/ViewUtils'
import MoreMenu from '../common/MoreMenu'
import {FLAG_TAB} from './HomePage'

export default class HomeDefPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      theme:this.props.theme,
    };
  }

  componentDidMount(){

  }

  componentWillUnmount(){

  }

  renderMoreButton(){
    return (
        <View style={{flexDirection: 'row',}}>
            <TouchableHighlight
                ref='button'
                underlayColor='transparent'
                onPress={()=>{
                    Alert.alert('search');
                }}>
                <View style={{padding:5}}>
                    <Image
                        style={{width: 24, height: 24}}
                        source={require('../../res/images/ic_search_white_48pt.png')}
                    />
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                ref='moreMenuButton'
                underlayColor='transparent'
                style={{padding:5}}
                onPress={() => this.refs.moreMenu.showPopover(this.refs.moreMenuButton)}>
                <View style={{paddingRight:8}}>
                    <Image
                        style={{width: 24, height: 24, marginLeft: 5}}
                        source={require('../../res/images/ic_more_vert_white_48pt.png')}
                    />
                </View>
            </TouchableHighlight>
        </View>)
  }

  renderMoreView() {
      let params = {...this.props, theme: this.state.theme,fromPage:FLAG_TAB.flag_homeTab}
      return <MoreMenu
          {...params}
          ref="moreMenu"
          navigator={this.props.navigator}
          menus={['test1','test2','test3','test4','test5']}
          contentStyle={{right: 20}}
          onMoreMenuSelect={(e)=> {
              Alert.alert('selcct')
          }}
        />
  }


  render(){
    let statusBar = {
      backgroundColor:this.state.theme.themeColor,
    };

    let navigatorBar = <NavigationBar
      title={StringData.tabs.tabHome}
      style={this.state.theme.styles.navBar}
      rightButton={this.renderMoreButton()}
      statusBar={statusBar}
      hide={false}
    />
    return(
      <View style={styles.container}>
          {navigatorBar}
          {
            this.renderMoreView()
          }
      </View>
    )
  }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
