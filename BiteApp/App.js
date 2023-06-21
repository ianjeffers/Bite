import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getGpt3Data, getWikipediaData } from './api';

export default function App() {
    const [educationContext, setEducationContext] = useState(null);

    useEffect(() => {
        if (educationContext) {
            const fetchData = async () => {
                const wikipediaData = await getWikipediaData(educationContext);
                const gpt3Data = await getGpt3Data(wikipediaData[2][0]);
                console.log(gpt3Data);
            }
            fetchData();
        }
    }, [educationContext]);

    return (
        <View>
            <Text>Bite - Micro-learning App</Text>
            {/* Additional components and layout here */}
        </View>
    );
}
