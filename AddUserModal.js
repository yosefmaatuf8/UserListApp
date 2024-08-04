// AddUserModal.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AddUserModal = ({ onSave, onClose }) => {
  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required('First name is required'),
    LastName: Yup.string().required('Last name is required'),
    PhoneNumber: Yup.string().required('Phone number is required'),
    Email: Yup.string().email('Invalid Email').required('Email is required'),
    Role: Yup.string().required('Role is required'),
  });

  return (
    <Formik
      initialValues={{
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        Email: '',
        Role: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSave(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.modal}>
          <Text>First Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('FirstName')}
            onBlur={handleBlur('FirstName')}
            value={values.FirstName}
          />
          {touched.FirstName && errors.FirstName && <Text style={styles.error}>{errors.FirstName}</Text>}

          <Text>Last Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('LastName')}
            onBlur={handleBlur('LastName')}
            value={values.LastName}
          />
          {touched.LastName && errors.LastName && <Text style={styles.error}>{errors.LastName}</Text>}

          <Text>Phone Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('PhoneNumber')}
            onBlur={handleBlur('PhoneNumber')}
            value={values.PhoneNumber}
          />
          {touched.PhoneNumber && errors.PhoneNumber && <Text style={styles.error}>{errors.PhoneNumber}</Text>}

          <Text>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('Email')}
            onBlur={handleBlur('Email')}
            value={values.Email}
          />
          {touched.Email && errors.Email && <Text style={styles.error}>{errors.Email}</Text>}

          <Text>Role</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('Role')}
            onBlur={handleBlur('Role')}
            value={values.Role}
          />
          {touched.Role && errors.Role && <Text style={styles.error}>{errors.Role}</Text>}
          <View style={styles.buttonContainer}>
            <TouchableOpacity  style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};


const styles = StyleSheet.create({
  modal: {
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
  
buttonContainer: {
  flexDirection: 'row',
  
 
justifyContent: 'space-between',
},
saveButton: {
  backgroundColor: 'green',
  padding: 10,
  borderRadius: 5,
},
cancelButton: {
  
  
backgroundColor: 'red',
  padding: 10,
  borderRadius: 5,
},
buttonText: {
  
  
color: 'white',
  textAlign: 'center',
},
});

export default AddUserModal;