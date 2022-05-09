export default ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      style={{
        all: 'unset',
        width: 50,
        cursor: 'pointer',
        height: 50,
        color: 'black',
        fontSize: 18,
      }}
      onClick={onClick}
    >
      &#x21bb;
    </button>
  );
};
