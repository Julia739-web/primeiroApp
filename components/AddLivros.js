import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Picker, TextInput } from "react-native";
import { createLivros, updateLivros } from "../services/Category.service";

export default function AddLivros({ categoryToEdit }) {
    const [titulo, setTitulo] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [status, setStatus] = useState('')
    const [descricao, setDescricao] = useState('')
    const [imagem, setImagem] = useState('')


    useEffect(() => {
        console.log('categoryToEdit', categoryToEdit);
        if (categoryToEdit) {
            setTitulo(categoryToEdit.titulo)
             setStatus(categoryToEdit.status);
             setDescricao(categoryToEdit.descricao);
              setEditingId(categoryToEdit.id);
              setImagem(categoryToEdit.imagem)
            
            } else {
            clearForm()
        }
        
    }, [categoryToEdit])

    async function save() {
        const obj = {
            titulo: titulo,
            status: status,
            descricao: descricao,
            imagem: imagem
        }

       
        try {
            clearForm()

            if (editingId) {
                const response = await updateLivros(editingId, obj)
            } else {
                const response = await createLivros(obj)
            }
            
        } catch {
            
        }
    }

    function clearForm() {
        setTitulo('')
        setDescricao('')
         setStatus('')
        setEditingId(null)
         setImagem('')
    }

    return (
        <View style={style.container}>
            <Text style={style.title}>
                Adicionar livro
            </Text>
            <TextInput
                value={titulo}
                onChangeText={setTitulo}
                placeholder="Digite o titulo.."
            />
            <TextInput
                value={status}
                onChangeText={setStatus}
                placeholder="Digite o status"
                style={style.input}
            />

            <TextInput
                value={descricao}
                onChangeText={setDescricao}
                placeholder="Digite a descrição"
                style={style.input}
            />

           <TextInput
                value={imagem}
                onChangeText={setImagem}
                placeholder="Link da imagem"
                style={style.input}
            />

            <TouchableOpacity 
                style={style.button}
                onPress={save}>
                <Text style={style.textButton}>
                    Salvar
                </Text>
            </TouchableOpacity>
        </View>
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
        color: '#4d32017e',
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
    }
})