const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
	name: IS_DEV ? 'SavePoint (dev)' : 'SavePoint',
	slug: 'savepoint',
	version: '0.0.0',
	orientation: 'portrait',
	icon: './assets/icons/savepointIcon.png',
	userInterfaceStyle: 'dark',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#000000',
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: [
		'**/*',
	],
	ios: {
		bundleIdentifier: 'com.p3soft.savepoint',
		supportsTablet: true,
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/icons/android/savepoint-android-foreground.png',
			backgroundImage: './assets/icons/android/savepoint-android-background.png',
			monochromeImage: './assets/icons/android/savepoint-android-monochrome.png',
			backgroundColor: '#000000',
		},
		package: 'com.p3soft.savepoint',
	},
	web: {
		favicon: './assets/icons/savepointIcon.png',
	},
}
