import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import PropTypes from "prop-types";

export default function TwoOptionModel(props) {
  const {
    showModel,
    onClose,
    ModelMessage,
    AcceptBtnText,
    CancelBtnText,
    AcceptAction,
    CancelAction,
  } = props;

  return (
    <Modal show={showModel} onClose={onClose} popup size="md">
      <Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              {ModelMessage}{" "}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={AcceptAction}>
                {AcceptBtnText}{" "}
              </Button>
              <Button onClick={CancelAction}>{CancelBtnText}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  );
}

TwoOptionModel.propTypes = {
  showModel: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ModelMessage: PropTypes.string.isRequired,
  AcceptBtnText: PropTypes.string.isRequired,
  CancelBtnText: PropTypes.string.isRequired,
  AcceptAction: PropTypes.func.isRequired,
  CancelAction: PropTypes.func.isRequired,
};
