type Props = {
  src: string;
  rank: number;
};

const IMG_SIZE = 300;
const RANK_HEIGHT = 28;

export default function Image({ src, rank }: Props) {
  return (
    <div className="flex flex-column">
      <span
        style={{
          marginBottom: `-${RANK_HEIGHT}px`,
          zIndex: 2,
          width: "fit-content",
          height: RANK_HEIGHT,
          backgroundColor: "#2a37f0",
        }}
        className="flex justify-center items-center fw7 f4 ph2 br2 white"
      >
        {rank}
      </span>
      <img
        src={src}
        alt=""
        className="br2 br--top"
        style={{ width: IMG_SIZE, height: IMG_SIZE }}
      />
    </div>
  );
}
