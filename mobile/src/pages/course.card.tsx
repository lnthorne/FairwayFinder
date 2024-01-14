import {ICourse} from '@interfaces/course.type';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

type CourseCardProps = {
  course: ICourse;
  onPress: () => void;
};

const CourseCard: React.FC<CourseCardProps> = ({course, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{course.name}</Text>
      <Text style={styles.details}>Zip Code: {course.zip_code}</Text>
      <Text style={styles.details}>Distance: {course.distance} km</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default CourseCard;
