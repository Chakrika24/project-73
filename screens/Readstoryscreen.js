import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity,SafeAreaView, } from 'react-native';
import { SearchBar } from 'react-native-elements';
import db from '../config.js';

export default class ReadStory extends React.Component {
  constructor() {
    super();
    this.state = {
      allStories: [],
      dataSource: [],
      search: '',
    };
  }
  componentDidMount() {
    this.retrieveStories();
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  retrieveStories = () => {
    try {
      var allStories = [];
      var Story = db
        .collection('Story')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
           allStories.push(doc.data());
           // console.log('storyText', allStories);
          });
          this.setState({ allStories });
        });
    } catch (error) {
      console.log(error);
    }
  };


  SearchFilterFunction(author){
    const newData = this.state.allStories.filter((item)=>{
       const itemData = item.author ? item.author.toUpperCase() : ''.toUpperCase();
      const titleData = author.toUpperCase();
      return itemData.indexOf(titleData) > -1;
    });
    this.setState({
      dataSource:newData,
      search:author
    })
  }

  render() {
    return (
      
      <View style={styles.container}>
      <TouchableOpacity style={styles.header}>
          <Text style={styles.headerText}>Story Hub</Text>
        </TouchableOpacity>
        <View styles={{ height: 20, width: '100%', }}>
          <SearchBar style = {styles.searchBar}
            placeholder="Search stories by their author's!!"
           onChangeText={(text) => this.SearchFilterFunction(text)}
           onClear={(text) => this.SearchFilterFunction('')}
            value={this.state.search}
          />
        </View>
  <SafeAreaView style={styles.container}>
        <ScrollView style = {styles.scrollView}>
          <View>
            {this.state.search === ''
              ? this.state.allStories.map((item) => (
                  <View
                    style={{
                    
                     backgroundColor: 'white',
                      borderWidth: 3,
                      padding: 10,
                      alignItems: 'center',
                      margin: 10,
                      backgroundColor:'white'
                    }}>
                    <TouchableOpacity>
                    <Text style = {styles.story}>TITLE : {item.title}</Text>
                    <Text style = {styles.story}>AUTHOR : {item.author}</Text>
                    <Text style = {styles.texts}>STORY : {item.storyText}</Text>
                    
                    </TouchableOpacity>
                  </View>
                ))
              : this.state.dataSource.map((item) => (
                  <View
                    style={{
                      borderColor: 'black',
                      borderWidth: 3,
                      padding: 10,
                      alignItems: 'center',
                      margin: 30,
                      backgroundColor:'beige'
                    }}>
                    <TouchableOpacity>
                    <Text style = {styles.story}>Title : {item.title}</Text>
                    <Text style = {styles.story}>Author: {item.author}</Text>
                    <Text style = {styles.story}>Story: {item.storyText}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
          </View>
        </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FFB6C1',
  },
    story:{
    fontFamily:'britannic',
    fontSize:20,
  },
  searchBar:{
    fontFamily:'britannic',
    color:'white',
    padding:15,
  },
  scrollView: {
    width:"100%"
  },
  header: {
    backgroundColor: '#FFB6C1',
    marginTop: 5
  },
  headerText: {
    textAlign: 'center',
    color: 'black', 
    fontSize: 25, 
    fontWeight:"bold",
  },
});
