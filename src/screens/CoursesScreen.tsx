import { Box, Button, Center, ChevronLeftIcon, HStack, Image, Stack, Text, VStack, View } from 'native-base';
import { icons } from '../assets/icons/icons';
import { useEffect, useRef, useState } from 'react';
import SceneNames from '../navigation/SceneNames';
import { colors } from '../assets/Colors';
import { useNavigation } from '@react-navigation/native';
import { GenericStackNavigationProp } from '../navigation/StackNavigationProp';

const CoursesScreen = () => {
    const { navigate } = useNavigation<GenericStackNavigationProp>();

    return (
        <Box safeArea bg={"#FFEAA4"}
        >
            <Stack
                w="100%"
                p={4}
                alignContent={'flex-end'}
            >
                <Text textAlign={'center'} fontSize={20} fontWeight={'700'}>PRIMEROS AUXILIOS</Text>
                <Stack
                    alignItems={'center'}
                >
                    <Image source={icons.cursosBg
                    } resizeMode="contain" alt="Alternate Text" size={'2xl'} />
                </Stack>

            </Stack>
            <Stack
                w="100%"
                h="100%"
                direction={{ base: "column", md: "row" }}
                bg="white"
                p={5}
                space={4}
            >

                <Button
                    onPress={() => navigate(SceneNames.PasScreen)}
                    justifyContent={"flex-start"}
                    rounded={10}
                    w={'100%'}
                    h={20}
                    bg={"#B145EE"}
                    px={4}
                    _pressed={{ bg: colors.text.third, borderColor: colors.text.primary, borderWidth: 2 }}
                >
                    <HStack
                    >
                        <Image source={icons.llamadaEmergencia
                        } resizeMode="stretch" alt="Alternate Text" size={16} />
                        <VStack pl={4} justifyContent={'center'}>
                            <Text fontSize={'2xl'} bold>P.A.S.</Text>
                        </VStack>
                    </HStack>
                </Button>
                <Button
                    onPress={() => navigate(SceneNames.WoundsScreen)}
                    justifyContent={"flex-start"}
                    rounded={10}
                    w={'100%'}
                    h={20}
                    bg={"#FFCC66"}
                    px={4}
                    _pressed={{ bg: colors.text.third, borderColor: colors.text.primary, borderWidth: 2 }}
                >
                    <HStack
                    >
                        <Image source={icons.curita
                        } resizeMode="stretch" alt="Alternate Text" size={16} />
                        <VStack pl={4} justifyContent={'center'}>
                            <Text fontSize={['xl']} bold>Heridas y Hemorragias </Text>
                        </VStack>
                    </HStack>
                </Button>
                <Box alignSelf="center"
                    rounded={10}
                    w={'100%'}
                    h={20}
                    bg={"#45C6EE"}
                    px={4}
                    justifyContent={'center'}
                    opacity={0.5}
                >
                    <HStack
                    >
                        <Image source={icons.fractura
                        } resizeMode="stretch" alt="Alternate Text" size={16} />
                        <VStack pl={4} justifyContent={'center'}>
                            <Text fontSize={'2xl'} bold color={colors.text.primary}>Fractura</Text>
                        </VStack>
                    </HStack>
                </Box>
                <Box alignSelf="center"
                    rounded={10}
                    w={'100%'}
                    h={20}
                    bg={"#45EEE2"}
                    px={4}
                    justifyContent={'center'}
                    opacity={0.5}
                >
                    <HStack
                    >
                        <Image source={icons.primeriosAuxilios
                        } resizeMode="stretch" alt="Alternate Text" size={16} />
                        <VStack pl={4} justifyContent={'center'}>
                            <Text fontSize={'2xl'} bold>Signos vitales</Text>
                        </VStack>
                    </HStack>
                </Box>

                <Box alignSelf="center"
                    rounded={10}
                    w={'100%'}
                    h={20}
                    bg={"#EE4562"}
                    px={4}
                    justifyContent={'center'}
                    opacity={0.5}
                >
                    <HStack
                    >
                        <Image source={icons.rcp
                        } resizeMode="stretch" alt="Alternate Text" size={16} />
                        <VStack pl={4} justifyContent={'center'}>
                            <Text fontSize={'2xl'} bold>RCP</Text>
                        </VStack>
                    </HStack>
                </Box>
            </Stack>
        </Box >
    );
}


export default CoursesScreen;