'use dom';

import { useConversation } from '@elevenlabs/react';
import { Mic } from 'lucide-react-native';
import { useCallback } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import tools from '../utils/tools';

async function requestMicrophonePermission() {
	try {
		await navigator.mediaDevices.getUserMedia({ audio: true });
		return true;
	} catch (error) {
		console.error('Microphone permission denied', error);
		return false;
	}
}

export default function ConvAiDOMComponent({
	dom,
	platform,
	get_battery_level,
	change_brightness,
	flash_screen,
}: {
	dom?: import('expo/dom').DOMProps;
	platform: string;
	get_battery_level: typeof tools.get_battery_level;
	change_brightness: typeof tools.change_brightness;
	flash_screen: typeof tools.flash_screen;
}) {
	const conversation = useConversation({
		onConnect: () => console.log('Connected'),
		onDisconnect: () => console.log('Disconnected'),
		onMessage: (message) => console.log(message),
		onError: (error) => console.error('Error:', error),
	});

	const startConversation = useCallback(async () => {
		const hasPermission = await requestMicrophonePermission();
		if (!hasPermission) {
			alert('No permission');
			return;
		}
		await conversation.startSession({
			agentId: 'YOUR_AGENT_ID',
			dynamicVariables: { platform },
			clientTools: { get_battery_level, change_brightness, flash_screen },
		});
	}, [conversation, platform, get_battery_level, change_brightness, flash_screen]);

	const stopConversation = useCallback(async () => {
		await conversation.endSession();
	}, [conversation]);

	return (
		<Pressable
			dom={dom}
			style={[styles.callButton, conversation.status === 'connected' && styles.callButtonActive]}
			onPress={conversation.status === 'disconnected' ? startConversation : stopConversation}
		>
			<View
				style={[styles.buttonInner, conversation.status === 'connected' && styles.buttonInnerActive]}
			>
				<Mic size={32} color="#E2E8F0" strokeWidth={1.5} style={styles.buttonIcon} />
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	callButton: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 24,
	},
	callButtonActive: {
		backgroundColor: 'rgba(239, 68, 68, 0.2)',
	},
	buttonInner: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: '#3B82F6',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonInnerActive: {
		backgroundColor: '#EF4444',
	},
	buttonIcon: {
		alignSelf: 'center',
	},
});
