import ImageColors from 'react-native-image-colors';

interface Config {
  defaultPrimaryColor?: string;
  defaultSecondaryColor?: string;
}

export const getImageColors = async (
  uri: string,
  {
    defaultPrimaryColor = '#084F6A',
    defaultSecondaryColor = '#75CEDB',
  }: Config = {},
) => {
  const imgColors = await ImageColors.getColors(uri, {});
  const colors: string[] = [];

  if (imgColors.platform === 'android') {
    colors.push(
      imgColors.dominant ?? defaultPrimaryColor,
      imgColors.average ?? defaultSecondaryColor,
    );
  }

  if (imgColors.platform === 'ios') {
    colors.push(
      imgColors.primary ?? defaultPrimaryColor,
      imgColors.secondary ?? defaultSecondaryColor,
    );
  }

  return colors;
};
