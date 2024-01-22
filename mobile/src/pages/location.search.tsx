import React, {useState} from 'react';
import {View, TextInput, Button, Text, FlatList} from 'react-native';
import Slider from '@react-native-community/slider';
import Geocoder from 'react-native-geocoding';
import Config from 'react-native-config';
import {GetCourses} from '../utils/api';
import CourseCard from './course.card';
import {NavigationProp} from '@react-navigation/native';
import {ICourse} from '@interfaces/course.type';

// Initialize Geocoder
Geocoder.init('AIzaSyAy8qGg1ugtN8ayOuiJkedoIVKDU_1Xjs4'); // use a valid API key

interface ILocationProps {
  navigation: NavigationProp<any>;
}

const LocationComponent = ({navigation}: ILocationProps) => {
  const [location, setLocation] = useState('');
  const [courses, setCourses] = useState([]);
  const [radius, setRadius] = useState(5);

  const handleLocationSubmit = async () => {
    try {
      const geoData = await Geocoder.from(location);
      const {lat, lng} = geoData.results[0].geometry.location;

      const courseData = await GetCourses({
        radius: radius.toString(),
        lat: lat.toString(),
        lng: lng.toString(),
      });

      setCourses(courseData.courses);
      console.log(courseData.courses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCourseCardPress = (name: string, zip_code: string) => {
    console.log(name, zip_code);
    navigation.navigate('CourseDetails', {
      name,
      zip: zip_code,
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />
      <Slider
        minimumValue={1}
        maximumValue={100}
        step={1}
        value={radius}
        onValueChange={setRadius}
      />
      <Text>Radius: {radius} km</Text>
      <Button title="Submit" onPress={handleLocationSubmit} />

      <FlatList
        data={courses}
        keyExtractor={(item: ICourse, index) =>
          `${item.name}-${item.zip_code}-${index}`
        }
        renderItem={({item}) => (
          <CourseCard
            course={item}
            onPress={() => handleCourseCardPress(item.name, item.zip_code)}
          />
        )}
      />
    </View>
  );
};

export default LocationComponent;
