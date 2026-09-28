import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function CustomTabBar({
  state,
  descriptors,
  navigation,
}: any) {
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;

        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
          >
            <Text
              style={[
                styles.icon,
                isFocused && styles.activeIcon,
              ]}
            >
              {getIcon(route.name)}
            </Text>

            <Text
              style={[
                styles.label,
                isFocused && styles.activeLabel,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function getIcon(routeName: string) {
  switch (routeName) {
    case 'HomeStack':
      return '⌂';

    case 'Category':
      return '☷';

    case 'Cart':
      return '🛒';

    case 'Account':
      return '●';

    default:
      return '○';
  }
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    paddingBottom: 8,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 22,
    color: '#999999',
    marginBottom: 4,
  },

  activeIcon: {
    color: '#E53935',
  },

  label: {
    fontSize: 12,
    color: '#999999',
  },

  activeLabel: {
    color: '#E53935',
    fontWeight: 'bold',
  },
});

export default CustomTabBar;
