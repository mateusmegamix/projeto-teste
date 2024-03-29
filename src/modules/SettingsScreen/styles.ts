import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px 20px;
  margin-top: 10px;
  background-color: #FFFFFF;
  border-color: #FF6400;
  border-width: 1px;
  border-radius: 16px;
`

export const TextoForma = styled.Text`
  font-size: 20px;
  margin-left: 5px;
`

export const Texto = styled.Text`
  font-size: 20px;
  margin-left: 5px;
`

export const OptionContainer = styled.View`
  padding: 15px;
`

export const ColorOptions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const TouchableOption = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  margin-top: 10px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #000000;  
`

export const Slider = styled.View`
  width: 100%;
  height: 40px;
  border-width: 1;
  border-color: #000000;
`

export const styles = StyleSheet.create({
  picker: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
  },
})