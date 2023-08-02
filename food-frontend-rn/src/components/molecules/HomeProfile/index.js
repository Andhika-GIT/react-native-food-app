import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

// dummy
import { ProfileDummy } from '../../../assets';

// utils
import { getData } from '../../../utils';

const HomeProfile = () => {
  const [photo, setPhoto] = useState(ProfileDummy);

  useEffect(() => {
    getData('userProfile').then((response) => {
      console.log(response);
      setPhoto(response.profile_photo_url ? { uri: response.profile_photo_url } : ProfileDummy);
    });
  }, []);

  return (
    <View style={styles.profileContainer}>
      <View>
        <Text style={styles.appName}>FoodMarket</Text>
        <Text style={styles.desc}>Let's get some food</Text>
      </View>
      <Image source={photo} style={styles.profile} />
    </View>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: 'white',
  },
  appName: {
    fontSize: 22,
    fontFamily: 'poppins-medium',
    color: '#020202',
  },
  desc: {
    fontSize: 14,
    fontFamily: 'poppins-light',
    color: '#8D92A3',
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
