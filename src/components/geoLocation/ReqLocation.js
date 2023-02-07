const {PermissionsAndroid} = require('react-native');

export const ReqLocation = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Izin Lokasi Anda',
        message: 'Bolehkan kami mengakses lokasi anda?',
        buttonNeutral: 'Tanya Nanti',
        buttonNegative: 'Jangan',
        buttonPositive: 'Boleh',
      },
    );
    // console.log('granted', granted);
    if (granted === 'granted') {
      // console.log('You can use Geolocation');
      return true;
    } else {
      // console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};
