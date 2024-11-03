interface Props {
  message?: string;
}

const Message = ({ message }: Props) => {
  return (
    <div className="p-1 text-center">
      {message || 'Oppps something went wrong!'}
    </div>
  );
};

export default Message;
