import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  onClick: () => void;
  className?: string;
};

export default function CopyButton({ onClick, className = "" }: Props) {
  return (
    <button
      className={`flex items-center justify-center copy-button ${className}`}
      style={{ width: 30, height: 30 }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCopy} />
    </button>
  );
}
