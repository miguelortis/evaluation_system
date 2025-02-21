import { useEffect, useState } from "react";
import { Modal } from "antd";

const CustomModal = ({ children, title = "Modal title", open, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    if (onClose) {
      onClose();
    }
  };
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="custom-modal">{children}</div>
    </Modal>
  );
};
export default CustomModal;
