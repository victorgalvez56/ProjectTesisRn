import { Box, Button, Input, Stack, Text } from 'native-base';
import { colors } from '../assets/Colors';
import { useState } from 'react';
import { loginService } from '../services/AuthService';
import LoaderElement from '../components/LoaderElement';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SceneNames from '../navigation/SceneNames';
import { GenericStackNavigationProp } from '../navigation/StackNavigationProp';
import {
    ViroARScene,
    ViroMaterials,
    ViroNode,
    ViroAnimations,
    Viro3DObject,
    ViroLightingEnvironment,
    ViroARImageMarker,
    ViroARTrackingTargets,
    ViroSphere,
    ViroSpotLight,
    ViroQuad,
    ViroTrackingStateConstants,
    ViroText,
    ViroARSceneNavigator,
    ViroAmbientLight,
} from '@viro-community/react-viro';

const HelloWorldSceneAR = () => {
    const [text, setText] = useState('Initializing AR...');
    const [texture, setTexture] = useState('white');
    const [animName, setAnimName] = useState('scaleDown');
    const [playAnim, setPlayAnim] = useState(false);
    const [animateCar, setAnimateCar] = useState(false);
    const [tapWhite, setTapWhite] = useState(false);
    const [tapBlue, setTapBlue] = useState(false);
    const [tapGrey, setTapGrey] = useState(false);
    const [tapRed, setTapRed] = useState(false);
    const [tapYellow, setTapYellow] = useState(false);

    function onInitialized(state: any, reason: any) {
        console.log('guncelleme', state, reason);
        if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
            setText('Hello World!');
        }
        // else if (state === ViroConstants.TRACKING_NONE) {
        //   // Handle loss of tracking
        // }
    }
    const _toggleButtons = () => {
        setAnimName(animName == "scaleUp" ? "scaleDown" : "scaleUp")
        setPlayAnim(true)
    }
    const _onAnchorFound = () => {
        setAnimateCar(true)
    }
    const _selectWhite = () => {
        setTexture('white')
        setTapWhite(true)
    }
    const _selectBlue = () => {
        setTexture('blue')
        setTapBlue(true)
    }
    const _selectGrey = () => {
        setTexture('grey')
        setTapGrey(true)
    }

    const _selectRed = () => {
        setTexture('red')
        setTapRed(true)
    }
    const _selectYellow = () => {
        setTexture('yellow')
        setTapYellow(true)
    }
    const _animateFinished = () => {
        setTapWhite(false)
        setTapBlue(false)
        setTapGrey(false)
        setTapRed(false)
        setTapYellow(false)
    }

    return (
        <ViroARScene onTrackingUpdated={onInitialized}>
            <ViroARImageMarker target={"logo"}
                onAnchorFound={_onAnchorFound}
            >
                <ViroNode scale={[0, 0, 0]} transformBehaviors={["billboardY"]} animation={{ name: animName, run: playAnim, }}>
                    <ViroSphere materials={["white_sphere"]}
                        heightSegmentCount={20} widthSegmentCount={20} radius={.03}
                        position={[-.2, .25, 0]}
                        onClick={_selectWhite}
                        animation={{ name: "tapAnimation", run: tapWhite, onFinish: _animateFinished }}
                        shadowCastingBitMask={0} />

                    <ViroSphere materials={["blue_sphere"]}
                        heightSegmentCount={20} widthSegmentCount={20} radius={.03}
                        position={[-.1, .25, 0]}
                        onClick={_selectBlue}
                        animation={{ name: "tapAnimation", run: tapBlue, onFinish: _animateFinished }}
                        shadowCastingBitMask={0} />

                    <ViroSphere materials={["grey_sphere"]}
                        heightSegmentCount={20} widthSegmentCount={20} radius={.03}
                        position={[0, .25, 0]}
                        onClick={_selectGrey}
                        animation={{ name: "tapAnimation", run: tapGrey, onFinish: _animateFinished }}
                        shadowCastingBitMask={0} />

                    <ViroSphere materials={["red_sphere"]}
                        heightSegmentCount={20} widthSegmentCount={20} radius={.03}
                        position={[.1, .25, 0]}
                        onClick={_selectRed}
                        animation={{ name: "tapAnimation", run: tapRed, onFinish: _animateFinished }}
                        shadowCastingBitMask={0} />

                    <ViroSphere materials={["yellow_sphere"]}
                        heightSegmentCount={20} widthSegmentCount={20} radius={.03}
                        position={[.2, .25, 0]}
                        onClick={_selectYellow}
                        animation={{ name: "tapAnimation", run: tapYellow, onFinish: _animateFinished }}
                        shadowCastingBitMask={0} />
                </ViroNode>
                <ViroSpotLight
                    innerAngle={5}
                    outerAngle={100}
                    direction={[20, -1, 20]}
                    position={[0, 5, 1]}
                    color="#ffffff"
                    castsShadow={true}
                    shadowMapSize={2048}
                    shadowNearZ={2}
                    shadowFarZ={7}
                    shadowOpacity={.7} />
                <ViroSpotLight
                    innerAngle={5}
                    outerAngle={100}
                    direction={[0, -1, 0]}
                    position={[0, 5, 1]}
                    color="#ffffff"
                    castsShadow={true}
                    shadowMapSize={2048}
                    shadowNearZ={2}
                    shadowFarZ={7}
                    shadowOpacity={.7} />
                <Viro3DObject
                    scale={[0.1, 0.1, 0.1]}
                    rotation={[-50, 90, 0]}
                    source={require('../assets/res/tesla/bandage.glb')}
                    type="GLB"
                    onClick={_toggleButtons}
                />
            </ViroARImageMarker>
        </ViroARScene >
    );
};

