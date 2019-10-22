import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native'
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';


const NewPlaceScreen = props => {
    const [titleValue, setTitle] = useState('');
    const [image, setImage] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitle(text);
    };

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue, image));
        props.navigation.goBack();
    };

    const imageTakenHandler = imagePath => {
        setImage(imagePath);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImagePicker onImageTaken={imageTakenHandler}/>
                <Button
                    title="Save Place"
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place',
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen;