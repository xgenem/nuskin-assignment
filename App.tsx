import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
} from 'react-native';
import MapView, {LatLng, Marker} from 'react-native-maps';

type MarkerData = {
  title: string;
  latitude: number;
  longitude: number;
};

const {width} = Dimensions.get('window');

export default function App() {
  const [input, setInput] = useState<string>();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  // initial lat long for every marker
  const latitude = 11.523987;
  const longitude = 122.696895;

  const onSubmit = () => {
    if (input) {
      const newMarker: MarkerData = {
        title: input,
        latitude,
        longitude,
      };

      setMarkers([...markers, newMarker]);
      setInput('');
    }
  };

  const onMarkerDragEnd = (coordinates: LatLng, index: number) => {
    let newMarkers = [...markers];

    newMarkers[index].latitude = coordinates.latitude;
    newMarkers[index].longitude = coordinates.longitude;

    setMarkers(newMarkers);
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 11.523987,
          longitude: 122.696895,
          latitudeDelta: 13,
          longitudeDelta: 13,
        }}
        style={styles.map}
      >
        {markers?.map((details, i) => {
          return (
            <Marker
              key={i}
              image={require('./src/assets/images/pin.png')}
              draggable={true}
              onDragEnd={(e) => {
                onMarkerDragEnd(e.nativeEvent.coordinate, i);
              }}
              title={details.title}
              coordinate={{
                latitude: details.latitude,
                longitude: details.longitude,
              }}
            />
          );
        })}
      </MapView>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(text) => setInput(text)}
          onSubmitEditing={onSubmit}
        />
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text>Convert</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffd400',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 50,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  content: {
    flexDirection: 'row',
    borderColor: '#efefef',
    borderWidth: 1,
    width: width - 20,
    padding: 2,
    marginTop: 40,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    opacity: 0.7,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