const ViroScreen = () => {
    const [text, setText] = useState('Initializing AR...');


    return (
        <>
            <ViroARSceneNavigator
                autofocus={true}
                initialScene={{
                    scene: HelloWorldSceneAR,
                }}
                style={styles.f1}
            />

        </>

    );
}


ViroMaterials.createMaterials({
    white: {
        lightingModel: "Constant",
        // normalTexture: require('../assets/res/tesla/agua.png'),
        // diffuseTexture: require('../assets/res/tesla/object_car_main_Base_Color.png'),
        // metalnessTexture: require('../assets/res/tesla/object_car_main_Metallic.png'),
        // roughnessTexture: require('../assets/res/tesla/object_car_main_Roughness.png'),
    },
    blue: {
        lightingModel: "PBR",
        diffuseTexture: require('../assets/res/tesla/object_car_main_Base_Color_blue.png'),
        metalnessTexture: require('../assets/res/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../assets/res/tesla/object_car_main_Roughness.png'),
    },
    grey: {
        lightingModel: "PBR",
        diffuseTexture: require('../assets/res/tesla/object_car_main_Base_Color_grey.png'),
        metalnessTexture: require('../assets/res/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../assets/res/tesla/object_car_main_Roughness.png'),
    },
    red: {
        lightingModel: "PBR",
        diffuseTexture: require('../assets/res/tesla/object_car_main_Base_Color_red.png'),
        metalnessTexture: require('../assets/res/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../assets/res/tesla/object_car_main_Roughness.png'),
    },
    yellow: {
        lightingModel: "PBR",
        diffuseTexture: require('../assets/res/tesla/object_car_main_Base_Color_yellow.png'),
        metalnessTexture: require('../assets/res/tesla/object_car_main_Metallic.png'),
        roughnessTexture: require('../assets/res/tesla/object_car_main_Roughness.png'),
    },
    white_sphere: {
        lightingModel: "PBR",
        diffuseColor: "rgb(231,231,231)",
    },
    blue_sphere: {
        lightingModel: "PBR",
        diffuseColor: "rgb(19,42,143)",
    },
    grey_sphere: {
        lightingModel: "PBR",
        diffuseColor: "rgb(75,76,79)",
    },
    red_sphere: {
        lightingModel: "PBR",
        diffuseColor: "rgb(168,0,0)",
    },
    yellow_sphere: {
        lightingModel: "PBR",
        diffuseColor: "rgb(200,142,31)",
    },
});
ViroARTrackingTargets.createTargets({
    logo: {
        source: require('../assets/res/logo.png'),
        orientation: "Up",
        physicalWidth: 0.165 // real world width in meters
    }
});
ViroAnimations.registerAnimations({
    scaleUp: {
        properties: { scaleX: 1, scaleY: 1, scaleZ: 1, },
        duration: 500, easing: "bounce"
    },
    scaleDown: {
        properties: { scaleX: 0, scaleY: 0, scaleZ: 0, },
        duration: 200,
    },
    scaleCar: {
        properties: { scaleX: .09, scaleY: .09, scaleZ: .09, },
        duration: 500, easing: "bounce"
    },
    scaleSphereUp: {
        properties: { scaleX: .8, scaleY: .8, scaleZ: .8, },
        duration: 50, easing: "easeineaseout"
    },
    scaleSphereDown: {
        properties: { scaleX: 1, scaleY: 1, scaleZ: 1, },
        duration: 50, easing: "easeineaseout"
    },
    // tapAnimation: [["scaleSphereUp", "scaleSphereDown"],]
});
const styles = StyleSheet.create({
    f1: { flex: 1 },
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});
export default ViroScreen;
