import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

//What i will to do ?
//[X] Layout basico
//[] Jogador Vs Jogador
//[] * Funções Basicas PVP
//[] Jogador vs COM
//[] * Funçoes P X COM
//[] Layout Final

//What i did ? 
// Index.js

export default function Index() {
    const naipes = ["♠", "♣", "♥", "♦"];
    const randomNaipe = Math.floor(Math.random() * naipes.length)
    const selectNaipe = naipes[randomNaipe]


    const cartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const [nova, setNova] = useState()
    const [soma, setSoma] = useState()
    const [naipe, setNaipe] = useState()
    var [history, setHistory] = useState([])

    function newCard() {
        const randCartas = Math.floor(Math.random() * cartas.length + 1)
        setNaipe(selectNaipe)

        if (history.includes(randCartas)) {
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
            control21()
        }
    }

    function control21() {
        // const total = history.reduce(reducer)

        if (soma > 21) {
            setSoma(" PERDEU")
        }
        if (soma === 21) {
            setSoma(" GANHOU")
        }
        if (soma === " PERDEU") {
            restart()
        }
    }

    function restart() {
        setHistory([])
        setNova()
        setSoma()
        setNaipe()
        
    }
    return (
        <View style={styles.container}>

            <View>
                    <Text style={styles.txtSeeCard}>{history + ", "}</Text>
            </View>

            <View style={styles.viewCard}>
                <Text style={styles.txtCard}>{nova}{naipe}</Text>
                <Text style={styles.txtSoma}>{nova}</Text>
                <Text style={styles.txtCardR}>{naipe}{nova}</Text>
            </View>

            <View>
                <TouchableOpacity
                    style={styles.btnCard}
                    onPress={() => {
                        newCard()
                    }}
                >
                    <Text style={styles.txtBtns}>+ PEDIR CARTA</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.btnCard}
                    onPress={() => {
                        restart()
                    }}
                >
                    <Text style={styles.txtBtns}>{soma}</Text>

                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnCard: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 7,
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 10
    },
    txtCard: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 5
    },
    txtCardR: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: 5,
        marginBottom: 5,
    },
    viewCard: {
        backgroundColor: 'white',
        height: 305,
        width: 200,
        marginVertical: 20,
        borderRadius: 7,
        borderColor: 'black',
        borderWidth: 1,
    },
    txtSoma: {
        alignSelf: 'center',
        marginVertical: 95,
        fontSize: 40,
    },
    txtBtns: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center'
    },
    txtSeeCard: {
        borderColor: 'black',
        borderWidth: 2,
        color: 'black',
        padding: 5,
        borderRadius: 7
    }

});
