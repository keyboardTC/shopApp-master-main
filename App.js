import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text, ImageBackground, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ShopScreen from './screens/ShopScreen';
import { Colors } from './constants/styles';
import { AuthContext } from './context/auth-context';
import { CartContext } from './context/cart-context';
import CartContextProvider from './context/cart-context';
import AuthContextProvider from './context/auth-context';
import IconButton from './components/ui/IconButton';
import CartScreen from './screens/CartScreen';
import AccountScreen from './screens/AccountScreen'
import ItemsContextProvider from './context/items-context';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import EdithProfileScreen from './screens/EdithProfileScreen';
import CheckoutScreen from './screens/CheckoutScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function TapNav() {
  return (
      <Tab.Navigator
        screenOptions={ ({route}) => ({
            "tabBarActiveTintColor": "orangered",
            "tabBarInactiveTintColor": "gray",
            "tabBarStyle": [
                {
                "display": "flex"
                },
                null
            ],
            "tabBarIcon": ( {focused, color, size}) => {
              let iconName;

              if (route.name == "Home"){
                iconName = focused ? 'home' : 'home'
              }else if(route.name == "AccountScreen") {
                iconName = focused ? 'user-circle' : 'user-circle-o'
              }

              return <Icon name={iconName} size={size} color={color} />;
            }
        }) }      
      
      >
      
      
        <Tab.Screen name="Home" component={DrawerNavigator} 
          options={{
            headerShown:false,
            title:'Shop'
          }}
        />
        <Tab.Screen name="AccountScreen" component={AccountScreen} 
                options={{
                    title: 'Account Profile',
                }}
        />
  </Tab.Navigator>
  )
}

function DrawerNavigator() {
  return <Drawer.Navigator>
    <Drawer.Screen name='ShopScreen' component={ShopScreen}
      options={{
        title: 'Filters',
      }}
    />
    <Drawer.Screen name='Availability' initialParams={{filter: 'Available'}} component={ShopScreen}/>
    <Drawer.Screen name='Low - High Price' initialParams={{filter: 'LowHigh'}} component={ShopScreen}/>
    <Drawer.Screen name='A-Z' initialParams={{filter: 'AToZ'}} component={ShopScreen}/>
    {/* <Drawer.Screen name='AccountScreen' component={AccountScreen}/> */}
  </Drawer.Navigator>
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={TapNav} 
        options={({route, navigation})=>{
          return {
            title: 'Welcome to Shop',
            headerRight: ({ tintColor }) => (
              <>
                <IconButton
                  icon="cart" 
                  color={tintColor}
                  size={24}
                  onPress={()=>{
                    navigation.navigate('MyCart');
                    console.log("MyCart");
                  }}
                />
                <Text> |  </Text>
                <IconButton
                  icon="exit"
                  color={tintColor}
                  size={24}
                  onPress={authCtx.logout}
                />
              </>
            )
          }
        }}
      />
      <Stack.Screen name="MyCart" component={CartScreen}/>
      <Stack.Screen name="ItemDetails" component={ItemDetailsScreen}/>
      <Stack.Screen name="Checkout" component={CheckoutScreen}
              options={{
                title: 'Payment Details'
              }}
      />
      <Stack.Screen name="EditeProfile" component={EdithProfileScreen}
              options={{
                  title: 'Edit Profile',
              }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>

        {/* <AuthStack /> */}
        {/* <AuthenticatedStack/> */}
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack/>}

    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <ItemsContextProvider>
          <CartContextProvider>
            <Navigation />
          </CartContextProvider>
        </ItemsContextProvider>
      </AuthContextProvider>  
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    height:200,
    width:'100%'
  },
  backgroundImage: {
    opacity:0.15
  }
})
