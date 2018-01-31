// define your styles
import * as Utils from "../../../core/utils";

const styles = Utils.PLStyle({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'column',
    },
    leftImg: {
        marginLeft: 20,
        marginTop: 20,
        width: 16,
        height: 16
    },
    content: {
        color: '#42BB55',
        marginTop: 179,
        fontSize: 24
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    input: {
        width: '60%',
        fontSize: 16,
        color: '#333333',
    },
    vertifyInput: {
        fontSize: 16,
        color: '#333333'
    },
    inputEndIcon: {
        marginRight: 10,
        width: 18,
        height: 18,
    },
    mimaManContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    forgetMima: {
        color: '#999999',
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 28
    },
    remMima: {
        color: '#d2d2d2',
        fontSize: 14
    },
    submit: {
        marginTop: 50.5,
    },
    columnLine: {
        width: 1,
        height: 22,
        backgroundColor: '#cccccc',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        width: 90
    },
    otp: {
        marginRight: 10,
    },
    line: {
        height: 0.5,
        backgroundColor: '#dddddd'
    }
});

export default styles