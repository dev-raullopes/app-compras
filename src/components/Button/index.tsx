import { TouchableOpacity, Text} from "react-native"
import { styles } from "./styles"

type Props = {
    onAdd: () => void;
}
export function ButtonApp({ onAdd }: Props) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onAdd}>
            <Text style={styles.title}>Adicionar</Text>
        </TouchableOpacity>
    )
}