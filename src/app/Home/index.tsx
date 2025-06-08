import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import logoImg from "@/assets/logo.png";
import { ButtonApp } from "@/components/Button";
import { InputApp } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/filterStatus";
import { Item } from "@/components/Item";
import { useState, useEffect } from "react";
import { ItemStorage, itemsStorage } from "@/storage/itemsStorage";

// Definindo os status de filtro disponíveis, importando o tipo FilterStatus
const FILTER_STATUS: FilterStatus[] = [
  FilterStatus.PENDENTE,
  FilterStatus.CONCLUIDO,
];
export function Home() {
  // Estado para armazenar o status do filtro ativo
  const [activeFilter, setActiveFilter] = useState(FilterStatus.PENDENTE);

  // Estado para armazenar os itens da lista de compras
  const [items, setItems] = useState<ItemStorage[]>([]);
  const [description, setDescription] = useState("");

  // Função para adicionar um novo item à lista de compras
  async function handleAddItem() {
    if (!description.trim()) {
      return Alert.alert("Atenção", "Informe a descrição do item.");
    }
    const newItem = {
      id: Math.random().toString(36).substring(7), // Gerando um ID único
      description,
      status: FilterStatus.PENDENTE,
    };
    await itemsStorage.add(newItem);
    await itemsByStatus(); // Recarrega os itens após adicionar um novo
    Alert.alert("Sucesso", "Item adicionado com sucesso!");
    setDescription(""); // Limpa o campo de entrada após adicionar o item
  }
  // Função para carregar os itens filtrados pelo status ativo
  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(activeFilter);
      setItems(response);
    } catch (error) {
      console.error("Erro ao carregar os itens:", error);
      Alert.alert("Erro", "Não foi possível carregar os itens.");
    }
  }
  // Função para remover um item da lista de compras
  async function handleRemoveItem(id: string) {
    try {
      await itemsStorage.remove(id); // Remove o item pelo ID
      Alert.alert("Sucesso", "Item removido com sucesso!");
      await itemsByStatus(); // Recarrega os itens após remover um item
    } catch (error) {
      console.error("Erro ao remover o item:", error);
      Alert.alert("Erro", "Não foi possível remover o item.");
    }
  }
  // Função para limpar todos os itens da lista de compras
  async function handleClearAll() {
    try {
      Alert.alert("Atenção", "Deseja realmente limpar todos os itens?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Limpar",
          onPress: async () => {
            await itemsStorage.clearAll(); // Limpa todos os itens
            setItems([]); // Atualiza o estado dos itens para vazio
            Alert.alert("Sucesso", "Todos os itens foram removidos.");
          },
        },
      ]);
    } catch (error) {
      console.error("Erro ao limpar todos os itens:", error);
      Alert.alert("Erro", "Não foi possível limpar todos os itens.");
    }
  }
  // Função para alternar o status de um item (pendente/concluído)
  // Esta função é chamada quando o usuário toca no botão de status de um item
  async function handleToggleStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id); // Alterna o status do item
      await itemsByStatus(); // Recarrega os itens após alternar o status
    } catch (error) {
      console.error("Erro ao alternar o status do item:", error);
      Alert.alert("Erro", "Não foi possível alternar o status do item.");
    }
  }
  useEffect(() => {
    itemsByStatus();
  }, [activeFilter]);
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
        <ButtonApp onAdd={handleAddItem} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === activeFilter}
              onPress={() => setActiveFilter(status)}
            />
          ))}
          <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => handleToggleStatus(item.id)}
              onRemove={() => handleRemoveItem(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, alignItems: "center", paddingTop: 24 }}>
              <Text style={{ color: "#828282", fontSize: 16 }}>
                Nenhum item
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
