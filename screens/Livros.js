import { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, FlatList, ScrollView, Modal } from "react-native";
import { StyleSheet } from "react-native";
import { deleteCategory, getCategories } from "../services/Category.service";
import AddCategory from "../components/AddCategory";

export default function Categories({navigation}) {
    const [view, setView] = useState('list')
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false)

    const loadCategories = async () => {
        const data = await getCategories()
        setCategories(data);
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const renderItem = ( { item } ) => {
        console.log(item)
        return (
            <View style={style.card}>
                <Text style={style.textButton}>
                    Nome
                </Text>
                <Text style={style.cardItem}>
                    {item.nome}
                </Text>

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
       const response = await deleteCategory(selectedCategory.id)
        onClose()
        loadCategories()
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
                        <Text style={style.textButton}>Adicionar Livro</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={categories}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                    />

                </View>
            ) : (
                <View>
                    <TouchableOpacity style={style.button} onPress={() => {
                        setView('list')
                        setSelectedCategory(null)
                        loadCategories()
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
        color: '#FF0000',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#000',
        color: '#FFF',
        padding: 15,
        borderRadius: 10
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: '#1a2b4a',
        padding: 30,
        borderRadius: 10,
        marginBottom: 20
    },
    cardItem: {
        color: '#fff',
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
        backgroundColor: '#fff',
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
        color: '#FF0000',
        textAlign: 'center'
    },
    closeButton: {
        backgroundColor: '#DC3545',
        padding: 15,
        borderRadius: 10
    },
    confirmButton: {
        backgroundColor: '#6C7570',
        padding: 15,
        borderRadius: 10
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    }
    

})