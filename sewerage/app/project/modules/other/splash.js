import React, {Component} from 'react';
import {
    Image,
    View,
    Dimensions,
    StatusBar
} from 'react-native';
import {
    RkText,
} from 'react-native-ui-kitten'
import {ProgressBar} from '../../components';
import {NavigationActions} from 'react-navigation';
import * as Utils from '../../../core/utils'
let timeFrame = 500;

export class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        }
    }

    componentDidMount() {
        StatusBar.setHidden(true, 'none');
        this.timer = setInterval(() => {
            if (this.state.progress === 1) {
                clearInterval(this.timer);
                setTimeout(() => {
                    StatusBar.setHidden(false, 'slide');
                    let toHome = NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Home'})]
                    });
                    this.props.navigation.dispatch(toHome)
                }, timeFrame);
            } else {
                let random = Math.random() * 0.5;
                let progress = this.state.progress + random;
                if (progress > 1) {
                    progress = 1;
                }
                this.setState({progress});
            }
        }, timeFrame)

    }

    render() {
        let width = Dimensions.get('window').width;
        return (
            <View style={styles.container}>
                <View>
                    <Image style={[styles.image, {width}]} source={require('../../assets/images/splashBack.png')}/>
                    <View style={styles.text}>
                        <RkText rkType='light' style={styles.hero}>React Native</RkText>
                        <RkText rkType='logo' style={styles.appName}>UI Kitten</RkText>
                    </View>
                </View>
                <ProgressBar
                    color={'#ffffff'}
                    style={styles.progress}
                    progress={this.state.progress} width={320}/>
            </View>
        )
    }
}

const styles = Utils.PLStyle({
    container: {
        justifyContent: 'space-between',
        flex: 1
    },
    image: {
        resizeMode: 'cover',
        height: 430,
    },
    text: {
        alignItems: 'center'
    },
    hero: {
        fontSize: 37,
    },
    appName: {
        fontSize: 62,
    },
    progress: {
        alignSelf: 'center',
        marginBottom: 35,
        backgroundColor: '#e5e5e5'
    }
});