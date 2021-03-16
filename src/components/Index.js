import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, ImageBackground, Pressable } from 'react-native'

//[X] Layout basico
//[X] Jogador Vs Jogador
//[X] * Funções Basicas PVP
//[X] Jogador vs COM
//[X] * Funçoes P X COM
//[X] Layout Final

export default function Index() {

    const [estilo, setEstilo] = useState({ marginRight: 40, backgroundColor: 'grey', padding: 5, borderRadius: 7 })
    const [estilo2, setEstilo2] = useState({ padding: 5, borderRadius: 10 })
    const [turn1, setTurn1] = useState(" 🔴")
    const [turn2, setTurn2] = useState("")

    const naipes = ["♠", "♣", "♥", "♦"];
    const randomNaipe = Math.floor(Math.random() * naipes.length)
    const selectNaipe = naipes[randomNaipe]

    const cartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const [cont, setCont] = useState(1)

    //PLAYER
    const [nova, setNova] = useState()
    const [soma, setSoma] = useState('')
    const [naipe, setNaipe] = useState()
    const [status, setStatus] = useState()
    var [history, setHistory] = useState([0])
    const [pedir, setPedir] = useState(false)
    const [passar, setPassar] = useState(false)
    const [vsP, setVsP] = useState(false)

    //player2

    //SISTEMA
    const [tutorial, setTutorial] = useState(false)
    const naipesCom = ["♠", "♣", "♥", "♦"];
    const randomNaipeCom = Math.floor(Math.random() * naipesCom.length)
    const selectNaipeCom = naipesCom[randomNaipeCom]
    const [naipeCom, setNaipeCom] = useState()

    const [vsCom, setVsCom] = useState(false)
    const [novaCom, setNovaCom] = useState()
    const [somaCom, setSomaCom] = useState('')
    const [statusCom, setStatusCom] = useState()
    var [historyCom, setHistoryCom] = useState([0])


    if (vsP === true) {
        if (turn2 === " 🔴") {
            confereNumbers()
            controlPass()
        }
        if (turn1 === " 🔴") {
            confereNumbers()
            controlPass()
        }
    }

    if (vsCom === true) {
        controlPass()
        // control21()
    }


    function turnPlayer() {
        if (turn1 === " 🔴") {
            setTurn2(" 🔴")
            setTurn1("")
            setEstilo({ marginRight: 40, padding: 5, borderRadius: 10 })
            setEstilo2({ backgroundColor: 'grey', padding: 5, borderRadius: 7 })


        }
        if (turn2 === " 🔴") {
            setTurn2("")
            setTurn1(" 🔴")
            setEstilo2({ padding: 5, borderRadius: 10 })
            setEstilo({ marginRight: 40, backgroundColor: 'grey', padding: 5, borderRadius: 7 })

        }
    }

    function goBack() {
        setVsP(false)
        setVsCom(false)
        restart()
    }

    //player 1
    function newP1() {
        const randCartas = Math.floor(Math.random() * cartas.length + 1)
        setNaipe(selectNaipe)

        if (history.includes(randCartas) || historyCom.includes(randCartas)) {
            // console.log("repetiu " + randCartas)
            newP1()
        } else {
            // console.log("não repetiu " + randCartas)
            if (history.length = 6) {
                history.shift();
            }
            setNova(randCartas)
            history.push(randCartas)
            setSoma(history.reduce(reducer))
            setStatus("PEDIU")
            turnPlayer()
        }
    }

    function passP1() {
        setStatus("PASSOU")
        turnPlayer()
    }

    //player 2
    function newP2() {
        const randCartasCom = Math.floor(Math.random() * cartas.length + 1)
        setNaipeCom(selectNaipeCom)

        if (historyCom.includes(randCartasCom) || history.includes(randCartasCom)) {
            newP2()
        } else {
            if (historyCom.length = 6) {
                historyCom.shift();
            }
            setNovaCom(randCartasCom)
            historyCom.push(randCartasCom)
            setSomaCom(historyCom.reduce(reducer))
            setStatusCom("PEDIU")
            turnPlayer()
        }
    }
    function passP2() {
        setStatusCom("PASSOU")
        turnPlayer()
    }


    //player 0
    function newCard() {
        const randCartas = Math.floor(Math.random() * cartas.length + 1)
        setNaipe(selectNaipe)

        if (history.includes(randCartas) || historyCom.includes(randCartas)) {
            // console.log("repetiu " + randCartas)
            newCard()
        } else {
            // console.log("não repetiu " + randCartas)
            if (history.length = 6) {
                history.shift();
            }
            setNova(randCartas)
            history.push(randCartas)
            setSoma(history.reduce(reducer))
            setStatus("PEDIU")
            controlIA()
        }
    }


    function controlIA() {
        
        if (somaCom < 16) { //  se a ia é menor q 16
            if (somaCom > soma) {
                setStatusCom("PASSOU")
            }
            if (somaCom <= soma) {
                execIA()
                setStatusCom("PEDIU")
            }
        }
        if (somaCom >= 16) {  // se a ia é maior/igual á 16
            setStatusCom("PASSOU")
            if (somaCom > 21) {
                setStatusCom("PASSOU")
            }
            if (somaCom === 21) {
                setStatusCom("PASSOU")
            }
        }
        //soma 
        if (soma > 21 && somaCom > 21) {
            setPedir(true)
            setPassar(true)
            setTurn2("")
            setTurn1("")
            setStatusCom("EMPATE")
            setStatus("EMPATE")
        }
        if (soma > 21 && somaCom <= 21) {
            setPedir(true)
            setTurn2("👑")
            setTurn1("")
            setStatusCom("GANHOU")
            setStatus("PERDEU")
        }
        if (soma === 21 && somaCom > 21) {
            //     execIA()
            // setStatusCom("PEDIU")
            setPedir(true)
            setPassar(true)
            setTurn2("")
            setTurn1("👑")
            setStatusCom("PERDEU")
            setStatus("GANHOU")
        }
        if (soma === 21 && somaCom === 21) {
            setPedir(true)
            setPassar(true)
            setTurn2("")
            setTurn1("")
            setStatusCom("EMPATE")
            setStatus("EMPATE")
        }
    }

    function execIA() {
        const randCartasCom = Math.floor(Math.random() * cartas.length + 1)
        setNaipeCom(selectNaipeCom)

        if (historyCom.includes(randCartasCom) || history.includes(randCartasCom)) {
            // console.log("repetiu " + randCartasCom)
            execIA()
        } else {
            // console.log("não repetiu " + randCartasCom)
            if (historyCom.length = 6) {
                historyCom.shift();

            }
            if (randCartasCom < 10) {
                setNovaCom(randCartasCom)
                historyCom.push(randCartasCom)
                setSomaCom(historyCom.reduce(reducer))
            }
            if (randCartasCom >= 10) {
                execIA()
            }
        }
    }

    function actionPass() { //clicado no btn passar PxC
        setStatus("PASSOU")
        //verifica se a IA precisa passar/pedir
        controlIA()
    }

    function controlPass() {
        if (statusCom === "PASSOU" && status === "PASSOU") {

            //block btn actions
            setPedir(true)
            setPassar(true)

            if (somaCom === '' && soma === '') {
                setStatusCom("EMPATE")
                setStatus("EMPATE")
            }

            if (somaCom >= 21 || soma >= 21) {

                if (somaCom > 21 && soma <= 21) {
                    setStatusCom("PERDEU")
                    setStatus("GANHOU")
                    setTurn1("👑")
                }
                if (somaCom <= 21 && soma > 21) {
                    setStatusCom("GANHOU")
                    setStatus("PERDEU")
                    setTurn2("👑")
                    setTurn1("")

                }
                if (somaCom > 21 && soma > 21) {
                    setStatusCom("EMPATE")
                    setStatus("EMPATE")
                }
                if (somaCom < 21 && soma === 21) {
                    setStatusCom("PERDEU")
                    setStatus("GANHOU")
                    setTurn1("👑")
                }
                if (somaCom === 21 && soma < 21) {
                    setStatusCom("GANHOU")
                    setStatus("PERDEU")
                    setTurn2("👑")
                    setTurn1("")
                }
            }
            if (somaCom < 21 && soma < 21) {

                if (somaCom > soma) {
                    setStatusCom("GANHOU")
                    setStatus("PERDEU")
                    setTurn2("👑")
                    setTurn1("")
                }
                if (soma > somaCom) {
                    setStatus("GANHOU")
                    setTurn1("👑")
                    setStatusCom("PERDEU")
                }
                if (soma === somaCom) {
                    setStatus("EMPATE")
                    setStatusCom("EMPATE")
                }
            }
            if (soma === 21 && somaCom === 21) {
                setStatus("EMPATE")
                setStatusCom("EMPATE")
            }
        }
    }

    function confereNumbers() {
        if (soma > 21) {
            setTurn2("👑")
            setStatusCom("GANHOU")
            setStatus("PERDEU")
            setPassar(true)
            setPedir(true)
        }
        if (somaCom > 21) {
            setTurn1("👑")
            setStatus("GANHOU")
            setStatusCom("PERDEU")
            setPassar(true)
            setPedir(true)
        }
    }

    function restart() {
        setEstilo2({ padding: 5, borderRadius: 7 })
        setEstilo({ marginRight: 40, backgroundColor: 'grey', padding: 5, borderRadius: 7 })
        setPassar(false)
        setTurn1(" 🔴")
        setTurn2("")
        setPedir(false)
        setHistory([])
        setNova()
        setSoma('')
        setNaipe('')
        setNaipeCom('')
        setNovaCom()
        setSomaCom('')
        setHistoryCom([])
        setStatus()
        setStatusCom()

    }
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../images/mesa.jpg')}
                style={styles.image}>

                <Text style={styles.titleMenu}> 21</Text>

                <TouchableOpacity
                    style={styles.btnMenu}
                    onPress={() => {
                        setVsP(true)
                    }}
                >
                    <Text style={styles.txtMenu}>👨‍🚀x👨‍🚀 </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnMenu}
                    onPress={() => {
                        setVsCom(true)
                    }}
                >
                    <Text style={styles.txtMenu}>👨‍🚀x🤖</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnMenu}
                    onPress={() => {
                        setTutorial(true)
                    }}
                >
                    <Text style={styles.txtMenu}>COMO JOGAR ?</Text>
                </TouchableOpacity>

                <Modal
                    visible={vsP}
                    transparent={false}
                    animationType="slide"
                >
                    <View>
                        <TouchableOpacity

                            onPress={() => {
                                goBack()
                            }}
                        >
                            <Text style={styles.txtBtns}>VOLTAR</Text>

                        </TouchableOpacity>

                        <ImageBackground
                            source={require('../images/mesa.jpg')}
                            style={styles.image}>

                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

                                <View style={estilo}>
                                    <Text style={styles.txtNome}>JOGADOR 1{turn1}</Text>
                                    <View style={styles.viewCard}>
                                        <Text style={styles.txtCard}>{nova}{naipe}</Text>
                                        <Text style={styles.txtSoma}>{soma}</Text>
                                        <Text style={styles.txtStatus}>{status}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.btnCard}
                                        disabled={passar}
                                        onPress={() => {
                                            passP1()
                                        }}
                                    >
                                        <Text style={styles.txtBtns}>PASSAR</Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.btnCard}
                                        disabled={pedir}
                                        onPress={() => {
                                            newP1()
                                        }}
                                    >
                                        <Text style={styles.txtBtns}>PEDIR</Text>
                                    </TouchableOpacity>

                                </View>

                                <View style={estilo2}>
                                    <Text style={styles.txtNome}>JOGADOR 2{turn2}</Text>
                                    <View style={styles.viewCard}>
                                        <Text style={styles.txtCard}>{novaCom}{naipeCom}</Text>
                                        <Text style={styles.txtSoma}>{somaCom}</Text>
                                        <Text style={styles.txtStatus}>{statusCom}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.btnCard}
                                        disabled={passar}
                                        onPress={() => {
                                            passP2()
                                        }}
                                    >
                                        <Text style={styles.txtBtns}>PASSAR</Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.btnCard}
                                        disabled={pedir}
                                        onPress={() => {
                                            newP2()
                                        }}
                                    >
                                        <Text style={styles.txtBtns}>PEDIR</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 10, alignSelf: 'center' }}>


                                <TouchableOpacity
                                    style={styles.btnCard}
                                    onPress={() => {
                                        restart()
                                    }}
                                >
                                    <Text style={styles.txtBtns}>REINICIAR</Text>

                                </TouchableOpacity>
                            </View>


                        </ImageBackground>

                    </View>
                </Modal>

                <Modal
                    transparent={false}
                    visible={vsCom}
                    animationType="slide"
                >
                    <View>
                        <TouchableOpacity

                            onPress={() => {
                                goBack()
                            }}
                        >
                            <Text style={styles.txtBtns}>VOLTAR</Text>

                        </TouchableOpacity>
                        <ImageBackground
                            source={require('../images/mesa.jpg')}
                            style={styles.image}  >


                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

                                <View style={{ marginRight: 40 }}>
                                    <Text style={styles.txtNome}>JOGADOR {turn1}</Text>
                                    <View style={styles.viewCard}>
                                        <Text style={styles.txtCard}>{nova}{naipe}</Text>
                                        <Text style={styles.txtSoma}>{soma}</Text>
                                        <Text style={styles.txtStatus}>{status}</Text>
                                    </View>
                                </View>

                                <View >
                                    <Text style={styles.txtNome}>COM {turn2}</Text>
                                    <View style={styles.viewCard}>
                                        <Text style={styles.txtCard}>{novaCom}{naipeCom}</Text>
                                        <Text style={styles.txtSoma}>{somaCom}</Text>
                                        <Text style={styles.txtStatus}>{statusCom}</Text>
                                    </View>
                                    {/* <Text style={styles.txtHistorico}>{historyCom + ', '}</Text> */}
                                </View>
                            </View>



                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

                                <TouchableOpacity
                                    style={styles.btnCard}
                                    disabled={pedir}
                                    onPress={() => {
                                        newCard()
                                    }}
                                >
                                    <Text style={styles.txtBtns}>PEDIR</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    disabled={passar}
                                    style={styles.btnCard}
                                    onPress={() => {
                                        actionPass()
                                    }}
                                >
                                    <Text style={styles.txtBtns}>PASSAR</Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.btnCard}
                                    onPress={() => {
                                        restart()
                                    }}
                                >
                                    <Text style={styles.txtBtns}>REINICIAR</Text>

                                </TouchableOpacity>

                            </View>

                            {/* <View style={{ marginTop: 15 }}>
                           <Text style={styles.txtCard}>CARTAS JOGADAS</Text>
                            <Text style={styles.txtNome}>JOGADOR: {history + ', '} </Text>
                            <Text style={styles.txtNome}>COM: {historyCom + ', '}</Text>
                            </View> */}

                        </ImageBackground>
                    </View>
                </Modal>
                
                <Modal
                    transparent={false}
                    animationType="slide"
                    visible={tutorial}
                >
                    <TouchableOpacity
                        onPress={() => {setTutorial(false)}}
                    >
                          <Text style={styles.txtBtns}>VOLTAR</Text>
                    </TouchableOpacity>
                    <View style={styles.container}> 
                            <Text style={styles.txtBtns}>Como Jogar ?</Text>

                           
                            <Text>Em um baralho de 13 cartas não repetidas os jogadores se revezam pegando ou não cartas aleatoriamente. 
                                Para vencer, o jogador precisa chegar na soma das cartas em 21. </Text>
                                <Text>**********</Text>
                                <Text>Outro modo de ganhar é tendo uma soma menor que 21 e seu oponente estourando a soma de 21.</Text>
                                <Text>*************</Text>
                                <Text>Assim, quem acabar com a soma mais próxima á 21 e não ultrapassando este, também é vencedor.
                                     A ação de "PASSAR" pode ser usada quando você não deseja mais cartas na jogada atual ou para esperar a vez do adversário.</Text>
                                <Text>*************</Text>
                                <Text>Obs: Quando os 2 jogadores decidem passar na mesma rodada o jogo acaba</Text>
                                <Text>*************</Text>
                                <Text>🔴 Vez de Jogar || 👑 VENCEDOR</Text>
                                <Text>*************</Text>
                                <Text>Luan Castoldi / LC Company</Text>
                                <Text style={styles.txtBtns}>castoldiluan@gmail.com</Text>
                     </View>
                </Modal>
                <Text style={{ textAlign: 'center' }}>Luan Castoldi / LC Company</Text>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleMenu: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
    },
    txtMenu: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnMenu: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 20,
        backgroundColor: 'white',
    },
    btnCard: {
        padding: 10,
        borderRadius: 7,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: 'white',
        marginRight: 5
    },
    txtCard: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 5,
    },
    viewCard: {
        backgroundColor: 'white',
        height: 160,
        width: 100,
        borderRadius: 7,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 20,
    },
    txtSoma: {
        alignSelf: 'center',
        marginVertical: 25,
        fontSize: 40,
    },
    txtBtns: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    txtSeeCard: {
        borderColor: 'black',
        borderWidth: 2,
        color: 'black',
        padding: 5,
        borderRadius: 7
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        justifyContent: "center",
    },
    txtStatus: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20
    },
    txtHistorico: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    txtNome: {
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 5,
    }
});

