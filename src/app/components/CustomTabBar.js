"use client";

import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useRouter, usePathname } from "next/navigation";

const tabs = [
  { name: "home", path: "/" },
  { name: "scan", path: "/scan" },
  { name: "profile", path: "/profile" },
];

export default function CustomTabBar(props) {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const scanSize = width * 0.135;
  const isWeb = Platform.OS === "web";
  const { state, navigation } = props;

  return (
    <View
      style={{
        position: isWeb ? "fixed" : "absolute",
        bottom: 0,
        width,
        zIndex: 50,
      }}
    >
      {/* Background melengkung + stroke */}
      <Svg width={width} height={80} viewBox={`0 0 ${width} 80`}>
        <Path
          fill="#fff"
          stroke="#ddd"
          strokeWidth={1}
          d={`
            M0,20
            L${width * 0.4},0
            H${width / 2 - scanSize / 2 - 10}
            C${width / 2 - scanSize / 2 - 10},20 ${width / 2 - scanSize / 2 - 10},40 ${width / 2},40
            C${width / 2 + scanSize / 2 + 30},40 ${width / 2 + scanSize / 2 - 10},0 ${width / 2 + scanSize / 2 + 10},0
            H${width * 0.6}
            L${width},20
            V80
            H0
            Z
          `}
        />
      </Svg>

      {/* Tab items */}
      <View style={[styles.container, { width }]}>
        {tabs.map((tab, index) => {
          const isCenter = tab.name === "scan";
          const isFocused = isWeb
            ? pathname === tab.path
            : state?.index === index;

          const onPress = () => {
            if (isWeb) {
              if (!isFocused) router.push(tab.path);
            } else {
              const event = navigation.emit({
                type: "tabPress",
                target: state.routes[index].key,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(tab.name);
              }
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={
                isCenter
                  ? [
                      styles.centerWrapper,
                      {
                        top: -scanSize / 2,
                        left: width / 2 - scanSize / 2,
                        width: scanSize,
                        height: scanSize,
                      },
                    ]
                  : styles.tabButton
              }
            >
              {isCenter ? (
                <View
                  style={[
                    styles.scanButton,
                    {
                      width: scanSize,
                      height: scanSize,
                      borderRadius: scanSize / 4,
                      borderWidth: 3, // stroke
                      borderColor: "#fff",
                    },
                  ]}
                />
              ) : (
                <View
                  style={[
                    styles.squarePlaceholder,
                    { backgroundColor: isFocused ? "#ff2f66" : "#ccc" },
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    height: 80,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  scanButton: {
    backgroundColor: "#5cff8aff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 10,
  },
  squarePlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
});
