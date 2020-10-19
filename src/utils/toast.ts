import React from 'react';
import {ToastAndroid} from 'react-native';

export default function showToast(content:string){
    ToastAndroid.showWithGravity(content,ToastAndroid.LONG,ToastAndroid.CENTER);
}