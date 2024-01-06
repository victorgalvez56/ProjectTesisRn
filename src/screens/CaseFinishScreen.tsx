import { Box, Center, ChevronLeftIcon, HStack, Image, Modal, Stack, Text, VStack } from 'native-base';
import { icons } from '../assets/icons/icons';
import { colors } from '../assets/Colors';
import { useEffect, useRef, useState } from 'react';
import { uploadQuestion } from '../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CaseFinishScreen = () => {
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [horas, setHoras] = useState(0);
    const [start, setStart] = useState(false);
    const [visibleFirstModal, setVisibleFirstModal] = useState(false);
    const [finishCase, setFinishCase] = useState(false);
    const [step, setStep] = useState(1);
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const spline = useRef();
    const onLoad = (splineApp: any) => {
        spline.current = splineApp;
    }


    const [firstQuestion, setFirstQuestion] = useState("¿Qué es lo que primero debemos hacer?");
    const [secondQuestion, setSecondQuestion] = useState("¿Qué sigue después del primer paso?");
    const [thirdQuestion, setThirdQuestion] = useState("¿Que debemos hacer cuando ya se tiene la herida de Armando desinfectada?");
    const [fourthQuestion, setFourthQuestion] = useState("¿Cuándo la herida de Armando se encuentra desinfectada y limpia que debemos hacer?");
    const [fifthQuestion, setFifthQuestion] = useState("¿Debemos hecharle alcohol a la herida de Armando?");

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

    const [selectedOption, setSelectedOption] = useState(false);


    const handleNext = async () => {
        if (selectedOption) {
            const userStorage = await AsyncStorage.getItem('user') || "[]"
            const user = JSON.parse(userStorage)
            const data = {
                username: user.name,
                type: "finish",
                chronometer: horas.toString().padStart(2, '0')
                    + ":" + minutos.toString().padStart(2, '0') + ":" + segundos.toString().padStart(2, '0'),

            }
            if (step === 1) {
                const firstRequestFinded = firstRequest.find(first => first.selected === true);
                await uploadQuestion({
                    ...data, question: firstQuestion,
                    response: firstRequestFinded?.text || "algo malo pasó"
                },
                    (response) => { console.log(response) },
                    (error) => { console.error(error) })
            }
            else if (step === 2) {
                const secondRequestFinded = secondRequest.find(second => second.selected === true);
                await uploadQuestion({
                    ...data, question: secondQuestion,
                    response: secondRequestFinded?.text || "algo malo pasó"
                },
                    (response) => { console.log(response) },
                    (error) => { console.error(error) })
            } else if (step === 3) {
                const thirdRequestFinded = thirdRequest.find(third => third.selected === true);
                await uploadQuestion({
                    ...data, question: thirdQuestion,
                    response: thirdRequestFinded?.text || "algo malo pasó"
                },
                    (response) => { console.log(response) },
                    (error) => { console.error(error) })
            } else if (step === 4) {
                const fourthRequestFinded = fourthRequest.find(fourth => fourth.selected === true);
                await uploadQuestion({
                    ...data, question: fourthQuestion,
                    response: fourthRequestFinded?.text || "algo malo pasó"
                },
                    (response) => { console.log(response) },
                    (error) => { console.error(error) })
            } else if (step === 5) {
                const fifthRequestFinded = fifthRequest.find(fifth => fifth.selected === true);
                await uploadQuestion({
                    ...data, question: fifthQuestion,
                    response: fifthRequestFinded?.text || "algo malo pasó"
                },
                    (response) => { console.log(response) },
                    (error) => { console.error(error) })

                setStart(false)
                setVisibleFirstModal(false)
                setFinishCase(true)
            }
            setSelectedOption(false)
            setStep(prevStep => prevStep < 5 ? prevStep + 1 : prevStep);
        }
    };
    useEffect(() => {
        let interval: any;
        if (start) {
            interval = setInterval(() => {
                setSegundos((segundos) => segundos + 1);
                if (segundos === 59) {
                    setMinutos((minutos) => minutos + 1);
                    setSegundos(0);
                }
                if (minutos === 59) {
                    setHoras((horas) => horas + 1);
                    setMinutos(0);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [start, segundos, minutos, horas]); //

    const iniciarCronometro = () => {
        if (!start) {
            setStart(true);
        }
    };
    return (
        <Box bg={colors.text.secondary} w={'100vw'} h={'100vh'} alignItems={'center'} p={6}>
            {/* <Box bg={colors.text.secondary} alignItems={'center'} borderColor={colors.text.primary} rounded={16} borderWidth={2} w={'full'} h={'full'} textAlign={'justify'} p={6} justifyContent={'center'}>
                <Box bg={colors.text.primary} rounded={10} px={10} py={4} mb={'5%'}>
                    <Text bold fontSize={'xl'} color={colors.text.secondary}>{String(horas).padStart(2, '0')}:{String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}</Text>
                </Box>
                <Text fontSize={26} fontWeight={'700'} color={colors.text.primary}>CASO PRÁTICO</Text>
                {
                    !finishCase ?
                        <>
                            <Text fontSize={16} fontWeight={'500'} color={colors.text.primary}>Armando, un estudiante de sexto año de primaria, disfrutaba de su tiempo libre en el patio cuando descubrió un objeto brillante en el suelo. Al intentar recogerlo para examinarlo más de cerca, se cortó levemente. En cuestión de segundos, empezó a brotar sangre.</Text>
                            <Text fontSize={16} fontWeight={'500'} color={colors.text.primary}>Descripción de la herida:
                                Longitud de 3 cm y profundidad superficial.</Text>
                            <Image source={icons.heridaCaso
                            } resizeMode="stretch" alt="Alternate Text" size={'2xl'} />

                            <Button onClick={() => {
                                iniciarCronometro()
                                setVisibleFirstModal(true)
                            }
                            } style={{ backgroundColor: colors.text.third, padding: "8px", borderRadius: 15, borderColor: 'white', borderWidth: 1, marginTop: '10%' }}>
                                <Text color={colors.text.primary} fontSize={20} fontWeight={'700'}>{"Empezar!"}</Text>
                            </Button>
                        </>
                        :
                        <>
                            <Text fontSize={20}>Listo! culminaste el caso practico.
                                Felicidades! </Text>

                        </>
                }
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
                                {step === 1 && <div>{firstQuestion}</div>}
                                {step === 2 && <div>{secondQuestion}</div>}
                                {step === 3 && <div>{thirdQuestion}</div>}
                                {step === 4 && <div>{fourthQuestion}</div>}
                                {step === 5 && <div>{fifthQuestion}</div>}
                            </Text>
                        </HStack>
                    </Modal.Header>
                    <Modal.Body>
                        {step === 1 &&
                            <div>
                                {firstRequest.map((question, index) => (
                                    <Box p={1}>
                                        <Button onClick={async () => {
                                            setSelectedOption(true)
                                            const newArray = firstRequest.map((question, indexQuestion) => ({
                                                ...question,
                                                selected: indexQuestion === index // Establece a true solo para el objeto seleccionado, a false para los demás
                                            }));
                                            setFirstRequest(newArray)
                                        }} style={{ backgroundColor: question.selected ? colors.text.third : colors.text.secondary, paddingInline: "6px", paddingTop: "10px", paddingBottom: "10px", borderRadius: 15, borderColor: 'white', borderWidth: 1, textAlign: 'start' }}>
                                            <Text color={colors.text.primary} fontSize={14} fontWeight={'700'}>{question.text}</Text>
                                        </Button>
                                    </Box>
                                ))}
                            </div>
                        }
                        {step === 2 &&
                            <div>
                                {secondRequest.map((question, index) => (
                                    <Box p={1}>
                                        <Button onClick={() => {
                                            setSelectedOption(true)
                                            const newArray = secondRequest.map((question, indexQuestion) => ({
                                                ...question,
                                                selected: indexQuestion === index // Establece a true solo para el objeto seleccionado, a false para los demás
                                            }));
                                            setSecondRequest(newArray)
                                        }} style={{ backgroundColor: question.selected ? colors.text.third : colors.text.secondary, paddingInline: "6px", paddingTop: "10px", paddingBottom: "10px", borderRadius: 15, borderColor: 'white', borderWidth: 1, textAlign: 'start' }}>
                                            <Text color={colors.text.primary} fontSize={14} fontWeight={'700'}>{question.text}</Text>
                                        </Button>
                                    </Box>
                                ))}
                            </div>}
                        {step === 3 &&
                            <div>
                                {thirdRequest.map((question, index) => (
                                    <Box p={1}>
                                        <Button onClick={() => {
                                            setSelectedOption(true)
                                            const newArray = thirdRequest.map((question, indexQuestion) => ({
                                                ...question,
                                                selected: indexQuestion === index // Establece a true solo para el objeto seleccionado, a false para los demás
                                            }));
                                            setThirdRequest(newArray)
                                        }} style={{ backgroundColor: question.selected ? colors.text.third : colors.text.secondary, paddingInline: "6px", paddingTop: "10px", paddingBottom: "10px", borderRadius: 15, borderColor: 'white', borderWidth: 1, textAlign: 'start' }}>
                                            <Text color={colors.text.primary} fontSize={14} fontWeight={'700'}>{question.text}</Text>
                                        </Button>
                                    </Box>
                                ))}
                            </div>}
                        {step === 4 &&
                            <div>
                                {fourthRequest.map((question, index) => (
                                    <Box p={1}>
                                        <Button onClick={() => {
                                            setSelectedOption(true)
                                            const newArray = fourthRequest.map((question, indexQuestion) => ({
                                                ...question,
                                                selected: indexQuestion === index // Establece a true solo para el objeto seleccionado, a false para los demás
                                            }));
                                            setFourthRequest(newArray)
                                        }} style={{ backgroundColor: question.selected ? colors.text.third : colors.text.secondary, paddingInline: "6px", paddingTop: "10px", paddingBottom: "10px", borderRadius: 15, borderColor: 'white', borderWidth: 1, textAlign: 'start' }}>
                                            <Text color={colors.text.primary} fontSize={14} fontWeight={'700'}>{question.text}</Text>
                                        </Button>
                                    </Box>
                                ))}
                            </div>}
                        {step === 5 &&
                            <div>
                                {fifthRequest.map((question, index) => (
                                    <Box p={1}>
                                        <Button onClick={() => {
                                            setSelectedOption(true)
                                            const newArray = fifthRequest.map((question, indexQuestion) => ({
                                                ...question,
                                                selected: indexQuestion === index // Establece a true solo para el objeto seleccionado, a false para los demás
                                            }));
                                            setFifthRequest(newArray)
                                        }} style={{ backgroundColor: question.selected ? colors.text.third : colors.text.secondary, paddingInline: "6px", paddingTop: "10px", paddingBottom: "10px", borderRadius: 15, borderColor: 'white', borderWidth: 1, textAlign: 'start' }}>
                                            <Text color={colors.text.primary} fontSize={14} fontWeight={'700'}>{question.text}</Text>
                                        </Button>
                                    </Box>
                                ))}
                            </div>}
                    </Modal.Body>
                    <Modal.Footer justifyContent={'center'}>
                        {selectedOption &&
                            <Button onClick={() => {
                                handleNext()
                            }} style={{ backgroundColor: colors.text.third, padding: "8px", borderRadius: 15, borderColor: 'white', borderWidth: 1 }}>
                                <Text color={colors.text.primary} fontSize={20} fontWeight={'700'}>{step !== 5 ? "Siguiente" : "Entendido!"}</Text>
                            </Button>}
                    </Modal.Footer>
                </Modal.Content>
            </Modal> */}
        </Box >
    );
}


export default CaseFinishScreen;