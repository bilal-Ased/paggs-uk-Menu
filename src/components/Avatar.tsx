
type Props = {
  name: string;
};

 function stringAvatar(name:string) {
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
  
  // Generate a number from the name to consistently pick a color
  const index = name
    .toLowerCase()
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

  return colors[index];
};

const Avatar = ({ name }: Props) => {
  const initials = stringAvatar(name);
  const color = getAvatarColor(name);

  return (
    <div
      className={`flex items-center justify-center w-8 h-8 rounded-full ${color} text-white text-md font-bold`}
    >
      {initials}
    </div>
  );
};

export default Avatar;
