import { View, Image, TouchableOpacity, Text, FlatList, Alert} from "react-native";
import { styles } from "./styles";
import logoImg from "@/assets/logo.png";
import { ButtonApp } from "@/components/Button";
import { InputApp } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/filterStatus";
import { Item } from "@/components/Item";
import { useState } from "react";
// Definindo os status de filtro disponíveis, importando o tipo FilterStatus
const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDENTE, FilterStatus.CONCLUIDO];
export function Home() {
  // Estado para armazenar o status do filtro ativo
  const [activeFilter, setActiveFilter] = useState(FilterStatus.PENDENTE);

  // Estado para armazenar os itens da lista de compras
  const [items, setItems] = useState<any>([]);
  const [description, setDescription] = useState("");

  function handleAddItem() {
    if (!description.trim()) {
      return Alert.alert("Atenção", "Informe a descrição do item.");
    }
    const newItem = {
      id: Math.random().toString(36).substring(7), // Gerando um ID único
      description,
      status: FilterStatus.PENDENTE,
    }
    setItems((prevState: any[]) => [...prevState, newItem]); 
    setDescription(""); // Limpa o campo de entrada após adicionar o item
  }
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />
      <View style={styles.form}>
        <InputApp 
        placeholder="O que deseja comprar?"
        onChangeText={setDescription}
        value={description}
        autoCorrect={false}
        />
        <ButtonApp onAdd={handleAddItem}/>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
        {
          FILTER_STATUS.map((status) => (
            <Filter key={status} 
            status={status} 
            isActive={status === activeFilter}
            onPress={() => setActiveFilter(status)}
            />
          ))
        }
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>
        </View>
        <FlatList 
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item 
            data={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: "center", paddingTop: 24 }}>
            <Text style={{ color: "#828282", fontSize: 16 }}>Nenhum item</Text>
          </View>
        )}
        />
      </View>
    </View>
  );
}
