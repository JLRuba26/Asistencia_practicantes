import { View, Text, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');
    const navigation = useNavigation();

    const onConfirmar = () => {
      navigation.navigate('Home')
    }
    
    const onSingInPressed = () => {
      navigation.navigate('SignIn');
    }

    const onResendCode = () => {
      console.warn("onResendCode"); 
    }

  return (
    <View style = {styles.root}>
      <Text style={ styles.title }>Confirma tu correo</Text>

        <CustomInputs 
          placeholder="Ingrese Codigo" 
          value={code} 
          setValue={setCode}
        />

        <CustomButton text="Confirmar" onPress={onConfirmar} />

        <CustomButton 
        text="Reenviar Codigo" 
        onPress={onResendCode}
        type="SECONDARY"
        />

        <CustomButton 
        text="Regresar al inicio de sesion" 
        onPress={onSingInPressed}
        type="TERTIARY"
        />

    </View>
  );
};

const styles = StyleSheet.create({
    root: {
        flex:1,
        alignItems: 'center',
        padding:100,
    },
    logo: {
        width: 200,
        maxWidth: 400,
        maxHeight: 400,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      margin: 10,
      paddingBottom:40,
    },
});

export default ConfirmEmailScreen;