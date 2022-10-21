import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TopList = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.topNavTitle}>National Trust</Text>
        <View style={styles.topNav}>
            <Text style={styles.topNavItem}>Disover a world of National Trust</Text>
        </View>
    </View>
  )
}

export default TopList

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#659136",
        width: "100%",
        height: "15%",
    },
    topNav: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    topNavTitle: {
        marginTop: 60,
        marginBottom: 10,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    topNavItem: {
        color: "white"
    }
})