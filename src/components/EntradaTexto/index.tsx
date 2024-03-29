import { useState } from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import styles from './styles';
import { Props } from './types';
import React from 'react';

export function EntradaTexto({ 
  label, 
  value, 
  onChangeText, 
  secureTextEntry, 
  error, 
  messageError }: Props) {
  const [secureMode, setSecureMode] = useState(secureTextEntry);

  const showError = value == null || error

  return (
    <>
      <TextInput
        accessibilityLabel='caixa de texto'
        label={label}
        value={value}
        error={showError}
        secureTextEntry={secureMode}
        onChangeText={onChangeText}
        style={styles.input}
        mode="outlined"
        activeOutlineColor='#FF6400'
        right={
          secureTextEntry ?
          <TextInput.Icon
            icon={secureMode ? 'eye-off' : 'eye'}
            onPress={() => setSecureMode(!secureMode)}
          /> : null
        }
      />
      {showError && <HelperText type="error" visible={showError}>
        {messageError}
      </HelperText>}
    </>
  );
}
