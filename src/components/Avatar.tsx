type Props = {
  name: string;
  size?: string; // Pass size directly as Tailwind's spacing class (e.g., "8", "12")
};

function stringAvatar(name: string) {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
  return initials;
}

const getAvatarColor = (name: string) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
  ];

  // Generate a consistent color index based on the name
  const index = name
    .toLowerCase()
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

  return colors[index];
};

const Avatar = ({ name, size = "8" }: Props) => {
  const initials = stringAvatar(name);
  const color = getAvatarColor(name);

  return (
    <div
      className={`flex items-center justify-center rounded-full ${color} text-white text-md font-bold w-${size} h-${size}`}
    >
      {initials}
    </div>
  );
};

export default Avatar;
