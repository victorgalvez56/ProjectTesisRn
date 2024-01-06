import { Box, Button, Center, CheckIcon, ChevronLeftIcon, Divider, HStack, Image, Modal, Pressable, ScrollView, Stack, Text, VStack, View } from 'native-base';
import { icons } from '../assets/icons/icons';
import { colors } from '../assets/Colors';
import { useRef, useState } from 'react';
import SceneNames from '../navigation/SceneNames';
import { useNavigation } from '@react-navigation/native';
import { GenericStackNavigationProp } from '../navigation/StackNavigationProp';

const PasScreen = () => {
    const { navigate } = useNavigation<GenericStackNavigationProp>();
    const [visibleFirstModal, setVisibleFirstModal] = useState(false);
    const [visibleSecondModal, setVisibleSecondModal] = useState(false);
    const [visibleThirdModal, setVisibleThirdModal] = useState(false);
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [step, setStep] = useState(1);
    const handleNext = () => {
        setStep(prevStep => prevStep < 5 ? prevStep + 1 : prevStep);
    };
    const handleBack = () => {
        setStep(prevStep => prevStep > 1 ? prevStep - 1 : prevStep);
    };
    return (
        <ScrollView>
            <Box safeArea flex={1} bg={"#CF91F4"}
            >
                <Stack
                    w="100%"
                    p={4}
                    alignContent={'flex-end'}
                    space={3}
                >
                    <HStack justifyItems={'center'}>
                        <Button onPress={() => navigate(SceneNames.CoursesScreen)} alignItems={'center'} rounded={'full'} w={10} h={10} bg={'transparent'} _pressed={{ bg: colors.text.third }}
                        >
                            <ChevronLeftIcon
                                size={'lg'} mt="0.5" color="white" />
                        </Button>
                    </HStack>
                    <Text textAlign={'center'} fontSize={20} fontWeight={'700'}>PROTEGER, AVISAR Y SOCORRER</Text>
                    <Stack
                        alignItems={'center'}
                    >
                        <Image source={icons.llamadaEmergenciaBg
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
                            En cualquier accidente debemos ACTIVAR EL SISTEMA DE EMERGENCIA.{"\n"}Para ello recordaremos la palabra PAS, que está formada por las iniciales de tres actuaciones secuenciales para empezar a atender al accidentado.
                        </Text>
                    </Box>

                    <Divider bg={"#CF91F4"} my={2} />

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
                            <Image source={icons.senalEmergencia
                            } resizeMode="stretch" alt="Alternate Text" size={16} />
                            <HStack pl={6} justifyContent={'center'} alignItems={'center'}>
                                <Text fontSize={48} fontWeight={'400'} color={colors.text.secondary}>P:</Text>
                                <Text fontSize={30} fontWeight={'400'} color={"#000000"} opacity={0.4}>  Proteger</Text>
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
                            <Image source={icons.llamadaDeEmergeciaBig
                            } resizeMode="stretch" alt="Alternate Text" size={16} />
                            <HStack pl={6} justifyContent={'center'} alignItems={'center'}>
                                <Text fontSize={48} fontWeight={'400'} color={colors.text.secondary}>A:</Text>
                                <Text fontSize={30} fontWeight={'400'} color={"#000000"} opacity={0.4}>  Avisar</Text>
                            </HStack>
                        </HStack>
                    </Button>
                    <Button onPress={() => {
                        setVisibleThirdModal(true)
                        setStep(1)
                    }} bg={'transparent'}
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
                            <Image source={icons.rcpBig
                            } resizeMode="stretch" alt="Alternate Text" size={16} />
                            <HStack pl={6} justifyContent={'center'} alignItems={'center'}>
                                <Text fontSize={48} fontWeight={'400'} color={colors.text.secondary}>S:</Text>
                                <Text fontSize={30} fontWeight={'400'} color={"#000000"} opacity={0.4}>  Socorrer</Text>
                            </HStack>
                        </HStack>
                    </Button>
                </Stack>
                <Modal isOpen={visibleFirstModal}
                    initialFocusRef={initialRef} finalFocusRef={finalRef}
                >
                    <Modal.Content
                        rounded={30}
                    >
                        <Modal.Header>
                            <Text textAlign={'center'} color={colors.text.secondary} fontSize={26} fontWeight={'900'}>
                                Proteger
                            </Text>

                        </Modal.Header>
                        <Modal.Body>
                            <Text fontSize={16} fontWeight={'400'} color={colors.text.primary} textAlign={'center'}>Antes de actuar, tenemos que tener la seguridad de que tanto el accidentado como nosotros mismos estamos fuera de todo peligro.</Text>
                        </Modal.Body>
                        <Modal.Footer justifyContent={'center'}>
                            <Button onPress={() => setVisibleFirstModal(false)}
                                _pressed={{ bg: colors.text.third }}
                                bg={colors.text.secondary}
                                p={4}
                                rounded={8}
                            >
                                <Text color={colors.text.primary} fontSize={20} fontWeight={'900'}>Entendido!</Text>
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
                        <Modal.CloseButton />
                        <Modal.Header>
                            <Text textAlign={'center'} color={colors.text.secondary} fontSize={26} fontWeight={'900'}>
                                Avisar
                            </Text>

                        </Modal.Header>
                        <Modal.Body>
                            <Text fontSize={16} fontWeight={'400'} color={colors.text.primary} textAlign={'center'}>Siempre daremos aviso a los servicios sanitarios (médico, ambulancia...) de la existencia del accidente, y así activaremos el Sistema de Emergencia, para inmediatamente empezar a socorrer en espera de ayuda. Debemos informar indicando el tipo de accidente, la localización, el nº de personas accidentadas y la gravedad de éstas.</Text>
                        </Modal.Body>
                        <Modal.Footer justifyContent={'center'}>
                            <Button onPress={() => setVisibleSecondModal(false)}
                                _pressed={{ bg: colors.text.third }}
                                bg={colors.text.secondary}
                                p={4}
                                rounded={8}
                            >
                                <Text color={colors.text.primary} fontSize={20} fontWeight={'900'}>Entendido!</Text>
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
                                {step !== 1 &&
                                    <HStack justifyItems={'center'}>
                                        <Button onPress={handleBack} alignItems={'center'} rounded={'full'} w={10} h={10} bg={'transparent'} _pressed={{ bg: colors.text.third }}
                                        >
                                            <ChevronLeftIcon
                                                size={'lg'} color={colors.text.secondary} bold />
                                        </Button>
                                    </HStack>
                                }
                                <Text textAlign={'center'} color={colors.text.secondary} fontSize={26} fontWeight={'900'}>
                                    {step === 1 && <Text>Socorrer</Text>}
                                    {step === 2 && <Text>Socorrer</Text>}
                                    {step === 3 && <Text>SI RESPIRA</Text>}
                                    {step === 4 && <Text>SI RESPIRA</Text>}
                                    {step === 5 && <Text>SI NO RESPIRA</Text>}
                                </Text>
                            </HStack>
                        </Modal.Header>
                        <Modal.Body>
                            {step === 1 &&
                                <>
                                    <Text>Una vez hemos PROTEGIDO y AVISADO, procederemos a actuar sobre el accidentado, efectuando el reconocimiento de sus signos vitales.{"\n"}</Text>
                                    <Text bold>   {"a) Consciencia"}</Text>
                                    <Text bold>   {"b) Respiración"}</Text>
                                    <Text bold>   {"c) Pulso"}</Text>
                                </>
                            }
                            {step === 2 && <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <Image source={icons.hepl1
                                } resizeMode="contain" alt="Alternate Text" w={'100%'} h={250} />
                            </View>}
                            {step === 3 && <View>
                                <Text textAlign={'center'}>
                                    No hará falta seguir explorando sus signos vitales ya que el corazón funciona seguro. En este momento se inicia la Evaluación Secundaria, siendo el procedimiento a seguir el control de las hemorragias, el tratamiento de las heridas y la inmovilización de las fracturas y, siempre que no sea traumático, el de colocarlo en una posición de seguridad para prevenir las posibles consecuencias de un vómito y la caída de la lengua hacia la faringe.
                                </Text>
                            </View>}

                            {step === 4 && <View>
                                <Image source={icons.hepl2
                                } resizeMode="contain" alt="Alternate Text" w={'100%'} h={250} />
                                <Text textAlign={'center'}>En el caso de que el paciente respire pero sea traumático, NO LO MOVEREMOS. </Text>
                            </View>}
                            {step === 5 && <View>
                                <Text>Si al acercar nuestra mejilla o el dorso de nuestra mano a su boca, comprobamos que NO RESPIRA, en seguida y sin perder el tiempo aplicaremos la maniobra: FRENTE - MENTON</Text>
                                <Image source={icons.hepl3
                                } resizeMode="contain" alt="Alternate Text" w={'100%'} h={250} />
                            </View>}
                        </Modal.Body>
                        <Modal.Footer justifyContent={'center'}>
                            <Button onPress={() => {
                                handleNext()
                                if (step === 5) {
                                    setVisibleThirdModal(false)
                                }
                            }}
                                _pressed={{ bg: colors.text.third }}
                                bg={colors.text.secondary}
                                p={4}
                                rounded={8}
                            >
                                <Text color={colors.text.primary} fontSize={20} fontWeight={'700'}>{step !== 5 ? "Siguiente" : "Entendido!"}</Text>
                            </Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Box >
        </ScrollView >
    );
}


export default PasScreen;