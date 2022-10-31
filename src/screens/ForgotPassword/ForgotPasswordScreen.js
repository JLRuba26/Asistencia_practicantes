import { View, Text, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInputs from '../../components/CustomInputs/CustomInputs';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [correo, setCorreo] = useState('');
    const navigation = useNavigation();

    const onEnviar = () => {
      navigation.navigate('ResetPassword'); 
    }
    
    const onSingInPressed = () => {
      navigation.navigate('SignIn')
    }

  return (
    <View style = {styles.root}>
      <Text style={ styles.title }>Restablecer Contraseña</Text>

        <CustomInputs 
          placeholder="Ingrese su correo electronico" 
          value={correo} 
          setValue={setCorreo}
        />

        <CustomButton text="Enviar" onPress={onEnviar} />

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

export default ForgotPasswordScreen;