import { OneSignal } from 'react-native-onesignal';

export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    user_name: 'Victor Matheus',
    user_email: 'victormatheus507@gmail.com'
  });
}
