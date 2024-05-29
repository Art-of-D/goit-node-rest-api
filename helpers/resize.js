import Jimp from 'jimp';

export const resize = async file => {
  const image = await Jimp.read(file);
  image.resize(250, 250);
  image.write(file);
};
