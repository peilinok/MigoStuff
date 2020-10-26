import React from 'react';
import {ToastAndroid} from 'react-native';

export default function showToast(content:string,duration:number = 2000){
    ToastAndroid.showWithGravity(content,duration,ToastAndroid.CENTER);
}