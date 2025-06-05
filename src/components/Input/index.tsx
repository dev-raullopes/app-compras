import { TextInput, TextInputProps} from "react-native"
import { styles } from "./styles"
export function InputApp({...rest}: TextInputProps) {
    return (
        <TextInput 
        {...rest}
        style={styles.container} 
        placeholderTextColor="#74798B"
        />
    )
}