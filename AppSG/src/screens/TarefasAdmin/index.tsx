import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Button } from 'react-native';
import axios from 'axios';
import { Container, Title } from './styles';
import { CardAdmin } from '../../components/CardAdmin';
//import { Button } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { useTheme } from '../../navigation/hooks';
import Modal from "react-native-modal";
import { Form } from '@unform/mobile';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';


export function TarefasAdmin() {
  const [canLoad, setCanLoad] = useState(false);
  const navigation = useNavigation();
  const { sizes, assets } = useTheme();




  const formRef = useRef(null);

  const pickerOptions = [
    { value: 'diego3g', label: 'Diego Fernandes' },
    { value: 'EliasGcf', label: 'Elias Gabriel' },
  ];

  const tarefas = [
    { value: 'Verif.Anuncio', label: 'Verificar Anuncios' },
    { value: 'Chc.Geladeira', label: 'Checar Geladeira' },
  ];

  const repetir = [
    { value: 'D', label: 'Diária' },
    { value: 'S', label: 'Semanal' },
  ];


  const data_ini = [
    { value: '2022-01-01', label: '01/01/2022' },
    { value: '2022-03-01', label: '01/03/2022' },
  ];

  const data_fim = [
    { value: '2022-06-01', label: '01/06/2022' },
    { value: '2022-03-01', label: '01/03/2022' },
  ];

  const loja = [
    { value: 'L01', label: 'Loja 1' },
    { value: 'L02', label: 'Loja 2' },
  ];

  function handleSubmit(data, { reset }) {
    console.log(data);
    reset();
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };



  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    loadTarefa();
  });

  let dados = [{}];
  function loadTarefa() {
    dados.splice(0, 1);
    loadAPI('tarefasadmin_tarefas', []).then((result) => {
      for (const dado of result) {
        dados.push(dado);
        if (result.length == dados.length) {
          setCanLoad(true);
        }
      }
    });
  }

  async function loadAPI(api, param) {
    let newp = '';
    if (param) {
      if (param.length != 0) {
        for (let x = 0; x < param.length; x++) newp += `p${x + 1}=${param[x]}&`;
      }
    }
    newp = newp.slice(0, newp.length - 1);

    const { data } = await axios.get(
      `http://192.168.1.6/8LIGHT/api_sougerente/index.php/${api}?${newp}`,
    );

    return data;
  }

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);



  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };






  return (
    <>
      {canLoad && (
        <Container>
          {/* <Button
            style={stilos.btnMais}
            //style={stilos.btnMais}
            onPress={() => toggleModal()}>
            <Image
              style={stilos.mais}
              source={require('../../assets/images/mais.png')}
            />
          </Button>
          <Button
            row
            style={{ alignSelf: 'flex-start', marginLeft: 20, marginBottom: 10 }}
            flex={0}
            onPress={() => navigation.goBack()}>
            <Image
              style={stilos.voltar}
              source={require('../../assets/images/seta-branca.png')}
            />
            <Title>Voltar</Title>
          </Button> */}

          <View style={stilos.container1}>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Text style={stilos.formTitle}>Tarefa</Text>
              <RNPickerSelect name="user" items={tarefas} onValueChange={(valor) => console.log(valor)} />

              <Text style={stilos.formTitle}>Responsavel</Text>
              <RNPickerSelect name="user2" items={pickerOptions} onValueChange={(valor) => console.log(valor)} />

              <Text style={stilos.formTitle}>Repetição</Text>
              <RNPickerSelect name="user2" items={repetir} onValueChange={(valor) => console.log(valor)} />

              <Text style={stilos.formTitle}>Data Inicio</Text>
              <View>
                <Button onPress={showDatepicker} title="Selecionar Data" />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  style={{ marginRight: 50 }}
                />
              )}


              <Text style={stilos.formTitle}>Horario Inicio</Text>
              <View>
                <Button onPress={showDatepicker} title="Selecionar Horario" />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  style={{ marginRight: 50 }}
                />
              )}


              <Text style={stilos.formTitle}>Data Limite</Text>
              <View>
                <Button onPress={showDatepicker} title="Selecionar Data" />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  style={{ marginRight: 50 }}
                />
              )}

              <Text style={stilos.formTitle}>Horario Limite</Text>
              <View>
                <Button onPress={showDatepicker} title="Selecionar Horario" />
              </View>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  style={{ marginRight: 50 }}
                />
              )}


              <Text style={stilos.formTitle}>Loja</Text>
              <RNPickerSelect name="user2" items={loja} onValueChange={(valor) => console.log(valor)} />

              <TouchableOpacity style={stilos.submitButton} onPress={() => formRef.current.submitForm()}>
                <Text style={stilos.submitButtonText}>Send</Text>
              </TouchableOpacity>
            </Form>
          </View>

          {/* <FlatList
            keyExtractor={(item, index) => index.toString()}
            style={{ flexGrow: 1 }}
            contentContainerStyle={{ alignItems: 'center' }}
            data={dados}
            renderItem={({ item }) => <CardAdmin dados={item} />}
            showsVerticalScrollIndicator={false}
          /> */}




          <KeyboardAvoidingView>
            <Modal isVisible={isModalVisible} style={stilos.modal}>
              <View style={stilos.modalContent}>
                <TextInput
                  style={stilos.placeholder}
                  placeholder="Entre usando CPF, Email ou Telefone"
                  autoCorrect={false}
                />
              </View>


            </Modal>
          </KeyboardAvoidingView>

        </Container>
      )}
    </>
  );
};

const stilos = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20,
  },

  formTitle: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 30,
    color: 'white'

  },

  submitButton: {
    backgroundColor: '#111',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginTop: 16
  },

  submitButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15,
  },

  logo: {
    width: 120,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  mais: {
    height: 30,
    width: 30,
  },
  voltar: {
    height: 20,
    width: 20,
  },

  btnMais: {
    alignSelf: 'flex-end',
    marginBottom: '-13%',
    marginTop: '5%',
    marginRight: '3%',
  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: '60%',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },

  placeholder: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
    marginTop: '4%',
    borderBottomWidth: 1,
    borderColor: 'black',
    width: '80%',
    marginBottom: '4%',
  },


});