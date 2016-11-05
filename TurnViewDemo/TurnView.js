/**
 * Created by luxtmxw on 16/11/5.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
} from 'react-native';

//引入计时器
var timer = require('react-timer-mixin');
//引入json数据
var ImageData = require('./ImageData.json');
var Dimensions = require('Dimensions');
var kScreenWidth = Dimensions.get('window').width;
var kScreenHeight = Dimensions.get('window').height;


var TurnView = React.createClass({
    mixins: [timer],

    getDefaultProps(){
        return{
          duration: 2000
        };
    },
//设置可变初始值
    getInitialState(){
        return{
            currentPage:0
        };
    },
    //实现复杂操作
    componentDidMount(){
        //开启定时器
        this.startTime();
    },

    //开启定时器
    startTime() {
        var scrollView = this.refs.scrollView;
        var pageLength = ImageData.data.length;
        var curPage = 0;
         this.timer = this.setInterval(function(){

            if (this.state.currentPage + 1 >= pageLength) {
                curPage = 0;
            }else {
                curPage = this.state.currentPage + 1;
            }

            this.setState({
                currentPage: curPage
            });

            scrollView.scrollResponderScrollTo({x: kScreenWidth*curPage,y:0,animated:true});

        },this.props.duration);
    },

    //关闭定时器
    endTime() {
         this.clearInterval(this.timer);
    },

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <ScrollView
                    ref='scrollView'
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                    onScrollBeginDrag={this.onStartDrag}
                    onScrollEndDrag={this.onEndDrag}
                     >
                        {this.renderAllImage(ImageData)}
                    </ScrollView>

                    {/*指示器*/}
                    <View style={styles.pageViewStyle}>
                        {/*返回圆点*/}
                        {this.renderPagecircle()}
                    </View>
                </View>
            </View>
        );
    },

    //返回图片
    renderAllImage(data){
        //数组
        var allImage = [];
        var imgArr = data.data;
        for(var i=0;i<imgArr.length;i++){
            var imgItem = imgArr[i];
            allImage.push(
                <Image key={i} source={{uri: imgItem.img}} style={{width:kScreenWidth, height: 120}} />
            );
        }
        return allImage;
    },

    //返回圆点
    renderPagecircle(){
        var circleArr = [];
        var colorV;
        var imgArr = ImageData.data;
        for(var i=0; i<imgArr.length; i++) {
            colorV = (i==this.state.currentPage) ? 'orange' : '#ffffff';
            circleArr.push(
                <Text key={i} style={{fontSize:25, color: colorV}}>&bull;</Text>
            );
        }
        return circleArr;
    },

    //当一帧滚动结束时调用
    onAnimationEnd(e) {
        var offsetX = e.nativeEvent.contentOffset.x;
        var currentPageV = Math.floor(offsetX/kScreenWidth);
        //console.log(currentPage)
        this.setState({
            currentPage: currentPageV
        });

    },

    onStartDrag() {
        this.endTime();
    },

    onEndDrag() {
        this.startTime();
    }

});


const styles = StyleSheet.create({
    container: {
    marginTop:20
    },

    pageViewStyle: {
        width:kScreenWidth,
        height:25,
        backgroundColor: 'rgba(0,0,0,0.3)',

        //定位
        position: 'absolute',
        bottom: 0,

        flexDirection: 'row',
        alignItems:'center'
    },

    ScrollViewStyle: {

    }
});

module.exports = TurnView;