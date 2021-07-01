import * as React from 'react';
import { 
 Text,
 TextInput,
 View,
 TouchableOpacity,
 ToastAndroid,
 KeyboardAvoidingView, 
 StyleSheet } from 'react-native';
 import firebase from 'firestore';
 import db from '../config';
 import {Header} from 'react-native-elements';

 

export default class Writestoryscreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            title: '',
            author: '',
            storyText: '',
        }
    }

    submitStory = () => {
   
    db.collection('Story').add({
      title: this.state.title,
      author: this.state.author,
      storyText: this.state.storyText,
    
    });
    
    this.setState({
      title: '',
      author: '',
      storyText: '',
    });

    ToastAndroid.show('Your story is submitted', ToastAndroid.SHORT);

    }

    render() {
       return(
        <KeyboardAvoidingView behavior="padding" enabled>
           <View style={styles.container}>
                <Header
                    backgroundColor={'#FFB6C1'}
                    centerComponent={{
                    text: 'Story Hub',
                    style: { color: 'black', fontSize: 25, fontWeight:"bold", },
                    }}
                />

                 <View style={styles.inputView}>
                    <TextInput 
                        style={styles.inputBox}
                        placeholder="Story Title"
                        onChangeText={text =>this.setState({title:text})}
                        value={this.state.title}/>
                </View>

                <View style={styles.inputView}>
                    <TextInput 
                        style={styles.inputBox}
                        placeholder="Author"
                        onChangeText ={text => this.setState({author:text})}
                        value={this.state.author}/>
                </View>

                <View style={styles.inputView}>
                    <TextInput 
                        style={styles.storyBox}
                        placeholder="Write A Story"
                        multiline={true}
                        onChangeText ={text => this.setState({storyText:text})}
                        value={this.state.story}/>
                </View>

                  <TouchableOpacity
                  style={styles.submitButton}
                  onPress={this.submitStory}>
        
            <Text style={styles.submitButtonText}>Submit</Text>
          
        </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>

              
       );
   }
}

   const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'white',
          marginTop: 5
         },

       inputBox: {
         borderWidth: 2,
         width: 300, 
       },
       inputView: {
           flexDirection: 'row',
           margin: 20
       },
       submitButton:{
           backgroundColor: '#FFB6C1',
           width: 100,
           height:50,
           borderRadius: 3,
           marginTop: -7,
           alignItems: "center",
           justifyContent: "center",
           marginLeft: 120,
       },
       submitButtonText:{
           padding: 10,
           textAlign: 'center',
           fontSize: 20,
           fontWeight:"bold",
           color: 'black',
       },
       storyBox: {
          borderWidth: 2,
          width: 300,  
          height: 150,
       },
   });