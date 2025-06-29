import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LandingPage from '../app/landing';
import ProfilePage from '../app/profile';
import ThingsToDoPage from '../app/things';
import LanguagePage from '../app/language';
import HistoryPage from '../app/history';
import KidsPage from '../app/kids';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Landing" component={LandingPage} />
      <Drawer.Screen name="Profile" component={ProfilePage} />
      <Drawer.Screen name="ThingsToDo" component={ThingsToDoPage} />
      <Drawer.Screen name="Language" component={LanguagePage} />
      <Drawer.Screen name="History" component={HistoryPage} />
      <Drawer.Screen name="Kids" component={KidsPage} />
    </Drawer.Navigator>
  );
}
