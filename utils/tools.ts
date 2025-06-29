import * as Battery from 'expo-battery';
import * as Brightness from 'expo-brightness';

export const get_battery_level = async (): Promise<number | string> => {
	const batteryLevel = await Battery.getBatteryLevelAsync();
	console.log('batteryLevel', batteryLevel);
	if (batteryLevel === -1) {
		return 'Error: Device does not support retrieving the battery level.';
	}
	return batteryLevel;
};

export const change_brightness = async ({ brightness }: { brightness: number }): Promise<number> => {
	console.log('change_brightness', brightness);
	await Brightness.setSystemBrightnessAsync(brightness);
	return brightness;
};

export const flash_screen = async (): Promise<string> => {
	await Brightness.setSystemBrightnessAsync(1);
	setTimeout(async () => {
		await Brightness.setSystemBrightnessAsync(0);
	}, 200);
	return 'Successfully flashed the screen.';
};

const tools = { get_battery_level, change_brightness, flash_screen };
export default tools;
