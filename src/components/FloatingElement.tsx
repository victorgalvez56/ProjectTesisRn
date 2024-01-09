import React from 'react';
import { StyleProp, ViewStyle, TextStyle, Platform, Share } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { Image } from 'native-base';
import { useNavigation } from '@react-navigation/core';
import SceneNames from '../navigation/SceneNames';
import { colors } from '../assets/Colors';
import { icons } from '../assets/icons/icons';
import { GenericStackNavigationProp } from '../navigation/StackNavigationProp';

const FloatingElement = () => {
    const navigation = useNavigation<GenericStackNavigationProp>();

    const actions = [
        {
            text: "Activa la realidad aumentada",
            icon: (
                <Image
                    source={icons.camera}
                    alt="bank"
                    w={[25, 35, 45]}
                    h={[25, 35, 45]}
                />
            ),

            name: SceneNames.ViroScreen,
            position: 1,
        },
    ];


    return (
        <FloatingAction
            actions={actions}
            onPressItem={(name) => {
                navigation.navigate(SceneNames.ViroScreen);
            }}
        />
    );
};

export default FloatingElement;
