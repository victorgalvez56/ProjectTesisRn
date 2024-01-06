import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';
import SceneNames from './SceneNames';
import { NavigationProp } from '@react-navigation/native';

export type GenericStackNavigationProp = NavigationProp<RootStackParamList>;
export type LoginScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.LoginScreen
>;
export type CoursesScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.CoursesScreen
>;
export type CaseFirstScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.CaseFirstScreen
>;
export type CaseFinishScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.CaseFinishScreen
>;
export type PasScreen = NativeStackNavigationProp<
    RootStackParamList,
    SceneNames.PasScreen
>;
