import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, FlatList, ScrollView, Modal, Image } from "react-native";
import { StyleSheet } from "react-native";
import { deleteLivros, getLivros } from "../services/Category.service";
import AddCategory from "../components/AddLivros";

export default function Livros({navigation}) {
    const [view, setView] = useState('list')
    const [livros, setLivros] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false)

    const loadLivros = async () => {
        const data = await getLivros()
        setLivros(data);
    }

    useEffect(() => {
        loadLivros()
    }, [])

    const renderItem = ( { item } ) => {
        console.log(item)
        return (
           
            <View style={style.card}>

            <View style={style.row}>
                {/* IMAGEM DO ITEM */}
                <Image
                    source={{ uri: item.imagem }}   // ← URL da internet
                    style={style.image}
                />

            <View>
                <Text style={style.textButton}>
                    Titulo
                </Text>
                <Text style={style.cardItem}>
                    {item.titulo}
                </Text>
            </View>
                </View>

                <TouchableOpacity style={style.button} onPress={() => {
                    setView('form')
                    setSelectedCategory(item)
                }}>
                    <Text style={style.textButton}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.button} onPress={() => {
                    setIsDeleteConfirm(true)
                    setSelectedCategory(item)
                }}>
                    <Text style={style.textButton}>Deletar</Text>
                </TouchableOpacity>

            </View>
        )

    }

    const onClose = () => {
        setIsDeleteConfirm(false)
    }

    const confirmDelete = async () => {
       const response = await deleteLivros(selectedCategory.id)
        onClose()
        loadLivros()
    }

    return (
        <ScrollView>

            <Modal visible={isDeleteConfirm}
                animationType="none"
                transparent={true}
                onRequestClose={onClose}
            >
                {/* Parte Preta */}
                <View style={style.modalContainer}>
                    {/* Parte Branca: */}
                    <View style={style.modalView}> 

                        <Text style={style.modalText}>
                            Tem certeza que deseja excluir o livro?
                        </Text>

                        <View style={style.modalButtons}>
                            <TouchableOpacity style={style.closeButton} onPress={onClose}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={style.confirmButton} onPress={confirmDelete}>
                                <Text>Confirmar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </Modal>

            {(view === 'list') ? (
                <View>
                    <TouchableOpacity style={style.button} onPress={() => setView('form')}>
                        <Text style={style.textButton}>Adicionar novo Livro</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={livros}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                    />

                </View>
            ) : (
                <View>
                    <TouchableOpacity style={style.button} onPress={() => {
                        setView('list')
                        setSelectedCategory(null)
                        loadLivros()
                    }}>
                        <Text style={style.textButton}>Ver Livros</Text>
                    </TouchableOpacity>

                    <AddCategory categoryToEdit={selectedCategory} ></AddCategory>
                </View>
            )}
        </ScrollView>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#a14b0321',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#442b05cb',
        color: '#FFF',
        padding: 15,
        borderRadius: 10
    },
    textButton: {
        color: '#9b9b9bff',
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: '#a87913cc',
        padding: 30,
        borderRadius: 10,
        marginBottom: 20
    },
    cardItem: {
        color: '#331d00',
        marginBottom: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080'
    },
    modalView: {
        margin:20,
        backgroundColor: '#361d006c',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        width: '90%'
    },
    modalText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#c9c9c9ff',
        textAlign: 'center'
    },
    closeButton: {
        backgroundColor: '#DC3545',
        padding: 15,
        borderRadius: 10
    },
    confirmButton: {
        backgroundColor: '#9782094b',
        padding: 15,
        borderRadius: 10
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#eee" // só para quando a imagem estiver carregando
},
row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
},
cardDescription: {
    color: "#555",
    fontSize: 14
}
})