// Every post image in src/assets/images is bundled by Vite.
// Use img('l_fbq3') to get the URL of images/l_fbq3.jpg.
const files = import.meta.glob('../assets/images/*.jpg', { eager: true, import: 'default' });

const byKey = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace('.jpg', ''), url])
);

export const img = (key) => {
  if (!byKey[key]) console.warn(`Missing image: ${key}.jpg`);
  return byKey[key];
};
