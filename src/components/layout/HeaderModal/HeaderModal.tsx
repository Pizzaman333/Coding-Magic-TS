import "./HeaderModal.scss";

interface HeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeaderModal = ({ isOpen, onClose }: HeaderModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>
        <nav className="modal-nav">
          <a href="#games" onClick={onClose}>
            Games
          </a>
          <a href="#utils" onClick={onClose}>
            Utilities
          </a>
          <a href="#team" onClick={onClose}>
            Team
          </a>
        </nav>
      </div>
    </div>
  );
};
