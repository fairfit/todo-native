import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const App = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const addTask = () => {
    const newTask = { title: title, desc: desc };
    if (title.trim() !== "") {
      //trim condition is  to ensure that tasks are only added when the title field is not empty or have meaningfull texts after removing spces using trim
      if (editIndex !== -1) {
        // Edit existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = newTask;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        // Add new task
        setTasks([...tasks, newTask]);
      }
      setTitle("");
      setDesc("");
    }
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTitle(taskToEdit.title);
    setDesc(taskToEdit.desc);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      
      <Text style={[styles.itemList, styles.title]}>{item.title}</Text>
      <Text style={styles.itemList}>{item.desc}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => editTask(index)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Description.."
        value={desc}
        onChangeText={(text) => setDesc(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? "Update Task" : "Add Task"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({ 
	container: { 
		flex: 1, 
		padding: 40, 
		marginTop: 40, 
	}, 
  
	
	heading: { 
		fontSize: 30, 
		fontWeight: "bold", 
		marginBottom: 7, 
		color: "skyblue", 
	}, 
	input: { 
		borderWidth: 3, 
		borderColor: "#ccc", 
		padding: 10, 
		marginBottom: 10, 
		borderRadius: 10, 
		fontSize: 18, 
	}, 
	addButton: { 
		backgroundColor: "green", 
		padding: 10, 
		borderRadius: 5, 
		marginBottom: 10, 
	}, 
	addButtonText: { 
		color: "white", 
		fontWeight: "bold", 
		textAlign: "center", 
		fontSize: 18, 
	}, 
	task: { 
		
		justifyContent: "space-between", 
		alignItems: "center", 
		marginBottom: 15, 
    flex: 1,
		fontSize: 18, 
	}, 
	itemList: { 
		fontSize: 19, 
    flexDirection: "column", 
    
	},
  title:{
    fontWeight: "bold",
    fontSize: 22, 
    flexDirection: "column", 
  }, 
	taskButtons: { 
    flexDirection: "row", 
    textAlign: "center",
	}, 
	editButton: { 
		marginRight: 10, 
		color: "green", 
		fontWeight: "bold", 
		fontSize: 18, 
    display: "block", 
	}, 
	deleteButton: { 
		color: "red", 
		fontWeight: "bold", 
		fontSize: 18, 
	}, 
}); 

export default App;