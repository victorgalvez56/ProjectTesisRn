import { Box, Button, ChevronLeftIcon, Divider, HStack, Image, Modal, ScrollView, Stack, Text, View } from 'native-base';
import { icons } from '../assets/icons/icons';
import { colors } from '../assets/Colors';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GenericStackNavigationProp } from '../navigation/StackNavigationProp';
import SceneNames from '../navigation/SceneNames';
import FloatingElement from '../components/FloatingElement';

const WoundsScreen = () => {
    const [visibleFirstModal, setVisibleFirstModal] = useState(false);
    const [visibleSecondModal, setVisibleSecondModal] = useState(false);
    const [visibleThirdModal, setVisibleThirdModal] = useState(false);
    const { navigate } = useNavigation<GenericStackNavigationProp>();

    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [step, setStep] = useState(1);
    const [step2, setStep2] = useState(1);
    const [step3, setStep3] = useState(1);

    const handleNext = () => {
        setStep(prevStep => prevStep < 3 ? prevStep + 1 : prevStep);
    };
    const handleNext2 = () => {
        setStep2(prevStep => prevStep < 3 ? prevStep + 1 : prevStep);
    };
    const handleBack2 = () => {
        setStep2(prevStep => prevStep > 1 ? prevStep - 1 : prevStep);
    };

    const handleBack = () => {
        setStep(prevStep => prevStep > 1 ? prevStep - 1 : prevStep);
    };
    const handleNext3 = () => {
        setStep3(prevStep => prevStep < 2 ? prevStep + 1 : prevStep);
    };
    const handleBack3 = () => {
        setStep3(prevStep => prevStep > 1 ? prevStep - 1 : prevStep);
    };
    return (

        <ScrollView>
            <Box safeArea flex={1} bg={"#FDE0A5"}
            >
                <Stack
                    w="100%"
                    p={4}
                    alignContent={'flex-end'}
                    space={3}
                >
                    <HStack justifyItems={'center'}>
                        <Button onPress={() => navigate(SceneNames.CoursesScreen)}
                            alignItems={'center'} rounded={'full'} w={10} h={10} bg={'transparent'}
                            _pressed={{ bg: colors.text.third }}
                        >
                            <ChevronLeftIcon
                                size={'lg'} mt="0.5" color="white" />
                        </Button>
                    </HStack>
                    <Text textAlign={'center'} fontSize={20} fontWeight={'700'}>HERIDAS Y HEMORRAGIAS</Text>
                    <Stack
                        alignItems={'center'}
                    >
                        <Image source={icons.yeso
                        } resizeMode="contain" alt="Alternate Text" size={'xl'} />
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
                    <Box
                        rounded={10}
                        py={4}
                    >
                        <Text fontSize={13} textAlign={'justify'} fontWeight={'500'} color={'#000'}>
                            Lesiones que se producen por pérdida de continuidad de la piel como consecuencia de un traumatismo.
                        </Text>
                    </Box>
                    <Divider bg={"#FF9801"} my={4} />
                    <Button onPress={() => setVisibleFirstModal(true)} bg={'transparent'}
                        _pressed={{ bg: colors.text.third }}
                        borderColor={colors.text.secondary}
                        borderWidth={3}
                        rounded={10}
                        h={113}
                        px={4}
                        justifyContent={'center'}
                        w={'100%'}
                    >
                        <HStack
                        >
                            <Image source={icons.herida1Mano
                            } resizeMode="stretch" alt="Alternate Text" size={16} />
                            <HStack pl={6} justifyContent={'center'} alignItems={'center'}>
                                <Text fontSize={30} fontWeight={'400'} color={"#000000"} opacity={0.4}>  Herida leve</Text>
                            </HStack>
                        </HStack>
                    </Button>
                    <Button onPress={() => setVisibleSecondModal(true)} bg={'transparent'}
                        _pressed={{ bg: colors.text.third }}
                        borderColor={colors.text.secondary}
                        borderWidth={3}
                        rounded={10}
                        h={113}
                        px={4}
                        justifyContent={'center'}
                        w={'100%'}
                    >
                        <HStack
                        >
                            <Image source={icons.cabeza1
                            } resizeMode="stretch" alt="Alternate Text" size={16} />
                            <HStack pl={6} justifyContent={'center'} alignItems={'center'}>
                                <Text fontSize={30} fontWeight={'400'} color={"#000000"} opacity={0.4}>  Herida grave</Text>
                            </HStack>
                        </HStack>
                    </Button>
                    <Button onPress={() => {
                        setVisibleThirdModal(true)
                        setStep(1)
                    }
                    }
                        bg={'transparent'}
                        _pressed={{ bg: colors.text.third }}
                        borderColor={colors.text.secondary}
                        borderWidth={3}
                        rounded={10}
                        h={113}
                        px={4}
                        justifyContent={'center'}
                        w={'100%'}
                    >

                        <HStack
                        >
                            <Image source={icons.signoExclamación
                            } resizeMode="stretch" alt="Alternate Text" size={16} />
                            <HStack pl={6} justifyContent={'center'} alignItems={'center'}>
                                <Text fontSize={30} fontWeight={'400'} color={"#000000"} opacity={0.4}>Consideraciones</Text>
                            </HStack>
                        </HStack>
                    </Button>
                </Stack>
            </Box>

            <Modal isOpen={visibleFirstModal}
                initialFocusRef={initialRef} finalFocusRef={finalRef}
            >
                <Modal.Content
                    rounded={30}
                >
                    <Modal.Header>

                        <HStack space={8}
                            justifyContent={step !== 1 ? '' : 'center'}
                        >
                            {step !== 1 &&
                                <Stack justifyContent={'center'}>
                                    <ChevronLeftIcon onClick={handleBack}
                                        size={'lg'} color={colors.text.third} bold />
                                </Stack>
                            }
                            <Text textAlign={'center'} color={colors.text.third} fontSize={26} fontWeight={'900'}>
                                {step === 1 && <Text>Herida Leve</Text>}
                                {step === 2 && <Text>Herida Leve</Text>}
                                {step === 3 && <Text>Herida Leve</Text>}
                            </Text>
                        </HStack>
                    </Modal.Header>
                    <Modal.Body>
                        {step === 1 &&
                            <>
                                <Text textAlign={'center'}>Sólo afecta a la epidermis y se ha producido hace menos de seis horas.</Text>
                            </>
                        }
                        {step === 2 && <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Text fontSize={20} fontWeight={'900'} color={'#F3A70C'}>Actuación: </Text>
                            <Text>
                                • Limpieza de la herida con agua (a chorro) y jabón o suero fisiológico.{"\n"}• Usar gasas limpias+antiséptico y limpiar la herida desde el centro hacia el exterior.{"\n"}• Tapar con gasa estéril y sujetar con esparadrapo
                            </Text>
                        </View>}
                        {step === 3 && <>
                            <Text fontSize={20} fontWeight={'900'} color={'#F3A70C'}>Actuación: </Text>
                            <Image source={icons.heridaLeve
                            } resizeMode="contain" alt="Alternate Text" w={'100%'} h={250} />
                        </>}
                    </Modal.Body>
                    <Modal.Footer justifyContent={'center'}>
                        <Button onPress={() => {
                            handleNext()
                            if (step === 3) {
                                setVisibleFirstModal(false)
                                setTimeout(() => {
                                    setStep(1)
                                }, 1000);
                            }
                        }} _pressed={{ bg: colors.text.third }}
                            bg={colors.text.secondary}
                            p={4}
                            rounded={8}
                        >
                            <Text color={colors.text.primary} fontSize={20} fontWeight={'700'}>{step !== 3 ? "Siguiente" : "Entendido!"}</Text>
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={visibleSecondModal} onClose={() => setVisibleSecondModal(false)}
                initialFocusRef={initialRef} finalFocusRef={finalRef}
            >
                <Modal.Content
                    rounded={30}
                >
                    <Modal.Header>

                        <HStack space={8}
                            justifyContent={step2 !== 1 ? '' : 'center'}
                        >
                            {step2 !== 1 &&
                                <Stack justifyContent={'center'}>
                                    <ChevronLeftIcon onClick={handleBack2}
                                        size={'lg'} color={colors.text.third} bold />
                                </Stack>
                            }
                            <Text textAlign={'center'} color={colors.text.third} fontSize={26} fontWeight={'900'}>
                                {step2 === 1 && <Text>Herida Grave</Text>}
                                {step2 === 2 && <Text>Herida Grave</Text>}
                                {step2 === 3 && <Text>Herida Grave</Text>}
                            </Text>
                        </HStack>
                    </Modal.Header>
                    <Modal.Body>
                        {step2 === 1 &&
                            <>
                                <Text>Tiene como características afectar a capas profundas de la piel o a órganos internos. Presenta hemorragia. Se localiza en las manos, ojos, boca, nariz, tórax, abdomen o articulaciones. Una herida grave es muy extensa y sucia. En algunas ocasiones tiene cuerpos extraños enclavados. La herida grave tiene más de seis horas de producida.</Text>
                            </>
                        }
                        {step2 === 2 && <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Text fontSize={20} fontWeight={'900'} color={'#F3A70C'}>Actuación: </Text>
                            <Text>
                                TAPONAR-AVISAR-EVACUAR
                            </Text>
                            <Image source={icons.heridaGrave
                            } resizeMode="contain" alt="Alternate Text" w={'100%'} h={250} />

                        </View>}
                        {step2 === 3 && <>
                            <Text>
                                • Controlar la hemorragia si la hay.
                            </Text>
                            <Text>
                                • No extraer cuerpos extraños, sujetarlos para evitar que se muevan.
                            </Text>
                            <Text>
                                • No extraer cuerpos extraños, sujetarlos para evitar que se muevan.
                            </Text>
                            <Text>
                                • No hurgar dentro de la herida. Aplicar un apósito o gasa húmeda estéril.
                            </Text>
                            <Text>
                                • Realizar un vendaje improvisado.
                            </Text>
                            <Text>
                                • Traslado a un centro sanitario vigilando signos vitales.
                            </Text>
                        </>}
                    </Modal.Body>
                    <Modal.Footer justifyContent={'center'}>
                        <Button onPress={() => {
                            handleNext2()
                            if (step2 === 3) {
                                setVisibleSecondModal(false)
                                setTimeout(() => {
                                    setStep2(1)
                                }, 1000);
                            }
                        }} _pressed={{ bg: colors.text.third }}
                            bg={colors.text.secondary}
                            p={4}
                            rounded={8}
                        >
                            <Text color={colors.text.primary} fontSize={20} fontWeight={'700'}>{step2 !== 3 ? "Siguiente" : "Entendido!"}</Text>
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={visibleThirdModal}
                initialFocusRef={initialRef} finalFocusRef={finalRef}
            >
                <Modal.Content
                    rounded={30}
                >
                    <Modal.Header>
                        <HStack space={8}
                            justifyContent={step !== 1 ? '' : 'center'}
                        >
                            {step3 !== 1 &&
                                <Stack justifyContent={'center'}>
                                    <ChevronLeftIcon onClick={handleBack3}
                                        size={'lg'} color={colors.text.third} bold />
                                </Stack>
                            }
                            <Text textAlign={'center'} color={colors.text.third} fontSize={26} fontWeight={'900'}>
                                {step3 === 1 && <Text>Herida Grave</Text>}
                                {step3 === 2 && <Text>Herida Grave</Text>}
                            </Text>
                        </HStack>
                    </Modal.Header>
                    <Modal.Body>
                        {step3 === 1 &&
                            <Text>Toda herida (en especial las heridas punzantes ocasionadas por clavos o alambres oxidados) conlleva el riesgo de contraer el Tétanos, siendo importante acudir a un centro médico para la respectiva vacunación contra el tétanos.</Text>
                        }
                        {step3 === 2 && <Text >Evite aplicar alcohol directamente sobre la herida, pues podría ocasionar irritación y retardar el proceso de cicatrización.  </Text>}
                    </Modal.Body>
                    <Modal.Footer justifyContent={'center'}>
                        <Button onPress={() => {
                            handleNext3()
                            if (step3 === 2) {
                                setVisibleThirdModal(false)
                                setTimeout(() => {
                                    setStep3(1)
                                    navigate(SceneNames.CaseFinishScreen)
                                }, 1000);
                            }
                        }}
                            _pressed={{ bg: colors.text.third }}
                            bg={colors.text.secondary}
                            p={4}
                            rounded={8}
                        >
                            <Text color={colors.text.primary} fontSize={20} fontWeight={'700'}>{step3 !== 2 ? "Siguiente" : "Entendido!"}</Text>
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <FloatingElement />
        </ScrollView >
    );
}


export default WoundsScreen;