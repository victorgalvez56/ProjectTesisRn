import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from '../assets/Colors';
import { Text } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

const LoaderElement = ({
    isLoading = false,
}: {
    isLoading?: boolean;
}) => {

    const isGlobalLoading = isLoading;

    if (!isGlobalLoading) {
        return <View />;
    }

    return (
        <Spinner
            visible={isGlobalLoading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
        />
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
export default LoaderElement;
