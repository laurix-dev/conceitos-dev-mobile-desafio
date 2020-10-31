import React, {useEffect, useState} from "react";

import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [repositories,setRepositories] = useState([])
  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    await api.post(`repositories/${id}/like`).then(response => {
      let novoArray = repositories.slice()//copia o array antigo para o novo
      const repoIndex= novoArray.findIndex(repo => repo.id === id)//achar o index dele
      novoArray[repoIndex]={
        id: novoArray[repoIndex].id,
        title: novoArray[repoIndex].title,
        url: novoArray[repoIndex].url,
        techs: novoArray[repoIndex].techs,
        likes: novoArray[repoIndex].likes + 1
      }
      setRepositories(novoArray)
    }).catch(err => console.log(err))
  }
  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data)
    })
  },[])


  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {repositories.map(repository => (
        <View style={styles.repositoryContainer} key={repository.id}>
          <Text style={styles.repository}>{repository.title}</Text>

          <View style={styles.techsContainer}>
            {repository.techs.map((tech,index)=>(
              <Text style={styles.tech} key={index}>
                  {tech}
              </Text>
            ))
            }
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              testID={`repository-likes-${repository.id}`}
            >
              {`${repository.likes} curtidas`}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repository.id)}
            testID={`like-button-${repository.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
        ))
        }
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
