import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, style , ScrollView, Button} from "react-native";
import Modal from 'react-native-modal';
import AddUserModal from './AddUserModal.js';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const fetchData = async () =>{
    const res = await fetch('http://10.0.2.2:3000/users','get')
    const data = await res.json();
    setUsers(data);
    
  }
  useEffect (()=> {fetchData()},[])

  



  const [isModalVisible, setModalVisible] = useState(false);


  const addUser = async (newUser)=>{
    try {const response = await fetch('http://10.0.2.2:3000/users',{
      method : 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
    });

    if(!response.ok){throw new Error('Failed to add user');
      }
    const addedUser = await response.json();
    setUsers([...users,addedUser]);
  }
  catch (error){
      console.error('Error adding user:', error);
    }
  };
   
  const DeleteUser = async (item) => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/users/${item.id}`, { // Replace with your server's address
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      };
        
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  
  
 


return (
  <View style = {styles.Button}><Button title="add user" onPress={() => setModalVisible(true)}/>
<ScrollView horizontal = {true}>
  
  <View style={styles.container}>
  <Modal isVisible={isModalVisible}>
    <AddUserModal
      onClose={() => setModalVisible(false)}
      onSave={(newUser) => {
        addUser(newUser);
        setModalVisible(false);
      }}/>
  </Modal>
  
              
              <View style = {styles.title}>
                <Text style = {[styles.text, styles.text_role]}>             Name    </Text>
                <Text style = {[styles.text, styles.text_role]}>     PhoneNamber   </Text>
                <Text style = {[styles.text, styles.text_role]}>   Email    </Text>
                <Text style = {[styles.text, styles.text_role]}>Role</Text> 
            </View>
          <FlatList
          data={users}
          renderItem={({ item }) => (
            
              <View style = {styles.user}>
                  <Text style = {styles.text}> {item.id} : </Text>
                  <Text style = {styles.text}> {item.FirstName}</Text>
                  <Text style = {styles.text}> {item.LastName}</Text>
                  <Text style = {styles.text}> {item.PhoneNamber}</Text>
                  <Text style = {styles.text}> {item.Email}</Text>
                  <Text style = {[styles.text, styles.text_role]}>{item.Role}</Text>
                  <Button title="delete" onPress={() => DeleteUser(item)} />
              </View>
      )}/>
      
        </View>
        </ScrollView>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 5,
        marginTop: 10,
        backgroundColor: 'fffff',
    },
    Button: {
      paddingHorizontal: 1,
      paddingBottom: 1,
      marginTop: 50,
      backgroundColor: 'fffff',
  },
    user: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fefafb',
        
    },
    title:{ 
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 1,
      backgroundColor: '#fefafb',
      borderBottomWidth: 4,
      borderBottomColor: 'red',
    },
    text: {
        fontSize: 18,
        padding: 5,
        color: '#295286',
        borderWidth: 1,
        borderColor: 'blue'
    },
    text_role: {
      fontWeight: 'bold'
    }

});

export default UserList;

  