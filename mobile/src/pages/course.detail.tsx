import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {CallAPI, Endpoint, METHOD} from '../utils/endpoints';
import {ICourseDetails} from '@interfaces/course.type';

interface ICourseDetailsProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

interface ICoursePhotos {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

const CourseDetails: React.FC<ICourseDetailsProps> = ({
  navigation,
  route,
}: ICourseDetailsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [courseDetails, setCoursDetails] = useState<ICourseDetails>();
  const [photos, setPhotos] = useState<ICoursePhotos[]>([]);

  const {name, zip} = route.params;

  useEffect(() => {
    async function getCourseDetails() {
      try {
        setIsLoading(true);
        const response = await CallAPI({
          endpoint: Endpoint.DETAILS,
          method: METHOD.GET,
          params: {
            zip,
            name,
          },
        });

        console.log(response.data.course_details.result.photos);
        setCoursDetails(response.data.course_details);
        setPhotos(response.data.course_details.result.photos);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course details', error);
        setIsLoading(false);
      }
    }

    getCourseDetails();
  }, []);

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Loading indicator
      ) : courseDetails ? (
        <>
          <Text style={styles.title}>{courseDetails.result.name}</Text>
          <Text style={styles.detail}>
            {courseDetails.result.formatted_address}
          </Text>
          <Text style={styles.detail}>
            {courseDetails.result.formatted_phone_number}
          </Text>
          <Text style={styles.detail}>
            Rating: {courseDetails.result.rating}
          </Text>
          <TouchableOpacity
            onPress={() => openLink(courseDetails.result.website)}>
            <Text style={styles.link}>Visit Website</Text>
          </TouchableOpacity>

          {photos.map((photo, index) => (
            <Image
              key={index}
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyAy8qGg1ugtN8ayOuiJkedoIVKDU_1Xjs4`,
              }} // Replace with actual URL construction logic
              style={styles.photo}
            />
          ))}
        </>
      ) : (
        <Text>Course details not available.</Text> // In case no data is available
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
  },
  link: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 20,
  },
  photo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});

export default CourseDetails;
