import Button from "../buttons/Button";

const ConfirmBox = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/25 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-lg text-center font-semibold mb-4">Are you sure you want to delete?</h2>
        <div className="flex justify-center space-x-2 pt-2">
          <Button onClick={onConfirm} variant="primary">Yes</Button>
          <Button onClick={onClose} variant="secondary">No</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
