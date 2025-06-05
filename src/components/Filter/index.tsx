import { styles } from "./styles";
import { FilterStatus } from "@/types/filterStatus";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { StatusIcon } from "../StatusIcon";

type Props = TouchableOpacityProps & {
    status: FilterStatus,
    isActive: boolean
}

export function Filter({status, isActive, ...rest}: Props){
    return (
        <TouchableOpacity style={[styles.container, {opacity: isActive ? 1 : 0.5}]} {...rest}>
            <StatusIcon status={status} />
            <Text style={styles.title}>
                {status === FilterStatus.CONCLUIDO ? "Concluídos" : "Pendentes"}
            </Text>
        </TouchableOpacity>
    );
}