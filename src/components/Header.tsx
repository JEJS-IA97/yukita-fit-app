import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
    partnerName: string;
    }

    export const Header: React.FC<HeaderProps> = ({ partnerName }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top + 8, 16) }]}>
        <View>
            <Text style={styles.brandSubtitle}>YUKITA FIT • PANEL DE CONTROL</Text>
            <Text style={styles.brandTitle}>¡Hola, {partnerName}! 👋</Text>
        </View>
        <TouchableOpacity style={styles.avatar} activeOpacity={0.8}>
            <Text style={styles.avatarText}>YF</Text>
        </TouchableOpacity>
        </View>
    );
    };

    const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16,
        backgroundColor: '#f8fafc',
    },
    brandSubtitle: {
        fontSize: 10,
        fontWeight: '800',
        color: '#82bb2c',
        letterSpacing: 1.2,
    },
    brandTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0f172a',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#014325',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 14,
    },
    });