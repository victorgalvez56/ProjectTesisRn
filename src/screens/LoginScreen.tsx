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
} from '@viro-community/react-viro';

const LoginScreen = () => {
    const { navigate } = useNavigation<GenericStackNavigationProp>();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const onSubmit = async () => {
        setLoading(true)
        try {
            if (name !== "" && email !== "") {
                await loginService({
                    name, email
                }, async (response) => {
                    if (response.success) {
                        await AsyncStorage.setItem("user", JSON.stringify({
                            name, email
                        }))
                        setLoading(false)
                        navigate(SceneNames.CaseFirstScreen)
                    }
                }, (error) => { })
            } else {
                setLoading(false)
                Alert.alert(
                    'Oops',
                    "Complete todos los campos por favor",
                    [
                        {
                            text: 'Entendido',
                            style: 'default',
                        },
                    ])
            }
        } catch (error) {
            setLoading(false)
        }
        setLoading(false)
    }

    return (

        <Box safeArea bg={colors.text.primary} w={'full'} h={'100%'} justifyContent={'center'}
            alignItems={"center"} flex={1}>
            <LoaderElement isLoading={loading} />
            <Box bg={"#FFCC66"} w={'85%'} h={350} rounded={10} px={6} justifyContent={'center'}>
                <Stack space={4} w="100%" alignItems="center">
                    <Text color={colors.text.primary} fontSize={28} bold>Bienvenido!</Text>
                    <Input w={{
                        base: "85%",
                    }} onChangeText={(text: string) => setName(text)} placeholder="Nombres Completos" bg={'white'} _focus={{ bg: 'white' }} size={'xl'} />
                    <Input w={{
                        base: "85%",
                    }} onChangeText={(text: string) => setEmail(text)} placeholder="Correo Electrónico" bg={'white'} _focus={{ bg: 'white' }} size={'xl'} />
                    <Button onPress={onSubmit}
                        bg={colors.text.third}
                        px={6}
                        py={4}
                        rounded={8}
                    >
                        <Text color={colors.text.primary} fontSize={20} bold>Siguiente!</Text>
                    </Button>

                </Stack>
            </Box>
        </Box>
    );
}


export default LoginScreen;
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
