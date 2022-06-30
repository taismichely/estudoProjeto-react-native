import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false);

  //Não é uma boa prática utilizar a função diretamente dentro do evento onPress, pois não sabemos o seu contexto. Desta maneira, é necessário criar uma função de callback
  const handleOnpress = () => { setToggle(oldToggle => !oldToggle) };

  useEffect(() => {
    //Aqui será implementado o código que irá ligar o flash
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    const subscription = RNShake.addListener(()=> {
      setToggle(oldToggle => !oldToggle);
    })

    //Essa função é para remover os ouvintes, então irá desmontar os componentes
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleOnpress} >
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={
            toggle
              ? require('./assets/icons/eco-light.png')
              : require('./assets/icons/eco-light-off.png')}
        />
        <Image
          style={style.dialogo}
          source={
            toggle
              ? require('./assets/icons/logo-dio.png')
              : require('./assets/icons/logo-dio-white.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

//Estilos dos componentes
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dialogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 200,
    height: 200,
  }
});