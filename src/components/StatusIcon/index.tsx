import { FilterStatus } from "@/types/filterStatus";
import {CircleDashed, CircleCheck} from "lucide-react-native"


export function StatusIcon({status}: {status: FilterStatus}) {
    return status === FilterStatus.CONCLUIDO ? (
        <CircleCheck size={18} color="#2C46B1" />
    ) : (
        <CircleDashed size={18} color="#000000" />
    )
}