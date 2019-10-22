import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker'; //для камеры
import * as Permissions from 'expo-permissions'; //для получения прав

import Colors from '../constants/Colors';

const ImagePicker = props => {
    const [pickedImage, setPickedImage] = useState();

    //клянчу права на камеру у галерею
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if(result.status !== 'granted'){
            Alert.alert(
                'Insufficient premisions. You need to grant camera permissions to use this app.',
                 [{text: 'Yes, my Master'}
                ])
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPerm = await verifyPermissions();
        if(!hasPerm) return;

        const image = await ExpoImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? <Text>No image picked yet.</Text> :
                <Image style={styles.image} source={{uri: pickedImage}}/> }
            </View>
            <Button title='Take Image' color={Colors.primary} onPress={takeImageHandler}/>
        </View>
    )
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImagePicker;