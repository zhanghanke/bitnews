import React,{Component} from 'react'
import {
  StyleSheet,
  Image,
  View,
} from 'react-native'

import TabNavigator from 'react-native-tab-navigator'
import HomeDefPage from './HomeDefPage'
import IMPage from './ImPage'
import MarketPage from './MarketPage'
import MyPage from './MyPage'
import StringData from '../../res/data/strings.json'
import ThemeDao,{ThemeFlags} from '../expand/ThemeDao'

export var FLAG_TAB = {
  flag_homeTab:'flag_homeTab',
  flag_marketTab:'flag_marketTab',
  flag_imTab:'flag_imTab',
  flag_myTab:'flag_myTab',
}

export var TABICON = {
  homeIcon:require('../../res/images/ic_polular.png'),
  marketIcon:require('../../res/images/ic_trending.png'),
  imIcon:require('../../res/images/ic_favorite.png'),
  myIcon:require('../../res/images/ic_my.png'),
}
export default class HomePage extends Component {
    constructor(props){
      super(props)

      let selectedTab = this.props.selectedTab ? this.props.selectedTab : FLAG_TAB.flag_homeTab;
      this.state = {
        selectedTab:selectedTab,
        theme:ThemeDao.getTheme(ThemeFlags.BlueGrey),
      };
    }

    onSelected(object) {
      this.setState({
          selectedTab: object
        })
    }

    _renderTab(ComTab,selectedTab,title,renderIcon,selectedRenderIcon){
      return(
          <TabNavigator.Item
          selected={this.state.selectedTab===selectedTab}
          title={title}
          selectedTitleStyle={this.state.theme.styles.selectedTitleStyle}
          renderIcon={() => <Image style={styles.tabBarIcon}
                                   source={renderIcon}/>}
          renderSelectedIcon={() => <Image
              style={[styles.tabBarSelectedIcon, this.state.theme.styles.tabBarSelectedIcon]}
              source={renderIcon}/>}
          onPress={() => this.onSelected(selectedTab)}>
            <ComTab {...this.props}  theme={this.state.theme} homeComponent={this}/>
        </TabNavigator.Item>
      )
    }
    render(){
      return (
        <View style={styles.container}>
          <TabNavigator
            tabBarStyle={{opacity:0.9}}
            sceneStyle={{paddingBottom:0}}>
            {this._renderTab(HomeDefPage,FLAG_TAB.flag_homeTab,StringData.tabs.tabHome,TABICON.homeIcon,TABICON.homeIcon)}
            {this._renderTab(MarketPage,FLAG_TAB.flag_marketTab,StringData.tabs.tabMarket,TABICON.marketIcon,TABICON.marketIcon)}
            {this._renderTab(IMPage,FLAG_TAB.flag_imTab,StringData.tabs.tabIM,TABICON.imIcon,TABICON.imIcon)}
            {this._renderTab(MyPage,FLAG_TAB.flag_myTab,StringData.tabs.tabMy,TABICON.myIcon,TABICON.myIcon)}
          </TabNavigator>
        </View>)
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  tabBarIcon:{
    width:26,
    height:26,
    resizeMode:'contain',
  },
  tabBarSelectedIcon:{
    width:26,
    height:26,
    resizeMode:'contain',
  }
})
