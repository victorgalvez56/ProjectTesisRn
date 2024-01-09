import { Box, Button, Center, ChevronLeftIcon, HStack, Image, Modal, ScrollView, Stack, Text, VStack } from 'native-base';
import { icons } from '../assets/icons/icons';
import { colors } from '../assets/Colors';
import { useEffect, useRef, useState } from 'react';
import { uploadQuestion } from '../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { GenericStackNavigationProp } from '../navigation/StackNavigationProp';
import SceneNames from '../navigation/SceneNames';
import LoaderElement from '../components/LoaderElement';

const CaseFirstScreen = () => {
    const { navigate } = useNavigation<GenericStackNavigationProp>();
    const [seconds, setSecons] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [start, setStart] = useState(false);
    const [visibleFirstModal, setVisibleFirstModal] = useState(false);
    const [step, setStep] = useState(1);
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [firstQuestion,] = useState("¿Qué es lo que primero debemos hacer?");
    const [secondQuestion,] = useState("¿Qué sigue después del primer paso?");
    const [thirdQuestion,] = useState("¿Que debemos hacer cuando ya se tiene la herida de Armando desinfectada?");
    const [fourthQuestion,] = useState("¿Cuándo la herida de Armando se encuentra desinfectada y limpia que debemos hacer?");
    const [fifthQuestion,] = useState("¿Debemos hecharle alcohol a la herida de Armando?");
    const [loading, setLoading] = useState(false)

    const [selectedOption, setSelectedOption] = useState(false);


    const [firstRequest, setFirstRequest] = useState([
        { text: "a) Calmar a Armando y llevarlo a una zona segura para realizar los primeros auxilios.", selected: false },
        { text: "b) Esperar a que la herida de Armando deje de sangrar.", selected: false },
        { text: "c) Llamar al 116 y esperar a que llegue la ambulancia", selected: false },
        { text: "d) No hacemos nada", selected: false }])

    const [secondRequest, setSecondRequest] = useState([
        { text: "a) Vendamos la herida con una gasa esterilizada.", selected: false },
        { text: "b) Procedemos a limpiar la herida con agua y jabón o suero fisiológico.", selected: false },
        { text: "c) Dejamos la herida al aire libre", selected: false },
        { text: "d) Esperamos a que llegue la ambulancia", selected: false }])

    const [thirdRequest, setThirdRequest] = useState([
        { text: "a) Limpiamos la herida desde el centro hacia el exterior con mucho cuidado.", selected: false },
        { text: "b) Dejamos la herida al aire libre.", selected: false },
        { text: "c) Conseguimos una aguja e hilo y procedimos a suturar la herida.", selected: false },
        { text: "d) Damos por culminados los primeros auxilios", selected: false }])

    const [fourthRequest, setFourthRequest] = useState([
        { text: "a) Conseguimos una aguja e hilo y procedimos a suturar la herida.", selected: false },
        { text: "b) No debemos hacer nada.", selected: false },
        { text: "c) Llevarlo a un hospital rapidamente.", selected: false },
        { text: "d) Debemos taparla con una gasa estéril y sujetar con esparadrapo.", selected: false }])

    const [fifthRequest, setFifthRequest] = useState([
        { text: "a) SI", selected: false },
        { text: "b) NO", selected: false }])

    const handleNext = async () => {
        setLoading(true)
        const userStorage = await AsyncStorage.getItem('user') || "[]"
        if (selectedOption) {
            const user = JSON.parse(userStorage)
            const data = {
                username: user.name,
                type: "initial",
                chronometer: hours.toString().padStart(2, '0')
                    + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'),

            }
            if (step === 1) {
                const firstRequestFinded = firstRequest.find(first => first.selected === true);
                await uploadQuestion({
                    ...data, question: firstQuestion,
                    response: firstRequestFinded?.text || "wrong"
                },
                    (response) => { console.log(response) },
                    (error) => { console.error(error) })
            }
            else if (step === 2) {
                const secondRequestFinded = secondRequest.find(second => second.selected === true);
                await uploadQuestion({
                    ...data, question: secondQuestion,
                    response: secondRequestFinded?.text || "wrong"
                },
                    (response) => { console.log(response) },
                    (error) => { console.error(error) })
            } else if (step === 3) {
                const thirdRequestFinded = thirdRequest.find(third => third.selected === true);
                await uploadQuestion({
                    ...data, question: thirdQuestion,
                    response: thirdRequestFinded?.text || "wrong"
                },
                    (response) => { console.log(response) },
                    (error) => { console.error(error) })
            } else if (step === 4) {
                const fourthRequestFinded = fourthRequest.find(fourth => fourth.selected === true);
                await uploadQuestion({
                    ...data, question: fourthQuestion,
                    response: fourthRequestFinded?.text || "wrong"
                },
                    (response) => { console.log(response) },
                    (error) => { console.error(error) })
            } else if (step === 5) {
                const fifthRequestFinded = fifthRequest.find(fifth => fifth.selected === true);
                await uploadQuestion({
                    ...data, question: fifthQuestion,
                    response: fifthRequestFinded?.text || "wrong"
                },
                    (response) => { console.log(response) },
                    (error) => { console.error(error) })
                setStep(1)
                setVisibleFirstModal(false)
                setSecons(0)
                setMinutes(0)
                setHours(0)
                navigate(SceneNames.CoursesScreen)
            }
            setSelectedOption(false)
            setStep(prevStep => prevStep < 5 ? prevStep + 1 : prevStep);
        }
        setLoading(false)
    };
    useEffect(() => {
        let interval: any;
        if (start) {
            interval = setInterval(() => {
                setSecons((seconds) => seconds + 1);
                if (seconds === 59) {
                    setMinutes((minutes) => minutes + 1);
                    setSecons(0);
                }
                if (minutes === 59) {
                    setHours((hours) => hours + 1);
                    setMinutes(0);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [start, seconds, minutes, hours]); //

    const startChrono = () => {
        if (!start) {
            setStart(true);
        }
    };
    return (
        <Box flex={1} safeArea bg={colors.text.secondary} w={'full'} h={'full'} alignItems={'center'} p={6}>
            <ScrollView>
                <LoaderElement isLoading={loading} />

                <Box bg={colors.text.secondary} alignItems={'center'} borderColor={colors.text.primary} rounded={16} borderWidth={2} w={'full'} h={'full'} textAlign={'justify'} p={6} justifyContent={'center'}>
                    <Box bg={colors.text.primary} rounded={10} px={10} py={4} mb={'5%'}>
                        <Text bold fontSize={'xl'} color={colors.text.secondary}>{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</Text>
                    </Box>
                    <Text fontSize={26} fontWeight={'700'} color={colors.text.primary}>CASO PRÁCTICO</Text>
                    <Text fontSize={16} fontWeight={'500'} color={colors.text.primary}>Armando, un estudiante de sexto año de primaria, disfrutaba de su tiempo libre en el patio cuando descubrió un objeto brillante en el suelo. Al intentar recogerlo para examinarlo más de cerca, se cortó levemente. En cuestión de seconds, empezó a brotar sangre.</Text>
                    <Text fontSize={16} fontWeight={'500'} color={colors.text.primary}>Descripción de la herida:
                        Longitud de 3 cm y profundidad superficial.</Text>
                    <Image source={icons.heridaCaso
                    } resizeMode="stretch" alt="Alternate Text" size={'2xl'} />

                    <Button onPress={() => {
                        startChrono()
                        setVisibleFirstModal(true)
                    }
                    }
                        bg={colors.text.third}
                        px={6}
                        py={4}
                        rounded={8}
                        mt={'10%'}
                    >
                        <Text color={colors.text.primary} fontSize={20} fontWeight={'700'}>{"Empezar!"}</Text>
                    </Button>
                </Box>


                <Modal isOpen={visibleFirstModal} size={'xl'}
                    initialFocusRef={initialRef} finalFocusRef={finalRef}
                >
                    <Modal.Content
                        rounded={30}
                    >
                        <Modal.Header>

                            <HStack space={8}
                                justifyContent={step !== 1 ? '' : 'center'}
                            >
                                <Text textAlign={'center'} color={colors.text.primary} fontSize={20} bold>
                                    {step === 1 && <Text>{firstQuestion}</Text>}
                                    {step === 2 && <Text>{secondQuestion}</Text>}
                                    {step === 3 && <Text>{thirdQuestion}</Text>}
                                    {step === 4 && <Text>{fourthQuestion}</Text>}
                                    {step === 5 && <Text>{fifthQuestion}</Text>}
                                </Text>
                            </HStack>
                        </Modal.Header>
                        <Modal.Body>
                            {step === 1 &&
                                <>
                                    {firstRequest.map((question, index) => (
                                        <Box p={1}>
                                            <Button onPress={async () => {
                                                setSelectedOption(true)
                                                const newArray = firstRequest.map((question, indexQuestion) => ({
                                                    ...question,
                                                    selected: indexQuestion === index
                                                }));
                                                setFirstRequest(newArray)
                                            }}
                                                bg={question.selected ? colors.text.third : colors.text.secondary}
                                                rounded={8}
                                                _pressed={{ bg: colors.text.third }}
                                            >
                                                <Text textAlign={'center'} color={colors.text.primary} fontSize={14} fontWeight={'700'}>{question.text}</Text>
                                            </Button>
                                        </Box>
                                    ))}
                                </>
                            }
                            {step === 2 &&
                                <>
                                    {secondRequest.map((question, index) => (
                                        <Box p={1}>
                                            <Button onPress={async () => {
                                                setSelectedOption(true)
                                                const newArray = secondRequest.map((question, indexQuestion) => ({
                                                    ...question,
                                                    selected: indexQuestion === index // Establece a true solo para el objeto seleccionado, a false para los demás
                                                }));
                                                setSecondRequest(newArray)
                                            }}
                                                bg={question.selected ? colors.text.third : colors.text.secondary}
                                                rounded={8}
                                                _pressed={{ bg: colors.text.third }}
                                            >
                                                <Text textAlign={'center'} color={colors.text.primary} fontSize={14} fontWeight={'700'}>{question.text}</Text>
                                            </Button>
                                        </Box>
                                    ))}
                                </>}
                            {step === 3 &&
                                <>
                                    {thirdRequest.map((question, index) => (
                                        <Box p={1}>
                                            <Button onPress={async () => {
                                                setSelectedOption(true)
                                                const newArray = thirdRequest.map((question, indexQuestion) => ({
                                                    ...question,
                                                    selected: indexQuestion === index // Establece a true solo para el objeto seleccionado, a false para los demás
                                                }));
                                                setThirdRequest(newArray)
                                            }}
                                                bg={question.selected ? colors.text.third : colors.text.secondary}
                                                rounded={8}
                                                _pressed={{ bg: colors.text.third }}
                                            >
                                                <Text textAlign={'center'} color={colors.text.primary} fontSize={14} fontWeight={'700'}>{question.text}</Text>
                                            </Button>
                                        </Box>
                                    ))}
                                </>}
                            {step === 4 &&
                                <>
                                    {fourthRequest.map((question, index) => (
                                        <Box p={1}>
                                            <Button onPress={async () => {
                                                setSelectedOption(true)
                                                const newArray = fourthRequest.map((question, indexQuestion) => ({
                                                    ...question,
                                                    selected: indexQuestion === index // Establece a true solo para el objeto seleccionado, a false para los demás
                                                }));
                                                setFourthRequest(newArray)
                                            }}
                                                bg={question.selected ? colors.text.third : colors.text.secondary}
                                                rounded={8}
                                                _pressed={{ bg: colors.text.third }}
                                            >
                                                <Text textAlign={'center'} color={colors.text.primary} fontSize={14} fontWeight={'700'}>{question.text}</Text>
                                            </Button>
                                        </Box>
                                    ))}
                                </>}
                            {step === 5 &&
                                <>
                                    {fifthRequest.map((question, index) => (
                                        <Box p={1}>
                                            <Button onPress={async () => {
                                                setSelectedOption(true)
                                                const newArray = fifthRequest.map((question, indexQuestion) => ({
                                                    ...question,
                                                    selected: indexQuestion === index // Establece a true solo para el objeto seleccionado, a false para los demás
                                                }));
                                                setFifthRequest(newArray)
                                            }}
                                                bg={question.selected ? colors.text.third : colors.text.secondary}
                                                rounded={8}
                                                _pressed={{ bg: colors.text.third }}
                                            >
                                                <Text color={colors.text.primary} fontSize={14} fontWeight={'700'}>{question.text}</Text>
                                            </Button>
                                        </Box>
                                    ))}
                                </>}
                        </Modal.Body>
                        <Modal.Footer justifyContent={'center'}>
                            {selectedOption &&
                                <Button onPress={async () => {
                                    handleNext()
                                }} disabled={!selectedOption}
                                    bg={colors.text.third}
                                    px={6}
                                    py={4}
                                    rounded={8}
                                    _pressed={{ bg: colors.text.secondary }}
                                >
                                    <Text color={colors.text.primary} fontSize={20} fontWeight={'700'}>{step !== 5 ? "Siguiente" : "Entendido!"}</Text>
                                </Button>
                            }
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </ScrollView >
        </Box >
    );
}


export default CaseFirstScreen;