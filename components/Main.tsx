// Main.tsx
// Handles all displayed information
// jsp/P3Soft
// 2023-03-02

// React Native imports
import { useState } from 'react';
import {
	Modal,
	Text,
	TextInput,
	View
} from 'react-native';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

// Community imports
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Icon } from '@rneui/themed';

// Screens
import SaveScreen from '../screens/SaveScreen';
import TimelineScreen from '../screens/TimelineScreen';
import RolodexScreen from '../screens/RolodexScreen';
import QuizScreen from '../screens/QuizScreen';
import DevScreen from '../screens/DevScreen';

// Assets and utils

