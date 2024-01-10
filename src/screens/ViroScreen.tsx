import { Box, Button, ChevronLeftIcon, HStack, Stack, Text } from 'native-base';
import { colors } from '../assets/Colors';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SceneNames from '../navigation/SceneNames';
import { GenericStackNavigationProp } from '../navigation/StackNavigationProp';
import {
    ViroARScene,
    Viro3DObject,
    ViroARImageMarker,
    ViroARTrackingTargets,
    ViroSpotLight,
    ViroARSceneNavigator,
    ViroAmbientLight,
    ViroNode,
    ViroSphere,
    ViroAnimations,
    ViroMaterials,
    ViroText,
} from '@viro-community/react-viro';
import { useState } from 'react';

const ViroSceneInitial = () => {
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
    const [showText, setShowText] = useState(true);

    function onInitialized(state: any, reason: any) {
        console.log('guncelleme', state, reason);
    }
    const _toggleButtons = () => {
        setAnimName(animName == "scaleUp" ? "scaleDown" : "scaleUp")
        setPlayAnim(true)
        setShowText(showText ? false : true)
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
            <ViroAmbientLight
                color="#ffffff"
            />

            <ViroARImageMarker target={"medicKit"}
            >
                <ViroNode scale={[0, 0, 0]} transformBehaviors={["billboardY"]} animation={{ name: animName, run: playAnim, }}>

                    {!showText &&
                        <ViroText
                            text={"¡Objetos que debes tener en tu botiquín!"}
                            style={{
                                color: '#FFFFFF',
                                flex: 1,
                                textAlignVertical: 'center',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 4

                            }}
                            position={[0, .7, 0]}
                            extrusionDepth={2}
                            materials={["frontMaterial", "backMaterial", "sideMaterial"]}
                        />}
                    <Viro3DObject
                        scale={[0.5, 0.5, 0.5]}
                        position={[-.2, .5, 0]}
                        rotation={[90, 90, 90]}
                        source={require('../assets/res/tesla/alcohol_bottle.glb')}
                        type="GLB"
                        shadowCastingBitMask={0}
                    />
                    <Viro3DObject
                        scale={[0.1, 0.1, 0.1]}
                        rotation={[180, 90, 180]}
                        position={[.19, .58, 0.1]}
                        source={require('../assets/res/tesla/agua.glb')}
                        type="GLB"
                        shadowCastingBitMask={0}
                    />
                    <Viro3DObject
                        scale={[0.04, 0.04, 0.04]}
                        rotation={[180, 270, 180]}
                        position={[.02, .60, -0.1]}
                        source={require('../assets/res/tesla/bandage.glb')}
                        type="GLB"
                        shadowCastingBitMask={0}
                    />
                    <Viro3DObject
                        scale={[0.01, 0.01, 0.01]}
                        rotation={[90, 0, 0]}
                        position={[.45, .60, -0.1]}
                        source={require('../assets/res/tesla/scissors.glb')}
                        resources={[require('../assets/res/tesla/scissors2.glb')]}
                        type="GLB"
                        shadowCastingBitMask={0}
                    />
                    <Viro3DObject
                        scale={[0.01, 0.01, 0.01]}
                        rotation={[180, 90, 0]}
                        position={[.45, .40, -0.1]}
                        source={require('../assets/res/tesla/med_gloves.glb')}
                        type="GLB"
                        shadowCastingBitMask={0}
                    />
                    <Viro3DObject
                        scale={[1.2, 1.2, 1.2]}
                        position={[-.2, .3, 0]}
                        rotation={[90, 0, 180]}
                        source={require('../assets/res/tesla/bandaid.glb')}
                        type="GLB"
                        shadowCastingBitMask={0}
                    />

                </ViroNode>


                <Viro3DObject
                    scale={[0.2, 0.2, 0.2]}
                    rotation={[100, 180, 180]}
                    source={require('../assets/res/tesla/med_kit.glb')}
                    type="GLB"
                    onClick={_toggleButtons}
                />
                {showText &&
                    <ViroText
                        text={"¡Presiona el\nbotiquín!"}
                        style={{
                            color: '#FFFFFF',
                            flex: 1,
                            textAlignVertical: 'center',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 8

                        }}
                        position={[-0.7, -0.5, -0.6]}
                        rotation={[-50, 0, -8]}
                        extrusionDepth={2}
                        materials={["frontMaterial", "backMaterial", "sideMaterial"]}
                    />}
            </ViroARImageMarker>
        </ViroARScene >
    );
};

const ViroScreen = () => {
    const { navigate } = useNavigation<GenericStackNavigationProp>();
    return (
        <>
            <Box safeArea bg={"#000000"}
            >
                <Stack
                    w="100%"
                    alignContent={'flex-end'}
                >
                    <HStack justifyItems={'center'}>
                        <Button onPress={() => navigate(SceneNames.CoursesScreen)} alignItems={'center'} rounded={'full'} w={10} h={10} bg={'transparent'} _pressed={{ bg: colors.text.third }}
                        >
                            <ChevronLeftIcon
                                size={'lg'} mt="0.5" color="white" />
                        </Button>
                    </HStack>
                    <Text textAlign={'center'} fontSize={20} fontWeight={'700'} color={'white'}>Escanea y visualiza</Text>
                    <Stack
                        alignItems={'center'}
                    >
                    </Stack>

                </Stack>
            </Box>
            <ViroARSceneNavigator
                autofocus={true}
                initialScene={{
                    scene: ViroSceneInitial,
                }}
                style={styles.f1}
            />
        </>

    );
}
ViroARTrackingTargets.createTargets({
    medicKit: {
        source: require('../assets/res/med-kit.jpg'),
        orientation: "Up",
        physicalWidth: 0.165
    },
});


ViroMaterials.createMaterials({
    frontMaterial: {
        diffuseColor: '#FFFFFF'
    },
    backMaterial: {
        diffuseColor: '#FF0000',
    },
    sideMaterial: {
        diffuseColor: '#0000FF'
    },
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
});
const styles = StyleSheet.create({
    f1: { flex: 1 },
});
export default ViroScreen;
