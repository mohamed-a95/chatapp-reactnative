import { createDrawerNavigator } from "@react-navigation/drawer";
import Chat from "../app/Chat";
import Settings from "../app/Settings";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Chat" component={Chat} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}
