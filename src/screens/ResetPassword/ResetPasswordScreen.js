import { View, Text, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import { useNavigation } from '@react-navigation/native';

const ResetPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const navigation = useNavigation();

    const onConfirmar = () => {
      navigation.navigate('SignIn');
    }
    
    const onSingInPressed = () => {
      navigation.navigate('SignIn') 
    }

  return (
    <View style = {styles.root}>
      <Text style={ styles.title }>Restablezca su contraseña</Text>

        <CustomInputs 
          placeholder="Ingrese Codigo" 
          value={code} 
          setValue={setCode}
        />

        <CustomInputs 
          placeholder="Ingrese su nueva contraseña" 
          value={newpassword} 
          setValue={setNewpassword}
        />

        <CustomButton text="Confirmar" onPress={onConfirmar} />

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
        paddingHorizontal: 50,
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

export default ResetPasswordScreen;